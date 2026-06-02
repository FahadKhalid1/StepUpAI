import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// n8n "Blog Subscribe" webhook (same n8n instance as the contact form).
const SUBSCRIBE_WEBHOOK = 'https://fk92.app.n8n.cloud/webhook/step-up-subscribe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface NewsletterSignupProps {
  /** Where the signup happened — passed to n8n for segmentation (e.g. 'blog', 'footer'). */
  source?: string;
  /** 'panel' = large (blog section, on gradient); 'compact' = small (footer, on dark). */
  variant?: 'panel' | 'compact';
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ source = 'blog', variant = 'panel' }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const fr = language === 'fr';
  const compact = variant === 'compact';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!EMAIL_RE.test(email)) {
      setError(fr ? 'Veuillez entrer une adresse e-mail valide.' : 'Please enter a valid email address.');
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
    } catch (err) {
      console.error('Newsletter subscribe failed:', err);
      setError(
        fr ? "Une erreur s'est produite. Veuillez réessayer." : 'Something went wrong. Please try again.',
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 justify-center ${compact ? 'text-sm text-white' : 'max-w-md mx-auto bg-white/15 backdrop-blur-sm rounded-xl p-5 text-white'}`}
        role="status"
      >
        <Check className={compact ? 'w-5 h-5 text-green-400 flex-shrink-0' : 'w-6 h-6 text-green-300 flex-shrink-0'} />
        <span className="font-medium">
          {fr ? 'Merci, vous êtes abonné ! 🎉' : "Thanks, you're subscribed! 🎉"}
        </span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'w-full max-w-md mx-auto' : 'max-w-md mx-auto'} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`nl-email-${source}`} className="sr-only">
          {fr ? 'Adresse e-mail' : 'Email address'}
        </label>
        <input
          id={`nl-email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder={fr ? 'Votre adresse e-mail' : 'Your email address'}
          disabled={status === 'submitting'}
          className={`flex-1 rounded-lg text-gray-900 focus:outline-none disabled:opacity-60 ${
            compact ? 'px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-400' : 'px-4 py-3 focus:ring-2 focus:ring-white'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`rounded-lg font-semibold transition-colors duration-300 disabled:opacity-70 inline-flex items-center justify-center gap-2 whitespace-nowrap ${
            compact
              ? 'px-5 py-2.5 text-sm bg-indigo-600 text-white hover:bg-indigo-500'
              : 'px-6 py-3 bg-white text-indigo-600 hover:bg-gray-100'
          }`}
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

      <p className={`mt-2.5 ${compact ? 'text-xs text-gray-400 text-center' : 'text-sm text-white/80 text-center'}`}>
        {fr
          ? 'En vous inscrivant, vous acceptez de recevoir nos e-mails. Désinscription en un clic.'
          : 'By subscribing you agree to receive our emails. Unsubscribe in one click.'}{' '}
        <Link to="/privacy" className="underline hover:opacity-100 opacity-90">
          {fr ? 'Confidentialité' : 'Privacy'}
        </Link>
      </p>

      {status === 'error' && error && (
        <p
          className={`mt-3 flex items-center justify-center gap-2 rounded-lg py-2 px-3 ${
            compact ? 'text-xs text-white bg-red-500/40' : 'text-sm text-white bg-red-500/30'
          }`}
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;
