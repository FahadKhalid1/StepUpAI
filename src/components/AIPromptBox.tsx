import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
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

const AIPromptBox: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const fr = language === 'fr';

  const [value, setValue] = useState('');
  const [service, setService] = useState('');
  const [offset, setOffset] = useState(0);

  const go = (text?: string, svc?: string) => {
    const msg = (text ?? value).trim();
    if (!msg) return;
    const params = new URLSearchParams({ message: msg });
    const s = svc ?? service;
    if (s) params.set('service', s);
    navigate(`/contact?${params.toString()}`);
  };

  const chips = Array.from({ length: VISIBLE }, (_, i) => PROMPTS[(offset + i) % PROMPTS.length]);

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={(e) => { e.preventDefault(); go(); }}>
        <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/90 shadow-lg transition-shadow duration-300 focus-within:shadow-xl focus-within:border-indigo-300">
          <div className="flex items-center gap-2 px-5 pt-4 text-indigo-600">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">{fr ? COPY.eyebrow.fr : COPY.eyebrow.en}</span>
          </div>
          <textarea
            value={value}
            onChange={(e) => { setValue(e.target.value); setService(''); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                go();
              }
            }}
            rows={2}
            placeholder={fr ? COPY.placeholder.fr : COPY.placeholder.en}
            aria-label={fr ? COPY.placeholder.fr : COPY.placeholder.en}
            className="w-full resize-none bg-transparent px-5 pt-2 pb-16 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {fr ? COPY.button.fr : COPY.button.en}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {chips.map((p, i) => {
          const Icon = ICONS[p.icon] ?? Sparkles;
          const label = fr ? p.label.fr : p.label.en;
          return (
            <button
              key={`${offset}-${i}`}
              type="button"
              onClick={() => { setValue(label); setService(p.service); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-gray-200 text-sm text-gray-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/70 transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5 text-indigo-500" />
              {label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setOffset((o) => (o + VISIBLE) % PROMPTS.length)}
          aria-label={fr ? 'Plus d’idées' : 'More ideas'}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">{fr ? COPY.helper.fr : COPY.helper.en}</p>
    </div>
  );
};

export default AIPromptBox;
