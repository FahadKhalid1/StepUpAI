import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();
  const sections = [
    {
      icon: Eye,
      title: t('privacy.s1.title'),
      content: [
        t('privacy.s1.c1'),
        t('privacy.s1.c2'),
        t('privacy.s1.c3'),
        t('privacy.s1.c4')
      ]
    },
    {
      icon: Database,
      title: t('privacy.s2.title'),
      content: [
        t('privacy.s2.c1'),
        t('privacy.s2.c2'),
        t('privacy.s2.c3'),
        t('privacy.s2.c4'),
        t('privacy.s2.c5')
      ]
    },
    {
      icon: Lock,
      title: t('privacy.s3.title'),
      content: [
        t('privacy.s3.c1'),
        t('privacy.s3.c2'),
        t('privacy.s3.c3'),
        t('privacy.s3.c4'),
        t('privacy.s3.c5')
      ]
    },
    {
      icon: Shield,
      title: t('privacy.s4.title'),
      content: [
        t('privacy.s4.c1'),
        t('privacy.s4.c2'),
        t('privacy.s4.c3'),
        t('privacy.s4.c4'),
        t('privacy.s4.c5'),
        t('privacy.s4.c6')
      ]
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.privacy.title')}
        description={t('seo.privacy.description')}
        canonical="/privacy"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('privacy.title1')}
                </span>
                <br />
                <span className="text-gray-900">{t('privacy.title2')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('privacy.intro')}
              </p>
              <div className="text-sm text-gray-500">
                {t('privacy.date')}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('privacy.commitment_title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.commitment_p1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('privacy.commitment_p2')}
              </p>
            </motion.div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-4">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Cookies Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('privacy.cookies_title')}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.cookies_desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('privacy.essential_title')}</h4>
                  <p className="text-sm text-gray-600">{t('privacy.essential_desc')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('privacy.analytics_title')}</h4>
                  <p className="text-sm text-gray-600">{t('privacy.analytics_desc')}</p>
                </div>
              </div>
            </motion.div>

            {/* Third-Party Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('privacy.third_party_title')}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('privacy.third_party_desc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">{t('privacy.tp1')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">{t('privacy.tp2')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">{t('privacy.tp3')}</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-lg mt-8"
            >
              <h3 className="text-2xl font-bold mb-6">{t('privacy.questions_title')}</h3>
              <p className="mb-6 opacity-90">
                {t('privacy.questions_desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>privacy@step-upai.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+33 6 98 22 95 33</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;