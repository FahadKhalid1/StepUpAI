import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'es' | 'nl';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    fr: 'Accueil',
    es: 'Inicio',
    nl: 'Home'
  },
  'nav.about': {
    en: 'About',
    fr: 'À Propos',
    es: 'Acerca de',
    nl: 'Over Ons'
  },
  'nav.services': {
    en: 'Services',
    fr: 'Services',
    es: 'Servicios',
    nl: 'Diensten'
  },
  'nav.projects': {
    en: 'Projects',
    fr: 'Projets',
    es: 'Proyectos',
    nl: 'Projecten'
  },
  'nav.blog': {
    en: 'Blog',
    fr: 'Blog',
    es: 'Blog',
    nl: 'Blog'
  },
  'nav.contact': {
    en: 'Contact',
    fr: 'Contact',
    es: 'Contacto',
    nl: 'Contact'
  },
  
  // Hero Section
  'hero.title': {
    en: 'Transform Your Business with AI',
    fr: 'Transformez Votre Entreprise avec l\'IA',
    es: 'Transforma Tu Negocio con IA',
    nl: 'Transformeer Uw Bedrijf met AI'
  },
  'hero.subtitle': {
    en: 'We build intelligent systems that scale your operations, boost productivity, and drive growth through cutting-edge AI technologies.',
    fr: 'Nous construisons des systèmes intelligents qui développent vos opérations, augmentent la productivité et stimulent la croissance grâce aux technologies IA de pointe.',
    es: 'Construimos sistemas inteligentes que escalan tus operaciones, aumentan la productividad e impulsan el crecimiento a través de tecnologías de IA avanzadas.',
    nl: 'We bouwen intelligente systemen die uw activiteiten schalen, productiviteit verhogen en groei stimuleren door geavanceerde AI-technologieën.'
  },
  'hero.cta': {
    en: 'Get Started Today',
    fr: 'Commencer Aujourd\'hui',
    es: 'Comenzar Hoy',
    nl: 'Start Vandaag'
  },
  'hero.view_work': {
    en: 'View Our Work',
    fr: 'Voir Notre Travail',
    es: 'Ver Nuestro Trabajo',
    nl: 'Bekijk Ons Werk'
  },
  
  // Services
  'services.title': {
    en: 'Our Services',
    fr: 'Nos Services',
    es: 'Nuestros Servicios',
    nl: 'Onze Diensten'
  },
  'services.subtitle': {
    en: 'Comprehensive AI solutions designed to transform your business operations.',
    fr: 'Solutions IA complètes conçues pour transformer vos opérations commerciales.',
    es: 'Soluciones integrales de IA diseñadas para transformar las operaciones de tu negocio.',
    nl: 'Uitgebreide AI-oplossingen ontworpen om uw bedrijfsactiviteiten te transformeren.'
  },
  'services.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
    es: 'Automatización IA',
    nl: 'AI Automatisering'
  },
  'services.cold_calling': {
    en: 'AI Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid IA',
    es: 'Sistemas de Llamadas en Frío IA',
    nl: 'AI Cold Calling Systemen'
  },
  'services.email_marketing': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
    es: 'Automatización de Email Marketing',
    nl: 'Email Marketing Automatisering'
  },
  'services.web_development': {
    en: 'Web Development',
    fr: 'Développement Web',
    es: 'Desarrollo Web',
    nl: 'Webontwikkeling'
  },
  
  // Projects
  'projects.title': {
    en: 'Featured Projects',
    fr: 'Projets en Vedette',
    es: 'Proyectos Destacados',
    nl: 'Uitgelichte Projecten'
  },
  'projects.subtitle': {
    en: 'Discover how we\'ve transformed businesses across industries with innovative AI automation solutions.',
    fr: 'Découvrez comment nous avons transformé les entreprises de tous secteurs avec des solutions d\'automatisation IA innovantes.',
    es: 'Descubre cómo hemos transformado empresas de todas las industrias con soluciones innovadoras de automatización de IA.',
    nl: 'Ontdek hoe we bedrijven in verschillende sectoren hebben getransformeerd met innovatieve AI-automatiseringsoplossingen.'
  },
  'projects.success_stories': {
    en: '& Success Stories',
    fr: '& Histoires de Succès',
    es: '& Historias de Éxito',
    nl: '& Succesverhalen'
  },
  
  // Blog
  'blog.title': {
    en: 'Latest Insights',
    fr: 'Dernières Insights',
    es: 'Últimas Perspectivas',
    nl: 'Laatste Inzichten'
  },
  'blog.subtitle': {
    en: 'Stay ahead with the latest AI automation trends, tips, and case studies.',
    fr: 'Restez en avance avec les dernières tendances, conseils et études de cas en automatisation IA.',
    es: 'Mantente al día con las últimas tendencias, consejos y casos de estudio de automatización de IA.',
    nl: 'Blijf voorop met de nieuwste AI-automatiseringstrends, tips en casestudies.'
  },
  
  // Contact
  'contact.title': {
    en: 'Let\'s Build Something Amazing Together',
    fr: 'Construisons Quelque Chose d\'Extraordinaire Ensemble',
    es: 'Construyamos Algo Increíble Juntos',
    nl: 'Laten We Samen Iets Geweldigs Bouwen'
  },
  'contact.subtitle': {
    en: 'Ready to transform your business with AI? Get in touch for a free consultation and discover how we can help you achieve your goals.',
    fr: 'Prêt à transformer votre entreprise avec l\'IA ? Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous aider à atteindre vos objectifs.',
    es: '¿Listo para transformar tu negocio con IA? Ponte en contacto para una consulta gratuita y descubre cómo podemos ayudarte a lograr tus objetivos.',
    nl: 'Klaar om uw bedrijf te transformeren met AI? Neem contact op voor een gratis consultatie en ontdek hoe we u kunnen helpen uw doelen te bereiken.'
  },

  // Contact - Success message
  'contact.success_message': {
    en: 'Thank you, we will get in touch soon.',
    fr: 'Merci, nous vous contacterons très bientôt.',
    es: 'Gracias, nos pondremos en contacto pronto.',
    nl: 'Bedankt, we nemen snel contact met u op.'
  },
  
  // About
  'about.title': {
    en: 'About Stepup AI',
    fr: 'À Propos de Stepup AI',
    es: 'Acerca de Stepup AI',
    nl: 'Over Stepup AI'
  },
  'about.subtitle': {
    en: 'We\'re a team of AI enthusiasts, developers, and business strategists dedicated to transforming how companies operate through intelligent automation.',
    fr: 'Nous sommes une équipe d\'enthousiastes de l\'IA, de développeurs et de stratèges commerciaux dédiés à transformer la façon dont les entreprises fonctionnent grâce à l\'automatisation intelligente.',
    es: 'Somos un equipo de entusiastas de la IA, desarrolladores y estrategas comerciales dedicados a transformar cómo operan las empresas a través de la automatización inteligente.',
    nl: 'We zijn een team van AI-enthousiastelingen, ontwikkelaars en bedrijfsstrateeg die zich toeleggen op het transformeren van hoe bedrijven opereren door intelligente automatisering.'
  },
  
  // Common
  'common.learn_more': {
    en: 'Learn More',
    fr: 'En Savoir Plus',
    es: 'Saber Más',
    nl: 'Meer Informatie'
  },
  'common.get_started': {
    en: 'Get Started',
    fr: 'Commencer',
    es: 'Comenzar',
    nl: 'Beginnen'
  },
  'common.view_all': {
    en: 'View All',
    fr: 'Voir Tout',
    es: 'Ver Todo',
    nl: 'Alles Bekijken'
  },
  'common.read_more': {
    en: 'Read More',
    fr: 'Lire Plus',
    es: 'Leer Más',
    nl: 'Lees Meer'
  },
  'common.contact_us': {
    en: 'Contact Us',
    fr: 'Nous Contacter',
    es: 'Contáctanos',
    nl: 'Contact Opnemen'
  },
  'common.our_services': {
    en: 'Our Services',
    fr: 'Nos Services',
    es: 'Nuestros Servicios',
    nl: 'Onze Diensten'
  },
  'common.view_projects': {
    en: 'View Projects',
    fr: 'Voir les Projets',
    es: 'Ver Proyectos',
    nl: 'Projecten Bekijken'
  },
  'common.start_project': {
    en: 'Start Your Project',
    fr: 'Démarrer Votre Projet',
    es: 'Iniciar Tu Proyecto',
    nl: 'Start Uw Project'
  },
  'common.ready_transform': {
    en: 'Ready to Transform Your Business?',
    fr: 'Prêt à Transformer Votre Entreprise ?',
    es: '¿Listo para Transformar Tu Negocio?',
    nl: 'Klaar om Uw Bedrijf te Transformeren?'
  },
  'common.transform_cta': {
    en: 'Join 50+ companies that have already revolutionized their operations with our AI solutions.',
    fr: 'Rejoignez plus de 50 entreprises qui ont déjà révolutionné leurs opérations avec nos solutions IA.',
    es: 'Únete a más de 50 empresas que ya han revolucionado sus operaciones con nuestras soluciones de IA.',
    nl: 'Sluit je aan bij 50+ bedrijven die hun activiteiten al hebben gerevolutioneerd met onze AI-oplossingen.'
  },
  'common.core_services': {
    en: 'Our Core Services',
    fr: 'Nos Services Principaux',
    es: 'Nuestros Servicios Principales',
    nl: 'Onze Kernservices'
  },
  'common.view_case_studies': {
    en: 'View Case Studies',
    fr: 'Voir les Études de Cas',
    es: 'Ver Casos de Estudio',
    nl: 'Bekijk Casestudies'
  },
  'common.about_us': {
    en: 'About Us',
    fr: 'À Propos de Nous',
    es: 'Acerca de Nosotros',
    nl: 'Over Ons'
  },
  'common.newsletter_title': {
    en: 'Stay Updated with AI Insights',
    fr: 'Restez Informé des Insights IA',
    es: 'Mantente Actualizado con Insights de IA',
    nl: 'Blijf Op de Hoogte van AI Inzichten'
  },
  'common.newsletter_subtitle': {
    en: 'Subscribe to our newsletter for the latest AI automation tips and industry trends.',
    fr: 'Abonnez-vous à notre newsletter pour les derniers conseils d\'automatisation IA et tendances de l\'industrie.',
    es: 'Suscríbete a nuestro boletín para los últimos consejos de automatización de IA y tendencias de la industria.',
    nl: 'Abonneer u op onze nieuwsbrief voor de nieuwste AI-automatiseringstips en industrietrends.'
  },
  'common.subscribe': {
    en: 'Subscribe',
    fr: 'S\'abonner',
    es: 'Suscribirse',
    nl: 'Abonneren'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};