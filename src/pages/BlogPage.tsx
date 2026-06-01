import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag, Clock, Bot, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { getAllPosts, getAllTags } from '../data/blog';

const SITE_URL = 'https://step-upai.com';

const BlogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Localized view of the posts (single source of truth = src/data/blog.ts).
  const posts = useMemo(
    () =>
      getAllPosts().map((p) => ({
        slug: p.slug,
        title: p.title[language],
        excerpt: p.excerpt[language],
        author: p.author[language],
        date: p.date,
        tags: p.tags,
        featured: p.featured,
        readTime: p.readTime[language],
        gradient: p.coverGradient,
        image: p.image,
      })),
    [language],
  );

  const allTags = useMemo(() => getAllTags(), []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    blogPost: getAllPosts().map((p) => ({
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
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">{t('blog.subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('blog.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {allTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === '' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                    }`}
                  >
                    {t('common.view_all')}
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('blog.no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={post.featured ? 'md:col-span-2 lg:col-span-2' : ''}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block h-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className={`relative bg-gradient-to-r ${post.gradient} ${post.featured ? 'h-64' : 'h-48'}`}>
                        {post.image && (
                          <img
                            src={post.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20" />
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t('blog.featured')}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2
                          className={`font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 ${
                            post.featured ? 'text-2xl' : 'text-xl'
                          }`}
                        >
                          {post.title}
                        </h2>

                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:gap-2 transition-all duration-200">
                            <span>{t('common.read_more')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
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

            {/* Geo links for SEO */}
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
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('blog.email_placeholder')}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  {t('common.subscribe')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
