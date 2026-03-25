import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

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
  },
  'nav.about': {
    en: 'About',
    fr: 'À Propos',
  },
  'nav.services': {
    en: 'Services',
    fr: 'Services',
  },
  'nav.projects': {
    en: 'Projects',
    fr: 'Projets',
  },
  'nav.blog': {
    en: 'Blog',
    fr: 'Blog',
  },
  'nav.contact': {
    en: 'Contact',
    fr: 'Contact',
  },

  // Hero Section
  'hero.title': {
    en: 'Transform Your Business with AI',
    fr: 'Transformez Votre Entreprise avec l\'IA',
  },
  'hero.subtitle': {
    en: 'We build intelligent systems that scale your operations, boost productivity, and drive growth through cutting-edge AI technologies.',
    fr: 'Nous construisons des systèmes intelligents qui développent vos opérations, augmentent la productivité et stimulent la croissance grâce aux technologies IA de pointe.',
  },
  'hero.cta': {
    en: 'Get Started Today',
    fr: 'Commencer Aujourd\'hui',
  },
  'hero.view_work': {
    en: 'View Our Work',
    fr: 'Voir Notre Travail',
  },

  // Home Page
  'home.badge': {
    en: '🚀 AI-Powered Business Solutions',
    fr: '🚀 Solutions d\'Entreprise Propulsées par l\'IA',
  },
  'home.typewriter.1': {
    en: 'Intelligent workflow automation',
    fr: 'Automatisation intelligente des flux de travail',
  },
  'home.typewriter.2': {
    en: 'AI-powered business solutions',
    fr: 'Solutions d\'entreprise propulsées par l\'IA',
  },
  'home.typewriter.3': {
    en: 'Custom chatbot development',
    fr: 'Développement de chatbots sur mesure',
  },
  'home.typewriter.4': {
    en: 'Enterprise AI integration',
    fr: 'Intégration IA en entreprise',
  },
  'home.floating.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
  },
  'home.floating.projects': {
    en: '50+ Projects',
    fr: '50+ Projets',
  },
  'home.floating.success_rate': {
    en: '98% Success Rate',
    fr: '98% Taux de Réussite',
  },
  'home.floating.satisfaction': {
    en: 'Client Satisfaction',
    fr: 'Satisfaction Client',
  },

  // Stats
  'stats.projects_completed': {
    en: 'Projects Completed',
    fr: 'Projets Réalisés',
  },
  'stats.client_satisfaction': {
    en: 'Client Satisfaction',
    fr: 'Satisfaction Client',
  },
  'stats.efficiency_gain': {
    en: 'Average Efficiency Gain',
    fr: 'Gain d\'Efficacité Moyen',
  },
  'stats.countries_served': {
    en: 'Countries Served',
    fr: 'Pays Desservis',
  },

  // Benefits
  'benefits.title': {
    en: 'Why Choose AI Automation?',
    fr: 'Pourquoi Choisir l\'Automatisation IA ?',
  },
  'benefits.subtitle': {
    en: 'Transform your business operations with intelligent automation that delivers measurable results.',
    fr: 'Transformez vos opérations commerciales grâce à une automatisation intelligente qui produit des résultats mesurables.',
  },
  'benefits.increase_productivity': {
    en: 'Increase Productivity',
    fr: 'Augmenter la Productivité',
  },
  'benefits.increase_productivity_desc': {
    en: 'Automate repetitive tasks and focus on what matters most',
    fr: 'Automatisez les tâches répétitives et concentrez-vous sur l\'essentiel',
  },
  'benefits.reduce_errors': {
    en: 'Reduce Errors',
    fr: 'Réduire les Erreurs',
  },
  'benefits.reduce_errors_desc': {
    en: 'AI-powered systems eliminate human error and ensure accuracy',
    fr: 'Les systèmes alimentés par l\'IA éliminent les erreurs humaines et garantissent la précision',
  },
  'benefits.save_time': {
    en: 'Save Time & Money',
    fr: 'Gagner du Temps et de l\'Argent',
  },
  'benefits.save_time_desc': {
    en: 'Cut operational costs while accelerating business processes',
    fr: 'Réduisez les coûts opérationnels tout en accélérant les processus métier',
  },
  'benefits.scale': {
    en: 'Scale Efficiently',
    fr: 'Évoluer Efficacement',
  },
  'benefits.scale_desc': {
    en: 'Grow your business without proportionally increasing overhead',
    fr: 'Développez votre entreprise sans augmenter proportionnellement les frais généraux',
  },

  // Technologies
  'tech.title': {
    en: 'Technologies We Master',
    fr: 'Technologies que Nous Maîtrisons',
  },
  'tech.subtitle': {
    en: 'We work with cutting-edge tools and platforms to deliver exceptional AI solutions.',
    fr: 'Nous travaillons avec des outils et des plateformes de pointe pour fournir des solutions IA exceptionnelles.',
  },

  // Testimonials
  'testimonials.title': {
    en: 'What Our Clients Say',
    fr: 'Ce que Disent Nos Clients',
  },
  'testimonials.subtitle': {
    en: 'Don\'t just take our word for it. Here\'s what our satisfied clients have to say about our AI solutions.',
    fr: 'Ne nous croyez pas sur parole. Voici ce que nos clients satisfaits disent de nos solutions IA.',
  },
  'testimonials.1': {
    en: 'Stepup AI transformed our operations with their intelligent automation. We saw 60% efficiency gains within the first month.',
    fr: 'Stepup AI a transformé nos opérations grâce à leur automatisation intelligente. Nous avons constaté des gains d\'efficacité de 60% dès le premier mois.',
  },
  'testimonials.2': {
    en: 'Their AI assistant for school administration has revolutionized how we manage student data and scheduling.',
    fr: 'Leur assistant IA pour l\'administration scolaire a révolutionné notre gestion des données étudiantes et de la planification.',
  },
  'testimonials.3': {
    en: 'The LinkedIn automation system increased our lead generation by 300%. Absolutely incredible results!',
    fr: 'Le système d\'automatisation LinkedIn a augmenté notre génération de leads de 300%. Des résultats absolument incroyables !',
  },

  // Video/Demo
  'demo.title': {
    en: 'See Our AI Solutions in Action',
    fr: 'Découvrez Nos Solutions IA en Action',
  },
  'demo.subtitle': {
    en: 'Watch how our AI automation transforms business operations and delivers exceptional results for our clients.',
    fr: 'Découvrez comment notre automatisation IA transforme les opérations commerciales et offre des résultats exceptionnels à nos clients.',
  },
  'demo.check1': {
    en: 'Real-time workflow automation',
    fr: 'Automatisation des flux de travail en temps réel',
  },
  'demo.check2': {
    en: 'Intelligent data processing',
    fr: 'Traitement intelligent des données',
  },
  'demo.check3': {
    en: 'Seamless system integration',
    fr: 'Intégration système transparente',
  },
  'demo.watch': {
    en: 'Watch Demo Video',
    fr: 'Regarder la Vidéo Démo',
  },
  'demo.efficiency': {
    en: 'See how we\'ve helped businesses achieve 40% efficiency gains through intelligent automation.',
    fr: 'Découvrez comment nous avons aidé les entreprises à réaliser des gains d\'efficacité de 40% grâce à l\'automatisation intelligente.',
  },

  // Featured Services on Home
  'home.service.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
  },
  'home.service.ai_automation_desc': {
    en: 'Intelligent workflow automation with n8n and Make.com',
    fr: 'Automatisation intelligente des flux de travail avec n8n et Make.com',
  },
  'home.service.ai_calling': {
    en: 'AI Cold Calling',
    fr: 'Appels à Froid IA',
  },
  'home.service.ai_calling_desc': {
    en: 'VAPI-powered calling systems with CRM integration',
    fr: 'Systèmes d\'appels propulsés par VAPI avec intégration CRM',
  },
  'home.service.web_dev': {
    en: 'Web Development',
    fr: 'Développement Web',
  },
  'home.service.web_dev_desc': {
    en: 'Modern applications with React and Supabase',
    fr: 'Applications modernes avec React et Supabase',
  },

  // Services
  'services.title': {
    en: 'Our Services',
    fr: 'Nos Services',
  },
  'services.subtitle': {
    en: 'Comprehensive AI solutions designed to transform your business operations.',
    fr: 'Solutions IA complètes conçues pour transformer vos opérations commerciales.',
  },
  'services.ai_automation': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
  },
  'services.cold_calling': {
    en: 'AI Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid IA',
  },
  'services.email_marketing': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
  },
  'services.web_development': {
    en: 'Web Development',
    fr: 'Développement Web',
  },
  'services.that_transform': {
    en: 'That Transform',
    fr: 'qui Transforment',
  },
  'services.process_title': {
    en: 'Our Process',
    fr: 'Notre Processus',
  },
  'services.process_subtitle': {
    en: 'A proven methodology that ensures successful AI implementation and maximum ROI.',
    fr: 'Une méthodologie éprouvée qui assure une mise en œuvre IA réussie et un ROI maximum.',
  },
  'services.key_features': {
    en: 'Key Features:',
    fr: 'Fonctionnalités Clés :',
  },
  'services.technologies': {
    en: 'Technologies:',
    fr: 'Technologies :',
  },
  'services.ready_automate': {
    en: 'Ready to Automate Your Business?',
    fr: 'Prêt à Automatiser Votre Entreprise ?',
  },
  'services.ready_automate_desc': {
    en: 'Let\'s discuss how our AI solutions can transform your operations and drive growth.',
    fr: 'Discutons de la façon dont nos solutions IA peuvent transformer vos opérations et stimuler la croissance.',
  },

  // Service titles & descriptions
  'services.item.workflow_title': {
    en: 'AI Workflow Automation',
    fr: 'Automatisation de Flux de Travail IA',
  },
  'services.item.workflow_desc': {
    en: 'Streamline your business processes with intelligent automation using industry-leading platforms.',
    fr: 'Simplifiez vos processus métier grâce à l\'automatisation intelligente utilisant des plateformes leaders du marché.',
  },
  'services.item.calling_title': {
    en: 'AI Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid IA',
  },
  'services.item.calling_desc': {
    en: 'Revolutionary voice AI systems that handle outbound calls with human-like conversations.',
    fr: 'Systèmes révolutionnaires d\'IA vocale qui gèrent les appels sortants avec des conversations naturelles.',
  },
  'services.item.email_title': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
  },
  'services.item.email_desc': {
    en: 'Intelligent email campaigns that nurture leads and convert prospects automatically.',
    fr: 'Campagnes email intelligentes qui cultivent les leads et convertissent les prospects automatiquement.',
  },
  'services.item.web_title': {
    en: 'Web Development',
    fr: 'Développement Web',
  },
  'services.item.web_desc': {
    en: 'Modern, scalable web applications built with cutting-edge technologies.',
    fr: 'Applications web modernes et évolutives construites avec des technologies de pointe.',
  },
  'services.item.chatbot_title': {
    en: 'Custom AI Chatbots',
    fr: 'Chatbots IA Personnalisés',
  },
  'services.item.chatbot_desc': {
    en: 'Intelligent conversational interfaces that understand and assist your customers 24/7.',
    fr: 'Interfaces conversationnelles intelligentes qui comprennent et assistent vos clients 24h/24.',
  },
  'services.item.agentic_title': {
    en: 'AI Agentic Systems',
    fr: 'Systèmes d\'Agents IA',
  },
  'services.item.agentic_desc': {
    en: 'Autonomous AI agents that can perform complex tasks and make decisions independently.',
    fr: 'Agents IA autonomes capables d\'effectuer des tâches complexes et de prendre des décisions de manière indépendante.',
  },

  // Process steps
  'services.process.step1_title': {
    en: 'Discovery & Analysis',
    fr: 'Découverte et Analyse',
  },
  'services.process.step1_desc': {
    en: 'We analyze your current processes and identify automation opportunities.',
    fr: 'Nous analysons vos processus actuels et identifions les opportunités d\'automatisation.',
  },
  'services.process.step2_title': {
    en: 'Strategy & Planning',
    fr: 'Stratégie et Planification',
  },
  'services.process.step2_desc': {
    en: 'Develop a comprehensive automation strategy tailored to your business.',
    fr: 'Développer une stratégie d\'automatisation complète adaptée à votre entreprise.',
  },
  'services.process.step3_title': {
    en: 'Development & Integration',
    fr: 'Développement et Intégration',
  },
  'services.process.step3_desc': {
    en: 'Build and integrate AI solutions with your existing systems.',
    fr: 'Construire et intégrer des solutions IA avec vos systèmes existants.',
  },
  'services.process.step4_title': {
    en: 'Testing & Optimization',
    fr: 'Tests et Optimisation',
  },
  'services.process.step4_desc': {
    en: 'Rigorous testing and continuous optimization for peak performance.',
    fr: 'Tests rigoureux et optimisation continue pour des performances optimales.',
  },

  // Projects
  'projects.title': {
    en: 'Featured Projects',
    fr: 'Projets en Vedette',
  },
  'projects.subtitle': {
    en: 'Discover how we\'ve transformed businesses across industries with innovative AI automation solutions.',
    fr: 'Découvrez comment nous avons transformé les entreprises de tous secteurs avec des solutions d\'automatisation IA innovantes.',
  },
  'projects.success_stories': {
    en: '& Success Stories',
    fr: '& Histoires de Succès',
  },
  'projects.search': {
    en: 'Search projects...',
    fr: 'Rechercher des projets...',
  },
  'projects.no_results': {
    en: 'No projects found matching your criteria.',
    fr: 'Aucun projet ne correspond à vos critères.',
  },
  'projects.tech_used': {
    en: 'Technologies Used:',
    fr: 'Technologies Utilisées :',
  },
  'projects.key_features': {
    en: 'Key Features:',
    fr: 'Fonctionnalités Clés :',
  },
  'projects.results': {
    en: 'Results:',
    fr: 'Résultats :',
  },
  'projects.view_demo': {
    en: 'View Demo',
    fr: 'Voir la Démo',
  },
  'projects.case_study': {
    en: 'Case Study',
    fr: 'Étude de Cas',
  },
  'projects.ready_start': {
    en: 'Ready to Start Your Project?',
    fr: 'Prêt à Démarrer Votre Projet ?',
  },
  'projects.ready_start_desc': {
    en: 'Let\'s discuss how we can create a custom AI solution for your business needs.',
    fr: 'Discutons de la façon dont nous pouvons créer une solution IA personnalisée pour vos besoins.',
  },
  'projects.view_services': {
    en: 'View Our Services',
    fr: 'Voir Nos Services',
  },

  // Blog
  'blog.title': {
    en: 'Latest Insights',
    fr: 'Dernières Insights',
  },
  'blog.subtitle': {
    en: 'Stay ahead with the latest AI automation trends, tips, and case studies.',
    fr: 'Restez en avance avec les dernières tendances, conseils et études de cas en automatisation IA.',
  },
  'blog.header': {
    en: 'AI Insights & Automation Tips',
    fr: 'Insights IA et Conseils d\'Automatisation',
  },
  'blog.search': {
    en: 'Search articles...',
    fr: 'Rechercher des articles...',
  },
  'blog.no_results': {
    en: 'No articles found matching your criteria.',
    fr: 'Aucun article ne correspond à vos critères.',
  },
  'blog.featured': {
    en: 'Featured',
    fr: 'À la Une',
  },
  'blog.email_placeholder': {
    en: 'Enter your email',
    fr: 'Entrez votre email',
  },

  // Contact
  'contact.title': {
    en: 'Let\'s Build Something Amazing Together',
    fr: 'Construisons Quelque Chose d\'Extraordinaire Ensemble',
  },
  'contact.subtitle': {
    en: 'Ready to transform your business with AI? Get in touch for a free consultation and discover how we can help you achieve your goals.',
    fr: 'Prêt à transformer votre entreprise avec l\'IA ? Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous aider à atteindre vos objectifs.',
  },
  'contact.success_message': {
    en: 'Thank you, we will get in touch soon.',
    fr: 'Merci, nous vous contacterons très bientôt.',
  },
  'contact.send_message': {
    en: 'Send us a message',
    fr: 'Envoyez-nous un message',
  },
  'contact.full_name': {
    en: 'Full Name *',
    fr: 'Nom Complet *',
  },
  'contact.full_name_placeholder': {
    en: 'Your full name',
    fr: 'Votre nom complet',
  },
  'contact.email': {
    en: 'Email Address *',
    fr: 'Adresse Email *',
  },
  'contact.email_placeholder': {
    en: 'your@email.com',
    fr: 'votre@email.com',
  },
  'contact.company': {
    en: 'Company Name',
    fr: 'Nom de l\'Entreprise',
  },
  'contact.company_placeholder': {
    en: 'Your company name',
    fr: 'Nom de votre entreprise',
  },
  'contact.service_interest': {
    en: 'Service Interested In',
    fr: 'Service Souhaité',
  },
  'contact.select_service': {
    en: 'Select a service',
    fr: 'Sélectionnez un service',
  },
  'contact.message': {
    en: 'Message *',
    fr: 'Message *',
  },
  'contact.message_placeholder': {
    en: 'Tell us about your project and how we can help...',
    fr: 'Parlez-nous de votre projet et comment nous pouvons vous aider...',
  },
  'contact.sending': {
    en: 'Sending...',
    fr: 'Envoi en cours...',
  },
  'contact.send': {
    en: 'Send Message',
    fr: 'Envoyer le Message',
  },
  'contact.get_in_touch': {
    en: 'Get in touch',
    fr: 'Contactez-nous',
  },
  'contact.get_in_touch_desc': {
    en: 'We\'d love to hear from you. Choose the most convenient way to reach us and we\'ll respond as quickly as possible.',
    fr: 'Nous serions ravis de vous entendre. Choisissez le moyen le plus pratique de nous contacter et nous vous répondrons le plus rapidement possible.',
  },
  'contact.info.email': {
    en: 'Email Us',
    fr: 'Écrivez-nous',
  },
  'contact.info.email_desc': {
    en: 'Send us an email anytime',
    fr: 'Envoyez-nous un email à tout moment',
  },
  'contact.info.phone': {
    en: 'Call Us',
    fr: 'Appelez-nous',
  },
  'contact.info.phone_desc': {
    en: 'Mon-Fri from 8am to 5pm',
    fr: 'Lun-Ven de 8h à 17h',
  },
  'contact.info.visit': {
    en: 'Visit Us',
    fr: 'Visitez-nous',
  },
  'contact.info.visit_desc': {
    en: 'Come say hello at our office',
    fr: 'Venez nous dire bonjour à notre bureau',
  },
  'contact.info.hours': {
    en: 'Working Hours',
    fr: 'Horaires de Travail',
  },
  'contact.info.hours_detail': {
    en: 'Mon-Fri: 8am-5pm',
    fr: 'Lun-Ven : 8h-17h',
  },
  'contact.info.hours_desc': {
    en: 'We\'re here to help',
    fr: 'Nous sommes là pour vous aider',
  },
  'contact.location': {
    en: 'Our Location',
    fr: 'Notre Emplacement',
  },
  'contact.map_soon': {
    en: 'Interactive map coming soon',
    fr: 'Carte interactive bientôt disponible',
  },
  'contact.faq_title': {
    en: 'Frequently Asked Questions',
    fr: 'Questions Fréquemment Posées',
  },
  'contact.faq_subtitle': {
    en: 'Quick answers to common questions about our AI automation services.',
    fr: 'Réponses rapides aux questions courantes sur nos services d\'automatisation IA.',
  },
  'contact.faq.q1': {
    en: 'How long does it take to implement an AI solution?',
    fr: 'Combien de temps faut-il pour mettre en place une solution IA ?',
  },
  'contact.faq.a1': {
    en: 'Implementation time varies based on complexity, typically ranging from 2-8 weeks for most projects.',
    fr: 'Le temps de mise en œuvre varie selon la complexité, allant généralement de 2 à 8 semaines pour la plupart des projets.',
  },
  'contact.faq.q2': {
    en: 'Do you provide ongoing support and maintenance?',
    fr: 'Offrez-vous un support et une maintenance continus ?',
  },
  'contact.faq.a2': {
    en: 'Yes, we offer comprehensive support packages to ensure your AI systems continue to perform optimally.',
    fr: 'Oui, nous proposons des forfaits de support complets pour garantir que vos systèmes IA continuent de fonctionner de manière optimale.',
  },
  'contact.faq.q3': {
    en: 'Can you integrate with our existing systems?',
    fr: 'Pouvez-vous intégrer nos systèmes existants ?',
  },
  'contact.faq.a3': {
    en: 'Absolutely! We specialize in seamless integration with existing business tools and platforms.',
    fr: 'Absolument ! Nous sommes spécialisés dans l\'intégration transparente avec les outils et plateformes métier existants.',
  },
  'contact.faq.q4': {
    en: 'What\'s the ROI of AI automation?',
    fr: 'Quel est le ROI de l\'automatisation IA ?',
  },
  'contact.faq.a4': {
    en: 'Most clients see 40-70% efficiency gains and ROI within 3-6 months of implementation.',
    fr: 'La plupart des clients constatent des gains d\'efficacité de 40 à 70% et un ROI dans les 3 à 6 mois suivant la mise en œuvre.',
  },
  'contact.error': {
    en: 'Something went wrong while sending your message. Please try again in a moment.',
    fr: 'Un problème est survenu lors de l\'envoi de votre message. Veuillez réessayer dans un instant.',
  },

  // Contact services list
  'contact.service.workflow': {
    en: 'AI Workflow Automation',
    fr: 'Automatisation de Flux de Travail IA',
  },
  'contact.service.calling': {
    en: 'Cold Calling Systems',
    fr: 'Systèmes d\'Appels à Froid',
  },
  'contact.service.email': {
    en: 'Email Marketing Automation',
    fr: 'Automatisation du Marketing Email',
  },
  'contact.service.web': {
    en: 'Web Development',
    fr: 'Développement Web',
  },
  'contact.service.chatbots': {
    en: 'Custom AI Chatbots',
    fr: 'Chatbots IA Personnalisés',
  },
  'contact.service.agentic': {
    en: 'AI Agentic Systems',
    fr: 'Systèmes d\'Agents IA',
  },
  'contact.service.consultation': {
    en: 'Consultation & Strategy',
    fr: 'Consultation et Stratégie',
  },

  // About
  'about.title': {
    en: 'About Stepup AI',
    fr: 'À Propos de Stepup AI',
  },
  'about.subtitle': {
    en: 'We\'re a team of AI enthusiasts, developers, and business strategists dedicated to transforming how companies operate through intelligent automation.',
    fr: 'Nous sommes une équipe d\'enthousiastes de l\'IA, de développeurs et de stratèges commerciaux dédiés à transformer la façon dont les entreprises fonctionnent grâce à l\'automatisation intelligente.',
  },
  'about.projects_delivered': {
    en: 'Projects Delivered',
    fr: 'Projets Livrés',
  },
  'about.countries_served': {
    en: 'Countries Served',
    fr: 'Pays Desservis',
  },
  'about.mission_title': {
    en: 'Our Mission',
    fr: 'Notre Mission',
  },
  'about.mission_text': {
    en: 'To democratize AI automation by making advanced technologies accessible to businesses of all sizes. We believe every company should have the power to optimize their operations through intelligent systems.',
    fr: 'Démocratiser l\'automatisation IA en rendant les technologies avancées accessibles aux entreprises de toutes tailles. Nous croyons que chaque entreprise devrait avoir le pouvoir d\'optimiser ses opérations grâce à des systèmes intelligents.',
  },
  'about.vision_title': {
    en: 'Our Vision',
    fr: 'Notre Vision',
  },
  'about.vision_text': {
    en: 'To be the global leader in AI-powered business transformation, creating a world where intelligent automation enhances human potential and drives sustainable growth across all industries.',
    fr: 'Être le leader mondial de la transformation d\'entreprise propulsée par l\'IA, créant un monde où l\'automatisation intelligente amplifie le potentiel humain et stimule une croissance durable dans tous les secteurs.',
  },
  'about.values_title': {
    en: 'Our Values',
    fr: 'Nos Valeurs',
  },
  'about.values_subtitle': {
    en: 'The principles that guide everything we do and every solution we create.',
    fr: 'Les principes qui guident tout ce que nous faisons et chaque solution que nous créons.',
  },
  'about.value.innovation': {
    en: 'Innovation First',
    fr: 'L\'Innovation d\'Abord',
  },
  'about.value.innovation_desc': {
    en: 'We stay at the forefront of AI technology to deliver cutting-edge solutions.',
    fr: 'Nous restons à la pointe de la technologie IA pour fournir des solutions de pointe.',
  },
  'about.value.client_success': {
    en: 'Client Success',
    fr: 'Succès Client',
  },
  'about.value.client_success_desc': {
    en: 'Your success is our success. We\'re committed to delivering exceptional results.',
    fr: 'Votre succès est notre succès. Nous nous engageons à fournir des résultats exceptionnels.',
  },
  'about.value.efficiency': {
    en: 'Efficiency',
    fr: 'Efficacité',
  },
  'about.value.efficiency_desc': {
    en: 'We optimize every process to maximize productivity and minimize waste.',
    fr: 'Nous optimisons chaque processus pour maximiser la productivité et minimiser le gaspillage.',
  },
  'about.value.transparency': {
    en: 'Transparency',
    fr: 'Transparence',
  },
  'about.value.transparency_desc': {
    en: 'Clear communication and honest partnerships are the foundation of our work.',
    fr: 'La communication claire et les partenariats honnêtes sont le fondement de notre travail.',
  },
  'about.team_title': {
    en: 'Meet Our Team',
    fr: 'Rencontrez Notre Équipe',
  },
  'about.team_subtitle': {
    en: 'Passionate experts dedicated to delivering exceptional AI solutions.',
    fr: 'Des experts passionnés dédiés à fournir des solutions IA exceptionnelles.',
  },
  'about.team.role1': {
    en: 'CEO & AI Strategist',
    fr: 'PDG et Stratège IA',
  },
  'about.team.bio1': {
    en: 'Leading AI transformation with 10+ years in automation and machine learning.',
    fr: 'Dirige la transformation IA avec plus de 10 ans d\'expérience en automatisation et apprentissage automatique.',
  },
  'about.team.role2': {
    en: 'CTO & Lead Developer',
    fr: 'CTO et Développeur Principal',
  },
  'about.team.bio2': {
    en: 'Expert in React, Node.js, and AI integration with a passion for clean code.',
    fr: 'Expert en React, Node.js et intégration IA avec une passion pour le code propre.',
  },
  'about.team.role3': {
    en: 'AI Solutions Architect',
    fr: 'Architecte Solutions IA',
  },
  'about.team.bio3': {
    en: 'Specializes in n8n workflows and enterprise automation systems.',
    fr: 'Spécialisé dans les flux de travail n8n et les systèmes d\'automatisation d\'entreprise.',
  },
  'about.team.role4': {
    en: 'UX/UI Designer',
    fr: 'Designer UX/UI',
  },
  'about.team.bio4': {
    en: 'Creates intuitive interfaces that make complex AI systems accessible to everyone.',
    fr: 'Crée des interfaces intuitives qui rendent les systèmes IA complexes accessibles à tous.',
  },
  'about.journey_title': {
    en: 'Our Journey',
    fr: 'Notre Parcours',
  },
  'about.journey_subtitle': {
    en: 'Key milestones in our mission to transform businesses through AI.',
    fr: 'Les étapes clés de notre mission de transformer les entreprises grâce à l\'IA.',
  },
  'about.milestone.1_title': {
    en: 'Company Founded',
    fr: 'Création de l\'Entreprise',
  },
  'about.milestone.1_desc': {
    en: 'Started with a vision to democratize AI automation',
    fr: 'Démarrage avec la vision de démocratiser l\'automatisation IA',
  },
  'about.milestone.2_title': {
    en: 'First 10 Clients',
    fr: '10 Premiers Clients',
  },
  'about.milestone.2_desc': {
    en: 'Successfully automated workflows for early adopters',
    fr: 'Automatisation réussie des flux de travail pour les premiers adopteurs',
  },
  'about.milestone.3_title': {
    en: 'International Expansion',
    fr: 'Expansion Internationale',
  },
  'about.milestone.3_desc': {
    en: 'Extended services to 15+ countries worldwide',
    fr: 'Extension des services à plus de 15 pays dans le monde',
  },
  'about.milestone.4_title': {
    en: '50+ Projects',
    fr: '50+ Projets',
  },
  'about.milestone.4_desc': {
    en: 'Completed major enterprise automation projects',
    fr: 'Achèvement de projets majeurs d\'automatisation d\'entreprise',
  },
  'about.milestone.5_title': {
    en: 'AI Innovation Hub',
    fr: 'Pôle d\'Innovation IA',
  },
  'about.milestone.5_desc': {
    en: 'Launched advanced AI agent development services',
    fr: 'Lancement de services avancés de développement d\'agents IA',
  },

  // Common
  'common.learn_more': {
    en: 'Learn More',
    fr: 'En Savoir Plus',
  },
  'common.get_started': {
    en: 'Get Started',
    fr: 'Commencer',
  },
  'common.view_all': {
    en: 'View All',
    fr: 'Voir Tout',
  },
  'common.read_more': {
    en: 'Read More',
    fr: 'Lire Plus',
  },
  'common.contact_us': {
    en: 'Contact Us',
    fr: 'Nous Contacter',
  },
  'common.our_services': {
    en: 'Our Services',
    fr: 'Nos Services',
  },
  'common.view_projects': {
    en: 'View Projects',
    fr: 'Voir les Projets',
  },
  'common.start_project': {
    en: 'Start Your Project',
    fr: 'Démarrer Votre Projet',
  },
  'common.ready_transform': {
    en: 'Ready to Transform Your Business?',
    fr: 'Prêt à Transformer Votre Entreprise ?',
  },
  'common.transform_cta': {
    en: 'Join 50+ companies that have already revolutionized their operations with our AI solutions.',
    fr: 'Rejoignez plus de 50 entreprises qui ont déjà révolutionné leurs opérations avec nos solutions IA.',
  },
  'common.core_services': {
    en: 'Our Core Services',
    fr: 'Nos Services Principaux',
  },
  'common.view_case_studies': {
    en: 'View Case Studies',
    fr: 'Voir les Études de Cas',
  },
  'common.about_us': {
    en: 'About Us',
    fr: 'À Propos de Nous',
  },
  'common.newsletter_title': {
    en: 'Stay Updated with AI Insights',
    fr: 'Restez Informé des Insights IA',
  },
  'common.newsletter_subtitle': {
    en: 'Subscribe to our newsletter for the latest AI automation tips and industry trends.',
    fr: 'Abonnez-vous à notre newsletter pour les derniers conseils d\'automatisation IA et tendances de l\'industrie.',
  },
  'common.subscribe': {
    en: 'Subscribe',
    fr: 'S\'abonner',
  },
  'common.all': {
    en: 'All',
    fr: 'Tout',
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
