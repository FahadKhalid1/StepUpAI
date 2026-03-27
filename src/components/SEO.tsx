import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Stepup AI - Transformez Votre Entreprise avec l\'Automatisation IA | Paris',
  description = 'Stepup AI est une agence d\'automatisation IA basée à Paris. Nous aidons les entreprises avec l\'automatisation des processus, les chatbots IA, les systèmes d\'appels, l\'email marketing et le développement web sur mesure.',
  keywords = 'automatisation IA, agence IA Paris, automatisation des processus, chatbots IA, automatisation entreprise, n8n, développement web',
  ogImage = 'https://step-upai.com/og-image.jpg',
  ogType = 'website',
  canonical,
  structuredData
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://step-upai.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const locale = language === 'fr' ? 'fr_FR' : 'en_US';
  const altLocale = language === 'fr' ? 'en_US' : 'fr_FR';

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Stepup AI" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Stepup AI" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* Structured Data - Organization (global) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Stepup AI",
          "url": "https://step-upai.com",
          "logo": "https://step-upai.com/logo.png",
          "description": "Agence d'automatisation IA basée à Paris, spécialisée en workflows, chatbots, appels IA et développement web.",
          "telephone": "+33698229533",
          "email": "contact@step-upai.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Paris",
            "addressRegion": "Île-de-France",
            "addressCountry": "FR"
          },
          "sameAs": [
            "https://linkedin.com/company/stepup-ai",
            "https://twitter.com/stepupai"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33698229533",
            "contactType": "customer service",
            "availableLanguage": ["French", "English"],
            "areaServed": "FR"
          }
        })}
      </script>
      {/* Additional Structured Data */}
      {structuredData && (
        Array.isArray(structuredData)
          ? structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          : (
              <script type="application/ld+json">
                {JSON.stringify(structuredData)}
              </script>
            )
      )}
    </Helmet>
  );
};

export default SEO;
