import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { sectors, getSectorUrl } from '../data/sectorData';

/**
 * /solutions — the hub the sector pages already pointed at.
 *
 * Every sector page emits a BreadcrumbList whose second item is
 * https://www.stepupai.fr/solutions. That URL had no route, so Vercel served
 * the SPA shell: a 200 with the generic homepage title. Google indexed it as a
 * soft 404 (2 impressions by 2026-08-24). This page makes the breadcrumb honest.
 */
const SolutionsPage: React.FC = () => {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const pick = (o: { fr: string; en: string }) => (fr ? o.fr : o.en);

  const title = fr
    ? "Solutions IA par secteur d'activité — restaurants, écoles, e-commerce, commerce local | Step UpAI"
    : 'AI solutions by sector — restaurants, schools, e-commerce, local retail | Step UpAI';
  const description = fr
    ? "Nos automatisations IA par métier : restaurants, écoles et organismes de formation, e-commerce, commerce local. Des cas concrets, des clients nommés, en Île-de-France."
    : 'Our AI automations by trade: restaurants, schools and training providers, e-commerce, local retail. Real cases, named clients, around Paris.';

  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: 'https://www.stepupai.fr/solutions',
      isPartOf: { '@id': 'https://www.stepupai.fr/#website' },
      hasPart: sectors.map((s) => ({
        '@type': 'WebPage',
        name: pick(s.name),
        url: `https://www.stepupai.fr${getSectorUrl(s.slug)}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: fr ? 'Accueil' : 'Home', item: 'https://www.stepupai.fr' },
        {
          '@type': 'ListItem',
          position: 2,
          name: fr ? 'Solutions par secteur' : 'Solutions by sector',
          item: 'https://www.stepupai.fr/solutions',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={title}
        description={description}
        keywords={sectors.flatMap((s) => s.keywords).slice(0, 14).join(', ')}
        canonical="/solutions"
        structuredData={structuredData}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-6" aria-label={fr ? "Fil d'ariane" : 'Breadcrumb'}>
            <Link to="/" className="hover:text-white transition-colors">{fr ? 'Accueil' : 'Home'}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{fr ? 'Solutions par secteur' : 'Solutions by sector'}</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance"
          >
            {fr ? 'Ce que nous automatisons, métier par métier.' : 'What we automate, trade by trade.'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-purple-100 max-w-3xl leading-relaxed"
          >
            {fr
              ? "Un restaurant et une école de langues n'ont pas les mêmes urgences. Voici les quatre secteurs où nous avons livré, avec les clients que nous pouvons nommer."
              : 'A restaurant and a language school do not have the same urgencies. Here are the four sectors where we have delivered, with the clients we can name.'}
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {sectors.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={getSectorUrl(s.slug)}
                  className="flex h-full flex-col bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{pick(s.name)}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{pick(s.subhead)}</p>

                  <ul className="space-y-1.5 mb-5">
                    {s.proof.slice(0, 3).map((pr) => (
                      <li key={pr.client} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" aria-hidden="true" />
                        {pr.client}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-purple-700 font-medium">
                    {fr ? 'Voir le détail' : 'See the detail'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">
            {fr ? "Votre métier n'est pas dans la liste ?" : 'Your trade is not on the list?'}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {fr
              ? "Nous ne créons une page que lorsque nous avons livré pour ce secteur et que nous pouvons nommer le client. Cela ne veut pas dire que nous ne pouvons pas vous aider — dites-nous ce qui vous coûte du temps."
              : 'We only create a page once we have delivered in that sector and can name the client. That does not mean we cannot help you — tell us what is costing you time.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200"
          >
            {fr ? 'Parler de votre cas' : 'Discuss your case'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
