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
  },

  // Services Features
  'services.feat.workflow1': {
    en: 'n8n Workflow Design',
    fr: 'Conception de workflows n8n',
  },
  'services.feat.workflow2': {
    en: 'Make.com Integration',
    fr: 'Intégration Make.com',
  },
  'services.feat.workflow3': {
    en: 'Zapier Automation',
    fr: 'Automatisation Zapier',
  },
  'services.feat.workflow4': {
    en: 'Custom API Connections',
    fr: 'Connexions API personnalisées',
  },
  'services.feat.calling1': {
    en: 'VAPI Voice Integration',
    fr: 'Intégration vocale VAPI',
  },
  'services.feat.calling2': {
    en: 'Telnyx Phone Services',
    fr: 'Services téléphoniques Telnyx',
  },
  'services.feat.calling3': {
    en: 'Airtable CRM Sync',
    fr: 'Synchronisation CRM Airtable',
  },
  'services.feat.calling4': {
    en: 'Call Analytics',
    fr: 'Analyse des appels',
  },
  'services.feat.email1': {
    en: 'Automated Sequences',
    fr: 'Séquences automatisées',
  },
  'services.feat.email2': {
    en: 'Lead Scoring',
    fr: 'Scoring des leads',
  },
  'services.feat.email3': {
    en: 'Personalization',
    fr: 'Personnalisation',
  },
  'services.feat.email4': {
    en: 'Performance Analytics',
    fr: 'Analyses de performance',
  },
  'services.feat.web1': {
    en: 'React Applications',
    fr: 'Applications React',
  },
  'services.feat.web2': {
    en: 'Supabase Backend',
    fr: 'Backend Supabase',
  },
  'services.feat.web3': {
    en: 'Node.js APIs',
    fr: 'APIs Node.js',
  },
  'services.feat.web4': {
    en: 'Responsive Design',
    fr: 'Design responsive',
  },
  'services.feat.chatbot1': {
    en: 'Natural Language Processing',
    fr: 'Traitement du langage naturel',
  },
  'services.feat.chatbot2': {
    en: 'Multi-platform Integration',
    fr: 'Intégration multi-plateforme',
  },
  'services.feat.chatbot3': {
    en: 'Learning Capabilities',
    fr: 'Capacités d\'apprentissage',
  },
  'services.feat.chatbot4': {
    en: 'Analytics Dashboard',
    fr: 'Tableau de bord analytique',
  },
  'services.feat.agentic1': {
    en: 'Task Automation',
    fr: 'Automatisation des tâches',
  },
  'services.feat.agentic2': {
    en: 'Decision Making',
    fr: 'Prise de décision',
  },
  'services.feat.agentic3': {
    en: 'Multi-step Workflows',
    fr: 'Workflows multi-étapes',
  },
  'services.feat.agentic4': {
    en: 'Learning & Adaptation',
    fr: 'Apprentissage et adaptation',
  },

  // Project Categories
  'projects.cat.all': {
    en: 'All',
    fr: 'Tous',
  },
  'projects.cat.ai_assistant': {
    en: 'AI Assistant',
    fr: 'Assistant IA',
  },
  'projects.cat.marketing': {
    en: 'Marketing Automation',
    fr: 'Automatisation Marketing',
  },
  'projects.cat.voice': {
    en: 'Voice AI',
    fr: 'IA Vocale',
  },
  'projects.cat.workflow': {
    en: 'Workflow Automation',
    fr: 'Automatisation Workflow',
  },

  // Project 1
  'projects.p1.title': {
    en: 'School AI Administration Assistant',
    fr: 'Assistant IA d\'Administration Scolaire',
  },
  'projects.p1.desc': {
    en: 'Comprehensive AI assistant for educational institutions managing student data, scheduling, and administrative tasks with natural language processing.',
    fr: 'Assistant IA complet pour les établissements scolaires gérant les données étudiantes, la planification et les tâches administratives grâce au traitement du langage naturel.',
  },
  'projects.p1.category': {
    en: 'AI Assistant',
    fr: 'Assistant IA',
  },
  'projects.p1.feat1': {
    en: 'Student Data Management',
    fr: 'Gestion des données étudiantes',
  },
  'projects.p1.feat2': {
    en: 'Automated Scheduling',
    fr: 'Planification automatisée',
  },
  'projects.p1.feat3': {
    en: 'Report Generation',
    fr: 'Génération de rapports',
  },
  'projects.p1.feat4': {
    en: 'Multi-language Support',
    fr: 'Support multilingue',
  },
  'projects.p1.result1': {
    en: '60% reduction in admin time',
    fr: '60% de réduction du temps administratif',
  },
  'projects.p1.result2': {
    en: '95% accuracy in data processing',
    fr: '95% de précision dans le traitement des données',
  },
  'projects.p1.result3': {
    en: '40+ schools implemented',
    fr: '40+ établissements déployés',
  },

  // Project 2
  'projects.p2.title': {
    en: 'LinkedIn Automation System',
    fr: 'Système d\'Automatisation LinkedIn',
  },
  'projects.p2.desc': {
    en: 'Advanced automation system for LinkedIn posting and lead capture built with n8n workflows and Airtable integration.',
    fr: 'Système d\'automatisation avancé pour la publication LinkedIn et la capture de leads avec des workflows n8n et l\'intégration Airtable.',
  },
  'projects.p2.category': {
    en: 'Marketing Automation',
    fr: 'Automatisation Marketing',
  },
  'projects.p2.feat1': {
    en: 'Automated Post Scheduling',
    fr: 'Planification automatique des publications',
  },
  'projects.p2.feat2': {
    en: 'Lead Capture & Scoring',
    fr: 'Capture et scoring des leads',
  },
  'projects.p2.feat3': {
    en: 'CRM Integration',
    fr: 'Intégration CRM',
  },
  'projects.p2.feat4': {
    en: 'Analytics Dashboard',
    fr: 'Tableau de bord analytique',
  },
  'projects.p2.result1': {
    en: '300% increase in leads',
    fr: '300% d\'augmentation des leads',
  },
  'projects.p2.result2': {
    en: '80% time savings',
    fr: '80% de gain de temps',
  },
  'projects.p2.result3': {
    en: '50+ companies using',
    fr: '50+ entreprises utilisatrices',
  },

  // Project 3
  'projects.p3.title': {
    en: 'VAPI Cold Calling System',
    fr: 'Système d\'Appels à Froid VAPI',
  },
  'projects.p3.desc': {
    en: 'Revolutionary AI-powered cold calling system using VAPI and Telnyx for human-like conversations and automated lead qualification.',
    fr: 'Système d\'appels à froid révolutionnaire utilisant VAPI et Telnyx pour des conversations naturelles et la qualification automatisée des leads.',
  },
  'projects.p3.category': {
    en: 'Voice AI',
    fr: 'IA Vocale',
  },
  'projects.p3.feat1': {
    en: 'Human-like Conversations',
    fr: 'Conversations naturelles',
  },
  'projects.p3.feat2': {
    en: 'Lead Qualification',
    fr: 'Qualification des leads',
  },
  'projects.p3.feat3': {
    en: 'CRM Integration',
    fr: 'Intégration CRM',
  },
  'projects.p3.feat4': {
    en: 'Call Analytics',
    fr: 'Analyse des appels',
  },
  'projects.p3.result1': {
    en: '85% conversation completion',
    fr: '85% de taux de complétion des conversations',
  },
  'projects.p3.result2': {
    en: '45% lead qualification rate',
    fr: '45% de taux de qualification des leads',
  },
  'projects.p3.result3': {
    en: '200+ calls per day',
    fr: '200+ appels par jour',
  },

  // Project 4
  'projects.p4.title': {
    en: 'Enterprise Workflow Automation',
    fr: 'Automatisation Workflow Entreprise',
  },
  'projects.p4.desc': {
    en: 'Complete business process automation suite integrating multiple tools and APIs for seamless operations.',
    fr: 'Suite complète d\'automatisation des processus métier intégrant plusieurs outils et APIs pour des opérations fluides.',
  },
  'projects.p4.category': {
    en: 'Workflow Automation',
    fr: 'Automatisation Workflow',
  },
  'projects.p4.feat1': {
    en: 'Multi-platform Integration',
    fr: 'Intégration multi-plateforme',
  },
  'projects.p4.feat2': {
    en: 'Custom Workflows',
    fr: 'Workflows personnalisés',
  },
  'projects.p4.feat3': {
    en: 'Real-time Monitoring',
    fr: 'Surveillance en temps réel',
  },
  'projects.p4.feat4': {
    en: 'Scalable Architecture',
    fr: 'Architecture évolutive',
  },
  'projects.p4.result1': {
    en: '70% process efficiency gain',
    fr: '70% de gain d\'efficacité des processus',
  },
  'projects.p4.result2': {
    en: '90% error reduction',
    fr: '90% de réduction des erreurs',
  },
  'projects.p4.result3': {
    en: '25+ integrated systems',
    fr: '25+ systèmes intégrés',
  },

  // Project 5
  'projects.p5.title': {
    en: 'E-commerce AI Chatbot',
    fr: 'Chatbot IA E-commerce',
  },
  'projects.p5.desc': {
    en: 'Intelligent customer service chatbot for e-commerce platforms with product recommendations and order management.',
    fr: 'Chatbot de service client intelligent pour les plateformes e-commerce avec recommandations produits et gestion des commandes.',
  },
  'projects.p5.category': {
    en: 'AI Assistant',
    fr: 'Assistant IA',
  },
  'projects.p5.feat1': {
    en: 'Product Recommendations',
    fr: 'Recommandations produits',
  },
  'projects.p5.feat2': {
    en: 'Order Tracking',
    fr: 'Suivi des commandes',
  },
  'projects.p5.feat3': {
    en: '24/7 Support',
    fr: 'Support 24/7',
  },
  'projects.p5.feat4': {
    en: 'Multi-language',
    fr: 'Multilingue',
  },
  'projects.p5.result1': {
    en: '40% reduction in support tickets',
    fr: '40% de réduction des tickets support',
  },
  'projects.p5.result2': {
    en: '25% increase in sales',
    fr: '25% d\'augmentation des ventes',
  },
  'projects.p5.result3': {
    en: '95% customer satisfaction',
    fr: '95% de satisfaction client',
  },

  // Project 6
  'projects.p6.title': {
    en: 'Email Marketing Automation Platform',
    fr: 'Plateforme d\'Automatisation Email Marketing',
  },
  'projects.p6.desc': {
    en: 'Comprehensive email marketing automation with AI-powered personalization and advanced analytics.',
    fr: 'Automatisation email marketing complète avec personnalisation par IA et analyses avancées.',
  },
  'projects.p6.category': {
    en: 'Marketing Automation',
    fr: 'Automatisation Marketing',
  },
  'projects.p6.feat1': {
    en: 'AI Personalization',
    fr: 'Personnalisation IA',
  },
  'projects.p6.feat2': {
    en: 'A/B Testing',
    fr: 'Tests A/B',
  },
  'projects.p6.feat3': {
    en: 'Advanced Analytics',
    fr: 'Analyses avancées',
  },
  'projects.p6.feat4': {
    en: 'Automated Sequences',
    fr: 'Séquences automatisées',
  },
  'projects.p6.result1': {
    en: '55% open rate improvement',
    fr: '55% d\'amélioration du taux d\'ouverture',
  },
  'projects.p6.result2': {
    en: '35% conversion increase',
    fr: '35% d\'augmentation des conversions',
  },
  'projects.p6.result3': {
    en: '100+ campaigns managed',
    fr: '100+ campagnes gérées',
  },

  // Blog Posts
  'blog.author': {
    en: 'Stepup AI Team',
    fr: 'Équipe Stepup AI',
  },
  'blog.p1.title': {
    en: 'The Future of AI Automation in Business',
    fr: 'L\'Avenir de l\'Automatisation IA en Entreprise',
  },
  'blog.p1.excerpt': {
    en: 'Discover how AI automation is revolutionizing business processes and what it means for the future of work.',
    fr: 'Découvrez comment l\'automatisation IA révolutionne les processus métier et ce que cela signifie pour l\'avenir du travail.',
  },
  'blog.p1.readtime': {
    en: '8 min read',
    fr: '8 min de lecture',
  },
  'blog.p2.title': {
    en: 'Building Intelligent Chatbots with Modern AI',
    fr: 'Construire des Chatbots Intelligents avec l\'IA Moderne',
  },
  'blog.p2.excerpt': {
    en: 'Learn the best practices for creating conversational AI that truly understands and helps your customers.',
    fr: 'Apprenez les meilleures pratiques pour créer une IA conversationnelle qui comprend vraiment et aide vos clients.',
  },
  'blog.p2.readtime': {
    en: '6 min read',
    fr: '6 min de lecture',
  },
  'blog.p3.title': {
    en: 'N8N vs Make.com: Which Automation Tool is Right for You?',
    fr: 'N8N vs Make.com : Quel Outil d\'Automatisation Vous Convient ?',
  },
  'blog.p3.excerpt': {
    en: 'A comprehensive comparison of popular no-code automation platforms to help you make the right choice.',
    fr: 'Une comparaison complète des plateformes d\'automatisation no-code populaires pour vous aider à faire le bon choix.',
  },
  'blog.p3.readtime': {
    en: '10 min read',
    fr: '10 min de lecture',
  },
  'blog.p4.title': {
    en: 'Implementing VAPI for Voice AI Solutions',
    fr: 'Implémenter VAPI pour des Solutions d\'IA Vocale',
  },
  'blog.p4.excerpt': {
    en: 'Step-by-step guide to integrating voice AI capabilities into your business applications using VAPI.',
    fr: 'Guide étape par étape pour intégrer les capacités d\'IA vocale dans vos applications métier avec VAPI.',
  },
  'blog.p4.readtime': {
    en: '12 min read',
    fr: '12 min de lecture',
  },

  // Privacy Policy
  'privacy.title1': {
    en: 'Privacy',
    fr: 'Politique de',
  },
  'privacy.title2': {
    en: 'Policy',
    fr: 'Confidentialité',
  },
  'privacy.intro': {
    en: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
    fr: 'Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles.',
  },
  'privacy.date': {
    en: 'Last updated: January 15, 2024',
    fr: 'Dernière mise à jour : 15 janvier 2024',
  },
  'privacy.commitment_title': {
    en: 'Our Commitment to Privacy',
    fr: 'Notre Engagement envers la Confidentialité',
  },
  'privacy.commitment_p1': {
    en: 'At Stepup AI, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
    fr: 'Chez Stepup AI, nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web ou utilisez nos services.',
  },
  'privacy.commitment_p2': {
    en: 'By using our website or services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.',
    fr: 'En utilisant notre site web ou nos services, vous acceptez la collecte et l\'utilisation des informations conformément à cette politique. Nous n\'utiliserons ni ne partagerons vos informations avec quiconque, sauf comme décrit dans cette politique de confidentialité.',
  },
  'privacy.s1.title': {
    en: 'Information We Collect',
    fr: 'Informations que Nous Collectons',
  },
  'privacy.s1.c1': {
    en: 'Personal information you provide when contacting us (name, email, phone number)',
    fr: 'Informations personnelles que vous fournissez en nous contactant (nom, email, numéro de téléphone)',
  },
  'privacy.s1.c2': {
    en: 'Technical information about your device and browser when visiting our website',
    fr: 'Informations techniques sur votre appareil et navigateur lors de votre visite sur notre site',
  },
  'privacy.s1.c3': {
    en: 'Usage data about how you interact with our services',
    fr: 'Données d\'utilisation sur la façon dont vous interagissez avec nos services',
  },
  'privacy.s1.c4': {
    en: 'Communication records when you contact our support team',
    fr: 'Enregistrements de communication lorsque vous contactez notre équipe support',
  },
  'privacy.s2.title': {
    en: 'How We Use Your Information',
    fr: 'Comment Nous Utilisons Vos Informations',
  },
  'privacy.s2.c1': {
    en: 'To provide and improve our AI automation services',
    fr: 'Pour fournir et améliorer nos services d\'automatisation IA',
  },
  'privacy.s2.c2': {
    en: 'To communicate with you about your projects and inquiries',
    fr: 'Pour communiquer avec vous concernant vos projets et demandes',
  },
  'privacy.s2.c3': {
    en: 'To send you relevant updates about our services (with your consent)',
    fr: 'Pour vous envoyer des mises à jour pertinentes sur nos services (avec votre consentement)',
  },
  'privacy.s2.c4': {
    en: 'To analyze website usage and improve user experience',
    fr: 'Pour analyser l\'utilisation du site et améliorer l\'expérience utilisateur',
  },
  'privacy.s2.c5': {
    en: 'To comply with legal obligations and protect our rights',
    fr: 'Pour respecter les obligations légales et protéger nos droits',
  },
  'privacy.s3.title': {
    en: 'Data Protection & Security',
    fr: 'Protection et Sécurité des Données',
  },
  'privacy.s3.c1': {
    en: 'We implement industry-standard security measures to protect your data',
    fr: 'Nous mettons en œuvre des mesures de sécurité aux normes de l\'industrie pour protéger vos données',
  },
  'privacy.s3.c2': {
    en: 'All data transmission is encrypted using SSL/TLS protocols',
    fr: 'Toutes les transmissions de données sont chiffrées via les protocoles SSL/TLS',
  },
  'privacy.s3.c3': {
    en: 'Access to personal information is restricted to authorized personnel only',
    fr: 'L\'accès aux informations personnelles est limité au personnel autorisé uniquement',
  },
  'privacy.s3.c4': {
    en: 'We regularly audit our security practices and update them as needed',
    fr: 'Nous auditons régulièrement nos pratiques de sécurité et les mettons à jour si nécessaire',
  },
  'privacy.s3.c5': {
    en: 'We do not sell, rent, or share your personal information with third parties',
    fr: 'Nous ne vendons, ne louons ni ne partageons vos informations personnelles avec des tiers',
  },
  'privacy.s4.title': {
    en: 'Your Rights',
    fr: 'Vos Droits',
  },
  'privacy.s4.c1': {
    en: 'Right to access your personal information we hold',
    fr: 'Droit d\'accéder à vos informations personnelles que nous détenons',
  },
  'privacy.s4.c2': {
    en: 'Right to correct or update your information',
    fr: 'Droit de corriger ou mettre à jour vos informations',
  },
  'privacy.s4.c3': {
    en: 'Right to delete your personal information (subject to legal requirements)',
    fr: 'Droit de supprimer vos informations personnelles (sous réserve des exigences légales)',
  },
  'privacy.s4.c4': {
    en: 'Right to restrict processing of your information',
    fr: 'Droit de limiter le traitement de vos informations',
  },
  'privacy.s4.c5': {
    en: 'Right to data portability where technically feasible',
    fr: 'Droit à la portabilité des données lorsque techniquement possible',
  },
  'privacy.s4.c6': {
    en: 'Right to withdraw consent for marketing communications',
    fr: 'Droit de retirer le consentement pour les communications marketing',
  },
  'privacy.cookies_title': {
    en: 'Cookies and Tracking',
    fr: 'Cookies et Suivi',
  },
  'privacy.cookies_desc': {
    en: 'We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. Cookies are small data files stored on your device that help us remember your preferences and improve our services.',
    fr: 'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation et analyser le trafic du site. Les cookies sont de petits fichiers de données stockés sur votre appareil qui nous aident à mémoriser vos préférences et à améliorer nos services.',
  },
  'privacy.essential_title': {
    en: 'Essential Cookies',
    fr: 'Cookies Essentiels',
  },
  'privacy.essential_desc': {
    en: 'Required for basic website functionality and cannot be disabled.',
    fr: 'Nécessaires au fonctionnement de base du site et ne peuvent pas être désactivés.',
  },
  'privacy.analytics_title': {
    en: 'Analytics Cookies',
    fr: 'Cookies Analytiques',
  },
  'privacy.analytics_desc': {
    en: 'Help us understand how visitors interact with our website.',
    fr: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site.',
  },
  'privacy.third_party_title': {
    en: 'Third-Party Services',
    fr: 'Services Tiers',
  },
  'privacy.third_party_desc': {
    en: 'We may use third-party services to provide and improve our services. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.',
    fr: 'Nous pouvons utiliser des services tiers pour fournir et améliorer nos services. Ces services peuvent collecter des informations envoyées par votre navigateur dans le cadre d\'une requête web, telles que les cookies ou votre adresse IP.',
  },
  'privacy.tp1': {
    en: 'Google Analytics for website analytics',
    fr: 'Google Analytics pour l\'analyse du site web',
  },
  'privacy.tp2': {
    en: 'Email service providers for communication',
    fr: 'Fournisseurs de services email pour la communication',
  },
  'privacy.tp3': {
    en: 'Cloud hosting services for data storage',
    fr: 'Services d\'hébergement cloud pour le stockage des données',
  },
  'privacy.questions_title': {
    en: 'Questions About This Policy?',
    fr: 'Questions sur Cette Politique ?',
  },
  'privacy.questions_desc': {
    en: 'If you have any questions about this Privacy Policy or our data practices, please don\'t hesitate to contact us.',
    fr: 'Si vous avez des questions sur cette politique de confidentialité ou nos pratiques en matière de données, n\'hésitez pas à nous contacter.',
  },

  // Terms of Service
  'terms.title1': {
    en: 'Terms of',
    fr: 'Conditions',
  },
  'terms.title2': {
    en: 'Service',
    fr: 'de Service',
  },
  'terms.intro': {
    en: 'These terms govern your use of our AI automation services and website. Please read them carefully.',
    fr: 'Ces conditions régissent votre utilisation de nos services d\'automatisation IA et de notre site web. Veuillez les lire attentivement.',
  },
  'terms.date': {
    en: 'Last updated: January 15, 2024',
    fr: 'Dernière mise à jour : 15 janvier 2024',
  },
  'terms.overview_title': {
    en: 'Agreement Overview',
    fr: 'Aperçu de l\'Accord',
  },
  'terms.overview_p1': {
    en: 'These Terms of Service ("Terms") constitute a legally binding agreement between you and Stepup AI regarding your use of our website, services, and any related applications or tools we provide.',
    fr: 'Ces Conditions de Service (« Conditions ») constituent un accord juridiquement contraignant entre vous et Stepup AI concernant votre utilisation de notre site web, de nos services et de toute application ou outil connexe que nous fournissons.',
  },
  'terms.overview_p2': {
    en: 'By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.',
    fr: 'En utilisant nos services, vous reconnaissez avoir lu, compris et accepté d\'être lié par ces Conditions. Si vous utilisez nos services au nom d\'une organisation, vous déclarez avoir l\'autorité pour lier cette organisation à ces Conditions.',
  },
  'terms.s1.title': {
    en: 'Acceptance of Terms',
    fr: 'Acceptation des Conditions',
  },
  'terms.s1.c1': {
    en: 'By accessing and using our website and services, you accept and agree to be bound by these Terms of Service',
    fr: 'En accédant et utilisant notre site web et nos services, vous acceptez d\'être lié par ces Conditions de Service',
  },
  'terms.s1.c2': {
    en: 'If you do not agree to these terms, you may not access or use our services',
    fr: 'Si vous n\'acceptez pas ces conditions, vous ne pouvez pas accéder ni utiliser nos services',
  },
  'terms.s1.c3': {
    en: 'We reserve the right to modify these terms at any time with notice to users',
    fr: 'Nous nous réservons le droit de modifier ces conditions à tout moment avec notification aux utilisateurs',
  },
  'terms.s1.c4': {
    en: 'Continued use of our services after changes constitutes acceptance of new terms',
    fr: 'L\'utilisation continue de nos services après les modifications constitue l\'acceptation des nouvelles conditions',
  },
  'terms.s2.title': {
    en: 'Services Description',
    fr: 'Description des Services',
  },
  'terms.s2.c1': {
    en: 'Stepup AI provides AI automation services including workflow automation, chatbot development, and system integration',
    fr: 'Stepup AI fournit des services d\'automatisation IA incluant l\'automatisation des workflows, le développement de chatbots et l\'intégration de systèmes',
  },
  'terms.s2.c2': {
    en: 'We offer consulting, development, implementation, and support services',
    fr: 'Nous proposons des services de conseil, développement, mise en œuvre et support',
  },
  'terms.s2.c3': {
    en: 'Service specifications and deliverables are defined in individual project agreements',
    fr: 'Les spécifications et livrables des services sont définis dans les accords de projet individuels',
  },
  'terms.s2.c4': {
    en: 'We reserve the right to modify or discontinue services with reasonable notice',
    fr: 'Nous nous réservons le droit de modifier ou d\'interrompre les services avec un préavis raisonnable',
  },
  'terms.s3.title': {
    en: 'User Responsibilities',
    fr: 'Responsabilités de l\'Utilisateur',
  },
  'terms.s3.c1': {
    en: 'You must provide accurate and complete information when using our services',
    fr: 'Vous devez fournir des informations exactes et complètes lors de l\'utilisation de nos services',
  },
  'terms.s3.c2': {
    en: 'You are responsible for maintaining the confidentiality of your account credentials',
    fr: 'Vous êtes responsable du maintien de la confidentialité de vos identifiants de compte',
  },
  'terms.s3.c3': {
    en: 'You agree not to use our services for any unlawful or prohibited activities',
    fr: 'Vous acceptez de ne pas utiliser nos services pour des activités illégales ou interdites',
  },
  'terms.s3.c4': {
    en: 'You must comply with all applicable laws and regulations when using our services',
    fr: 'Vous devez respecter toutes les lois et réglementations applicables lors de l\'utilisation de nos services',
  },
  'terms.s3.c5': {
    en: 'You are responsible for any content you provide or generate using our services',
    fr: 'Vous êtes responsable de tout contenu que vous fournissez ou générez en utilisant nos services',
  },
  'terms.s4.title': {
    en: 'Limitations and Disclaimers',
    fr: 'Limitations et Avertissements',
  },
  'terms.s4.c1': {
    en: 'Our services are provided "as is" without warranties of any kind',
    fr: 'Nos services sont fournis « en l\'état » sans garantie d\'aucune sorte',
  },
  'terms.s4.c2': {
    en: 'We do not guarantee uninterrupted or error-free service operation',
    fr: 'Nous ne garantissons pas un fonctionnement ininterrompu ou sans erreur des services',
  },
  'terms.s4.c3': {
    en: 'We are not liable for indirect, incidental, or consequential damages',
    fr: 'Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs',
  },
  'terms.s4.c4': {
    en: 'Our total liability is limited to the amount paid for services in the preceding 12 months',
    fr: 'Notre responsabilité totale est limitée au montant payé pour les services au cours des 12 mois précédents',
  },
  'terms.s4.c5': {
    en: 'Some jurisdictions do not allow limitation of liability, so these limits may not apply to you',
    fr: 'Certaines juridictions n\'autorisent pas la limitation de responsabilité, ces limites peuvent donc ne pas s\'appliquer à vous',
  },
  'terms.add_title': {
    en: 'Additional Terms',
    fr: 'Conditions Supplémentaires',
  },
  'terms.a1.title': {
    en: 'Intellectual Property',
    fr: 'Propriété Intellectuelle',
  },
  'terms.a1.content': {
    en: 'All intellectual property rights in our services, including software, documentation, and methodologies, remain our property. You receive a limited license to use our services as specified in your agreement.',
    fr: 'Tous les droits de propriété intellectuelle sur nos services, y compris les logiciels, la documentation et les méthodologies, restent notre propriété. Vous recevez une licence limitée pour utiliser nos services comme spécifié dans votre accord.',
  },
  'terms.a2.title': {
    en: 'Confidentiality',
    fr: 'Confidentialité',
  },
  'terms.a2.content': {
    en: 'We maintain strict confidentiality regarding your business information and data. Both parties agree to protect confidential information disclosed during the course of our business relationship.',
    fr: 'Nous maintenons une stricte confidentialité concernant vos informations et données commerciales. Les deux parties s\'engagent à protéger les informations confidentielles divulguées au cours de notre relation commerciale.',
  },
  'terms.a3.title': {
    en: 'Data Protection',
    fr: 'Protection des Données',
  },
  'terms.a3.content': {
    en: 'We process your data in accordance with our Privacy Policy and applicable data protection laws. You retain ownership of your data, and we implement appropriate security measures to protect it.',
    fr: 'Nous traitons vos données conformément à notre politique de confidentialité et aux lois applicables en matière de protection des données. Vous conservez la propriété de vos données et nous mettons en œuvre des mesures de sécurité appropriées pour les protéger.',
  },
  'terms.a4.title': {
    en: 'Payment Terms',
    fr: 'Conditions de Paiement',
  },
  'terms.a4.content': {
    en: 'Payment terms are specified in individual project agreements. Generally, payments are due within 30 days of invoice date. Late payments may incur additional charges as permitted by law.',
    fr: 'Les conditions de paiement sont spécifiées dans les accords de projet individuels. En général, les paiements sont dus dans les 30 jours suivant la date de facturation. Les retards de paiement peuvent entraîner des frais supplémentaires conformément à la loi.',
  },
  'terms.a5.title': {
    en: 'Termination',
    fr: 'Résiliation',
  },
  'terms.a5.content': {
    en: 'Either party may terminate services with appropriate notice as specified in the service agreement. Upon termination, you retain access to your data, and we will assist with data export as needed.',
    fr: 'Chaque partie peut résilier les services avec un préavis approprié tel que spécifié dans l\'accord de service. À la résiliation, vous conservez l\'accès à vos données et nous vous aiderons pour l\'exportation des données si nécessaire.',
  },
  'terms.a6.title': {
    en: 'Governing Law',
    fr: 'Droit Applicable',
  },
  'terms.a6.content': {
    en: 'These terms are governed by the laws of France. Any disputes will be resolved through the competent courts of Paris, France, unless otherwise agreed.',
    fr: 'Ces conditions sont régies par le droit français. Tout litige sera résolu par les tribunaux compétents de Paris, France, sauf accord contraire.',
  },
  'terms.sla_title': {
    en: 'Service Level Agreement',
    fr: 'Accord de Niveau de Service',
  },
  'terms.response_title': {
    en: 'Response Times',
    fr: 'Temps de Réponse',
  },
  'terms.response1': {
    en: 'Critical issues: 4 hours',
    fr: 'Problèmes critiques : 4 heures',
  },
  'terms.response2': {
    en: 'High priority: 24 hours',
    fr: 'Haute priorité : 24 heures',
  },
  'terms.response3': {
    en: 'Normal priority: 48 hours',
    fr: 'Priorité normale : 48 heures',
  },
  'terms.availability_title': {
    en: 'Availability',
    fr: 'Disponibilité',
  },
  'terms.availability1': {
    en: 'Target uptime: 99.5%',
    fr: 'Temps de disponibilité cible : 99,5%',
  },
  'terms.availability2': {
    en: 'Planned maintenance windows',
    fr: 'Fenêtres de maintenance planifiées',
  },
  'terms.availability3': {
    en: 'Status page notifications',
    fr: 'Notifications de la page de statut',
  },
  'terms.dispute_title': {
    en: 'Dispute Resolution',
    fr: 'Résolution des Litiges',
  },
  'terms.dispute_desc': {
    en: 'We are committed to resolving any disputes amicably. If you have concerns about our services:',
    fr: 'Nous nous engageons à résoudre tout litige à l\'amiable. Si vous avez des préoccupations concernant nos services :',
  },
  'terms.d1': {
    en: 'Contact our support team to discuss the issue',
    fr: 'Contactez notre équipe support pour discuter du problème',
  },
  'terms.d2': {
    en: 'We will work with you to find a mutually acceptable solution',
    fr: 'Nous travaillerons avec vous pour trouver une solution mutuellement acceptable',
  },
  'terms.d3': {
    en: 'If needed, disputes will be resolved through binding arbitration',
    fr: 'Si nécessaire, les litiges seront résolus par arbitrage contraignant',
  },
  'terms.questions_title': {
    en: 'Questions About These Terms?',
    fr: 'Questions sur Ces Conditions ?',
  },
  'terms.questions_desc': {
    en: 'If you have any questions about these Terms of Service or need clarification on any provisions, please contact us.',
    fr: 'Si vous avez des questions sur ces Conditions de Service ou avez besoin de clarifications sur certaines dispositions, veuillez nous contacter.',
  },

  // Footer
  'footer.description': {
    en: 'Transforming businesses with intelligent AI automation solutions.',
    fr: 'Transformer les entreprises avec des solutions d\'automatisation IA intelligentes.',
  },
  'footer.services_title': {
    en: 'Services',
    fr: 'Services',
  },
  'footer.service1': {
    en: 'AI Automation',
    fr: 'Automatisation IA',
  },
  'footer.service2': {
    en: 'AI Calling',
    fr: 'Appels IA',
  },
  'footer.service3': {
    en: 'AI Email Marketing',
    fr: 'Email Marketing IA',
  },
  'footer.service4': {
    en: 'Web Development',
    fr: 'Développement Web',
  },
  'footer.idf_title': {
    en: 'Île-de-France',
    fr: 'Île-de-France',
  },
  'footer.contact_title': {
    en: 'Contact',
    fr: 'Contact',
  },
  'footer.contact_us': {
    en: 'Contact Us',
    fr: 'Nous Contacter',
  },
  'footer.about_us': {
    en: 'About Us',
    fr: 'À Propos',
  },
  'footer.copyright': {
    en: '© 2025 Stepup AI. All rights reserved.',
    fr: '© 2025 Stepup AI. Tous droits réservés.',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    fr: 'Politique de Confidentialité',
  },
  'footer.terms': {
    en: 'Terms of Service',
    fr: 'Conditions d\'Utilisation',
  },
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
