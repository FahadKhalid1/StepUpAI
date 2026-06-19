import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Mail, Code, Zap, Database, Phone, Globe, ArrowRight, Check, ShoppingBag, Search, LayoutDashboard, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: Bot,
      title: t('services.item.workflow_title'),
      description: t('services.item.workflow_desc'),
      features: [t('services.feat.workflow1'), t('services.feat.workflow2'), t('services.feat.workflow3'), t('services.feat.workflow4')],
      technologies: ['n8n', 'Make.com', 'Zapier', 'REST APIs'],
      color: 'from-indigo-500 to-purple-500',
      image: '/images/service-automation.jpg'
    },
    {
      icon: Phone,
      title: t('services.item.calling_title'),
      description: t('services.item.calling_desc'),
      features: [t('services.feat.calling1'), t('services.feat.calling2'), t('services.feat.calling3'), t('services.feat.calling4')],
      technologies: ['VAPI', 'Telnyx', 'Airtable', 'n8n'],
      color: 'from-purple-500 to-pink-500',
      image: '/images/service-calling.jpg'
    },
    {
      icon: Mail,
      title: t('services.item.email_title'),
      description: t('services.item.email_desc'),
      features: [t('services.feat.email1'), t('services.feat.email2'), t('services.feat.email3'), t('services.feat.email4')],
      technologies: ['Mailchimp', 'SendGrid', 'HubSpot', 'Custom APIs'],
      color: 'from-pink-500 to-rose-500',
      image: '/images/service-email.jpg'
    },
    {
      icon: Code,
      title: t('services.item.web_title'),
      description: t('services.item.web_desc'),
      features: [t('services.feat.web1'), t('services.feat.web2'), t('services.feat.web3'), t('services.feat.web4')],
      technologies: ['React', 'Supabase', 'Node.js', 'TypeScript'],
      color: 'from-rose-500 to-orange-500',
      image: '/images/service-web.jpg'
    },
    {
      icon: MessageSquare,
      title: t('services.item.chatbot_title'),
      description: t('services.item.chatbot_desc'),
      features: [t('services.feat.chatbot1'), t('services.feat.chatbot2'), t('services.feat.chatbot3'), t('services.feat.chatbot4')],
      technologies: ['OpenAI', 'Dialogflow', 'Custom NLP', 'Webhooks'],
      color: 'from-orange-500 to-yellow-500',
      image: '/images/service-chatbot.jpg'
    },
    {
      icon: Zap,
      title: t('services.item.agentic_title'),
      description: t('services.item.agentic_desc'),
      features: [t('services.feat.agentic1'), t('services.feat.agentic2'), t('services.feat.agentic3'), t('services.feat.agentic4')],
      technologies: ['LangChain', 'AutoGPT', 'Custom Agents', 'Vector Databases'],
      color: 'from-yellow-500 to-green-500',
      image: '/images/service-agents.jpg'
    },
    {
      icon: ShoppingBag,
      title: t('services.item.ecommerce_title'),
      description: t('services.item.ecommerce_desc'),
      features: [t('services.feat.ecommerce1'), t('services.feat.ecommerce2'), t('services.feat.ecommerce3'), t('services.feat.ecommerce4')],
      technologies: ['Shopify', 'WooCommerce', 'Stripe', 'Klaviyo'],
      color: 'from-green-500 to-teal-500',
      image: '/images/service-ecommerce.jpg'
    },
    {
      icon: Search,
      title: t('services.item.seo_title'),
      description: t('services.item.seo_desc'),
      features: [t('services.feat.seo1'), t('services.feat.seo2'), t('services.feat.seo3'), t('services.feat.seo4')],
      technologies: ['Schema.org', 'Search Console', 'Structured Data', 'Ahrefs'],
      color: 'from-teal-500 to-cyan-500',
      image: '/images/service-seo.jpg'
    },
    {
      icon: LayoutDashboard,
      title: t('services.item.dashboard_title'),
      description: t('services.item.dashboard_desc'),
      features: [t('services.feat.dashboard1'), t('services.feat.dashboard2'), t('services.feat.dashboard3'), t('services.feat.dashboard4')],
      technologies: ['React', 'Supabase', 'Recharts', 'PostgreSQL'],
      color: 'from-blue-500 to-indigo-500',
      image: '/images/service-dashboard.svg'
    }
  ];

  const process = [
    {
      step: '01',
      title: t('services.process.step1_title'),
      description: t('services.process.step1_desc'),
      icon: Database
    },
    {
      step: '02',
      title: t('services.process.step2_title'),
      description: t('services.process.step2_desc'),
      icon: Globe
    },
    {
      step: '03',
      title: t('services.process.step3_title'),
      description: t('services.process.step3_desc'),
      icon: Code
    },
    {
      step: '04',
      title: t('services.process.step4_title'),
      description: t('services.process.step4_desc'),
      icon: Zap
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        keywords={t('seo.services.keywords')}
        canonical="/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": t('seo.services.title'),
          "description": t('seo.services.description'),
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Service",
                "name": "AI Workflow Automation",
                "description": "Custom n8n and Make.com workflow automation for business processes",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Service",
                "name": "AI Cold Calling",
                "description": "VAPI-powered AI calling systems for sales and outreach",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Service",
                "name": "AI Email Marketing",
                "description": "Intelligent email automation and campaign management",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Service",
                "name": "Web Development",
                "description": "Modern React, Supabase, and Node.js web applications",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "Service",
                "name": "AI Chatbots",
                "description": "Custom AI chatbots for customer service and engagement",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 6,
              "item": {
                "@type": "Service",
                "name": "AI Agents",
                "description": "Autonomous AI agents for complex business task automation",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 7,
              "item": {
                "@type": "Service",
                "name": "E-commerce Store Management",
                "description": "End-to-end Shopify and WooCommerce store setup, management, and order fulfillment automation",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 8,
              "item": {
                "@type": "Service",
                "name": "SEO, AEO & GEO Optimization",
                "description": "Search engine, answer engine, and generative AI optimization to maximize online and AI-driven visibility",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            },
            {
              "@type": "ListItem",
              "position": 9,
              "item": {
                "@type": "Service",
                "name": "Custom Dashboard Creation",
                "description": "Custom analytics and admin dashboards that turn business data into real-time KPIs, clear visualizations, and decisions you can act on",
                "provider": { "@type": "Organization", "name": "Step UpAI" },
                "areaServed": { "@type": "Place", "name": "Île-de-France, France" }
              }
            }
          ]
        }}
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
                <span className="text-gray-900">{t('services.that_transform')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('services.subtitle')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Creation — featured showcase (new flagship offering) */}
        <section className="pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-5">
                  <Sparkles className="w-4 h-4" /> {t('services.dashboard.badge')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {t('services.dashboard.headline')}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('services.dashboard.sub')}
                </p>
                <ul className="space-y-3 mb-8">
                  {[t('services.dashboard.out1'), t('services.dashboard.out2'), t('services.dashboard.out3')].map((outcome, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-green-600" />
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('services.dashboard.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-3xl" aria-hidden="true"></div>
                <img
                  src="/images/dashboard-showcase.svg"
                  alt={t('services.item.dashboard_title')}
                  className="relative w-full rounded-2xl shadow-2xl ring-1 ring-gray-200"
                  width={840}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
              </div>
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
                      width={600}
                      height={400}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.key_features')}</h4>
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.technologies')}</h4>
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
                      {t('common.learn_more')}
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('services.process_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.process_subtitle')}
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

        {/* Geo SEO Links - Île-de-France */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos Services en Île-de-France
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nous accompagnons les entreprises dans toute la région parisienne avec nos solutions d'automatisation IA.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { city: 'Paris', links: [
                  { to: '/automatisation-ia-paris', label: 'Automatisation IA à Paris' },
                  { to: '/chatbot-ia-paris', label: 'Chatbot IA à Paris' },
                  { to: '/developpement-web-paris', label: 'Développement Web à Paris' },
                ]},
                { city: 'La Défense', links: [
                  { to: '/automatisation-ia-nanterre', label: 'Automatisation IA à La Défense' },
                  { to: '/agents-ia-nanterre', label: 'Agents IA à La Défense' },
                  { to: '/developpement-web-nanterre', label: 'Développement Web à La Défense' },
                ]},
                { city: 'Boulogne-Billancourt', links: [
                  { to: '/automatisation-ia-boulogne-billancourt', label: 'Automatisation IA à Boulogne' },
                  { to: '/email-marketing-ia-boulogne-billancourt', label: 'Email Marketing IA à Boulogne' },
                  { to: '/chatbot-ia-boulogne-billancourt', label: 'Chatbot IA à Boulogne' },
                ]},
                { city: 'Neuilly-sur-Seine', links: [
                  { to: '/automatisation-ia-neuilly-sur-seine', label: 'Automatisation IA à Neuilly' },
                  { to: '/appels-ia-neuilly-sur-seine', label: 'Appels IA à Neuilly' },
                  { to: '/developpement-web-neuilly-sur-seine', label: 'Développement Web à Neuilly' },
                ]},
                { city: 'Issy-les-Moulineaux', links: [
                  { to: '/automatisation-ia-issy-les-moulineaux', label: 'Automatisation IA à Issy' },
                  { to: '/chatbot-ia-issy-les-moulineaux', label: 'Chatbot IA à Issy' },
                  { to: '/agents-ia-issy-les-moulineaux', label: 'Agents IA à Issy' },
                ]},
                { city: 'Versailles', links: [
                  { to: '/automatisation-ia-versailles', label: 'Automatisation IA à Versailles' },
                  { to: '/developpement-web-versailles', label: 'Développement Web à Versailles' },
                  { to: '/email-marketing-ia-versailles', label: 'Email Marketing IA à Versailles' },
                ]},
              ].map((group, index) => (
                <motion.div
                  key={group.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{group.city}</h3>
                  <ul className="space-y-2">
                    {group.links.map(link => (
                      <li key={link.to}>
                        <Link to={link.to} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                          → {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
                {t('services.ready_automate')}
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {t('services.ready_automate_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t('common.start_project')}
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  {t('common.view_case_studies')}
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