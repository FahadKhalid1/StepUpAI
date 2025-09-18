import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Mail, Code, Zap, Database, Phone, Globe, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: Bot,
      title: 'AI Workflow Automation',
      description: 'Streamline your business processes with intelligent automation using industry-leading platforms.',
      features: ['n8n Workflow Design', 'Make.com Integration', 'Zapier Automation', 'Custom API Connections'],
      technologies: ['n8n', 'Make.com', 'Zapier', 'REST APIs'],
      color: 'from-indigo-500 to-purple-500',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    },
    {
      icon: Phone,
      title: 'AI Cold Calling Systems',
      description: 'Revolutionary voice AI systems that handle outbound calls with human-like conversations.',
      features: ['VAPI Voice Integration', 'Telnyx Phone Services', 'Airtable CRM Sync', 'Call Analytics'],
      technologies: ['VAPI', 'Telnyx', 'Airtable', 'n8n'],
      color: 'from-purple-500 to-pink-500',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg'
    },
    {
      icon: Mail,
      title: 'Email Marketing Automation',
      description: 'Intelligent email campaigns that nurture leads and convert prospects automatically.',
      features: ['Automated Sequences', 'Lead Scoring', 'Personalization', 'Performance Analytics'],
      technologies: ['Mailchimp', 'SendGrid', 'HubSpot', 'Custom APIs'],
      color: 'from-pink-500 to-rose-500',
      image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg'
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern, scalable web applications built with cutting-edge technologies.',
      features: ['React Applications', 'Supabase Backend', 'Node.js APIs', 'Responsive Design'],
      technologies: ['React', 'Supabase', 'Node.js', 'TypeScript'],
      color: 'from-rose-500 to-orange-500',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg'
    },
    {
      icon: MessageSquare,
      title: 'Custom AI Chatbots',
      description: 'Intelligent conversational interfaces that understand and assist your customers 24/7.',
      features: ['Natural Language Processing', 'Multi-platform Integration', 'Learning Capabilities', 'Analytics Dashboard'],
      technologies: ['OpenAI', 'Dialogflow', 'Custom NLP', 'Webhooks'],
      color: 'from-orange-500 to-yellow-500',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
    },
    {
      icon: Zap,
      title: 'AI Agentic Systems',
      description: 'Autonomous AI agents that can perform complex tasks and make decisions independently.',
      features: ['Task Automation', 'Decision Making', 'Multi-step Workflows', 'Learning & Adaptation'],
      technologies: ['LangChain', 'AutoGPT', 'Custom Agents', 'Vector Databases'],
      color: 'from-yellow-500 to-green-500',
      image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We analyze your current processes and identify automation opportunities.',
      icon: Database
    },
    {
      step: '02',
      title: 'Strategy & Planning',
      description: 'Develop a comprehensive automation strategy tailored to your business.',
      icon: Globe
    },
    {
      step: '03',
      title: 'Development & Integration',
      description: 'Build and integrate AI solutions with your existing systems.',
      icon: Code
    },
    {
      step: '04',
      title: 'Testing & Optimization',
      description: 'Rigorous testing and continuous optimization for peak performance.',
      icon: Zap
    }
  ];

  return (
    <>
      <SEO
        title="AI Automation Services - Workflow, Chatbots & More | Stepup AI"
        description="Comprehensive AI automation services including n8n workflows, VAPI cold calling, email marketing, web development, and custom AI solutions for businesses."
        canonical="/services"
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
                  {t('nav.services')}
                </span>
                <br />
                <span className="text-gray-900">That Transform</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('services.subtitle')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 bg-gradient-to-r ${service.color} rounded-2xl`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A proven methodology that ensures successful AI implementation and maximum ROI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
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
                Ready to Automate Your Business?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Let's discuss how our AI solutions can transform your operations and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;