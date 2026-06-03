/**
 * SEO helpers: derive a short <title> and a trimmed meta description so they
 * don't get truncated mid-phrase in search results.
 * - shortTitle: cut the display headline at its first natural separator
 *   (" : ", " — ", or a "?/!"), falling back to a word-boundary cap.
 * - trimDesc: trim to ~155 chars at a sentence/word boundary.
 */
export function shortTitle(s: string): string {
  if (!s) return s;
  for (const sep of [' : ', ' — ', ' – ']) {
    const i = s.indexOf(sep);
    if (i > 12) return s.slice(0, i).trim();
  }
  const q = s.search(/[?!]/);
  if (q > 12 && q < 62) return s.slice(0, q + 1).trim();
  if (s.length > 62) return s.slice(0, 59).replace(/\s+\S*$/, '').trim() + '…';
  return s;
}

export function trimDesc(s: string, max = 155): string {
  if (!s || s.length <= max) return s;
  const cut = s.slice(0, max);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (end >= 120) return cut.slice(0, end + 1).trim();
  const sp = cut.lastIndexOf(' ');
  return cut.slice(0, sp > 0 ? sp : max).trim() + '…';
}
