import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const TermsOfServicePage: React.FC = () => {
  const { t } = useLanguage();
  const sections = [
    {
      icon: CheckCircle,
      title: t('terms.s1.title'),
      content: [
        t('terms.s1.c1'),
        t('terms.s1.c2'),
        t('terms.s1.c3'),
        t('terms.s1.c4')
      ]
    },
    {
      icon: Shield,
      title: t('terms.s2.title'),
      content: [
        t('terms.s2.c1'),
        t('terms.s2.c2'),
        t('terms.s2.c3'),
        t('terms.s2.c4')
      ]
    },
    {
      icon: Scale,
      title: t('terms.s3.title'),
      content: [
        t('terms.s3.c1'),
        t('terms.s3.c2'),
        t('terms.s3.c3'),
        t('terms.s3.c4'),
        t('terms.s3.c5')
      ]
    },
    {
      icon: AlertTriangle,
      title: t('terms.s4.title'),
      content: [
        t('terms.s4.c1'),
        t('terms.s4.c2'),
        t('terms.s4.c3'),
        t('terms.s4.c4'),
        t('terms.s4.c5')
      ]
    }
  ];

  const additionalTerms = [
    {
      title: t('terms.a1.title'),
      content: t('terms.a1.content')
    },
    {
      title: t('terms.a2.title'),
      content: t('terms.a2.content')
    },
    {
      title: t('terms.a3.title'),
      content: t('terms.a3.content')
    },
    {
      title: t('terms.a4.title'),
      content: t('terms.a4.content')
    },
    {
      title: t('terms.a5.title'),
      content: t('terms.a5.content')
    },
    {
      title: t('terms.a6.title'),
      content: t('terms.a6.content')
    }
  ];

  return (
    <>
      <SEO
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        canonical="/terms"
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
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('terms.title1')}
                </span>
                <br />
                <span className="text-gray-900">{t('terms.title2')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('terms.intro')}
              </p>
              <div className="text-sm text-gray-500">
                {t('terms.date')}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('terms.overview_title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.overview_p1')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('terms.overview_p2')}
              </p>
            </motion.div>

            {/* Main Terms Sections */}
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

            {/* Additional Terms */}
            <div className="mt-12 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900">{t('terms.add_title')}</h2>
              </motion.div>

              {additionalTerms.map((term, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{term.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{term.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Service Level Agreement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-12"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('terms.sla_title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('terms.response_title')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>{t('terms.response1')}</li>
                    <li>{t('terms.response2')}</li>
                    <li>{t('terms.response3')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('terms.availability_title')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>{t('terms.availability1')}</li>
                    <li>{t('terms.availability2')}</li>
                    <li>{t('terms.availability3')}</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg mt-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('terms.dispute_title')}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t('terms.dispute_desc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <span className="text-gray-600">{t('terms.d1')}</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <span className="text-gray-600">{t('terms.d2')}</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <span className="text-gray-600">{t('terms.d3')}</span>
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
              <h3 className="text-2xl font-bold mb-6">{t('terms.questions_title')}</h3>
              <p className="mb-6 opacity-90">
                {t('terms.questions_desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>legal@step-upai.com</span>
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

export default TermsOfServicePage;