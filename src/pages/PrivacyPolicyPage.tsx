import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when contacting us (name, email, phone number)',
        'Technical information about your device and browser when visiting our website',
        'Usage data about how you interact with our services',
        'Communication records when you contact our support team'
      ]
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our AI automation services',
        'To communicate with you about your projects and inquiries',
        'To send you relevant updates about our services (with your consent)',
        'To analyze website usage and improve user experience',
        'To comply with legal obligations and protect our rights'
      ]
    },
    {
      icon: Lock,
      title: 'Data Protection & Security',
      content: [
        'We implement industry-standard security measures to protect your data',
        'All data transmission is encrypted using SSL/TLS protocols',
        'Access to personal information is restricted to authorized personnel only',
        'We regularly audit our security practices and update them as needed',
        'We do not sell, rent, or share your personal information with third parties'
      ]
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: [
        'Right to access your personal information we hold',
        'Right to correct or update your information',
        'Right to delete your personal information (subject to legal requirements)',
        'Right to restrict processing of your information',
        'Right to data portability where technically feasible',
        'Right to withdraw consent for marketing communications'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Policy | Stepup AI"
        description="Learn how Stepup AI protects your privacy and handles your personal information. Our commitment to data security and transparency."
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
                  Privacy
                </span>
                <br />
                <span className="text-gray-900">Policy</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Stepup AI, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our website or services, you agree to the collection and use of information in accordance with this policy. 
                We will not use or share your information with anyone except as described in this Privacy Policy.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. 
                Cookies are small data files stored on your device that help us remember your preferences and improve our services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for basic website functionality and cannot be disabled.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand how visitors interact with our website.</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may use third-party services to provide and improve our services. These services may collect information 
                sent by your browser as part of a web page request, such as cookies or your IP address.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Google Analytics for website analytics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Email service providers for communication</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">Cloud hosting services for data storage</span>
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
              <h3 className="text-2xl font-bold mb-6">Questions About This Policy?</h3>
              <p className="mb-6 opacity-90">
                If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
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