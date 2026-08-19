import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  Utensils,
  Phone,
  MessageSquare,
  LayoutDashboard,
  Zap,
  Mail,
  ShoppingCart,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { getSector, getOtherSectors, getSectorUrl } from '../data/sectorData';
import type { SectorSolution } from '../data/sectorData';

interface SectorPageProps {
  slug: string;
}

const iconMap: Record<SectorSolution['icon'], React.ComponentType<{ className?: string }>> = {
  reviews: Star,
  menu: Utensils,
  voice: Phone,
  chat: MessageSquare,
  dashboard: LayoutDashboard,
  workflow: Zap,
  mail: Mail,
  cart: ShoppingCart,
};

const SectorPage: React.FC<SectorPageProps> = ({ slug }) => {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sector = getSector(slug);

  if (!sector) return null;

  const fr = language === 'fr';
  const pick = (o: { fr: string; en: string }) => (fr ? o.fr : o.en);
  const url = getSectorUrl(sector.slug);
  const others = getOtherSectors(sector.slug);

  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pick(sector.name),
      serviceType: pick(sector.name),
      provider: {
        '@type': 'Organization',
        name: 'Step UpAI',
        url: 'https://www.stepupai.fr',
        telephone: '+33 6 98 22 95 33',
      },
      areaServed: { '@type': 'Country', name: 'France' },
      audience: { '@type': 'BusinessAudience', name: pick(sector.name) },
      description: pick(sector.seoDescription),
      url: `https://www.stepupai.fr${url}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: sector.faqs.map((f) => ({
        '@type': 'Question',
        name: pick(f.q),
        acceptedAnswer: { '@type': 'Answer', text: pick(f.a) },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: fr ? 'Accueil' : 'Home',
          item: 'https://www.stepupai.fr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: fr ? 'Solutions par secteur' : 'Solutions by sector',
          item: 'https://www.stepupai.fr/solutions',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: pick(sector.name),
          item: `https://www.stepupai.fr${url}`,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={pick(sector.seoTitle)}
        description={pick(sector.seoDescription)}
        keywords={sector.keywords.join(', ')}
        canonical={url}
        structuredData={structuredData}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-purple-200 mb-6"
            aria-label={fr ? "Fil d'ariane" : 'Breadcrumb'}
          >
            <Link to="/" className="hover:text-white transition-colors">
              {fr ? 'Accueil' : 'Home'}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{pick(sector.short)}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance"
          >
            {pick(sector.headline)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-purple-100 max-w-3xl leading-relaxed mb-8"
          >
            {pick(sector.subhead)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200"
            >
              {fr ? 'Parler de votre cas' : 'Discuss your case'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-purple-300 text-purple-100 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              {fr ? 'Voir nos réalisations' : 'See our work'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Pains ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-balance">
            {fr ? "Ce qui vous coûte du temps aujourd'hui" : 'What is costing you time today'}
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            {fr
              ? 'Des problèmes propres à votre métier, pas une liste générique de « défis de la transformation numérique ».'
              : 'Problems specific to your trade, not a generic list of "digital transformation challenges".'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {sector.pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed">{pick(p)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-balance">
            {fr ? 'Ce que nous mettons en place' : 'What we put in place'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {sector.solutions.map((s, i) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pick(s.title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{pick(s.body)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-balance">
            {fr ? 'Déjà déployé chez' : 'Already live at'}
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            {fr
              ? 'Des clients réels, nommés, dans ce secteur précis.'
              : 'Real, named clients in this exact sector.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {sector.proof.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-gray-900">{p.client}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{fr ? p.fr : p.en}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-medium text-sm transition-colors"
                  >
                    {p.url.replace(/^https?:\/\//, '')}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-balance">
            {fr ? 'Questions fréquentes' : 'Frequently asked questions'}
          </h2>

          <div className="space-y-4">
            {sector.faqs.map((f, i) => (
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
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">{pick(f.a)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other sectors ──────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {fr ? 'Autres secteurs' : 'Other sectors'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={getSectorUrl(o.slug)}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 hover:border-purple-300 hover:text-purple-700 transition-colors duration-200"
              >
                {fr ? o.short.fr : o.short.en}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-balance">
            {fr
              ? 'Parlons de votre situation, pas de la théorie.'
              : 'Let us talk about your situation, not the theory.'}
          </h2>
          <p className="text-purple-100 mb-8 leading-relaxed">
            {fr
              ? "Un échange de trente minutes suffit pour savoir si l'automatisation vaut le coup chez vous — et nous vous le dirons franchement si ce n'est pas le cas."
              : 'Thirty minutes is enough to know whether automation is worth it for you — and we will say plainly if it is not.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200"
          >
            {fr ? 'Nous contacter' : 'Get in touch'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SectorPage;
