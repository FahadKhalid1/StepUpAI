import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Bot, Globe, MessageSquare, Mail, Code, Users, Trophy, Target, ChevronRight, Star, CheckCircle, Play, Award, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TypewriterText from '../components/TypewriterText';
import AnimatedBackground from '../components/AnimatedBackground';
import airtableLogo from '../images/airtable.png';
import makeLogo from '../images/make.png';
import n8nLogo from '../images/n8n.png';
import openaiLogo from '../images/openai.png';
import reactLogo from '../images/react.png';
import supabaseLogo from '../images/supabase.png';
import telnyxLogo from '../images/telnyx.png';
import vapiLogo from '../images/vapi.png';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '50+', label: 'Projects Completed' },
    { icon: Trophy, value: '98%', label: 'Client Satisfaction' },
    { icon: Target, value: '40%', label: 'Average Efficiency Gain' },
    { icon: Globe, value: '15+', label: 'Countries Served' }
  ];

  const featuredServices = [
    {
      icon: Bot,
      title: 'AI Automation',
      description: 'Intelligent workflow automation with n8n and Make.com',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: MessageSquare,
      title: 'AI Cold Calling',
      description: 'VAPI-powered calling systems with CRM integration',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern applications with React and Supabase',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      role: 'CEO',
      content: 'Stepup AI transformed our operations with their intelligent automation. We saw 60% efficiency gains within the first month.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg'
    },
    {
      name: 'Michael Chen',
      company: 'EduTech Solutions',
      role: 'Operations Director',
      content: 'Their AI assistant for school administration has revolutionized how we manage student data and scheduling.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Emma Rodriguez',
      company: 'Marketing Pro',
      role: 'Marketing Manager',
      content: 'The LinkedIn automation system increased our lead generation by 300%. Absolutely incredible results!',
      rating: 5,
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg'
    }
  ];

  const technologies = [
    { name: 'n8n', logo: n8nLogo },
    { name: 'Make.com', logo: makeLogo },
    { name: 'VAPI', logo: vapiLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Supabase', logo: supabaseLogo },
    { name: 'OpenAI', logo: openaiLogo },
    { name: 'Airtable', logo: airtableLogo },
    { name: 'Telnyx', logo: telnyxLogo }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Productivity',
      description: 'Automate repetitive tasks and focus on what matters most',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Reduce Errors',
      description: 'AI-powered systems eliminate human error and ensure accuracy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Save Time & Money',
      description: 'Cut operational costs while accelerating business processes',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Award,
      title: 'Scale Efficiently',
      description: 'Grow your business without proportionally increasing overhead',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      <SEO />
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
  <AnimatedBackground showDots={false} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left"
              >
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                    🚀 AI-Powered Business Solutions
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {t('hero.title').split(' ')[0]}
                  </span>
                  <br />
                  <span className="text-gray-900">{t('hero.title').split(' ').slice(1, 3).join(' ')}</span>
                  <br />
                  <span className="text-gray-700">{t('hero.title').split(' ').slice(3).join(' ')}</span>
                </h1>
                
                <div className="text-xl md:text-2xl text-gray-600 mb-8 h-16">
                  <TypewriterText
                    texts={[
                      'Intelligent workflow automation',
                      'AI-powered business solutions',
                      'Custom chatbot development',
                      'Enterprise AI integration'
                    ]}
                    className="text-indigo-600 font-semibold"
                  />
                </div>
                
                <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
                  {t('hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/projects"
                    className="group border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>{t('hero.view_work')}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>

              {/* Right Content - Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                  <img
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                    alt="AI Technology and Automation"
                    className="relative w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                  
                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">AI Automation</div>
                        <div className="text-xs text-gray-600">50+ Projects</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">98% Success Rate</div>
                        <div className="text-xs text-gray-600">Client Satisfaction</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/70 backdrop-blur-sm border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl mb-4 mx-auto"
                  >
                    <stat.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose AI Automation?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your business operations with intelligent automation that delivers measurable results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} text-white rounded-2xl mb-6 mx-auto`}
                  >
                    <benefit.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('common.core_services')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`p-4 bg-gradient-to-r ${service.color} rounded-2xl mb-6 w-fit`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
                  >
                    {t('common.learn_more')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {t('common.view_all')} {t('nav.services')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Technologies We Master
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work with cutting-edge tools and platforms to deliver exceptional AI solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-indigo-200"
                >
                  <div className="mb-3 flex items-center justify-center h-12">
                    <img src={tech.logo} alt={`${tech.name} logo`} className="h-10 object-contain" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say about our AI solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  See Our AI Solutions in Action
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Watch how our AI automation transforms business operations and delivers exceptional results for our clients.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Real-time workflow automation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Intelligent data processing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Seamless system integration</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
                  <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
                  <div className="relative text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 cursor-pointer"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">Watch Demo Video</h3>
                    <p className="text-white/80">
                      See how we've helped businesses achieve 40% efficiency gains through intelligent automation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('common.ready_transform')}
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                {t('common.transform_cta')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t('common.start_project')}
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  {t('common.learn_more')} {t('common.about_us')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;