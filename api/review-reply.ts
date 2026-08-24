import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Step UpAI — free Google-review reply generator (/outils/generateur-reponse-avis-google).
 *
 * Drafts a two-sentence reply to a customer review. The rules below MIRROR the
 * Reviews Hub product prompt (REVIEWS_HUB.md §3) so the free sample and the paid
 * product speak with one voice — change them in both places or not at all.
 *
 * This does NOT reuse api/chat.ts: that one proxies a self-hosted model at
 * LLM_BASE_URL (llm.step-upai.com), which has never resolved and answers 503.
 *
 * Config (Vercel → Settings → Environment Variables):
 *   ANTHROPIC_API_KEY        required  without it the endpoint answers 503 and the UI degrades
 *   REVIEW_MODEL             optional  default claude-sonnet-5
 *   REVIEW_DAILY_MAX         optional  global generations/day, default 500 — the spend ceiling
 *   UPSTASH_REDIS_REST_URL   optional  durable rate limiting; without it limits are per-instance
 *   UPSTASH_REDIS_REST_TOKEN optional
 *
 * A free, unauthenticated LLM endpoint is a stranger's compute budget. Every
 * limit here exists for that reason; do not remove one without replacing it.
 */

export const config = { maxDuration: 30 };

const MAX_REVIEW_CHARS = 1500;
const MAX_NAME_CHARS = 80;
const MAX_TOKENS = 256;
/** Free and ungated, so the fair-use cap does the work an email gate would: 3 per rolling 24h. */
const PER_IP_PER_DAY = 3;
const DEFAULT_DAILY_MAX = 500;

const ALLOWED_ORIGINS = new Set([
  'https://www.stepupai.fr',
  'https://stepupai.fr',
  'https://www.step-upai.com',
  'https://step-upai.com',
  'http://localhost:5173',
  'http://localhost:4173',
]);

/** Models that accept output_config.effort. Others reject it with a 400. */
const EFFORT_CAPABLE = /^claude-(opus-5|opus-4-[678]|sonnet-5|fable-5)/;

const BUSINESS_LABELS: Record<string, string> = {
  restaurant: 'a restaurant, café or bakery',
  salon: 'a hair, beauty or barber salon',
  commerce: 'a local shop',
  hotel: 'a hotel or guest accommodation',
  services: 'a service business or independent professional',
  autre: 'a local business',
};

const TONE_LABELS: Record<string, string> = {
  chaleureux: 'warm and personable, but never gushing',
  professionnel: 'professional and measured',
  concis: 'brief and matter-of-fact',
};

const SYSTEM_PROMPT = `You write public replies to customer reviews on behalf of small local businesses.

Absolute rules — these are not preferences:
- Reply in the LANGUAGE OF THE REVIEW itself, never the language of this instruction. Google auto-translates reviews, so judge from the text you are given.
- Two sentences maximum. Never three.
- No emojis, ever.
- Never mention the star rating explicitly ("thank you for the 5 stars" is forbidden).
- Never name individual staff members.
- Never invent facts: no refunds, no discounts, no specific corrective action, no claim about what happened that the review did not state.
- Never promise that something "will never happen again".
- Output the reply text only. No preamble, no quotation marks, no explanation, no alternatives.

How to handle the rating:
- 4 or 5 stars: a short, warm thank-you.
- 1 to 3 stars: acknowledge the disappointment respectfully, without arguing or making excuses, and express the hope of meeting their expectations next time.
- No comment, rating only: the same tone, kept generic — there is nothing to echo back.

ABUSE CHECK, applied first: if the review contains profanity, personal attacks, discrimination, threats, or defamatory accusations, output the single token SKIP and nothing else. A merely harsh, unfair or exaggerated review is NOT abusive — reply to it normally. Only genuine abuse gets SKIP.`;

// -- Rate limiting -----------------------------------------------------------
// Upstash when configured; otherwise a per-instance Map, which is best-effort
// only (serverless spins up many instances) but better than nothing.

const memory = new Map<string, { count: number; resetAt: number }>();

async function bump(key: string, ttlSeconds: number): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await fetch(`${url.replace(/\/+$/, '')}/incr/${encodeURIComponent(key)}`, { headers });
      const data = (await res.json()) as { result?: number };
      const count = typeof data.result === 'number' ? data.result : 1;
      if (count === 1) {
        await fetch(`${url.replace(/\/+$/, '')}/expire/${encodeURIComponent(key)}/${ttlSeconds}`, { headers });
      }
      return count;
    } catch {
      // Fall through to the in-memory counter rather than failing the request.
    }
  }

  const now = Date.now();
  const hit = memory.get(key);
  if (!hit || hit.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + ttlSeconds * 1000 });
    return 1;
  }
  hit.count += 1;
  return hit.count;
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  const raw = Array.isArray(fwd) ? fwd[0] : (fwd || '');
  return raw.split(',')[0].trim() || 'unknown';
}

function buckets() {
  return { day: new Date().toISOString().slice(0, 10) };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Browser-origin only. No origin header means a script, not a visitor.
  const origin = (req.headers.origin as string) || '';
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: 'forbidden_origin' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'unconfigured' });

  const body = (req.body ?? {}) as {
    review?: string;
    rating?: number;
    businessType?: string;
    businessName?: string;
    tone?: string;
    language?: string;
  };

  const review = typeof body.review === 'string' ? body.review.trim() : '';
  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'invalid_rating' });
  }
  if (review.length > MAX_REVIEW_CHARS) return res.status(400).json({ error: 'review_too_long' });

  const businessName = (typeof body.businessName === 'string' ? body.businessName.trim() : '').slice(0, MAX_NAME_CHARS);
  const businessType = BUSINESS_LABELS[body.businessType || 'autre'] || BUSINESS_LABELS.autre;
  const tone = TONE_LABELS[body.tone || 'chaleureux'] || TONE_LABELS.chaleureux;
  const uiLanguage = body.language === 'en' ? 'English' : 'French';

  const { day } = buckets();
  const ip = clientIp(req);

  // Parsed explicitly: `Number(x) || DEFAULT` would turn REVIEW_DAILY_MAX=0 —
  // the kill switch — back into the default, and an empty string into 0.
  const rawMax = process.env.REVIEW_DAILY_MAX;
  const parsedMax = rawMax === undefined || rawMax.trim() === '' ? NaN : Number(rawMax);
  const globalMax = Number.isFinite(parsedMax) && parsedMax >= 0 ? parsedMax : DEFAULT_DAILY_MAX;
  const globalCount = await bump(`rr:all:${day}`, 86_400);
  if (globalCount > globalMax) return res.status(503).json({ error: 'daily_cap' });

  // Deliberately NOT keyed on the calendar day: the key's own 24h TTL starts at
  // the visitor's first generation, so the window rolls with them instead of
  // resetting for everyone at midnight UTC.
  const used = await bump(`rr:ip:${ip}`, 86_400);
  if (used > PER_IP_PER_DAY) return res.status(429).json({ error: 'rate_limited', scope: 'day' });

  // Sonnet 5 by choice: two-sentence review replies do not need Opus, and this
  // endpoint is public and ungated. REVIEW_MODEL can override it without a
  // deploy, but the default is what runs if nobody ever sets anything.
  const model = process.env.REVIEW_MODEL || 'claude-sonnet-5';
  const client = new Anthropic({ apiKey });

  const userTurn = [
    `Business: ${businessType}${businessName ? `, named "${businessName}"` : ''}.`,
    `Rating given: ${rating} out of 5.`,
    `Desired tone: ${tone}.`,
    review
      ? `The review, verbatim:\n"""\n${review}\n"""`
      : `The customer left no written comment — only the rating. Write the reply in ${uiLanguage}.`,
  ].join('\n');

  try {
    const message = await client.messages.create({
      model,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userTurn }],
      ...(EFFORT_CAPABLE.test(model) ? { output_config: { effort: 'low' as const } } : {}),
    });

    if (message.stop_reason === 'refusal') {
      return res.status(200).json({ skip: true, reason: 'refused' });
    }

    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    if (!text) return res.status(502).json({ error: 'empty_reply' });
    if (/^SKIP\.?$/i.test(text)) return res.status(200).json({ skip: true, reason: 'abusive' });

    // Counters only — never the review or the reply. See CLAUDE.md §12a (no PII).
    console.log(
      JSON.stringify({
        evt: 'review_reply',
        rating,
        chars: review.length,
        model,
        in: message.usage.input_tokens,
        out: message.usage.output_tokens,
      }),
    );

    // Strip wrapping quotes the model occasionally adds despite the instruction.
    const reply = text.replace(/^["“”']+|["“”']+$/g, '').trim();
    return res.status(200).json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: 'rate_limited', scope: 'upstream' });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('review-reply: bad ANTHROPIC_API_KEY');
      return res.status(503).json({ error: 'unconfigured' });
    }
    console.error('review-reply: upstream failure', err instanceof Error ? err.message : err);
    return res.status(502).json({ error: 'upstream_error' });
  }
}
