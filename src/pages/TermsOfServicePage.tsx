import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using our website and services, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not access or use our services',
        'We reserve the right to modify these terms at any time with notice to users',
        'Continued use of our services after changes constitutes acceptance of new terms'
      ]
    },
    {
      icon: Shield,
      title: 'Services Description',
      content: [
        'Stepup AI provides AI automation services including workflow automation, chatbot development, and system integration',
        'We offer consulting, development, implementation, and support services',
        'Service specifications and deliverables are defined in individual project agreements',
        'We reserve the right to modify or discontinue services with reasonable notice'
      ]
    },
    {
      icon: Scale,
      title: 'User Responsibilities',
      content: [
        'You must provide accurate and complete information when using our services',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You agree not to use our services for any unlawful or prohibited activities',
        'You must comply with all applicable laws and regulations when using our services',
        'You are responsible for any content you provide or generate using our services'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Limitations and Disclaimers',
      content: [
        'Our services are provided "as is" without warranties of any kind',
        'We do not guarantee uninterrupted or error-free service operation',
        'We are not liable for indirect, incidental, or consequential damages',
        'Our total liability is limited to the amount paid for services in the preceding 12 months',
        'Some jurisdictions do not allow limitation of liability, so these limits may not apply to you'
      ]
    }
  ];

  const additionalTerms = [
    {
      title: 'Intellectual Property',
      content: 'All intellectual property rights in our services, including software, documentation, and methodologies, remain our property. You receive a limited license to use our services as specified in your agreement.'
    },
    {
      title: 'Confidentiality',
      content: 'We maintain strict confidentiality regarding your business information and data. Both parties agree to protect confidential information disclosed during the course of our business relationship.'
    },
    {
      title: 'Data Protection',
      content: 'We process your data in accordance with our Privacy Policy and applicable data protection laws. You retain ownership of your data, and we implement appropriate security measures to protect it.'
    },
    {
      title: 'Payment Terms',
      content: 'Payment terms are specified in individual project agreements. Generally, payments are due within 30 days of invoice date. Late payments may incur additional charges as permitted by law.'
    },
    {
      title: 'Termination',
      content: 'Either party may terminate services with appropriate notice as specified in the service agreement. Upon termination, you retain access to your data, and we will assist with data export as needed.'
    },
    {
      title: 'Governing Law',
      content: 'These terms are governed by the laws of California, United States. Any disputes will be resolved through binding arbitration in San Francisco, California, unless otherwise agreed.'
    }
  ];

  return (
    <>
      <SEO
        title="Terms of Service | Stepup AI"
        description="Read Stepup AI's Terms of Service to understand the terms and conditions for using our AI automation services and website."
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
                  Terms of
                </span>
                <br />
                <span className="text-gray-900">Service</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                These terms govern your use of our AI automation services and website. Please read them carefully.
              </p>
              <div className="text-sm text-gray-500">
                Last updated: January 15, 2024
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Agreement Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Stepup AI 
                regarding your use of our website, services, and any related applications or tools we provide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. 
                If you are using our services on behalf of an organization, you represent that you have the authority to 
                bind that organization to these Terms.
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
                <h2 className="text-3xl font-bold text-gray-900">Additional Terms</h2>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Level Agreement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response Times</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Critical issues: 4 hours</li>
                    <li>• High priority: 24 hours</li>
                    <li>• Normal priority: 48 hours</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Target uptime: 99.5%</li>
                    <li>• Planned maintenance windows</li>
                    <li>• Status page notifications</li>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dispute Resolution</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are committed to resolving any disputes amicably. If you have concerns about our services:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <span className="text-gray-600">Contact our support team to discuss the issue</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <span className="text-gray-600">We will work with you to find a mutually acceptable solution</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <span className="text-gray-600">If needed, disputes will be resolved through binding arbitration</span>
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
              <h3 className="text-2xl font-bold mb-6">Questions About These Terms?</h3>
              <p className="mb-6 opacity-90">
                If you have any questions about these Terms of Service or need clarification on any provisions, please contact us.
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