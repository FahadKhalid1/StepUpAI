import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Step UpAI — hero "describe what you want to automate" assistant.
 *
 * Single-shot, stateless. Cheap + fast on Haiku, tight max_tokens, a static
 * (cache-marked) system prompt, and an origin allow-list to deter cross-origin
 * abuse. Any non-200 here is intentional: the client falls back to routing the
 * prompt straight into the contact form, so the box keeps working even before
 * ANTHROPIC_API_KEY is configured in Vercel.
 */

const MODEL = 'claude-haiku-4-5'; // user-requested: cheap + fast
const MAX_TOKENS = 320; // a short friendly paragraph — keep cost + latency low
const MAX_MESSAGE_CHARS = 1000;

const ALLOWED_ORIGINS = new Set([
  'https://www.step-upai.com',
  'https://step-upai.com',
  'http://localhost:5173',
  'http://localhost:4173',
]);

// Static prefix → cache-friendly. (Note: well under Haiku's 4096-token cache
// minimum, so it won't actually cache at this size — the marker is correct
// placement and future-proofs a larger prompt / model.)
const SYSTEM_PROMPT = `You are the website assistant for Step UpAI, an AI-automation agency in Paris / Île-de-France that builds custom AI systems for small and medium businesses (PME).

Step UpAI's services:
- Workflow & back-office automation (invoicing, data entry, reporting)
- Custom AI chatbots for websites and customer support
- AI voice agents — cold-calling and lead qualification by phone
- AI email marketing and automated lead follow-up
- Custom dashboards and admin panels
- Custom web & e-commerce development
- Autonomous AI agents that handle multi-step tasks
- SEO / AEO / GEO optimization

A visitor has described something they want to automate or build. Your job:
1. In a short, friendly paragraph (2–4 sentences), tell them concretely how Step UpAI could help with THEIR specific need — name the relevant service(s) and a realistic outcome (time saved, leads captured, fewer manual steps).
2. End by inviting them to start their project / request a free audit.

Rules:
- Reply in the visitor's language (French or English, as instructed in the message).
- Plain conversational prose only — no markdown, no bullet lists, no headings.
- Never quote prices, timelines, or firm commitments — say it depends on their needs.
- Stay strictly on Step UpAI's services. If the request is off-topic, politely steer back to how Step UpAI can help with automation, in one sentence.
- Keep it under 70 words. You are a warm first touch, not a full consultation.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Origin allow-list — soft guard against scripted cross-origin abuse.
  const origin = (req.headers.origin as string) || '';
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: 'forbidden_origin' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client to fall back to the contact route.
    return res.status(503).json({ error: 'unconfigured' });
  }

  const body = (req.body ?? {}) as { message?: string; language?: string };
  const text = typeof body.message === 'string' ? body.message.trim() : '';
  if (!text) return res.status(400).json({ error: 'empty_message' });
  if (text.length > MAX_MESSAGE_CHARS) return res.status(400).json({ error: 'message_too_long' });
  const lang = body.language === 'en' ? 'en' : 'fr';

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Static system prompt carries the cache marker; the volatile language +
      // visitor message go in the user turn (keeps the prefix stable).
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: [
        {
          role: 'user',
          content: `[Visitor language: ${lang}. Reply in ${lang === 'fr' ? 'French' : 'English'}.]\n\n${text}`,
        },
      ],
    });

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!reply) return res.status(502).json({ error: 'empty_reply' });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('chat endpoint error:', err);
    return res.status(502).json({ error: 'upstream_error' });
  }
}
