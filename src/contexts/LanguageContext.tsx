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

  // Home Page
  'home.badge': {
    en: '🚀 AI-Powered Business Solutions',
    fr: '🚀 Solutions d\'Entreprise Propulsées par l\'IA',
    es: '🚀 Soluciones Empresariales con IA',
    nl: '🚀 AI-Aangedreven Bedrijfsoplossingen'
  },
  'home.typewriter.1': {
    en: 'Intelligent workflow automation',
    fr: 'Automatisation intelligente des flux de travail',
    es: 'Automatización inteligente de flujos de trabajo',
    nl: 'Intelligente workflowautomatisering'
  },
  'home.typewriter.2': {
    en: 'AI-powered business solutions',
    fr: 'Solutions d\'entreprise propulsées par l\'IA',
    es: 'Soluciones empresariales con IA',
    nl: 'AI-aangedreven bedrijfsoplossingen'
  },
  'home.typewriter.3': {
    en: 'Custom chatbot development',
    fr: 'Développement de chatbots sur mesure',
    es: 'Desarrollo de chatbots personalizados',
    nl: 'Aangepaste chatbotontwikkeling'
  },
  'home.typewriter.4': {
    en: 'Enterprise AI integration',
    fr: 'Intégration IA en entreprise',
    es: 'Integración de IA empresarial',
    nl: 'Enterprise AI-integratie'
  },
  'home.floating.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
    es: 'Automatización IA',
    nl: 'AI Automatisering'
  },
  'home.floating.projects': {
    en: '50+ Projects',
    fr: '50+ Projets',
    es: '50+ Proyectos',
    nl: '50+ Projecten'
  },
  'home.floating.success_rate': {
    en: '98% Success Rate',
    fr: '98% Taux de Réussite',
    es: '98% Tasa de Éxito',
    nl: '98% Slagingspercentage'
  },
  'home.floating.satisfaction': {
    en: 'Client Satisfaction',
    fr: 'Satisfaction Client',
    es: 'Satisfacción del Cliente',
    nl: 'Klanttevredenheid'
  },

  // Stats
  'stats.projects_completed': {
    en: 'Projects Completed',
    fr: 'Projets Réalisés',
    es: 'Proyectos Completados',
    nl: 'Projecten Voltooid'
  },
  'stats.client_satisfaction': {
    en: 'Client Satisfaction',
    fr: 'Satisfaction Client',
    es: 'Satisfacción del Cliente',
    nl: 'Klanttevredenheid'
  },
  'stats.efficiency_gain': {
    en: 'Average Efficiency Gain',
    fr: 'Gain d\'Efficacité Moyen',
    es: 'Ganancia de Eficiencia Promedio',
    nl: 'Gemiddelde Efficiëntiewinst'
  },
  'stats.countries_served': {
    en: 'Countries Served',
    fr: 'Pays Desservis',
    es: 'Países Atendidos',
    nl: 'Landen Bediend'
  },

  // Benefits
  'benefits.title': {
    en: 'Why Choose AI Automation?',
    fr: 'Pourquoi Choisir l\'Automatisation IA ?',
    es: '¿Por Qué Elegir la Automatización IA?',
    nl: 'Waarom Kiezen voor AI Automatisering?'
  },
  'benefits.subtitle': {
    en: 'Transform your business operations with intelligent automation that delivers measurable results.',
    fr: 'Transformez vos opérations commerciales grâce à une automatisation intelligente qui produit des résultats mesurables.',
    es: 'Transforma tus operaciones comerciales con automatización inteligente que ofrece resultados medibles.',
    nl: 'Transformeer uw bedrijfsactiviteiten met intelligente automatisering die meetbare resultaten oplevert.'
  },
  'benefits.increase_productivity': {
    en: 'Increase Productivity',
    fr: 'Augmenter la Productivité',
    es: 'Aumentar la Productividad',
    nl: 'Productiviteit Verhogen'
  },
  'benefits.increase_productivity_desc': {
    en: 'Automate repetitive tasks and focus on what matters most',
    fr: 'Automatisez les tâches répétitives et concentrez-vous sur l\'essentiel',
    es: 'Automatiza tareas repetitivas y enfócate en lo que más importa',
    nl: 'Automatiseer repetitieve taken en focus op wat het belangrijkst is'
  },
  'benefits.reduce_errors': {
    en: 'Reduce Errors',
    fr: 'Réduire les Erreurs',
    es: 'Reducir Errores',
    nl: 'Fouten Verminderen'
  },
  'benefits.reduce_errors_desc': {
    en: 'AI-powered systems eliminate human error and ensure accuracy',
    fr: 'Les systèmes alimentés par l\'IA éliminent les erreurs humaines et garantissent la précision',
    es: 'Los sistemas impulsados por IA eliminan el error humano y garantizan precisión',
    nl: 'AI-aangedreven systemen elimineren menselijke fouten en garanderen nauwkeurigheid'
  },
  'benefits.save_time': {
    en: 'Save Time & Money',
    fr: 'Gagner du Temps et de l\'Argent',
    es: 'Ahorra Tiempo y Dinero',
    nl: 'Bespaar Tijd en Geld'
  },
  'benefits.save_time_desc': {
    en: 'Cut operational costs while accelerating business processes',
    fr: 'Réduisez les coûts opérationnels tout en accélérant les processus métier',
    es: 'Reduce costos operativos mientras aceleras los procesos de negocio',
    nl: 'Verlaag operationele kosten en versnel bedrijfsprocessen'
  },
  'benefits.scale': {
    en: 'Scale Efficiently',
    fr: 'Évoluer Efficacement',
    es: 'Escalar Eficientemente',
    nl: 'Efficiënt Opschalen'
  },
  'benefits.scale_desc': {
    en: 'Grow your business without proportionally increasing overhead',
    fr: 'Développez votre entreprise sans augmenter proportionnellement les frais généraux',
    es: 'Haz crecer tu negocio sin aumentar proporcionalmente los gastos generales',
    nl: 'Laat uw bedrijf groeien zonder evenredige toename van overheadkosten'
  },

  // Technologies
  'tech.title': {
    en: 'Technologies We Master',
    fr: 'Technologies que Nous Maîtrisons',
    es: 'Tecnologías que Dominamos',
    nl: 'Technologieën die Wij Beheersen'
  },
  'tech.subtitle': {
    en: 'We work with cutting-edge tools and platforms to deliver exceptional AI solutions.',
    fr: 'Nous travaillons avec des outils et des plateformes de pointe pour fournir des solutions IA exceptionnelles.',
    es: 'Trabajamos con herramientas y plataformas de vanguardia para ofrecer soluciones de IA excepcionales.',
    nl: 'We werken met geavanceerde tools en platforms om uitzonderlijke AI-oplossingen te leveren.'
  },

  // Testimonials
  'testimonials.title': {
    en: 'What Our Clients Say',
    fr: 'Ce que Disent Nos Clients',
    es: 'Lo que Dicen Nuestros Clientes',
    nl: 'Wat Onze Klanten Zeggen'
  },
  'testimonials.subtitle': {
    en: 'Don\'t just take our word for it. Here\'s what our satisfied clients have to say about our AI solutions.',
    fr: 'Ne nous croyez pas sur parole. Voici ce que nos clients satisfaits disent de nos solutions IA.',
    es: 'No solo confíes en nuestra palabra. Esto es lo que dicen nuestros clientes satisfechos sobre nuestras soluciones de IA.',
    nl: 'Neem niet alleen ons woord ervoor. Dit zeggen onze tevreden klanten over onze AI-oplossingen.'
  },
  'testimonials.1': {
    en: 'Stepup AI transformed our operations with their intelligent automation. We saw 60% efficiency gains within the first month.',
    fr: 'Stepup AI a transformé nos opérations grâce à leur automatisation intelligente. Nous avons constaté des gains d\'efficacité de 60% dès le premier mois.',
    es: 'Stepup AI transformó nuestras operaciones con su automatización inteligente. Vimos ganancias de eficiencia del 60% en el primer mes.',
    nl: 'Stepup AI transformeerde onze activiteiten met hun intelligente automatisering. We zagen 60% efficiëntiewinst in de eerste maand.'
  },
  'testimonials.2': {
    en: 'Their AI assistant for school administration has revolutionized how we manage student data and scheduling.',
    fr: 'Leur assistant IA pour l\'administration scolaire a révolutionné notre gestion des données étudiantes et de la planification.',
    es: 'Su asistente de IA para administración escolar ha revolucionado la gestión de datos estudiantiles y programación.',
    nl: 'Hun AI-assistent voor schooladministratie heeft de manier waarop we studentengegevens en planning beheren gerevolutioneerd.'
  },
  'testimonials.3': {
    en: 'The LinkedIn automation system increased our lead generation by 300%. Absolutely incredible results!',
    fr: 'Le système d\'automatisation LinkedIn a augmenté notre génération de leads de 300%. Des résultats absolument incroyables !',
    es: 'El sistema de automatización de LinkedIn aumentó nuestra generación de leads en un 300%. ¡Resultados absolutamente increíbles!',
    nl: 'Het LinkedIn-automatiseringssysteem verhoogde onze leadgeneratie met 300%. Absoluut ongelooflijke resultaten!'
  },

  // Video/Demo
  'demo.title': {
    en: 'See Our AI Solutions in Action',
    fr: 'Découvrez Nos Solutions IA en Action',
    es: 'Vea Nuestras Soluciones de IA en Acción',
    nl: 'Bekijk Onze AI-Oplossingen in Actie'
  },
  'demo.subtitle': {
    en: 'Watch how our AI automation transforms business operations and delivers exceptional results for our clients.',
    fr: 'Découvrez comment notre automatisation IA transforme les opérations commerciales et offre des résultats exceptionnels à nos clients.',
    es: 'Vea cómo nuestra automatización de IA transforma las operaciones comerciales y ofrece resultados excepcionales a nuestros clientes.',
    nl: 'Bekijk hoe onze AI-automatisering bedrijfsactiviteiten transformeert en uitzonderlijke resultaten levert voor onze klanten.'
  },
  'demo.check1': {
    en: 'Real-time workflow automation',
    fr: 'Automatisation des flux de travail en temps réel',
    es: 'Automatización de flujos de trabajo en tiempo real',
    nl: 'Realtime workflowautomatisering'
  },
  'demo.check2': {
    en: 'Intelligent data processing',
    fr: 'Traitement intelligent des données',
    es: 'Procesamiento inteligente de datos',
    nl: 'Intelligente gegevensverwerking'
  },
  'demo.check3': {
    en: 'Seamless system integration',
    fr: 'Intégration système transparente',
    es: 'Integración de sistemas sin interrupciones',
    nl: 'Naadloze systeemintegratie'
  },
  'demo.watch': {
    en: 'Watch Demo Video',
    fr: 'Regarder la Vidéo Démo',
    es: 'Ver Video Demo',
    nl: 'Bekijk Demovideo'
  },
  'demo.efficiency': {
    en: 'See how we\'ve helped businesses achieve 40% efficiency gains through intelligent automation.',
    fr: 'Découvrez comment nous avons aidé les entreprises à réaliser des gains d\'efficacité de 40% grâce à l\'automatisation intelligente.',
    es: 'Vea cómo hemos ayudado a empresas a lograr ganancias de eficiencia del 40% mediante la automatización inteligente.',
    nl: 'Ontdek hoe we bedrijven hebben geholpen 40% efficiëntiewinst te behalen door intelligente automatisering.'
  },

  // Featured Services on Home
  'home.service.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
    es: 'Automatización IA',
    nl: 'AI Automatisering'
  },
  'home.service.ai_automation_desc': {
    en: 'Intelligent workflow automation with n8n and Make.com',
    fr: 'Automatisation intelligente des flux de travail avec n8n et Make.com',
    es: 'Automatización inteligente de flujos de trabajo con n8n y Make.com',
    nl: 'Intelligente workflowautomatisering met n8n en Make.com'
  },
  'home.service.ai_calling': {
    en: 'AI Cold Calling',
    fr: 'Appels à Froid IA',
    es: 'Llamadas en Frío IA',
    nl: 'AI Cold Calling'
  },
  'home.service.ai_calling_desc': {
    en: 'VAPI-powered calling systems with CRM integration',
    fr: 'Systèmes d\'appels propulsés par VAPI avec intégration CRM',
    es: 'Sistemas de llamadas con VAPI e integración CRM',
    nl: 'Door VAPI aangedreven belsystemen met CRM-integratie'
  },
  'home.service.web_dev': {
    en: 'Web Development',
    fr: 'Développement Web',
    es: 'Desarrollo Web',
    nl: 'Webontwikkeling'
  },
  'home.service.web_dev_desc': {
    en: 'Modern applications with React and Supabase',
    fr: 'Applications modernes avec React et Supabase',
    es: 'Aplicaciones modernas con React y Supabase',
    nl: 'Moderne applicaties met React en Supabase'
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
  'services.that_transform': {
    en: 'That Transform',
    fr: 'qui Transforment',
    es: 'que Transforman',
    nl: 'die Transformeren'
  },
  'services.process_title': {
    en: 'Our Process',
    fr: 'Notre Processus',
    es: 'Nuestro Proceso',
    nl: 'Ons Proces'
  },
  'services.process_subtitle': {
    en: 'A proven methodology that ensures successful AI implementation and maximum ROI.',
    fr: 'Une méthodologie éprouvée qui assure une mise en œuvre IA réussie et un ROI maximum.',
    es: 'Una metodología probada que garantiza una implementación exitosa de IA y máximo ROI.',
    nl: 'Een bewezen methodologie die zorgt voor succesvolle AI-implementatie en maximale ROI.'
  },
  'services.key_features': {
    en: 'Key Features:',
    fr: 'Fonctionnalités Clés :',
    es: 'Características Clave:',
    nl: 'Belangrijkste Functies:'
  },
  'services.technologies': {
    en: 'Technologies:',
    fr: 'Technologies :',
    es: 'Tecnologías:',
    nl: 'Technologieën:'
  },
  'services.ready_automate': {
    en: 'Ready to Automate Your Business?',
    fr: 'Prêt à Automatiser Votre Entreprise ?',
    es: '¿Listo para Automatizar Tu Negocio?',
    nl: 'Klaar om Uw Bedrijf te Automatiseren?'
  },
  'services.ready_automate_desc': {
    en: 'Let\'s discuss how our AI solutions can transform your operations and drive growth.',
    fr: 'Discutons de la façon dont nos solutions IA peuvent transformer vos opérations et stimuler la croissance.',
    es: 'Hablemos de cómo nuestras soluciones de IA pueden transformar tus operaciones e impulsar el crecimiento.',
    nl: 'Laten we bespreken hoe onze AI-oplossingen uw activiteiten kunnen transformeren en groei kunnen stimuleren.'
  },

  // Service titles & descriptions
  'services.item.workflow_title': {
    en: 'AI Workflow Automation',
    fr: 'Automatisation de Flux de Travail IA',
    es: 'Automatización de Flujos de Trabajo IA',
    nl: 'AI Werkstroomautomatisering'
  },
  'services.item.workflow_desc': {
    en: 'Streamline your business processes with intelligent automation using industry-leading platforms.',
    fr: 'Simplifiez vos processus métier grâce à l\'automatisation intelligente utilisant des plateformes leaders du marché.',
    es: 'Optimiza tus procesos de negocio con automatización inteligente usando plataformas líderes de la industria.',
    nl: 'Stroomlijn uw bedrijfsprocessen met intelligente automatisering met behulp van toonaangevende platforms.'
  },
  'services.item.calling_title': {
    en: 'AI Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid IA',
    es: 'Sistemas de Llamadas en Frío IA',
    nl: 'AI Cold Calling Systemen'
  },
  'services.item.calling_desc': {
    en: 'Revolutionary voice AI systems that handle outbound calls with human-like conversations.',
    fr: 'Systèmes révolutionnaires d\'IA vocale qui gèrent les appels sortants avec des conversations naturelles.',
    es: 'Sistemas revolucionarios de IA de voz que manejan llamadas salientes con conversaciones naturales.',
    nl: 'Revolutionaire stem-AI-systemen die uitgaande gesprekken voeren met mensachtige conversaties.'
  },
  'services.item.email_title': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
    es: 'Automatización de Email Marketing',
    nl: 'E-mail Marketing Automatisering'
  },
  'services.item.email_desc': {
    en: 'Intelligent email campaigns that nurture leads and convert prospects automatically.',
    fr: 'Campagnes email intelligentes qui cultivent les leads et convertissent les prospects automatiquement.',
    es: 'Campañas de email inteligentes que nutren leads y convierten prospectos automáticamente.',
    nl: 'Intelligente e-mailcampagnes die leads koesteren en prospects automatisch converteren.'
  },
  'services.item.web_title': {
    en: 'Web Development',
    fr: 'Développement Web',
    es: 'Desarrollo Web',
    nl: 'Webontwikkeling'
  },
  'services.item.web_desc': {
    en: 'Modern, scalable web applications built with cutting-edge technologies.',
    fr: 'Applications web modernes et évolutives construites avec des technologies de pointe.',
    es: 'Aplicaciones web modernas y escalables construidas con tecnologías de vanguardia.',
    nl: 'Moderne, schaalbare webapplicaties gebouwd met geavanceerde technologieën.'
  },
  'services.item.chatbot_title': {
    en: 'Custom AI Chatbots',
    fr: 'Chatbots IA Personnalisés',
    es: 'Chatbots de IA Personalizados',
    nl: 'Aangepaste AI Chatbots'
  },
  'services.item.chatbot_desc': {
    en: 'Intelligent conversational interfaces that understand and assist your customers 24/7.',
    fr: 'Interfaces conversationnelles intelligentes qui comprennent et assistent vos clients 24h/24.',
    es: 'Interfaces conversacionales inteligentes que comprenden y asisten a tus clientes 24/7.',
    nl: 'Intelligente conversatie-interfaces die uw klanten 24/7 begrijpen en ondersteunen.'
  },
  'services.item.agentic_title': {
    en: 'AI Agentic Systems',
    fr: 'Systèmes d\'Agents IA',
    es: 'Sistemas de Agentes IA',
    nl: 'AI Agentische Systemen'
  },
  'services.item.agentic_desc': {
    en: 'Autonomous AI agents that can perform complex tasks and make decisions independently.',
    fr: 'Agents IA autonomes capables d\'effectuer des tâches complexes et de prendre des décisions de manière indépendante.',
    es: 'Agentes de IA autónomos que pueden realizar tareas complejas y tomar decisiones de forma independiente.',
    nl: 'Autonome AI-agenten die complexe taken kunnen uitvoeren en zelfstandig beslissingen kunnen nemen.'
  },

  // Process steps
  'services.process.step1_title': {
    en: 'Discovery & Analysis',
    fr: 'Découverte et Analyse',
    es: 'Descubrimiento y Análisis',
    nl: 'Ontdekking & Analyse'
  },
  'services.process.step1_desc': {
    en: 'We analyze your current processes and identify automation opportunities.',
    fr: 'Nous analysons vos processus actuels et identifions les opportunités d\'automatisation.',
    es: 'Analizamos tus procesos actuales e identificamos oportunidades de automatización.',
    nl: 'We analyseren uw huidige processen en identificeren automatiseringsmogelijkheden.'
  },
  'services.process.step2_title': {
    en: 'Strategy & Planning',
    fr: 'Stratégie et Planification',
    es: 'Estrategia y Planificación',
    nl: 'Strategie & Planning'
  },
  'services.process.step2_desc': {
    en: 'Develop a comprehensive automation strategy tailored to your business.',
    fr: 'Développer une stratégie d\'automatisation complète adaptée à votre entreprise.',
    es: 'Desarrollar una estrategia de automatización integral adaptada a tu negocio.',
    nl: 'Een uitgebreide automatiseringsstrategie ontwikkelen op maat van uw bedrijf.'
  },
  'services.process.step3_title': {
    en: 'Development & Integration',
    fr: 'Développement et Intégration',
    es: 'Desarrollo e Integración',
    nl: 'Ontwikkeling & Integratie'
  },
  'services.process.step3_desc': {
    en: 'Build and integrate AI solutions with your existing systems.',
    fr: 'Construire et intégrer des solutions IA avec vos systèmes existants.',
    es: 'Construir e integrar soluciones de IA con tus sistemas existentes.',
    nl: 'AI-oplossingen bouwen en integreren met uw bestaande systemen.'
  },
  'services.process.step4_title': {
    en: 'Testing & Optimization',
    fr: 'Tests et Optimisation',
    es: 'Pruebas y Optimización',
    nl: 'Testen & Optimalisatie'
  },
  'services.process.step4_desc': {
    en: 'Rigorous testing and continuous optimization for peak performance.',
    fr: 'Tests rigoureux et optimisation continue pour des performances optimales.',
    es: 'Pruebas rigurosas y optimización continua para un rendimiento óptimo.',
    nl: 'Rigoureus testen en continue optimalisatie voor topprestaties.'
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
  'projects.search': {
    en: 'Search projects...',
    fr: 'Rechercher des projets...',
    es: 'Buscar proyectos...',
    nl: 'Projecten zoeken...'
  },
  'projects.no_results': {
    en: 'No projects found matching your criteria.',
    fr: 'Aucun projet ne correspond à vos critères.',
    es: 'No se encontraron proyectos que coincidan con tus criterios.',
    nl: 'Geen projecten gevonden die aan uw criteria voldoen.'
  },
  'projects.tech_used': {
    en: 'Technologies Used:',
    fr: 'Technologies Utilisées :',
    es: 'Tecnologías Utilizadas:',
    nl: 'Gebruikte Technologieën:'
  },
  'projects.key_features': {
    en: 'Key Features:',
    fr: 'Fonctionnalités Clés :',
    es: 'Características Clave:',
    nl: 'Belangrijkste Functies:'
  },
  'projects.results': {
    en: 'Results:',
    fr: 'Résultats :',
    es: 'Resultados:',
    nl: 'Resultaten:'
  },
  'projects.view_demo': {
    en: 'View Demo',
    fr: 'Voir la Démo',
    es: 'Ver Demo',
    nl: 'Demo Bekijken'
  },
  'projects.case_study': {
    en: 'Case Study',
    fr: 'Étude de Cas',
    es: 'Caso de Estudio',
    nl: 'Casestudie'
  },
  'projects.ready_start': {
    en: 'Ready to Start Your Project?',
    fr: 'Prêt à Démarrer Votre Projet ?',
    es: '¿Listo para Comenzar Tu Proyecto?',
    nl: 'Klaar om Uw Project te Starten?'
  },
  'projects.ready_start_desc': {
    en: 'Let\'s discuss how we can create a custom AI solution for your business needs.',
    fr: 'Discutons de la façon dont nous pouvons créer une solution IA personnalisée pour vos besoins.',
    es: 'Hablemos de cómo podemos crear una solución de IA personalizada para las necesidades de tu negocio.',
    nl: 'Laten we bespreken hoe we een op maat gemaakte AI-oplossing voor uw bedrijfsbehoeften kunnen creëren.'
  },
  'projects.view_services': {
    en: 'View Our Services',
    fr: 'Voir Nos Services',
    es: 'Ver Nuestros Servicios',
    nl: 'Bekijk Onze Diensten'
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
  'blog.header': {
    en: 'AI Insights & Automation Tips',
    fr: 'Insights IA et Conseils d\'Automatisation',
    es: 'Perspectivas de IA y Consejos de Automatización',
    nl: 'AI-Inzichten & Automatiseringstips'
  },
  'blog.search': {
    en: 'Search articles...',
    fr: 'Rechercher des articles...',
    es: 'Buscar artículos...',
    nl: 'Artikelen zoeken...'
  },
  'blog.no_results': {
    en: 'No articles found matching your criteria.',
    fr: 'Aucun article ne correspond à vos critères.',
    es: 'No se encontraron artículos que coincidan con tus criterios.',
    nl: 'Geen artikelen gevonden die aan uw criteria voldoen.'
  },
  'blog.featured': {
    en: 'Featured',
    fr: 'À la Une',
    es: 'Destacado',
    nl: 'Uitgelicht'
  },
  'blog.email_placeholder': {
    en: 'Enter your email',
    fr: 'Entrez votre email',
    es: 'Ingresa tu email',
    nl: 'Voer uw e-mail in'
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
  'contact.success_message': {
    en: 'Thank you, we will get in touch soon.',
    fr: 'Merci, nous vous contacterons très bientôt.',
    es: 'Gracias, nos pondremos en contacto pronto.',
    nl: 'Bedankt, we nemen snel contact met u op.'
  },
  'contact.send_message': {
    en: 'Send us a message',
    fr: 'Envoyez-nous un message',
    es: 'Envíanos un mensaje',
    nl: 'Stuur ons een bericht'
  },
  'contact.full_name': {
    en: 'Full Name *',
    fr: 'Nom Complet *',
    es: 'Nombre Completo *',
    nl: 'Volledige Naam *'
  },
  'contact.full_name_placeholder': {
    en: 'Your full name',
    fr: 'Votre nom complet',
    es: 'Tu nombre completo',
    nl: 'Uw volledige naam'
  },
  'contact.email': {
    en: 'Email Address *',
    fr: 'Adresse Email *',
    es: 'Dirección de Email *',
    nl: 'E-mailadres *'
  },
  'contact.email_placeholder': {
    en: 'your@email.com',
    fr: 'votre@email.com',
    es: 'tu@email.com',
    nl: 'uw@email.com'
  },
  'contact.company': {
    en: 'Company Name',
    fr: 'Nom de l\'Entreprise',
    es: 'Nombre de la Empresa',
    nl: 'Bedrijfsnaam'
  },
  'contact.company_placeholder': {
    en: 'Your company name',
    fr: 'Nom de votre entreprise',
    es: 'Nombre de tu empresa',
    nl: 'Naam van uw bedrijf'
  },
  'contact.service_interest': {
    en: 'Service Interested In',
    fr: 'Service Souhaité',
    es: 'Servicio de Interés',
    nl: 'Dienst van Interesse'
  },
  'contact.select_service': {
    en: 'Select a service',
    fr: 'Sélectionnez un service',
    es: 'Selecciona un servicio',
    nl: 'Selecteer een dienst'
  },
  'contact.message': {
    en: 'Message *',
    fr: 'Message *',
    es: 'Mensaje *',
    nl: 'Bericht *'
  },
  'contact.message_placeholder': {
    en: 'Tell us about your project and how we can help...',
    fr: 'Parlez-nous de votre projet et comment nous pouvons vous aider...',
    es: 'Cuéntanos sobre tu proyecto y cómo podemos ayudar...',
    nl: 'Vertel ons over uw project en hoe we kunnen helpen...'
  },
  'contact.sending': {
    en: 'Sending...',
    fr: 'Envoi en cours...',
    es: 'Enviando...',
    nl: 'Verzenden...'
  },
  'contact.send': {
    en: 'Send Message',
    fr: 'Envoyer le Message',
    es: 'Enviar Mensaje',
    nl: 'Bericht Versturen'
  },
  'contact.get_in_touch': {
    en: 'Get in touch',
    fr: 'Contactez-nous',
    es: 'Ponte en contacto',
    nl: 'Neem contact op'
  },
  'contact.get_in_touch_desc': {
    en: 'We\'d love to hear from you. Choose the most convenient way to reach us and we\'ll respond as quickly as possible.',
    fr: 'Nous serions ravis de vous entendre. Choisissez le moyen le plus pratique de nous contacter et nous vous répondrons le plus rapidement possible.',
    es: 'Nos encantaría saber de ti. Elige la forma más conveniente de contactarnos y te responderemos lo más rápido posible.',
    nl: 'We horen graag van u. Kies de meest handige manier om ons te bereiken en we reageren zo snel mogelijk.'
  },
  'contact.info.email': {
    en: 'Email Us',
    fr: 'Écrivez-nous',
    es: 'Escríbenos',
    nl: 'E-mail Ons'
  },
  'contact.info.email_desc': {
    en: 'Send us an email anytime',
    fr: 'Envoyez-nous un email à tout moment',
    es: 'Envíanos un email en cualquier momento',
    nl: 'Stuur ons op elk moment een e-mail'
  },
  'contact.info.phone': {
    en: 'Call Us',
    fr: 'Appelez-nous',
    es: 'Llámanos',
    nl: 'Bel Ons'
  },
  'contact.info.phone_desc': {
    en: 'Mon-Fri from 8am to 5pm',
    fr: 'Lun-Ven de 8h à 17h',
    es: 'Lun-Vie de 8am a 5pm',
    nl: 'Ma-Vr van 8 tot 17 uur'
  },
  'contact.info.visit': {
    en: 'Visit Us',
    fr: 'Visitez-nous',
    es: 'Visítanos',
    nl: 'Bezoek Ons'
  },
  'contact.info.visit_desc': {
    en: 'Come say hello at our office',
    fr: 'Venez nous dire bonjour à notre bureau',
    es: 'Ven a saludarnos a nuestra oficina',
    nl: 'Kom langs op ons kantoor'
  },
  'contact.info.hours': {
    en: 'Working Hours',
    fr: 'Horaires de Travail',
    es: 'Horario de Trabajo',
    nl: 'Werkuren'
  },
  'contact.info.hours_detail': {
    en: 'Mon-Fri: 8am-5pm',
    fr: 'Lun-Ven : 8h-17h',
    es: 'Lun-Vie: 8am-5pm',
    nl: 'Ma-Vr: 8-17 uur'
  },
  'contact.info.hours_desc': {
    en: 'We\'re here to help',
    fr: 'Nous sommes là pour vous aider',
    es: 'Estamos aquí para ayudar',
    nl: 'We zijn er om te helpen'
  },
  'contact.location': {
    en: 'Our Location',
    fr: 'Notre Emplacement',
    es: 'Nuestra Ubicación',
    nl: 'Onze Locatie'
  },
  'contact.map_soon': {
    en: 'Interactive map coming soon',
    fr: 'Carte interactive bientôt disponible',
    es: 'Mapa interactivo próximamente',
    nl: 'Interactieve kaart binnenkort beschikbaar'
  },
  'contact.faq_title': {
    en: 'Frequently Asked Questions',
    fr: 'Questions Fréquemment Posées',
    es: 'Preguntas Frecuentes',
    nl: 'Veelgestelde Vragen'
  },
  'contact.faq_subtitle': {
    en: 'Quick answers to common questions about our AI automation services.',
    fr: 'Réponses rapides aux questions courantes sur nos services d\'automatisation IA.',
    es: 'Respuestas rápidas a preguntas comunes sobre nuestros servicios de automatización de IA.',
    nl: 'Snelle antwoorden op veelgestelde vragen over onze AI-automatiseringsdiensten.'
  },
  'contact.faq.q1': {
    en: 'How long does it take to implement an AI solution?',
    fr: 'Combien de temps faut-il pour mettre en place une solution IA ?',
    es: '¿Cuánto tiempo se tarda en implementar una solución de IA?',
    nl: 'Hoe lang duurt het om een AI-oplossing te implementeren?'
  },
  'contact.faq.a1': {
    en: 'Implementation time varies based on complexity, typically ranging from 2-8 weeks for most projects.',
    fr: 'Le temps de mise en œuvre varie selon la complexité, allant généralement de 2 à 8 semaines pour la plupart des projets.',
    es: 'El tiempo de implementación varía según la complejidad, generalmente de 2 a 8 semanas para la mayoría de los proyectos.',
    nl: 'De implementatietijd varieert op basis van complexiteit, doorgaans 2-8 weken voor de meeste projecten.'
  },
  'contact.faq.q2': {
    en: 'Do you provide ongoing support and maintenance?',
    fr: 'Offrez-vous un support et une maintenance continus ?',
    es: '¿Proporcionan soporte y mantenimiento continuo?',
    nl: 'Bieden jullie doorlopende ondersteuning en onderhoud?'
  },
  'contact.faq.a2': {
    en: 'Yes, we offer comprehensive support packages to ensure your AI systems continue to perform optimally.',
    fr: 'Oui, nous proposons des forfaits de support complets pour garantir que vos systèmes IA continuent de fonctionner de manière optimale.',
    es: 'Sí, ofrecemos paquetes de soporte completos para garantizar que tus sistemas de IA sigan funcionando de manera óptima.',
    nl: 'Ja, we bieden uitgebreide ondersteuningspakketten om ervoor te zorgen dat uw AI-systemen optimaal blijven presteren.'
  },
  'contact.faq.q3': {
    en: 'Can you integrate with our existing systems?',
    fr: 'Pouvez-vous intégrer nos systèmes existants ?',
    es: '¿Pueden integrarse con nuestros sistemas existentes?',
    nl: 'Kunnen jullie integreren met onze bestaande systemen?'
  },
  'contact.faq.a3': {
    en: 'Absolutely! We specialize in seamless integration with existing business tools and platforms.',
    fr: 'Absolument ! Nous sommes spécialisés dans l\'intégration transparente avec les outils et plateformes métier existants.',
    es: '¡Por supuesto! Nos especializamos en la integración perfecta con las herramientas y plataformas empresariales existentes.',
    nl: 'Absoluut! We zijn gespecialiseerd in naadloze integratie met bestaande bedrijfstools en platforms.'
  },
  'contact.faq.q4': {
    en: 'What\'s the ROI of AI automation?',
    fr: 'Quel est le ROI de l\'automatisation IA ?',
    es: '¿Cuál es el ROI de la automatización de IA?',
    nl: 'Wat is de ROI van AI-automatisering?'
  },
  'contact.faq.a4': {
    en: 'Most clients see 40-70% efficiency gains and ROI within 3-6 months of implementation.',
    fr: 'La plupart des clients constatent des gains d\'efficacité de 40 à 70% et un ROI dans les 3 à 6 mois suivant la mise en œuvre.',
    es: 'La mayoría de los clientes ven ganancias de eficiencia del 40-70% y ROI dentro de los 3-6 meses de implementación.',
    nl: 'De meeste klanten zien 40-70% efficiëntiewinst en ROI binnen 3-6 maanden na implementatie.'
  },
  'contact.error': {
    en: 'Something went wrong while sending your message. Please try again in a moment.',
    fr: 'Un problème est survenu lors de l\'envoi de votre message. Veuillez réessayer dans un instant.',
    es: 'Algo salió mal al enviar tu mensaje. Por favor intenta de nuevo en un momento.',
    nl: 'Er is iets misgegaan bij het verzenden van uw bericht. Probeer het over een moment opnieuw.'
  },

  // Contact services list
  'contact.service.workflow': {
    en: 'AI Workflow Automation',
    fr: 'Automatisation de Flux de Travail IA',
    es: 'Automatización de Flujos de Trabajo IA',
    nl: 'AI Werkstroomautomatisering'
  },
  'contact.service.calling': {
    en: 'Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid',
    es: 'Sistemas de Llamadas en Frío',
    nl: 'Cold Calling Systemen'
  },
  'contact.service.email': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
    es: 'Automatización de Email Marketing',
    nl: 'E-mail Marketing Automatisering'
  },
  'contact.service.web': {
    en: 'Web Development',
    fr: 'Développement Web',
    es: 'Desarrollo Web',
    nl: 'Webontwikkeling'
  },
  'contact.service.chatbots': {
    en: 'Custom AI Chatbots',
    fr: 'Chatbots IA Personnalisés',
    es: 'Chatbots de IA Personalizados',
    nl: 'Aangepaste AI Chatbots'
  },
  'contact.service.agentic': {
    en: 'AI Agentic Systems',
    fr: 'Systèmes d\'Agents IA',
    es: 'Sistemas de Agentes IA',
    nl: 'AI Agentische Systemen'
  },
  'contact.service.consultation': {
    en: 'Consultation & Strategy',
    fr: 'Consultation et Stratégie',
    es: 'Consultoría y Estrategia',
    nl: 'Consultatie & Strategie'
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
  'about.projects_delivered': {
    en: 'Projects Delivered',
    fr: 'Projets Livrés',
    es: 'Proyectos Entregados',
    nl: 'Projecten Opgeleverd'
  },
  'about.countries_served': {
    en: 'Countries Served',
    fr: 'Pays Desservis',
    es: 'Países Atendidos',
    nl: 'Landen Bediend'
  },
  'about.mission_title': {
    en: 'Our Mission',
    fr: 'Notre Mission',
    es: 'Nuestra Misión',
    nl: 'Onze Missie'
  },
  'about.mission_text': {
    en: 'To democratize AI automation by making advanced technologies accessible to businesses of all sizes. We believe every company should have the power to optimize their operations through intelligent systems.',
    fr: 'Démocratiser l\'automatisation IA en rendant les technologies avancées accessibles aux entreprises de toutes tailles. Nous croyons que chaque entreprise devrait avoir le pouvoir d\'optimiser ses opérations grâce à des systèmes intelligents.',
    es: 'Democratizar la automatización de IA haciendo que las tecnologías avanzadas sean accesibles para empresas de todos los tamaños. Creemos que cada empresa debería tener el poder de optimizar sus operaciones a través de sistemas inteligentes.',
    nl: 'AI-automatisering democratiseren door geavanceerde technologieën toegankelijk te maken voor bedrijven van alle groottes. Wij geloven dat elk bedrijf de kracht moet hebben om hun activiteiten te optimaliseren door middel van intelligente systemen.'
  },
  'about.vision_title': {
    en: 'Our Vision',
    fr: 'Notre Vision',
    es: 'Nuestra Visión',
    nl: 'Onze Visie'
  },
  'about.vision_text': {
    en: 'To be the global leader in AI-powered business transformation, creating a world where intelligent automation enhances human potential and drives sustainable growth across all industries.',
    fr: 'Être le leader mondial de la transformation d\'entreprise propulsée par l\'IA, créant un monde où l\'automatisation intelligente amplifie le potentiel humain et stimule une croissance durable dans tous les secteurs.',
    es: 'Ser el líder global en transformación empresarial impulsada por IA, creando un mundo donde la automatización inteligente potencia el potencial humano e impulsa el crecimiento sostenible en todas las industrias.',
    nl: 'De wereldleider zijn in AI-aangedreven bedrijfstransformatie, en een wereld creëren waarin intelligente automatisering het menselijk potentieel versterkt en duurzame groei stimuleert in alle sectoren.'
  },
  'about.values_title': {
    en: 'Our Values',
    fr: 'Nos Valeurs',
    es: 'Nuestros Valores',
    nl: 'Onze Waarden'
  },
  'about.values_subtitle': {
    en: 'The principles that guide everything we do and every solution we create.',
    fr: 'Les principes qui guident tout ce que nous faisons et chaque solution que nous créons.',
    es: 'Los principios que guían todo lo que hacemos y cada solución que creamos.',
    nl: 'De principes die alles wat we doen en elke oplossing die we creëren, leiden.'
  },
  'about.value.innovation': {
    en: 'Innovation First',
    fr: 'L\'Innovation d\'Abord',
    es: 'Innovación Primero',
    nl: 'Innovatie Eerst'
  },
  'about.value.innovation_desc': {
    en: 'We stay at the forefront of AI technology to deliver cutting-edge solutions.',
    fr: 'Nous restons à la pointe de la technologie IA pour fournir des solutions de pointe.',
    es: 'Nos mantenemos a la vanguardia de la tecnología IA para ofrecer soluciones de última generación.',
    nl: 'We blijven aan de top van AI-technologie om geavanceerde oplossingen te leveren.'
  },
  'about.value.client_success': {
    en: 'Client Success',
    fr: 'Succès Client',
    es: 'Éxito del Cliente',
    nl: 'Klantsucces'
  },
  'about.value.client_success_desc': {
    en: 'Your success is our success. We\'re committed to delivering exceptional results.',
    fr: 'Votre succès est notre succès. Nous nous engageons à fournir des résultats exceptionnels.',
    es: 'Tu éxito es nuestro éxito. Estamos comprometidos a entregar resultados excepcionales.',
    nl: 'Uw succes is ons succes. We zetten ons in voor het leveren van uitzonderlijke resultaten.'
  },
  'about.value.efficiency': {
    en: 'Efficiency',
    fr: 'Efficacité',
    es: 'Eficiencia',
    nl: 'Efficiëntie'
  },
  'about.value.efficiency_desc': {
    en: 'We optimize every process to maximize productivity and minimize waste.',
    fr: 'Nous optimisons chaque processus pour maximiser la productivité et minimiser le gaspillage.',
    es: 'Optimizamos cada proceso para maximizar la productividad y minimizar el desperdicio.',
    nl: 'We optimaliseren elk proces om de productiviteit te maximaliseren en verspilling te minimaliseren.'
  },
  'about.value.transparency': {
    en: 'Transparency',
    fr: 'Transparence',
    es: 'Transparencia',
    nl: 'Transparantie'
  },
  'about.value.transparency_desc': {
    en: 'Clear communication and honest partnerships are the foundation of our work.',
    fr: 'La communication claire et les partenariats honnêtes sont le fondement de notre travail.',
    es: 'La comunicación clara y las asociaciones honestas son la base de nuestro trabajo.',
    nl: 'Duidelijke communicatie en eerlijke partnerschappen vormen de basis van ons werk.'
  },
  'about.team_title': {
    en: 'Meet Our Team',
    fr: 'Rencontrez Notre Équipe',
    es: 'Conoce a Nuestro Equipo',
    nl: 'Maak Kennis met Ons Team'
  },
  'about.team_subtitle': {
    en: 'Passionate experts dedicated to delivering exceptional AI solutions.',
    fr: 'Des experts passionnés dédiés à fournir des solutions IA exceptionnelles.',
    es: 'Expertos apasionados dedicados a ofrecer soluciones de IA excepcionales.',
    nl: 'Gepassioneerde experts toegewijd aan het leveren van uitzonderlijke AI-oplossingen.'
  },
  'about.team.role1': {
    en: 'CEO & AI Strategist',
    fr: 'PDG et Stratège IA',
    es: 'CEO y Estratega de IA',
    nl: 'CEO & AI-Strateeg'
  },
  'about.team.bio1': {
    en: 'Leading AI transformation with 10+ years in automation and machine learning.',
    fr: 'Dirige la transformation IA avec plus de 10 ans d\'expérience en automatisation et apprentissage automatique.',
    es: 'Liderando la transformación de IA con más de 10 años en automatización y aprendizaje automático.',
    nl: 'Leidt AI-transformatie met 10+ jaar ervaring in automatisering en machine learning.'
  },
  'about.team.role2': {
    en: 'CTO & Lead Developer',
    fr: 'CTO et Développeur Principal',
    es: 'CTO y Desarrollador Principal',
    nl: 'CTO & Hoofdontwikkelaar'
  },
  'about.team.bio2': {
    en: 'Expert in React, Node.js, and AI integration with a passion for clean code.',
    fr: 'Expert en React, Node.js et intégration IA avec une passion pour le code propre.',
    es: 'Experto en React, Node.js e integración de IA con pasión por el código limpio.',
    nl: 'Expert in React, Node.js en AI-integratie met een passie voor schone code.'
  },
  'about.team.role3': {
    en: 'AI Solutions Architect',
    fr: 'Architecte Solutions IA',
    es: 'Arquitecto de Soluciones IA',
    nl: 'AI-Oplossingsarchitect'
  },
  'about.team.bio3': {
    en: 'Specializes in n8n workflows and enterprise automation systems.',
    fr: 'Spécialisé dans les flux de travail n8n et les systèmes d\'automatisation d\'entreprise.',
    es: 'Especializado en flujos de trabajo n8n y sistemas de automatización empresarial.',
    nl: 'Gespecialiseerd in n8n-workflows en enterprise-automatiseringssystemen.'
  },
  'about.team.role4': {
    en: 'UX/UI Designer',
    fr: 'Designer UX/UI',
    es: 'Diseñador UX/UI',
    nl: 'UX/UI Ontwerper'
  },
  'about.team.bio4': {
    en: 'Creates intuitive interfaces that make complex AI systems accessible to everyone.',
    fr: 'Crée des interfaces intuitives qui rendent les systèmes IA complexes accessibles à tous.',
    es: 'Crea interfaces intuitivas que hacen que los sistemas de IA complejos sean accesibles para todos.',
    nl: 'Creëert intuïtieve interfaces die complexe AI-systemen toegankelijk maken voor iedereen.'
  },
  'about.journey_title': {
    en: 'Our Journey',
    fr: 'Notre Parcours',
    es: 'Nuestro Recorrido',
    nl: 'Onze Reis'
  },
  'about.journey_subtitle': {
    en: 'Key milestones in our mission to transform businesses through AI.',
    fr: 'Les étapes clés de notre mission de transformer les entreprises grâce à l\'IA.',
    es: 'Hitos clave en nuestra misión de transformar empresas a través de la IA.',
    nl: 'Belangrijke mijlpalen in onze missie om bedrijven te transformeren door AI.'
  },
  'about.milestone.1_title': {
    en: 'Company Founded',
    fr: 'Création de l\'Entreprise',
    es: 'Empresa Fundada',
    nl: 'Bedrijf Opgericht'
  },
  'about.milestone.1_desc': {
    en: 'Started with a vision to democratize AI automation',
    fr: 'Démarrage avec la vision de démocratiser l\'automatisation IA',
    es: 'Comenzamos con la visión de democratizar la automatización de IA',
    nl: 'Gestart met de visie om AI-automatisering te democratiseren'
  },
  'about.milestone.2_title': {
    en: 'First 10 Clients',
    fr: '10 Premiers Clients',
    es: 'Primeros 10 Clientes',
    nl: 'Eerste 10 Klanten'
  },
  'about.milestone.2_desc': {
    en: 'Successfully automated workflows for early adopters',
    fr: 'Automatisation réussie des flux de travail pour les premiers adopteurs',
    es: 'Automatización exitosa de flujos de trabajo para los primeros adoptantes',
    nl: 'Succesvol workflows geautomatiseerd voor early adopters'
  },
  'about.milestone.3_title': {
    en: 'International Expansion',
    fr: 'Expansion Internationale',
    es: 'Expansión Internacional',
    nl: 'Internationale Uitbreiding'
  },
  'about.milestone.3_desc': {
    en: 'Extended services to 15+ countries worldwide',
    fr: 'Extension des services à plus de 15 pays dans le monde',
    es: 'Servicios extendidos a más de 15 países en todo el mundo',
    nl: 'Diensten uitgebreid naar 15+ landen wereldwijd'
  },
  'about.milestone.4_title': {
    en: '50+ Projects',
    fr: '50+ Projets',
    es: '50+ Proyectos',
    nl: '50+ Projecten'
  },
  'about.milestone.4_desc': {
    en: 'Completed major enterprise automation projects',
    fr: 'Achèvement de projets majeurs d\'automatisation d\'entreprise',
    es: 'Proyectos principales de automatización empresarial completados',
    nl: 'Grote enterprise-automatiseringsprojecten voltooid'
  },
  'about.milestone.5_title': {
    en: 'AI Innovation Hub',
    fr: 'Pôle d\'Innovation IA',
    es: 'Centro de Innovación IA',
    nl: 'AI-Innovatiehub'
  },
  'about.milestone.5_desc': {
    en: 'Launched advanced AI agent development services',
    fr: 'Lancement de services avancés de développement d\'agents IA',
    es: 'Lanzamiento de servicios avanzados de desarrollo de agentes de IA',
    nl: 'Lancering van geavanceerde AI-agentontwikkelingsdiensten'
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
  },
  'common.all': {
    en: 'All',
    fr: 'Tout',
    es: 'Todos',
    nl: 'Alles'
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
