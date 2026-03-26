import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, Brain, Zap, Heart, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Brain,
      title: t('about.value.innovation'),
      description: t('about.value.innovation_desc'),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Heart,
      title: t('about.value.client_success'),
      description: t('about.value.client_success_desc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: t('about.value.efficiency'),
      description: t('about.value.efficiency_desc'),
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Lightbulb,
      title: t('about.value.transparency'),
      description: t('about.value.transparency_desc'),
      color: 'from-rose-500 to-orange-500'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: t('about.team.role1'),
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: t('about.team.bio1')
    },
    {
      name: 'Sarah Chen',
      role: t('about.team.role2'),
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: t('about.team.bio2')
    },
    {
      name: 'Marcus Rodriguez',
      role: t('about.team.role3'),
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: t('about.team.bio3')
    },
    {
      name: 'Emma Thompson',
      role: t('about.team.role4'),
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: t('about.team.bio4')
    }
  ];

  const milestones = [
    { year: '2020', title: t('about.milestone.1_title'), description: t('about.milestone.1_desc') },
    { year: '2021', title: t('about.milestone.2_title'), description: t('about.milestone.2_desc') },
    { year: '2022', title: t('about.milestone.3_title'), description: t('about.milestone.3_desc') },
    { year: '2023', title: t('about.milestone.4_title'), description: t('about.milestone.4_desc') },
    { year: '2024', title: t('about.milestone.5_title'), description: t('about.milestone.5_desc') }
  ];

  return (
    <>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={t('seo.about.keywords')}
        canonical="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": t('seo.about.title'),
          "description": t('seo.about.description'),
          "mainEntity": {
            "@type": "Organization",
            "name": "Stepup AI",
            "url": "https://step-upai.com",
            "foundingDate": "2023",
            "foundingLocation": {
              "@type": "Place",
              "name": "Paris, France"
            },
            "description": t('seo.about.description'),
            "knowsAbout": [
              "Artificial Intelligence",
              "Workflow Automation",
              "AI Chatbots",
              "Web Development",
              "Email Marketing Automation",
              "AI Cold Calling Systems"
            ],
            "areaServed": {
              "@type": "Place",
              "name": "Île-de-France, France"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {t('about.title').split(' ')[0]}
                  </span>
                  <br />
                  <span className="text-gray-900">{t('about.title').split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {t('about.subtitle')}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white/70 rounded-xl">
                    <div className="text-3xl font-bold text-indigo-600">50+</div>
                    <div className="text-gray-600">{t('about.projects_delivered')}</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600">15+</div>
                    <div className="text-gray-600">{t('about.countries_served')}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl"
                  width={800}
                  height={500}
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl"
              >
                <Target className="w-12 h-12 text-indigo-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.mission_title')}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.mission_text')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl"
              >
                <Globe className="w-12 h-12 text-purple-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.vision_title')}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.vision_text')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('about.values_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.values_subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
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
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} text-white rounded-2xl mb-6 mx-auto`}
                  >
                    <value.icon className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('about.team_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.team_subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                  <p className="text-indigo-600 text-center font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm text-center">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('about.journey_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('about.journey_subtitle')}
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;