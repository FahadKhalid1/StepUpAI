import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const siteUrl = 'https://step-upai.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Stepup AI" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Stepup AI" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Stepup AI",
          "url": "https://step-upai.com",
          "logo": "https://step-upai.com/logo.png",
          "description": description,
          "sameAs": [
            "https://linkedin.com/company/stepup-ai",
            "https://twitter.com/stepupai"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "French"]
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