import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Step UpAI — hero "describe what you want to automate" assistant.
 *
 * Proxies to a self-hosted, OpenAI-compatible LLM (Ollama / LM Studio /
 * llama.cpp / vLLM / LocalAI) so there is no per-token API cost. The model
 * lives on a home server; this function calls it over a PUBLIC url (the home
 * box must be reachable from the internet — e.g. via a Cloudflare Tunnel —
 * because this code runs on Vercel, not on the home network).
 *
 * Config (Vercel → Settings → Environment Variables):
 *   LLM_BASE_URL  required  public base url of the server, e.g. https://llm.step-upai.com
 *                            (the function appends /v1/chat/completions)
 *   LLM_MODEL     optional  model name, e.g. "llama3.1" / "qwen2.5" (default llama3.1)
 *   LLM_API_KEY   optional  bearer token the home server / tunnel requires
 *
 * Any non-200 is intentional: the client falls back to routing the prompt
 * straight into the contact form, so the box works even while the home server
 * is offline or unconfigured.
 */

export const config = { maxDuration: 30 };

const MAX_TOKENS = 320;
const MAX_MESSAGE_CHARS = 1000;
const TIMEOUT_MS = 25_000; // home models can be slow to first token

const ALLOWED_ORIGINS = new Set([
  'https://www.step-upai.com',
  'https://step-upai.com',
  'http://localhost:5173',
  'http://localhost:4173',
]);

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

  const baseUrl = process.env.LLM_BASE_URL;
  if (!baseUrl) {
    // Home LLM not wired up yet — tell the client to fall back to /contact.
    return res.status(503).json({ error: 'unconfigured' });
  }
  const model = process.env.LLM_MODEL || 'llama3.1';
  const apiKey = process.env.LLM_API_KEY;

  const body = (req.body ?? {}) as { message?: string; language?: string };
  const text = typeof body.message === 'string' ? body.message.trim() : '';
  if (!text) return res.status(400).json({ error: 'empty_message' });
  if (text.length > MAX_MESSAGE_CHARS) return res.status(400).json({ error: 'message_too_long' });
  const lang = body.language === 'en' ? 'en' : 'fr';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const upstream = await fetch(`${baseUrl.replace(/\/+$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `[Visitor language: ${lang}. Reply in ${lang === 'fr' ? 'French' : 'English'}.]\n\n${text}`,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      console.error('LLM upstream error:', upstream.status);
      return res.status(502).json({ error: 'upstream_error' });
    }

    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = (data?.choices?.[0]?.message?.content ?? '').trim();
    if (!reply) return res.status(502).json({ error: 'empty_reply' });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('chat endpoint error:', err);
    return res.status(502).json({ error: 'upstream_error' });
  } finally {
    clearTimeout(timer);
  }
}
