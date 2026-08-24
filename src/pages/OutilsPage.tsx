import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, FileText, Search, Calculator, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { outils, outilsHub } from '../data/outilsData';
import type { ToolMeta } from '../data/outilsData';

const iconMap: Record<ToolMeta['icon'], React.ComponentType<{ className?: string }>> = {
  reviews: Star,
  invoice: FileText,
  search: Search,
  calculator: Calculator,
};

const OutilsPage: React.FC = () => {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const pick = (o: { fr: string; en: string }) => (fr ? o.fr : o.en);

  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pick(outilsHub.seoTitle),
      description: pick(outilsHub.seoDescription),
      url: 'https://www.stepupai.fr/outils',
      isPartOf: { '@id': 'https://www.stepupai.fr/#website' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: fr ? 'Accueil' : 'Home', item: 'https://www.stepupai.fr' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.stepupai.fr/outils' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={pick(outilsHub.seoTitle)}
        description={pick(outilsHub.seoDescription)}
        keywords={outilsHub.keywords.join(', ')}
        canonical="/outils"
        structuredData={structuredData}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance"
          >
            {pick(outilsHub.headline)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-purple-100 max-w-3xl leading-relaxed"
          >
            {pick(outilsHub.subhead)}
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {outils.map((tool, i) => {
              const Icon = iconMap[tool.icon];
              const live = tool.status === 'live';
              const card = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {!live && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                        {pick(outilsHub.soonLabel)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{pick(tool.name)}</h2>
                  <p className="text-gray-600 leading-relaxed">{pick(tool.tagline)}</p>
                  {live && (
                    <span className="inline-flex items-center gap-1.5 text-purple-700 font-medium mt-4">
                      {pick(outilsHub.openLabel)}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </>
              );

              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  {live ? (
                    <Link
                      to={`/outils/${tool.slug}`}
                      className="block h-full bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className="h-full bg-gray-50 rounded-xl p-6 border border-gray-200 opacity-80">{card}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">
            {fr ? 'Un outil vous manque ?' : 'Missing a tool?'}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {fr
              ? "Nous construisons ces outils à partir de ce que nos clients nous demandent réellement. Si une tâche vous coûte du temps chaque semaine, dites-le-nous — c'est peut-être le prochain."
              : 'We build these from what clients actually ask for. If a task costs you time every week, tell us — it might be the next one.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200"
          >
            {fr ? 'Nous en parler' : 'Tell us about it'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OutilsPage;
