import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// n8n "Blog Subscribe" webhook (same n8n instance as the contact form).
const SUBSCRIBE_WEBHOOK = 'https://fk92.app.n8n.cloud/webhook/step-up-subscribe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterSignupProps {
  /** Where the signup happened — passed to n8n for segmentation (e.g. 'blog', 'footer'). */
  source?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ source = 'blog' }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const fr = language === 'fr';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!EMAIL_RE.test(email)) {
      setError(fr ? 'Veuillez entrer une adresse e-mail valide.' : 'Please enter a valid email address.');
      setStatus('error');
      return;
    }
    if (!consent) {
      setError(
        fr
          ? 'Veuillez accepter de recevoir nos e-mails.'
          : 'Please agree to receive our emails.',
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(SUBSCRIBE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          language,
          source,
          consent: true,
          subscribed_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch (err) {
      console.error('Newsletter subscribe failed:', err);
      setError(
        fr
          ? "Une erreur s'est produite. Veuillez réessayer."
          : 'Something went wrong. Please try again.',
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white/15 backdrop-blur-sm rounded-xl p-6 flex items-center gap-3 justify-center"
        role="status"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
          <Check className="w-6 h-6 text-indigo-600" />
        </span>
        <p className="text-white text-left font-medium">
          {fr
            ? 'Merci, vous êtes abonné ! Un e-mail de bienvenue arrive dans votre boîte. 🎉'
            : "Thanks, you're subscribed! A welcome email is on its way. 🎉"}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
      <div className="flex flex-col sm:flex-row gap-4">
        <label htmlFor="newsletter-email" className="sr-only">
          {fr ? 'Adresse e-mail' : 'Email address'}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder={fr ? 'Votre adresse e-mail' : 'Your email address'}
          disabled={status === 'submitting'}
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 disabled:opacity-70 inline-flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {fr ? 'Envoi…' : 'Submitting…'}
            </>
          ) : (
            <>{fr ? "S'abonner" : 'Subscribe'}</>
          )}
        </button>
      </div>

      <label className="flex items-start gap-2 mt-4 text-left text-sm text-white/90 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (status === 'error') setStatus('idle');
          }}
          className="mt-1 w-4 h-4 rounded border-white/50 accent-white flex-shrink-0"
        />
        <span>
          {fr
            ? "J'accepte de recevoir les articles et actualités de Step UpAI par e-mail. Désinscription en un clic à tout moment."
            : 'I agree to receive Step UpAI articles and updates by email. Unsubscribe anytime in one click.'}
        </span>
      </label>

      {status === 'error' && error && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white bg-red-500/30 rounded-lg py-2 px-3" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;
