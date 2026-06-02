import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Bot, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';
import { getAllPosts, getFeaturedPost, blogCategories } from '../data/blog';

const SITE_URL = 'https://www.step-upai.com';

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const allPosts = useMemo(() => getAllPosts(), []);
  const categoryKeys = useMemo(
    () => Array.from(new Set(allPosts.map((p) => p.category))).filter((k) => blogCategories[k]),
    [allPosts],
  );

  const isFiltering = searchTerm.trim() !== '' || selectedCat !== '';
  const matches = useMemo(
    () =>
      allPosts.filter((p) => {
        const okSearch =
          p.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
        const okCat = selectedCat === '' || p.category === selectedCat;
        return okSearch && okCat;
      }),
    [allPosts, language, searchTerm, selectedCat],
  );

  const heroPost = !isFiltering ? (getFeaturedPost() ?? allPosts[0]) : null;
  const gridPosts = heroPost ? matches.filter((p) => p.slug !== heroPost.slug) : matches;

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const pillCls = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700'
    }`;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t('seo.blog.title') || 'Step UpAI Blog',
    description: t('blog.subtitle'),
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Step UpAI',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    blogPost: allPosts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title[language],
      description: p.excerpt[language],
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Organization', name: 'Step UpAI' },
    })),
  };

  return (
    <>
      <SEO
        title="Blog — IA & Automatisation pour les entreprises | Step UpAI"
        description={t('blog.subtitle')}
        keywords="automatisation IA, blog IA, n8n, chatbot, PME Paris, Step UpAI"
        canonical="/blog"
        structuredData={blogSchema}
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('blog.header')}</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto">{t('blog.subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* Search + category pills */}
        <section className="py-6 bg-white border-b sticky top-16 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('blog.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              {categoryKeys.length > 1 && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button onClick={() => setSelectedCat('')} className={pillCls(selectedCat === '')}>
                    {t('common.view_all') || (language === 'fr' ? 'Tout' : 'All')}
                  </button>
                  {categoryKeys.map((key) => (
                    <button key={key} onClick={() => setSelectedCat(key)} className={pillCls(selectedCat === key)}>
                      {blogCategories[key][language]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured hero */}
        {heroPost && (
          <section className="pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Link
                  to={`/blog/${heroPost.slug}`}
                  className="group grid lg:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden bg-gradient-to-br ${heroPost.coverGradient}`}>
                    {heroPost.image && (
                      <img
                        src={heroPost.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {t('blog.featured') || (language === 'fr' ? 'À la une' : 'Featured')}
                    </span>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {blogCategories[heroPost.category] && (
                      <span className="text-indigo-600 font-semibold text-sm mb-3">{blogCategories[heroPost.category][language]}</span>
                    )}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                      {heroPost.title[language]}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{heroPost.excerpt[language]}</p>
                    <div className="flex items-center gap-5 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{fmtDate(heroPost.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{heroPost.readTime[language]}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                      {t('common.read_more') || (language === 'fr' ? "Lire l'article" : 'Read article')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Post grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {gridPosts.length === 0 && !heroPost ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">{t('blog.no_results')}</p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 gap-8 ${gridPosts.length <= 2 ? 'sm:grid-cols-2 max-w-4xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                {gridPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${post.coverGradient}`}>
                        {post.image && (
                          <img
                            src={post.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        {blogCategories[post.category] && (
                          <span className="text-indigo-600 font-semibold text-xs mb-2">{blogCategories[post.category][language]}</span>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {post.title[language]}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt[language]}</p>
                        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-2">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{fmtDate(post.date)}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime[language]}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Services & Internal Links */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'fr' ? "Nos Services d'Automatisation IA" : 'Our AI Automation Services'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Link to="/services" className="group p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <Bot className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {language === 'fr' ? 'Automatisation des Workflows' : 'Workflow Automation'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'fr'
                    ? 'n8n, Make.com, Zapier — automatisez vos processus métier'
                    : 'n8n, Make.com, Zapier — automate your business processes'}
                </p>
              </Link>
              <Link to="/services" className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <MessageSquare className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {language === 'fr' ? 'Chatbots IA Sur Mesure' : 'Custom AI Chatbots'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'fr'
                    ? 'Support client 24/7, qualification de leads automatique'
                    : '24/7 customer support, automatic lead qualification'}
                </p>
              </Link>
              <Link to="/contact" className="group p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <ArrowRight className="w-10 h-10 text-pink-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {language === 'fr' ? 'Consultation Gratuite' : 'Free Consultation'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'fr' ? "Discutons de votre projet d'automatisation IA" : "Let's discuss your AI automation project"}
                </p>
              </Link>
            </div>
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                {language === 'fr' ? 'Automatisation IA en Île-de-France' : 'AI Automation in Île-de-France'}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { to: '/automatisation-ia-paris', label: 'Paris' },
                  { to: '/automatisation-ia-boulogne-billancourt', label: 'Boulogne-Billancourt' },
                  { to: '/automatisation-ia-neuilly-sur-seine', label: 'Neuilly-sur-Seine' },
                  { to: '/automatisation-ia-versailles', label: 'Versailles' },
                  { to: '/automatisation-ia-nanterre', label: 'La Défense' },
                  { to: '/chatbot-ia-paris', label: 'Chatbot Paris' },
                  { to: '/developpement-web-paris', label: 'Dev Web Paris' },
                  { to: '/agents-ia-paris', label: 'Agents IA Paris' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('common.newsletter_title')}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">{t('common.newsletter_subtitle')}</p>
              <NewsletterSignup source="blog" />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
