import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag, Edit, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  readTime: string;
}

const BlogPage: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Sample blog posts - in a real app, these would come from a CMS or API
  useEffect(() => {
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: t('blog.p1.title'),
        excerpt: t('blog.p1.excerpt'),
        content: 'Full content here...',
        author: t('blog.author'),
        date: '2024-01-15',
        tags: ['AI', 'Automation', 'Business'],
        featured: true,
        readTime: t('blog.p1.readtime')
      },
      {
        id: '2',
        title: t('blog.p2.title'),
        excerpt: t('blog.p2.excerpt'),
        content: 'Full content here...',
        author: t('blog.author'),
        date: '2024-01-10',
        tags: ['Chatbots', 'AI', 'Customer Service'],
        featured: false,
        readTime: t('blog.p2.readtime')
      },
      {
        id: '3',
        title: t('blog.p3.title'),
        excerpt: t('blog.p3.excerpt'),
        content: 'Full content here...',
        author: t('blog.author'),
        date: '2024-01-05',
        tags: ['n8n', 'Make.com', 'No-code', 'Comparison'],
        featured: false,
        readTime: t('blog.p3.readtime')
      },
      {
        id: '4',
        title: t('blog.p4.title'),
        excerpt: t('blog.p4.excerpt'),
        content: 'Full content here...',
        author: t('blog.author'),
        date: '2024-01-01',
        tags: ['VAPI', 'Voice AI', 'Integration'],
        featured: false,
        readTime: t('blog.p4.readtime')
      }
    ];
    setPosts(samplePosts);
  }, [t]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  return (
    <>
      <SEO
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        keywords={t('seo.blog.keywords')}
        canonical="/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": t('seo.blog.title'),
          "description": t('seo.blog.description'),
          "url": "https://step-upai.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Stepup AI",
            "url": "https://step-upai.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://step-upai.com/logo.png"
            }
          },
          "blogPost": posts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "author": { "@type": "Person", "name": post.author },
            "datePublished": post.date,
            "publisher": { "@type": "Organization", "name": "Stepup AI" }
          }))
        }}
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t('blog.header')}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                {t('blog.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('blog.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tag Filter */}
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
                {allTags.map(tag => (
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
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      post.featured ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className={`bg-gradient-to-r from-blue-500 to-cyan-500 ${post.featured ? 'h-64' : 'h-48'}`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t('blog.featured')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                        post.featured ? 'text-2xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                          <span>{t('common.read_more')}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('common.newsletter_title')}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t('common.newsletter_subtitle')}
              </p>
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