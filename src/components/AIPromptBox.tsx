import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  RotateCcw,
  Loader2,
  MessageSquare,
  Workflow,
  Mail,
  LayoutDashboard,
  Phone,
  ShoppingBag,
  Bot,
  Search,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  MessageSquare,
  Workflow,
  Mail,
  LayoutDashboard,
  Phone,
  ShoppingBag,
  Bot,
  Search,
  Zap,
};

const COPY = {
  eyebrow: { fr: 'Assistant IA', en: 'AI Assistant' },
  placeholder: {
    fr: 'Décrivez ce que vous voulez automatiser… ex. : « Relancer mes prospects automatiquement et remplir mon agenda de rendez-vous »',
    en: 'Describe what you’d like to automate… e.g. "Follow up with my leads automatically and fill my calendar with appointments"',
  },
  button: { fr: 'Lancer mon projet', en: 'Start my project' },
  cta: { fr: 'Lancer mon projet', en: 'Start my project' },
  reset: { fr: 'Nouvelle question', en: 'New question' },
  helper: {
    fr: 'Audit gratuit, sans engagement. Décrivez votre besoin, on vous répond sous 24 h.',
    en: 'Free audit, no commitment. Tell us your need and we’ll reply within 24h.',
  },
};

interface Prompt {
  label: { fr: string; en: string };
  icon: string;
  service: string;
}

const PROMPTS: Prompt[] = [
  { label: { fr: 'Un chatbot pour mon site', en: 'A chatbot for my website' }, icon: 'MessageSquare', service: 'chatbots' },
  { label: { fr: 'Automatiser ma facturation', en: 'Automate my invoicing' }, icon: 'Workflow', service: 'workflow' },
  { label: { fr: 'Relancer mes prospects par e-mail', en: 'Follow up with leads by email' }, icon: 'Mail', service: 'email' },
  { label: { fr: 'Un tableau de bord de mes ventes', en: 'A dashboard of my sales' }, icon: 'LayoutDashboard', service: 'dashboard' },
  { label: { fr: 'Qualifier mes leads au téléphone', en: 'Qualify my leads by phone' }, icon: 'Phone', service: 'calling' },
  { label: { fr: 'Créer ma boutique en ligne', en: 'Build my online store' }, icon: 'ShoppingBag', service: 'web' },
  { label: { fr: 'Un agent IA qui gère mes tâches', en: 'An AI agent to handle my tasks' }, icon: 'Bot', service: 'agentic' },
  { label: { fr: 'Un site qui convertit mes visiteurs', en: 'A site that converts visitors' }, icon: 'Search', service: 'web' },
  { label: { fr: 'Par où commencer avec l’IA ?', en: 'Where do I start with AI?' }, icon: 'Zap', service: 'consultation' },
];

const VISIBLE = 4;

interface Turn {
  role: 'user' | 'assistant';
  text: string;
}

interface AIPromptBoxProps {
  /** Dark hero variant (frosted glass on a dark background) vs. the light default. */
  dark?: boolean;
}

const AIPromptBox: React.FC<AIPromptBoxProps> = ({ dark = false }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fr = language === 'fr';

  const [value, setValue] = useState('');
  const [service, setService] = useState('');
  const [offset, setOffset] = useState(0);

  const [thread, setThread] = useState<Turn[]>([]);
  const [sending, setSending] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState('');
  const [firstService, setFirstService] = useState('');

  const goToContact = (msg: string, svc: string) => {
    const params = new URLSearchParams({ message: msg });
    if (svc) params.set('service', svc);
    navigate(`/contact?${params.toString()}`);
  };

  const submit = async (text?: string, svc?: string) => {
    if (sending) return;
    const msg = (text ?? value).trim();
    if (!msg) return;

    const isFirst = thread.length === 0;
    const fp = isFirst ? msg : firstPrompt;
    const fs = isFirst ? svc ?? service : firstService;
    if (isFirst) {
      setFirstPrompt(msg);
      setFirstService(svc ?? service);
    }

    setThread((t) => [...t, { role: 'user', text: msg }]);
    setValue('');
    setService('');
    setSending(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, language }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = (await resp.json()) as { reply?: string };
      const reply = (data?.reply ?? '').trim();
      if (!reply) throw new Error('empty reply');
      setThread((t) => [...t, { role: 'assistant', text: reply }]);
      setSending(false);
    } catch {
      // Graceful fallback (endpoint unconfigured/erroring, or local dev with no
      // function): escalate straight to the contact form, prefilled.
      goToContact(fp, fs);
    }
  };

  const reset = () => {
    setThread([]);
    setValue('');
    setService('');
    setFirstPrompt('');
    setFirstService('');
    setSending(false);
  };

  const chips = Array.from({ length: VISIBLE }, (_, i) => PROMPTS[(offset + i) % PROMPTS.length]);
  const hasThread = thread.length > 0;
  const hasReply = thread.some((m) => m.role === 'assistant');

  const t = dark
    ? {
        box: 'bg-white/[0.06] border-white/15 focus-within:border-indigo-400/60',
        eyebrow: 'text-indigo-300',
        field: 'text-white placeholder-white/40',
        helper: 'text-white/50',
        chip: 'bg-white/[0.06] border-white/15 text-white/80 hover:border-indigo-400/50 hover:text-white hover:bg-white/10',
        chipIcon: 'text-indigo-300',
        refresh: 'bg-white/[0.06] border-white/15 text-white/60 hover:text-white hover:border-indigo-400/50',
        userBubble: 'bg-indigo-600 text-white',
        botBubble: 'bg-white/[0.08] border border-white/10 text-white/90',
        muted: 'text-white/50 hover:text-white',
      }
    : {
        box: 'bg-white/80 border-gray-200/90 focus-within:border-indigo-300',
        eyebrow: 'text-indigo-600',
        field: 'text-gray-900 placeholder-gray-400',
        helper: 'text-gray-500',
        chip: 'bg-white/70 border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/70',
        chipIcon: 'text-indigo-500',
        refresh: 'bg-white/70 border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300',
        userBubble: 'bg-indigo-600 text-white',
        botBubble: 'bg-gray-50 border border-gray-200 text-gray-800',
        muted: 'text-gray-500 hover:text-indigo-600',
      };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <div className={`relative rounded-2xl backdrop-blur-xl border shadow-lg transition-shadow duration-300 focus-within:shadow-xl ${t.box}`}>
          <div className={`flex items-center gap-2 px-5 pt-4 ${t.eyebrow}`}>
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">{fr ? COPY.eyebrow.fr : COPY.eyebrow.en}</span>
          </div>
          <textarea
            value={value}
            maxLength={1000}
            onChange={(e) => { setValue(e.target.value); setService(''); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={2}
            placeholder={fr ? COPY.placeholder.fr : COPY.placeholder.en}
            aria-label={fr ? COPY.placeholder.fr : COPY.placeholder.en}
            className={`w-full resize-none bg-transparent px-5 pt-2 pb-16 text-base focus:outline-none ${t.field}`}
          />
          <button
            type="submit"
            disabled={sending}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{fr ? COPY.button.fr : COPY.button.en}<ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </form>

      {/* Conversation thread (appears once the visitor sends something) */}
      {hasThread && (
        <div className="mt-4 space-y-3">
          {thread.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <p className={`max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm ${t.userBubble}`}>{m.text}</p>
              </div>
            ) : (
              <div key={i} className="flex justify-start">
                <p className={`max-w-[90%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm whitespace-pre-wrap ${t.botBubble}`}>{m.text}</p>
              </div>
            ),
          )}
          {sending && (
            <div className="flex justify-start">
              <div className={`rounded-2xl rounded-bl-md px-4 py-3 ${t.botBubble}`} aria-label="typing">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" />
                </span>
              </div>
            </div>
          )}

          {hasReply && !sending && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => goToContact(firstPrompt, firstService)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {fr ? COPY.cta.fr : COPY.cta.en}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button type="button" onClick={reset} className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${t.muted}`}>
                <RotateCcw className="w-3.5 h-3.5" />
                {fr ? COPY.reset.fr : COPY.reset.en}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Example-prompt chips (initial state only) */}
      {!hasThread && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {chips.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Sparkles;
            const label = fr ? p.label.fr : p.label.en;
            return (
              <button
                key={`${offset}-${i}`}
                type="button"
                onClick={() => submit(label, p.service)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 ${t.chip}`}
              >
                <Icon className={`w-3.5 h-3.5 ${t.chipIcon}`} />
                {label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setOffset((o) => (o + VISIBLE) % PROMPTS.length)}
            aria-label={fr ? 'Plus d’idées' : 'More ideas'}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 ${t.refresh}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <p className={`text-xs mt-3 ${t.helper}`}>{fr ? COPY.helper.fr : COPY.helper.en}</p>
    </div>
  );
};

export default AIPromptBox;
