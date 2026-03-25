import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'School AI Administration Assistant',
      description: 'Comprehensive AI assistant for educational institutions managing student data, scheduling, and administrative tasks with natural language processing.',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg',
      category: 'AI Assistant',
      technologies: ['OpenAI', 'NLP', 'Database Management', 'React'],
      features: ['Student Data Management', 'Automated Scheduling', 'Report Generation', 'Multi-language Support'],
      results: ['60% reduction in admin time', '95% accuracy in data processing', '40+ schools implemented'],
      demoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 2,
      title: 'LinkedIn Automation System',
      description: 'Advanced automation system for LinkedIn posting and lead capture built with n8n workflows and Airtable integration.',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg',
      category: 'Marketing Automation',
      technologies: ['n8n', 'LinkedIn API', 'Airtable', 'Webhooks'],
      features: ['Automated Post Scheduling', 'Lead Capture & Scoring', 'CRM Integration', 'Analytics Dashboard'],
      results: ['300% increase in leads', '80% time savings', '50+ companies using'],
      demoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 3,
      title: 'VAPI Cold Calling System',
      description: 'Revolutionary AI-powered cold calling system using VAPI and Telnyx for human-like conversations and automated lead qualification.',
      image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg',
      category: 'Voice AI',
      technologies: ['VAPI', 'Telnyx', 'Airtable', 'n8n'],
      features: ['Human-like Conversations', 'Lead Qualification', 'CRM Integration', 'Call Analytics'],
      results: ['85% conversation completion', '45% lead qualification rate', '200+ calls per day'],
      demoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 4,
      title: 'Enterprise Workflow Automation',
      description: 'Complete business process automation suite integrating multiple tools and APIs for seamless operations.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      category: 'Workflow Automation',
      technologies: ['Make.com', 'Multiple APIs', 'Webhooks', 'Cloud Integration'],
      features: ['Multi-platform Integration', 'Custom Workflows', 'Real-time Monitoring', 'Scalable Architecture'],
      results: ['70% process efficiency gain', '90% error reduction', '25+ integrated systems'],
      demoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 5,
      title: 'E-commerce AI Chatbot',
      description: 'Intelligent customer service chatbot for e-commerce platforms with product recommendations and order management.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      category: 'AI Assistant',
      technologies: ['Dialogflow', 'React', 'Supabase', 'Stripe API'],
      features: ['Product Recommendations', 'Order Tracking', '24/7 Support', 'Multi-language'],
      results: ['40% reduction in support tickets', '25% increase in sales', '95% customer satisfaction'],
      demoUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 6,
      title: 'Email Marketing Automation Platform',
      description: 'Comprehensive email marketing automation with AI-powered personalization and advanced analytics.',
      image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg',
      category: 'Marketing Automation',
      technologies: ['SendGrid', 'React', 'Node.js', 'Machine Learning'],
      features: ['AI Personalization', 'A/B Testing', 'Advanced Analytics', 'Automated Sequences'],
      results: ['55% open rate improvement', '35% conversion increase', '100+ campaigns managed'],
      demoUrl: '#',
      caseStudyUrl: '#'
    }
  ];

  const categories = ['All', 'AI Assistant', 'Marketing Automation', 'Voice AI', 'Workflow Automation'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="AI Automation Projects & Case Studies | Stepup AI"
        description="Explore our successful AI automation projects including school administration systems, LinkedIn automation, VAPI cold calling, and enterprise workflows."
        canonical="/projects"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                 {t('projects.title')}
                </span>
                <br />
               <span className="text-gray-900">{t('projects.success_stories')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
               {t('projects.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white/70 backdrop-blur-sm border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('projects.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-500" />
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('projects.no_results')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-indigo-600/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('projects.tech_used')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('projects.key_features')}</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {project.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('projects.results')}</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {project.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t('projects.view_demo')}
                        </button>
                        <button className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {t('projects.case_study')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('projects.ready_start')}
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {t('projects.ready_start_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t('common.start_project')}
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  {t('projects.view_services')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;