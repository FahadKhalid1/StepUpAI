import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://fk92.app.n8n.cloud/webhook/step-up-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Something went wrong while sending your message. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'contact@step-upai.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+33 6 98 22 95 33',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Paris, France',
      description: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon-Fri: 8am-5pm PST',
      description: 'We\'re here to help'
    }
  ];

  const services = [
    'AI Workflow Automation',
    'Cold Calling Systems',
    'Email Marketing Automation',
    'Web Development',
    'Custom AI Chatbots',
    'AI Agentic Systems',
    'Consultation & Strategy'
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Started with AI Automation | Stepup AI"
        description="Ready to transform your business with AI? Contact Stepup AI for a free consultation on automation, chatbots, and intelligent business solutions."
        canonical="/contact"
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
                  {t('contact.title').split(' ').slice(0, 2).join(' ')}
                </span>
                <br />
                <span className="text-gray-900">{t('contact.title').split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in touch</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    We'd love to hear from you. Choose the most convenient way to reach us and we'll respond as quickly as possible.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                          <p className="text-indigo-600 font-medium mb-1">{info.details}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
                      <p className="text-gray-600">Paris, France</p>
                      <p className="text-sm text-gray-500 mt-2">Interactive map coming soon</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about our AI automation services.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does it take to implement an AI solution?",
                  answer: "Implementation time varies based on complexity, typically ranging from 2-8 weeks for most projects."
                },
                {
                  question: "Do you provide ongoing support and maintenance?",
                  answer: "Yes, we offer comprehensive support packages to ensure your AI systems continue to perform optimally."
                },
                {
                  question: "Can you integrate with our existing systems?",
                  answer: "Absolutely! We specialize in seamless integration with existing business tools and platforms."
                },
                {
                  question: "What's the ROI of AI automation?",
                  answer: "Most clients see 40-70% efficiency gains and ROI within 3-6 months of implementation."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Success Overlay */}
      {isSubmitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSubmitted(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl px-8 py-6 max-w-md w-[90%] text-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('contact.success_message')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ContactPage;