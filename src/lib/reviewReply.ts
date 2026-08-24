// =============================================================================
// Client for /api/review-reply.
//
// Every failure is mapped to a named outcome the UI can render as a real state.
// The tool must never show a dead box: an unreachable endpoint still leaves the
// page useful (editorial content, examples, and the Reviews Hub offer).
// =============================================================================

export interface ReviewReplyInput {
  review: string;
  rating: number;
  businessType: string;
  businessName: string;
  tone: string;
  language: 'fr' | 'en';
}

export type ReviewReplyResult =
  | { kind: 'reply'; reply: string }
  /** The model judged the review abusive — a first-class result, not an error. */
  | { kind: 'skip' }
  | { kind: 'rate_limited' }
  /** No API key, or the global daily ceiling was reached. */
  | { kind: 'unavailable' }
  | { kind: 'error' };

export async function generateReply(input: ReviewReplyInput): Promise<ReviewReplyResult> {
  try {
    const res = await fetch('/api/review-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.status === 429) return { kind: 'rate_limited' };
    if (res.status === 503) {
      // 503 covers two different situations and they must not read the same:
      // the daily ceiling is "come back tomorrow", a missing key is a fault.
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      return body.error === 'daily_cap' ? { kind: 'unavailable' } : { kind: 'error' };
    }

    if (!res.ok) return { kind: 'error' };

    const data = (await res.json()) as { reply?: string; skip?: boolean };
    if (data.skip) return { kind: 'skip' };
    if (typeof data.reply === 'string' && data.reply.trim()) {
      return { kind: 'reply', reply: data.reply.trim() };
    }
    return { kind: 'error' };
  } catch {
    return { kind: 'error' };
  }
}
