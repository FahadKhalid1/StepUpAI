import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot,
  Phone,
  Mail,
  Code,
  MessageSquare,
  Zap,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import SEO from '../components/SEO';
import { getCity, getService, getNearbyCities, getOtherServices, getGeoUrl } from '../data/geoData';
import type { City, GeoService } from '../data/geoData';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface GeoServicePageProps {
  serviceId: string;
  citySlug: string;
}

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bot,
  Phone,
  Mail,
  Code,
  MessageSquare,
  Zap,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function replacePlaceholders(
  template: string,
  city: City,
  service?: GeoService,
): string {
  return template
    .replace(/\{city\}/g, city.name)
    .replace(/\{departmentName\}/g, city.departmentName)
    .replace(/\{service\}/g, service?.name ?? '');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const GeoServicePage: React.FC<GeoServicePageProps> = ({ serviceId, citySlug }) => {
  const city = getCity(citySlug);
  const service = getService(serviceId);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // --------------------------------------------------
  // Not found guard
  // --------------------------------------------------
  if (!city || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <p className="text-gray-600 mb-8">
            Le service ou la ville demande n'a pas ete trouve.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Retour a l'accueil
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Derived data
  // --------------------------------------------------
  const geoUrl = getGeoUrl(service.slug, city.slug);
  const nearbyCities = getNearbyCities(city.slug, 6);
  const otherServices = getOtherServices(service.id);
  const ServiceIcon = iconMap[service.icon] ?? Bot;

  const metaTitle = replacePlaceholders(service.metaTitleTemplate, city, service);
  const metaDesc = replacePlaceholders(service.metaDescTemplate, city, service);
  const heroSubtitle = replacePlaceholders(service.heroSubtitleTemplate, city, service);

  const faqItems = service.faqTemplates.map((faq) => ({
    question: replacePlaceholders(faq.question, city, service),
    answer: replacePlaceholders(faq.answer, city, service),
  }));

  // --------------------------------------------------
  // Structured data
  // --------------------------------------------------
  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Stepup AI',
      url: 'https://step-upai.com',
      telephone: '+33 6 98 22 95 33',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        postalCode: city.postalCode,
        addressRegion: city.departmentName,
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.latitude,
        longitude: city.longitude,
      },
      areaServed: city.name,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      provider: {
        '@type': 'Organization',
        name: 'Stepup AI',
        url: 'https://step-upai.com',
      },
      areaServed: {
        '@type': 'City',
        name: city.name,
      },
      description: metaDesc,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://step-upai.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://step-upai.com/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${service.name} a ${city.name}`,
          item: `https://step-upai.com${geoUrl}`,
        },
      ],
    },
  ];

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* SEO Head                                                          */}
      {/* ----------------------------------------------------------------- */}
      <SEO
        title={metaTitle}
        description={metaDesc}
        keywords={`automatisation IA ${city.name}, ${service.name} ${city.departmentName}, intelligence artificielle ${city.name}, ${service.name} ${city.name}, IA entreprise ${city.departmentName}`}
        canonical={geoUrl}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-20">
        {/* --------------------------------------------------------------- */}
        {/* Hero Section                                                     */}
        {/* --------------------------------------------------------------- */}
        <section className={`relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${service.color} overflow-hidden`}>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center text-sm text-white/80 mb-8 flex-wrap gap-1"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link to="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-white font-medium">
                {service.name} a {city.name}
              </span>
            </motion.nav>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    {city.name}, {city.departmentName} ({city.department})
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {service.name} a{' '}
                  <span className="underline decoration-white/30 underline-offset-8">
                    {city.name}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
                  {heroSubtitle}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <ServiceIcon className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Introduction Section                                             */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Expert en {service.name} a {city.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Vous recherchez un expert en {service.name.toLowerCase()} a {city.name} ?
                Stepup AI accompagne les entreprises de {city.name} et du departement {city.departmentName} dans leur transformation numerique grace a des solutions d'intelligence artificielle sur mesure.
                Que vous soyez une startup, une PME ou un grand groupe implante a {city.name}, nous concevons et deployons des solutions de {service.name.toLowerCase()} adaptees a vos enjeux specifiques, a votre secteur d'activite et a vos objectifs de croissance.
                Notre approche combine expertise technique de pointe et connaissance approfondie du tissu economique local pour vous offrir un accompagnement personnalise et des resultats concrets.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {city.description}{' '}
                Nos experts en {service.name.toLowerCase()} travaillent en etroite collaboration avec les entreprises locales pour identifier les opportunites d'optimisation, automatiser les processus cles et maximiser le retour sur investissement de chaque projet.
                Faites confiance a Stepup AI pour faire de {city.name} le terrain de votre reussite numerique.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Features Grid                                                    */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos solutions de {service.name} a {city.name}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des services concus pour repondre aux besoins des entreprises de {city.name} et du {city.departmentName}.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <ServiceIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Benefits Section                                                 */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Les avantages de {service.name} a {city.name}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-6 rounded-xl ${
                    index % 2 === 0 ? 'bg-white shadow-md' : 'bg-indigo-50/50'
                  }`}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {replacePlaceholders(benefit, city, service)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* FAQ Section                                                      */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions frequentes sur {service.name} a {city.name}
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce que vous devez savoir sur nos solutions de {service.name.toLowerCase()} a {city.name}.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Internal Links Section                                           */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Other services in same city */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Nos autres services a {city.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherServices.map((otherService) => {
                  const OtherIcon = iconMap[otherService.icon] ?? Bot;
                  return (
                    <Link
                      key={otherService.id}
                      to={getGeoUrl(otherService.slug, city.slug)}
                      className="group flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${otherService.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <OtherIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                          {otherService.name}
                        </h3>
                        <p className="text-sm text-gray-500">a {city.name}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Same service in nearby cities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {service.name} dans d'autres villes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    to={getGeoUrl(service.slug, nearbyCity.slug)}
                    className="group flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        a {nearbyCity.name} ({nearbyCity.department})
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* CTA Section                                                      */}
        {/* --------------------------------------------------------------- */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Pret a transformer votre entreprise a {city.name} ?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Contactez nos experts en {service.name.toLowerCase()} et decouvrez comment l'intelligence artificielle
                peut accelerer la croissance de votre entreprise a {city.name} et dans tout le {city.departmentName}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Decouvrir tous nos services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GeoServicePage;
