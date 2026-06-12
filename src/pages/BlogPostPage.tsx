import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { getPostBySlug, getRelatedPosts, blogCategories, categoryToService } from '../data/blog';
import { shortTitle, trimDesc } from '../utils/seo';

const SITE_URL = 'https://www.step-upai.com';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const post = slug ? getPostBySlug(slug) : undefined;

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Article introuvable' : 'Article not found'}
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug, 2);
  const category = blogCategories[post.category];
  const service = categoryToService[post.category];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // ── Light-markdown renderer ─────────────────────────────────────────────────
  const linkClass =
    'text-indigo-600 font-medium underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700 transition-colors';

  const renderInline = (text: string, keyPrefix: string) =>
    // Split on **bold** and [label](url) so both can appear mid-sentence.
    text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
      const k = `${keyPrefix}-${i}`;
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={k} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return <em key={k}>{part.slice(1, -1)}</em>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        return href.startsWith('/') ? (
          <Link key={k} to={href} className={linkClass}>
            {label}
          </Link>
        ) : (
          <a key={k} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>
        );
      }
      return <React.Fragment key={k}>{part}</React.Fragment>;
    });

  const renderContent = (text: string) =>
    text.split('\n\n').map((block, i) => {
      const key = `block-${i}`;
      // Raw HTML / inline SVG passthrough (diagrams, figures from the pipeline)
      if (block.trimStart().startsWith('<')) {
        return <div key={key} className="my-8" dangerouslySetInnerHTML={{ __html: block }} />;
      }
      // Inline image: ![alt](src)
      const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (imgMatch) {
        return (
          <figure key={key} className="my-8">
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              loading="lazy"
              className="w-full rounded-xl shadow-sm"
            />
          </figure>
        );
      }
      if (block.startsWith('### ')) {
        return (
          <h3 key={key} className="text-xl font-bold text-gray-900 mt-8 mb-3">
            {block.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (block.startsWith('## ')) {
        return (
          <h2 key={key} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            {block.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (block.split('\n').every((line) => line.startsWith('- '))) {
        return (
          <ul key={key} className="space-y-2 my-5">
            {block.split('\n').map((line, j) => (
              <li key={`${key}-${j}`} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span>{renderInline(line.replace(/^-\s+/, ''), `${key}-${j}`)}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={key} className="text-gray-700 leading-relaxed mb-5">
          {renderInline(block, key)}
        </p>
      );
    });

  // ── Structured data: BlogPosting + (optional) FAQPage ───────────────────────
  const structuredData: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title[language],
      image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/og-image.jpg`,
      description: post.excerpt[language],
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'Step UpAI', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'Step UpAI',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
      inLanguage: language === 'fr' ? 'fr-FR' : 'en-US',
      keywords: post.tags.join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title[language], item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ];

  if (post.faq && post.faq.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q[language],
        acceptedAnswer: { '@type': 'Answer', text: f.a[language] },
      })),
    });
  }

  return (
    <>
      <SEO
        title={`${shortTitle(post.title[language])} | Step UpAI`}
        description={trimDesc(post.excerpt[language])}
        keywords={post.tags.join(', ')}
        ogType="article"
        ogImage={post.image ? `${SITE_URL}${post.image}` : undefined}
        canonical={`/blog/${post.slug}`}
        structuredData={structuredData}
      />

      <article className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <header className={`bg-gradient-to-r ${post.coverGradient} text-white`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour au blog' : 'Back to blog'}
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {category && (
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  {category[language]}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title[language]}</h1>
              <div className="flex flex-wrap items-center gap-5 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author[language]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime[language]}
                </span>
              </div>
            </motion.div>
          </div>
        </header>

        {post.image && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
            <img
              src={post.image}
              alt={post.title[language]}
              loading="lazy"
              className="w-full aspect-video object-cover rounded-2xl shadow-xl"
            />
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6 md:p-10"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100">
              {post.excerpt[language]}
            </p>

            <div className="text-base">{renderContent(post.content[language])}</div>

            {/* Related service (topical cluster: blog → service landing page) */}
            {service && (
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
                <p className="text-gray-700">
                  {language === 'fr'
                    ? `Step UpAI déploie ${service.label.fr} pour les PME à Paris et en Île-de-France.`
                    : `Step UpAI delivers ${service.label.en} for SMBs in Paris and the Île-de-France region.`}
                </p>
                <Link
                  to={`/${service.slug}-paris`}
                  className="inline-flex items-center gap-1 whitespace-nowrap text-indigo-600 font-semibold hover:text-indigo-700"
                >
                  {language === 'fr' ? 'Découvrir le service' : 'Explore the service'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* FAQ */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}
                </h2>
                <div className="space-y-4">
                  {post.faq.map((f, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-semibold text-gray-900 mb-2">{f.q[language]}</h3>
                      <p className="text-gray-700 leading-relaxed">{f.a[language]}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {language === 'fr' ? 'Prêt à automatiser votre entreprise ?' : 'Ready to automate your business?'}
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              {language === 'fr'
                ? 'Discutons de votre projet — la première consultation est gratuite.'
                : "Let's discuss your project — the first consultation is free."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('common.contact_us')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? 'Articles similaires' : 'Related articles'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`h-32 bg-gradient-to-r ${r.coverGradient}`} />
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {r.title[language]}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">{r.readTime[language]}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
