// =============================================================================
// GA4 event tracking — Step UpAI
//
// The site is prerendered with Puppeteer, so nothing here may touch `window`
// at module scope. Every function guards on `typeof window` and swallows its
// own errors: analytics must NEVER break a form submission.
//
// ⚠️ NO PII. Never pass email, name, phone or free-text message content to
// GA4 — it violates Google's measurement policy and, for a French company,
// creates a GDPR problem. Only send low-cardinality, non-identifying params
// (chosen service, language, which form).
// =============================================================================

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/** Fire a GA4 event. No-op during prerender, or if gtag has not loaded. */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch (err) {
    // Never let a tracking failure surface to the user mid-conversion.
    console.warn('analytics: event failed', name, err);
  }
}

/**
 * Contact form submitted successfully.
 * `generate_lead` is a GA4 recommended event, which means it can be marked as
 * a key event and imported into Google Ads as a conversion without remapping.
 */
export function trackLead(params: { service?: string; language?: string } = {}): void {
  trackEvent('generate_lead', {
    form: 'contact',
    service: params.service || 'unspecified',
    language: params.language,
  });
}

/**
 * Newsletter subscription succeeded.
 * `sign_up` is likewise a GA4 recommended event.
 */
export function trackSubscribe(params: { source?: string; language?: string } = {}): void {
  trackEvent('sign_up', {
    method: 'newsletter',
    source: params.source || 'unknown',
    language: params.language,
  });
}
