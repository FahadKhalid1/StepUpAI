import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  Copy,
  Check,
  RefreshCw,
  ShieldAlert,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import SEO from '../../components/SEO';
import { useLanguage } from '../../contexts/LanguageContext';
import { reviewTool } from '../../data/outilsData';
import { generateReply } from '../../lib/reviewReply';
import type { ReviewReplyResult } from '../../lib/reviewReply';
import { trackEvent } from '../../lib/analytics';

const MAX_CHARS = 1500;
const URL_PATH = `/outils/${reviewTool.slug}`;

type Status = 'idle' | 'loading' | 'reply' | 'skip' | 'rate_limited' | 'unavailable' | 'error';

const ReviewReplyPage: React.FC = () => {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const pick = (o: { fr: string; en: string }) => (fr ? o.fr : o.en);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [businessType, setBusinessType] = useState('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [tone, setTone] = useState('chaleureux');

  const [status, setStatus] = useState<Status>('idle');
  const [reply, setReply] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tooLong = review.length > MAX_CHARS;

  async function run() {
    if (tooLong || status === 'loading') return;
    setStatus('loading');
    setCopied(false);

    const result: ReviewReplyResult = await generateReply({
      review,
      rating,
      businessType,
      businessName,
      tone,
      language: fr ? 'fr' : 'en',
    });

    switch (result.kind) {
      case 'reply':
        setReply(result.reply);
        setStatus('reply');
        // No review text, no reply text — counters only. See CLAUDE.md §12a.
        trackEvent('tool_use', { tool: 'review_reply', rating, language });
        break;
      case 'skip':
        setStatus('skip');
        trackEvent('tool_skip', { tool: 'review_reply', rating, language });
        break;
      default:
        setStatus(result.kind);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(reply);
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const el = document.createElement('textarea');
      el.value = reply;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    trackEvent('tool_copy', { tool: 'review_reply', rating, language });
    window.setTimeout(() => setCopied(false), 2000);
  }

  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: fr ? 'Générateur de réponse aux avis Google' : 'Google review reply generator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: `https://www.stepupai.fr${URL_PATH}`,
      description: pick(reviewTool.seoDescription),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      provider: { '@id': 'https://www.stepupai.fr/#organization' },
      inLanguage: ['fr-FR', 'en-US'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: reviewTool.faqs.map((f) => ({
        '@type': 'Question',
        name: pick(f.q),
        acceptedAnswer: { '@type': 'Answer', text: pick(f.a) },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: fr ? 'Accueil' : 'Home', item: 'https://www.stepupai.fr' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.stepupai.fr/outils' },
        {
          '@type': 'ListItem',
          position: 3,
          name: fr ? 'Réponse aux avis Google' : 'Google review replies',
          item: `https://www.stepupai.fr${URL_PATH}`,
        },
      ],
    },
  ];

  const stateBox = (tone: 'warn' | 'error', title: string, body: string, Icon: typeof AlertCircle) => (
    <div
      className={`rounded-xl border p-6 ${
        tone === 'warn' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
      }`}
    >
      <div className="flex gap-3">
        <Icon
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tone === 'warn' ? 'text-amber-600' : 'text-red-600'}`}
          aria-hidden="true"
        />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={pick(reviewTool.seoTitle)}
        description={pick(reviewTool.seoDescription)}
        keywords={reviewTool.keywords.join(', ')}
        canonical={URL_PATH}
        structuredData={structuredData}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-6" aria-label={fr ? "Fil d'ariane" : 'Breadcrumb'}>
            <Link to="/" className="hover:text-white transition-colors">{fr ? 'Accueil' : 'Home'}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/outils" className="hover:text-white transition-colors">Outils</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{fr ? 'Réponse aux avis' : 'Review replies'}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 text-balance"
          >
            {pick(reviewTool.headline)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-purple-100 max-w-2xl leading-relaxed"
          >
            {pick(reviewTool.subhead)}
          </motion.p>
        </div>
      </section>

      {/* ── The tool ───────────────────────────────────────── */}
      <section className="py-12 -mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
            {/* Review */}
            <label htmlFor="review" className="block text-sm font-semibold text-gray-900 mb-2">
              {pick(reviewTool.form.reviewLabel)}
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              placeholder={pick(reviewTool.form.reviewPlaceholder)}
              className="w-full rounded-lg border border-gray-300 p-4 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
            />
            <div className="flex justify-between items-center mt-1.5 mb-6">
              <span className="text-xs text-gray-500">{pick(reviewTool.form.reviewHint)}</span>
              <span className={`text-xs tabular-nums ${tooLong ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
                {review.length} / {MAX_CHARS}
              </span>
            </div>

            {/* Rating */}
            <fieldset className="mb-6">
              <legend className="block text-sm font-semibold text-gray-900 mb-2">
                {pick(reviewTool.form.ratingLabel)}
              </legend>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-pressed={rating === n}
                    aria-label={`${n} / 5`}
                    className={`p-2 rounded-lg transition-colors ${
                      n <= rating ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-gray-400'
                    }`}
                  >
                    <Star className="w-7 h-7" fill={n <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label htmlFor="btype" className="block text-sm font-semibold text-gray-900 mb-2">
                  {pick(reviewTool.form.businessTypeLabel)}
                </label>
                <select
                  id="btype"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                >
                  {reviewTool.businessTypes.map((b) => (
                    <option key={b.value} value={b.value}>
                      {pick(b.label)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bname" className="block text-sm font-semibold text-gray-900 mb-2">
                  {pick(reviewTool.form.businessNameLabel)}
                </label>
                <input
                  id="bname"
                  type="text"
                  value={businessName}
                  maxLength={80}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={pick(reviewTool.form.businessNamePlaceholder)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
              </div>
            </div>

            {/* Tone */}
            <fieldset className="mb-6">
              <legend className="block text-sm font-semibold text-gray-900 mb-2">
                {pick(reviewTool.form.toneLabel)}
              </legend>
              <div className="inline-flex flex-wrap gap-2">
                {reviewTool.tones.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTone(t.value)}
                    aria-pressed={tone === t.value}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      tone === t.value
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    {pick(t.label)}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={run}
              disabled={status === 'loading' || tooLong}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-lg font-semibold hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {pick(reviewTool.form.submitting)}
                </>
              ) : (
                <>
                  {pick(reviewTool.form.submit)}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            {tooLong && <p className="mt-3 text-sm text-red-600">{pick(reviewTool.states.tooLong)}</p>}

            <p className="mt-4 text-xs text-gray-500 leading-relaxed">{pick(reviewTool.form.privacy)}</p>

            {/* ── Result states ── */}
            {status === 'loading' && (
              <div className="mt-8 animate-pulse space-y-3" aria-live="polite">
                <div className="h-4 bg-gray-200 rounded w-11/12" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            )}

            {status === 'reply' && (
              <div className="mt-8" aria-live="polite">
                <label htmlFor="reply" className="block text-sm font-semibold text-gray-900 mb-2">
                  {pick(reviewTool.form.resultLabel)}
                </label>
                <textarea
                  id="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border-2 border-purple-200 bg-purple-50/40 p-4 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                <p className="mt-1.5 text-xs text-gray-500">{pick(reviewTool.form.editHint)}</p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? pick(reviewTool.form.copied) : pick(reviewTool.form.copy)}
                  </button>
                  <button
                    type="button"
                    onClick={run}
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:border-purple-300 hover:text-purple-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {pick(reviewTool.form.regenerate)}
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-500 leading-relaxed">{pick(reviewTool.form.disclaimer)}</p>
              </div>
            )}

            {status === 'skip' && (
              <div className="mt-8" aria-live="polite">
                {stateBox('warn', pick(reviewTool.states.skipTitle), pick(reviewTool.states.skipBody), ShieldAlert)}
              </div>
            )}
            {status === 'rate_limited' && (
              <div className="mt-8" aria-live="polite">
                {stateBox('warn', pick(reviewTool.states.rateLimitedTitle), pick(reviewTool.states.rateLimitedBody), AlertCircle)}
              </div>
            )}
            {status === 'unavailable' && (
              <div className="mt-8" aria-live="polite">
                {stateBox('warn', pick(reviewTool.states.unavailableTitle), pick(reviewTool.states.unavailableBody), AlertCircle)}
              </div>
            )}
            {status === 'error' && (
              <div className="mt-8" aria-live="polite">
                {stateBox('error', pick(reviewTool.states.errorTitle), pick(reviewTool.states.errorBody), AlertCircle)}
              </div>
            )}
          </div>

          {/* ── Reviews Hub offer — under the answer, never in front of it ── */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 text-balance">{pick(reviewTool.cta.title)}</h2>
            <p className="text-gray-700 leading-relaxed mb-5">{pick(reviewTool.cta.body)}</p>
            <a
              href={reviewTool.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('select_item', { item_id: 'reviews_hub', location: 'tool_review_reply' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              {pick(reviewTool.cta.button)}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Editorial: the five rules ──────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-balance">{pick(reviewTool.rulesTitle)}</h2>
          <ol className="space-y-8">
            {reviewTool.rules.map((r, i) => (
              <li key={i} className="flex gap-5">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pick(r.title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{pick(r.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Worked examples ────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-balance">{pick(reviewTool.examplesTitle)}</h2>
          <p className="text-gray-600 mb-10">{pick(reviewTool.examplesIntro)}</p>

          <div className="space-y-6">
            {reviewTool.examples.map((ex, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <div className="flex gap-0.5 mb-3" aria-label={`${ex.rating} / 5`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-4 h-4 ${n <= ex.rating ? 'text-amber-500' : 'text-gray-300'}`}
                        fill={n <= ex.rating ? 'currentColor' : 'none'}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    {pick(ex.review) || (fr ? '(note seule, sans commentaire)' : '(rating only, no comment)')}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-purple-700 mb-2">
                    {fr ? 'Réponse' : 'Reply'}
                  </p>
                  <p className="text-gray-800 leading-relaxed">{pick(ex.reply)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-balance">
            {fr ? 'Questions fréquentes' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-4">
            {reviewTool.faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">{pick(f.q)}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {/* CSS collapse, not conditional render — answers stay in the DOM for crawlers */}
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">{pick(f.a)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links ────────────────────────────────────── */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">
            {fr ? 'Les avis ne sont qu’un début' : 'Reviews are only the start'}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {fr
              ? "Nous automatisons aussi la prise de réservation, les relances clients et le suivi des commandes pour des restaurants et commerces en Île-de-France."
              : 'We also automate bookings, customer follow-ups and order tracking for restaurants and shops around Paris.'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/solutions/restaurants"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              {fr ? 'Solutions pour restaurants' : 'Solutions for restaurants'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/solutions/commerce-local"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              {fr ? 'Solutions pour commerces' : 'Solutions for local shops'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/outils"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              {fr ? 'Tous nos outils' : 'All our tools'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewReplyPage;
