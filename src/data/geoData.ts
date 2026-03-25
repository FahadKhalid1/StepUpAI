// =============================================================================
// Geo Data Layer for SEO Geo Pages - Stepup AI
// Covers 20 cities in Ile-de-France x 6 services = 120 geo landing pages
// =============================================================================

// -----------------------------------------------------------------------------
// City Interface & Data
// -----------------------------------------------------------------------------

export interface City {
  slug: string;
  name: string;
  department: string;
  departmentName: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  population: string;
  description: string;
}

export const cities: City[] = [
  {
    slug: "paris",
    name: "Paris",
    department: "75",
    departmentName: "Paris",
    postalCode: "75000",
    latitude: 48.8566,
    longitude: 2.3522,
    population: "2 161 000",
    description:
      "Capitale de la France et centre economique mondial, Paris concentre des milliers de sieges sociaux, startups et PME innovantes. Son ecosysteme entrepreneurial attire les investisseurs du monde entier, faisant de la ville un terrain ideal pour l'adoption de solutions d'intelligence artificielle. Le tissu economique parisien couvre tous les secteurs, de la finance a la tech en passant par le luxe et la culture.",
  },
  {
    slug: "boulogne-billancourt",
    name: "Boulogne-Billancourt",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92100",
    latitude: 48.8397,
    longitude: 2.2399,
    population: "120 000",
    description:
      "Boulogne-Billancourt est un pole majeur des medias et de la technologie en Ile-de-France, abritant les sieges de grands groupes audiovisuels et numeriques. La ville attire de nombreuses agences de communication, studios de production et entreprises tech. Ce dynamisme mediatique et technologique en fait un territoire privilegie pour le deploiement de solutions d'IA.",
  },
  {
    slug: "neuilly-sur-seine",
    name: "Neuilly-sur-Seine",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92200",
    latitude: 48.8848,
    longitude: 2.2687,
    population: "60 000",
    description:
      "Neuilly-sur-Seine accueille de nombreux sieges sociaux de grandes entreprises francaises et internationales, notamment dans les secteurs de la finance, du conseil et de l'assurance. La ville se distingue par un tissu economique haut de gamme et une forte concentration de professions liberales. Cette densite de decision-makers en fait un marche cle pour les services d'IA a haute valeur ajoutee.",
  },
  {
    slug: "levallois-perret",
    name: "Levallois-Perret",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92300",
    latitude: 48.8935,
    longitude: 2.2884,
    population: "65 000",
    description:
      "Levallois-Perret est un hub dynamique de startups, PME et ETI, reconnu pour sa densite exceptionnelle d'entreprises au kilometre carre. La ville abrite un ecosysteme diversifie allant du marketing digital aux services financiers. Cette concentration entrepreneuriale cree une demande forte pour les outils d'automatisation et d'intelligence artificielle.",
  },
  {
    slug: "nanterre",
    name: "Nanterre",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92000",
    latitude: 48.8924,
    longitude: 2.2071,
    population: "96 000",
    description:
      "Nanterre abrite une partie du quartier de La Defense, premier quartier d'affaires europeen, ou sont implantees des multinationales et de grands groupes du CAC 40. La ville conjugue activite tertiaire de pointe et pole universitaire reconnu avec l'universite Paris-Nanterre. Cette synergie entre formation et entreprise favorise l'innovation et l'adoption de technologies d'IA.",
  },
  {
    slug: "saint-denis",
    name: "Saint-Denis",
    department: "93",
    departmentName: "Seine-Saint-Denis",
    postalCode: "93200",
    latitude: 48.9362,
    longitude: 2.3574,
    population: "113 000",
    description:
      "Saint-Denis est un pole logistique et industriel en pleine transformation, porte par les projets du Grand Paris et l'heritage des Jeux Olympiques 2024. La ville accueille le Stade de France et voit emerger de nouveaux quartiers d'affaires modernes. Cette mutation urbaine ouvre des opportunites majeures pour les entreprises qui souhaitent integrer l'IA dans leurs processus.",
  },
  {
    slug: "montreuil",
    name: "Montreuil",
    department: "93",
    departmentName: "Seine-Saint-Denis",
    postalCode: "93100",
    latitude: 48.8638,
    longitude: 2.4484,
    population: "109 000",
    description:
      "Montreuil s'est impose comme un ecosysteme creatif et numerique en plein essor, attirant agences digitales, studios de jeux video et startups a impact. La ville cultive une identite entrepreneuriale alternative et innovante, soutenue par de nombreux espaces de coworking et incubateurs. Ce terreau creatif est particulierement receptif aux solutions d'IA generative et d'automatisation.",
  },
  {
    slug: "versailles",
    name: "Versailles",
    department: "78",
    departmentName: "Yvelines",
    postalCode: "78000",
    latitude: 48.8014,
    longitude: 2.1301,
    population: "85 000",
    description:
      "Versailles, celebre pour son patrimoine historique et touristique, dispose egalement d'un tissu economique solide oriente vers les services aux entreprises et le conseil. La ville est un centre administratif important des Yvelines, abritant de nombreuses institutions et professions liberales. Le secteur touristique et les PME locales representent un marche porteur pour la digitalisation par l'IA.",
  },
  {
    slug: "saint-germain-en-laye",
    name: "Saint-Germain-en-Laye",
    department: "78",
    departmentName: "Yvelines",
    postalCode: "78100",
    latitude: 48.8986,
    longitude: 2.0938,
    population: "46 000",
    description:
      "Saint-Germain-en-Laye est une ville residentielle de standing qui abrite un tissu de PME solides dans les secteurs du conseil, de la formation et des services B2B. Sa proximite avec le pole economique de La Defense attire des cadres et entrepreneurs a la recherche d'un environnement de qualite. Les entreprises locales cherchent activement des solutions d'IA pour gagner en competitivite.",
  },
  {
    slug: "creteil",
    name: "Creteil",
    department: "94",
    departmentName: "Val-de-Marne",
    postalCode: "94000",
    latitude: 48.7911,
    longitude: 2.4628,
    population: "92 000",
    description:
      "Creteil est le centre administratif et commercial du Val-de-Marne, hebergeant la prefecture ainsi que de nombreuses administrations et services publics. La ville dispose d'un important pole commercial avec le centre regional Creteil Soleil et d'un hopital universitaire de renom. Cette concentration d'activites tertiaires et de sante cree un besoin croissant en solutions d'IA et d'automatisation.",
  },
  {
    slug: "vincennes",
    name: "Vincennes",
    department: "94",
    departmentName: "Val-de-Marne",
    postalCode: "94300",
    latitude: 48.8473,
    longitude: 2.4389,
    population: "50 000",
    description:
      "Vincennes beneficie d'une dynamique commerciale forte et d'une proximite immediate avec Paris, attirant des commercants, artisans et professions liberales exigeants. La ville est appreciee pour sa qualite de vie et son attractivite aupres des jeunes entrepreneurs du secteur digital. Les entreprises vincennoises adoptent de plus en plus les technologies d'IA pour optimiser leur relation client et leurs operations.",
  },
  {
    slug: "argenteuil",
    name: "Argenteuil",
    department: "95",
    departmentName: "Val-d'Oise",
    postalCode: "95100",
    latitude: 48.9472,
    longitude: 2.2467,
    population: "113 000",
    description:
      "Argenteuil presente un secteur industriel et tertiaire diversifie, avec une forte presence dans l'aeronautique, la logistique et les services. Deuxieme ville d'Ile-de-France par sa population hors Paris, elle beneficie de projets de renouvellement urbain ambitieux. Cette diversite economique offre de multiples cas d'usage pour l'intelligence artificielle, de la production a la gestion client.",
  },
  {
    slug: "cergy",
    name: "Cergy",
    department: "95",
    departmentName: "Val-d'Oise",
    postalCode: "95000",
    latitude: 49.0363,
    longitude: 2.0764,
    population: "66 000",
    description:
      "Cergy est un pole universitaire et technologique majeur du Val-d'Oise, anime par CY Cergy Paris Universite et de nombreuses ecoles d'ingenieurs. La ville nouvelle dispose d'un ecosysteme de startups tech, soutenu par des incubateurs et pepinieres d'entreprises. Cette concentration de talents et de recherche en fait un terreau fertile pour les projets d'IA innovants.",
  },
  {
    slug: "issy-les-moulineaux",
    name: "Issy-les-Moulineaux",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92130",
    latitude: 48.8239,
    longitude: 2.2700,
    population: "69 000",
    description:
      "Issy-les-Moulineaux est un hub numerique majeur, accueillant les sieges de grands groupes technologiques comme Microsoft France et de nombreuses entreprises du secteur digital. La ville a fait du numerique un axe strategique de developpement, avec des infrastructures de pointe et un ecosysteme d'innovation dense. Cette vocation tech en fait un territoire naturel pour le deploiement de solutions d'IA avancees.",
  },
  {
    slug: "courbevoie",
    name: "Courbevoie",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92400",
    latitude: 48.8966,
    longitude: 2.2527,
    population: "82 000",
    description:
      "Courbevoie est au coeur du quartier d'affaires de La Defense, hebergeant les sieges de multinationales et de grands groupes dans les secteurs de la banque, de l'energie et du conseil. La ville combine tours de bureaux emblematiques et quartiers residentiels dynamiques. Cette concentration de decision-makers et de budgets importants en fait un marche strategique pour les solutions d'IA a forte valeur ajoutee.",
  },
  {
    slug: "rueil-malmaison",
    name: "Rueil-Malmaison",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92500",
    latitude: 48.8769,
    longitude: 2.1894,
    population: "80 000",
    description:
      "Rueil-Malmaison abrite de nombreuses entreprises technologiques et de services B2B, notamment dans le parc d'affaires de Rueil-sur-Seine. La ville attire des societes specialisees en ingenierie, conseil IT et services numeriques. Ce positionnement B2B tech cree une demande naturelle pour les solutions d'automatisation et d'intelligence artificielle au service de la performance commerciale.",
  },
  {
    slug: "colombes",
    name: "Colombes",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92700",
    latitude: 48.9233,
    longitude: 2.2527,
    population: "85 000",
    description:
      "Colombes possede un tissu economique diversifie en plein developpement, melant industries traditionnelles et nouvelles activites tertiaires. La ville beneficie de la dynamique du Grand Paris avec des projets de reamenagement qui attirent de nouvelles entreprises. Les PME et TPE colombiennes sont en quete de solutions digitales innovantes pour accompagner leur croissance et optimiser leurs operations.",
  },
  {
    slug: "asnieres-sur-seine",
    name: "Asnieres-sur-Seine",
    department: "92",
    departmentName: "Hauts-de-Seine",
    postalCode: "92600",
    latitude: 48.9117,
    longitude: 2.2871,
    population: "86 000",
    description:
      "Asnieres-sur-Seine connait un dynamisme economique remarquable grace a sa proximite avec Paris et La Defense, attirant des entreprises de services, de commerce et du numerique. La ville voit se developper de nouveaux quartiers mixtes alliant logements et bureaux. Les entrepreneurs asnierois se tournent de plus en plus vers l'intelligence artificielle pour automatiser leurs processus et ameliorer leur competitivite.",
  },
  {
    slug: "vitry-sur-seine",
    name: "Vitry-sur-Seine",
    department: "94",
    departmentName: "Val-de-Marne",
    postalCode: "94400",
    latitude: 48.7876,
    longitude: 2.3930,
    population: "94 000",
    description:
      "Vitry-sur-Seine est un secteur en pleine mutation, porte par les grands projets d'amenagement du Grand Paris Express et de nouvelles zones d'activite. La ville accueille des entreprises industrielles, artisanales et un secteur creatif emergent autour du MAC VAL. Cette transformation urbaine et economique offre un contexte favorable a l'adoption de technologies d'IA pour accompagner la modernisation des entreprises locales.",
  },
  {
    slug: "evry-courcouronnes",
    name: "Evry-Courcouronnes",
    department: "91",
    departmentName: "Essonne",
    postalCode: "91000",
    latitude: 48.6243,
    longitude: 2.4311,
    population: "69 000",
    description:
      "Evry-Courcouronnes est le pole scientifique et technologique de l'Essonne, anime par le Genopole, premier biocluster francais dedie aux biotechnologies et a la genomique. La ville abrite l'universite d'Evry et de nombreux laboratoires de recherche de pointe. Cet ecosysteme science-industrie cree une demande specifique pour les solutions d'IA appliquees a la recherche, a la sante et a l'innovation technologique.",
  },
];

// -----------------------------------------------------------------------------
// GeoService Interface & Data
// -----------------------------------------------------------------------------

export interface GeoService {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  metaTitleTemplate: string;
  metaDescTemplate: string;
  heroSubtitleTemplate: string;
  features: Array<{ title: string; description: string }>;
  benefits: string[];
  faqTemplates: Array<{ question: string; answer: string }>;
}

export const services: GeoService[] = [
  // -------------------------------------------------------------------------
  // 1. Automatisation IA
  // -------------------------------------------------------------------------
  {
    id: "automatisation-ia",
    slug: "automatisation-ia",
    name: "Automatisation IA",
    icon: "Bot",
    color: "from-blue-600 to-cyan-500",
    metaTitleTemplate:
      "Automatisation IA a {city} | Expert en Automatisation | Stepup AI",
    metaDescTemplate:
      "Experts en automatisation IA a {city} ({departmentName}). Automatisez vos processus metier, gagnez du temps et boostez votre productivite avec nos solutions sur mesure.",
    heroSubtitleTemplate:
      "Transformez vos processus metier a {city} grace a l'automatisation intelligente. Nos solutions d'IA sur mesure eliminent les taches repetitives et liberent le potentiel de vos equipes.",
    features: [
      {
        title: "Automatisation des workflows",
        description:
          "Concevez et deployez des workflows automatises qui connectent vos outils existants, eliminent les saisies manuelles et accelerent vos processus metier de bout en bout.",
      },
      {
        title: "Traitement intelligent des documents",
        description:
          "Extrayez, classez et traitez automatiquement les donnees de vos factures, contrats et formulaires grace a la reconnaissance intelligente de documents par IA.",
      },
      {
        title: "Integration multi-systemes",
        description:
          "Connectez vos CRM, ERP, outils comptables et plateformes marketing dans un ecosysteme unifie qui partage les donnees en temps reel sans intervention humaine.",
      },
      {
        title: "Tableaux de bord et reporting automatise",
        description:
          "Generez automatiquement des rapports de performance, des tableaux de bord dynamiques et des alertes intelligentes pour piloter votre activite en toute clarte.",
      },
    ],
    benefits: [
      "Reduction de 70% du temps consacre aux taches repetitives",
      "Zero erreur de saisie grace au traitement automatise des donnees",
      "Retour sur investissement mesurable des les premiers mois",
      "Scalabilite immediate sans recrutement supplementaire",
    ],
    faqTemplates: [
      {
        question:
          "Quels types de processus peut-on automatiser avec l'IA a {city} ?",
        answer:
          "A {city}, nous automatisons une grande variete de processus : gestion des leads, facturation, onboarding client, reporting, gestion des stocks et bien plus. Chaque solution est adaptee aux specificites de votre secteur d'activite et de votre organisation. Nous realisons un audit complet de vos workflows pour identifier les gains de productivite les plus importants.",
      },
      {
        question:
          "Combien de temps faut-il pour deployer une solution d'automatisation IA a {city} ?",
        answer:
          "Le deploiement d'une solution d'automatisation IA a {city} prend generalement entre 2 et 8 semaines selon la complexite de vos processus. Nous procedons par etapes : audit, prototypage, tests et mise en production progressive. Notre equipe vous accompagne a chaque phase pour garantir une adoption reussie par vos equipes.",
      },
      {
        question:
          "L'automatisation IA est-elle adaptee aux PME de {city} ?",
        answer:
          "Absolument. Nos solutions d'automatisation IA a {city} sont concues pour etre accessibles aux PME comme aux grands groupes. Nous proposons des forfaits adaptes a chaque taille d'entreprise, avec un accompagnement personnalise. Les PME de {city} constatent souvent les gains de productivite les plus spectaculaires car l'automatisation libere des ressources humaines precieuses.",
      },
      {
        question:
          "Quel est le retour sur investissement typique de l'automatisation IA a {city} ?",
        answer:
          "Les entreprises de {city} qui adoptent nos solutions d'automatisation IA observent un retour sur investissement positif en moyenne sous 3 a 6 mois. Les gains proviennent de la reduction du temps de traitement, de l'elimination des erreurs et de la capacite a traiter plus de volume sans augmenter les effectifs. Nous fournissons des metriques de suivi pour mesurer concretement l'impact sur votre activite.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Systemes d'Appels IA
  // -------------------------------------------------------------------------
  {
    id: "appels-ia",
    slug: "appels-ia",
    name: "Systemes d'Appels IA",
    icon: "Phone",
    color: "from-green-600 to-emerald-500",
    metaTitleTemplate:
      "Systemes d'Appels IA a {city} | Telephonie Intelligente | Stepup AI",
    metaDescTemplate:
      "Solutions d'appels IA a {city} ({departmentName}). Qualifiez vos leads, gerez vos appels entrants et sortants 24h/24 avec notre telephonie intelligente.",
    heroSubtitleTemplate:
      "Revolutionnez votre telephonie d'entreprise a {city} avec nos systemes d'appels alimentes par l'IA. Qualifiez plus de leads, ne manquez plus aucun appel et offrez une experience client exceptionnelle.",
    features: [
      {
        title: "Qualification automatique des leads",
        description:
          "Notre IA qualifie automatiquement vos prospects par telephone, pose les bonnes questions et transmet les leads chauds a vos commerciaux avec un compte-rendu detaille.",
      },
      {
        title: "Standard telephonique intelligent",
        description:
          "Accueillez vos appelants 24h/24 avec un assistant vocal IA capable de comprendre les demandes, orienter les appels et resoudre les requetes courantes sans intervention humaine.",
      },
      {
        title: "Campagnes d'appels sortants automatisees",
        description:
          "Lancez des campagnes d'appels sortants ciblees pour la prospection, les relances ou les enquetes de satisfaction, avec un suivi en temps reel des resultats et des conversions.",
      },
      {
        title: "Analyse conversationnelle et reporting",
        description:
          "Chaque appel est transcrit, analyse et resume par l'IA. Identifiez les tendances, mesurez la satisfaction et ameliorez continuellement vos scripts grace a des insights actionables.",
      },
    ],
    benefits: [
      "Disponibilite telephonique 24h/24 et 7j/7 sans frais supplementaires",
      "Taux de qualification des leads multiplie par 3",
      "Reduction de 60% du temps d'attente pour vos clients",
      "Transcription et analyse automatique de chaque conversation",
    ],
    faqTemplates: [
      {
        question:
          "Comment fonctionne un systeme d'appels IA pour les entreprises de {city} ?",
        answer:
          "Notre systeme d'appels IA a {city} utilise des modeles de langage avances pour mener des conversations telephoniques naturelles avec vos clients et prospects. L'IA comprend le contexte, repond aux questions et qualifie les interlocuteurs selon vos criteres. Les appels importants sont transferes en temps reel a vos equipes, accompagnes d'un resume complet de la conversation.",
      },
      {
        question:
          "Le systeme d'appels IA peut-il gerer les specificites linguistiques a {city} ?",
        answer:
          "Oui, notre systeme d'appels IA deploye a {city} est concu pour le marche francophone et comprend parfaitement le francais courant, les expressions idiomatiques et le vocabulaire sectoriel. Il peut egalement gerer des conversations en anglais pour vos interlocuteurs internationaux. La voix est naturelle et professionnelle, refletant l'image de votre entreprise.",
      },
      {
        question:
          "Quel volume d'appels le systeme peut-il traiter a {city} ?",
        answer:
          "Notre infrastructure d'appels IA a {city} est concue pour traiter simultanement des centaines d'appels sans degradation de qualite. Que vous receviez 50 ou 5 000 appels par jour, le systeme s'adapte automatiquement a la charge. Cette scalabilite est particulierement appreciee par les entreprises de {city} en forte croissance ou en periode de pics d'activite.",
      },
      {
        question:
          "Peut-on integrer le systeme d'appels IA avec notre CRM a {city} ?",
        answer:
          "Absolument. Nos systemes d'appels IA s'integrent nativement avec les principaux CRM du marche (Salesforce, HubSpot, Pipedrive, etc.) utilises par les entreprises de {city}. Chaque interaction est automatiquement enregistree dans votre CRM avec les notes, le statut de qualification et les prochaines actions recommandees. Cette integration garantit un suivi commercial sans faille.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. Email Marketing IA
  // -------------------------------------------------------------------------
  {
    id: "email-marketing-ia",
    slug: "email-marketing-ia",
    name: "Email Marketing IA",
    icon: "Mail",
    color: "from-purple-600 to-pink-500",
    metaTitleTemplate:
      "Email Marketing IA a {city} | Campagnes Intelligentes | Stepup AI",
    metaDescTemplate:
      "Email marketing propulse par l'IA a {city} ({departmentName}). Personnalisez vos campagnes, augmentez vos taux d'ouverture et convertissez plus avec l'IA.",
    heroSubtitleTemplate:
      "Propulsez vos campagnes email a {city} grace a l'intelligence artificielle. Personnalisation avancee, envoi au moment optimal et contenu genere par l'IA pour maximiser vos conversions.",
    features: [
      {
        title: "Personnalisation hyper-ciblee par IA",
        description:
          "L'IA analyse le comportement de chaque contact pour generer des emails ultra-personnalises : objet, contenu, offres et appels a l'action adaptes au profil et au parcours de chaque destinataire.",
      },
      {
        title: "Optimisation intelligente des envois",
        description:
          "Notre algorithme determine le moment ideal d'envoi pour chaque destinataire, optimise les objets par A/B testing automatique et ajuste la frequence pour maximiser l'engagement sans saturer vos contacts.",
      },
      {
        title: "Sequences automatisees et nurturing",
        description:
          "Construisez des parcours email automatises qui nourrissent vos prospects du premier contact a la conversion, avec des branchements intelligents bases sur le comportement en temps reel.",
      },
      {
        title: "Analytics predictifs et scoring",
        description:
          "Anticipez les comportements de vos contacts grace au scoring predictif par IA. Identifiez les prospects les plus susceptibles de convertir et concentrez vos efforts sur les opportunites a plus fort potentiel.",
      },
    ],
    benefits: [
      "Taux d'ouverture augmente de 40% grace a l'optimisation IA",
      "Contenu personnalise genere automatiquement pour chaque segment",
      "Reduction de 80% du temps de creation de campagnes email",
      "Amelioration continue des performances par apprentissage automatique",
    ],
    faqTemplates: [
      {
        question:
          "Comment l'IA ameliore-t-elle les campagnes email a {city} ?",
        answer:
          "Pour les entreprises de {city}, notre solution d'email marketing IA analyse des milliers de signaux comportementaux pour personnaliser chaque aspect de vos campagnes. L'IA redige des objets percutants, adapte le contenu au profil du destinataire et determine le moment ideal d'envoi. Resultat : des taux d'ouverture et de conversion nettement superieurs aux campagnes traditionnelles.",
      },
      {
        question:
          "L'email marketing IA est-il conforme au RGPD pour les entreprises de {city} ?",
        answer:
          "Oui, nos solutions d'email marketing IA deployees a {city} sont integralement conformes au RGPD et a la legislation francaise sur la protection des donnees. Nous integrons les mecanismes de consentement, de desabonnement et de gestion des droits directement dans nos outils. Vos donnees sont hebergees en France et traitees dans le strict respect de la reglementation europeenne.",
      },
      {
        question:
          "Quel type de resultats les entreprises de {city} obtiennent-elles avec l'email marketing IA ?",
        answer:
          "Les entreprises de {city} qui utilisent notre solution d'email marketing IA constatent en moyenne une augmentation de 40% de leur taux d'ouverture et de 25% de leur taux de conversion. Le temps consacre a la creation de campagnes est reduit de 80% grace a la generation automatique de contenu. Ces resultats s'ameliorent au fil du temps grace a l'apprentissage continu de l'IA.",
      },
      {
        question:
          "Peut-on integrer l'email marketing IA avec nos outils existants a {city} ?",
        answer:
          "Notre solution d'email marketing IA s'integre parfaitement avec les outils deja utilises par les entreprises de {city} : CRM (Salesforce, HubSpot), plateformes e-commerce (Shopify, WooCommerce), outils analytics et bien d'autres. L'integration se fait en quelques clics et permet une synchronisation bidirectionnelle des donnees pour une vision client a 360 degres.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. Developpement Web
  // -------------------------------------------------------------------------
  {
    id: "developpement-web",
    slug: "developpement-web",
    name: "Developpement Web",
    icon: "Code",
    color: "from-orange-600 to-amber-500",
    metaTitleTemplate:
      "Developpement Web a {city} | Sites & Applications | Stepup AI",
    metaDescTemplate:
      "Developpement web professionnel a {city} ({departmentName}). Sites vitrine, e-commerce et applications web sur mesure, optimises SEO et propulses par l'IA.",
    heroSubtitleTemplate:
      "Creez votre presence digitale a {city} avec des sites et applications web performants. Nos developpeurs combinent expertise technique et intelligence artificielle pour des resultats exceptionnels.",
    features: [
      {
        title: "Sites web sur mesure et responsives",
        description:
          "Conception et developpement de sites web uniques, parfaitement adaptes a votre identite de marque, optimises pour tous les ecrans et construits avec les technologies les plus performantes du marche.",
      },
      {
        title: "E-commerce et plateformes transactionnelles",
        description:
          "Developpement de boutiques en ligne et de plateformes transactionnelles completes avec gestion des paiements, des stocks et de la logistique, propulsees par des recommandations produits IA.",
      },
      {
        title: "Optimisation SEO et performance",
        description:
          "Chaque site est construit avec une architecture SEO-first, un temps de chargement optimise et les meilleures pratiques Core Web Vitals pour maximiser votre visibilite sur les moteurs de recherche.",
      },
      {
        title: "Integration d'IA dans vos interfaces",
        description:
          "Enrichissez votre site avec des fonctionnalites d'IA : chatbot intelligent, recherche semantique, personnalisation de contenu en temps reel et recommandations dynamiques pour une experience utilisateur superieure.",
      },
    ],
    benefits: [
      "Sites ultra-rapides avec un score Lighthouse superieur a 95",
      "Architecture SEO optimisee pour le referencement local a {city}",
      "Fonctionnalites IA integrees nativement dans vos interfaces",
      "Maintenance et evolution continue de votre plateforme",
    ],
    faqTemplates: [
      {
        question:
          "Pourquoi choisir Stepup AI pour le developpement web a {city} ?",
        answer:
          "En choisissant Stepup AI pour votre developpement web a {city}, vous beneficiez d'une expertise unique combinant developpement de pointe et intelligence artificielle. Nos equipes maitrisent les frameworks modernes (React, Next.js) et integrent nativement des fonctionnalites IA dans vos sites. Nous connaissons les specificites du marche de {city} et optimisons votre site pour le referencement local.",
      },
      {
        question:
          "Combien coute un site web professionnel a {city} ?",
        answer:
          "Le cout d'un site web professionnel a {city} depend de vos besoins specifiques : un site vitrine demarre a partir de quelques milliers d'euros, tandis qu'un e-commerce ou une application web sur mesure peut representer un investissement plus important. Nous proposons des devis detailles et transparents apres une phase de decouverte de votre projet et de vos objectifs business.",
      },
      {
        question:
          "Quelles technologies utilisez-vous pour le developpement web a {city} ?",
        answer:
          "Pour nos projets de developpement web a {city}, nous utilisons les technologies les plus performantes du marche : React et Next.js pour le frontend, Node.js et Python pour le backend, avec des bases de donnees adaptees a chaque projet. Nous integrons egalement des APIs d'IA (OpenAI, Anthropic) et des outils d'automatisation pour creer des experiences web intelligentes et evolutives.",
      },
      {
        question:
          "Proposez-vous la maintenance de sites web a {city} ?",
        answer:
          "Oui, nous proposons des contrats de maintenance et d'evolution pour tous les sites web que nous developpons a {city}. Cela inclut les mises a jour de securite, l'optimisation des performances, l'ajout de nouvelles fonctionnalites et un support technique reactif. Nos clients de {city} beneficient d'un interlocuteur dedie qui connait parfaitement leur projet et leurs objectifs.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. Chatbot IA
  // -------------------------------------------------------------------------
  {
    id: "chatbot-ia",
    slug: "chatbot-ia",
    name: "Chatbot IA",
    icon: "MessageSquare",
    color: "from-indigo-600 to-violet-500",
    metaTitleTemplate:
      "Chatbot IA a {city} | Assistant Virtuel Intelligent | Stepup AI",
    metaDescTemplate:
      "Deploiement de chatbot IA a {city} ({departmentName}). Offrez un support client 24h/24, qualifiez vos leads et automatisez vos interactions avec un chatbot intelligent.",
    heroSubtitleTemplate:
      "Deployez un chatbot IA intelligent a {city} qui comprend vos clients, repond a leurs questions et qualifie vos prospects 24h/24. Une experience conversationnelle qui transforme vos visiteurs en clients.",
    features: [
      {
        title: "Chatbot conversationnel avance",
        description:
          "Un assistant virtuel capable de mener des conversations naturelles et contextuelles avec vos visiteurs, de comprendre les intentions complexes et de fournir des reponses precises et pertinentes.",
      },
      {
        title: "Base de connaissances personnalisee",
        description:
          "Votre chatbot est entraine sur vos propres donnees : documentation, FAQ, fiches produits et historique client. Il connait votre entreprise en profondeur et repond avec l'expertise de votre meilleur collaborateur.",
      },
      {
        title: "Qualification et routage des leads",
        description:
          "Le chatbot identifie les prospects qualifies, collecte les informations cles et les oriente vers le bon interlocuteur commercial avec un resume complet du besoin exprime.",
      },
      {
        title: "Deploiement multicanal",
        description:
          "Deployez votre chatbot IA sur votre site web, WhatsApp, Messenger, Instagram et vos autres canaux de communication pour offrir une experience unifiee ou que soient vos clients.",
      },
    ],
    benefits: [
      "Support client automatise 24h/24 avec un taux de resolution de 85%",
      "Qualification instantanee des leads entrants sur votre site",
      "Reduction de 50% de la charge de votre service client",
      "Experience conversationnelle naturelle et personnalisee",
    ],
    faqTemplates: [
      {
        question:
          "Qu'est-ce qu'un chatbot IA et comment peut-il aider mon entreprise a {city} ?",
        answer:
          "Un chatbot IA est un assistant virtuel intelligent capable de converser naturellement avec vos clients et prospects. Pour les entreprises de {city}, il represente un avantage concurrentiel majeur : il repond instantanement aux questions frequentes, qualifie les leads en continu et offre un support 24h/24. Contrairement aux chatbots classiques, notre solution comprend le contexte et s'adapte a chaque conversation.",
      },
      {
        question:
          "Comment former le chatbot IA aux specificites de mon entreprise a {city} ?",
        answer:
          "Nous entrainons votre chatbot IA a {city} sur vos propres donnees : documentation interne, FAQ, fiches produits, historique de support et procedures metier. Le processus prend quelques jours et le chatbot s'ameliore continuellement grace aux interactions avec vos clients. Vous pouvez egalement mettre a jour sa base de connaissances a tout moment via une interface simple et intuitive.",
      },
      {
        question:
          "Le chatbot IA peut-il escalader les conversations complexes a {city} ?",
        answer:
          "Oui, notre chatbot IA deploye a {city} est concu pour reconnaitre les situations qui necessitent une intervention humaine. Il transfere alors la conversation en temps reel a vos agents avec un resume complet de l'echange et du contexte. Cette approche hybride garantit que vos clients beneficient toujours du meilleur niveau de service, qu'il soit automatise ou humain.",
      },
      {
        question:
          "Quels resultats attendre d'un chatbot IA a {city} ?",
        answer:
          "Les entreprises de {city} equipees de notre chatbot IA constatent en moyenne une resolution automatique de 85% des demandes courantes, une qualification des leads 3 fois plus rapide et une satisfaction client en hausse de 30%. Le chatbot traite les demandes simples instantanement, permettant a vos equipes de se concentrer sur les cas complexes et a forte valeur ajoutee.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. Agents IA Autonomes
  // -------------------------------------------------------------------------
  {
    id: "agents-ia",
    slug: "agents-ia",
    name: "Agents IA Autonomes",
    icon: "Zap",
    color: "from-rose-600 to-red-500",
    metaTitleTemplate:
      "Agents IA Autonomes a {city} | IA de Nouvelle Generation | Stepup AI",
    metaDescTemplate:
      "Agents IA autonomes a {city} ({departmentName}). Deployez des agents intelligents qui executent des taches complexes, prennent des decisions et optimisent vos operations.",
    heroSubtitleTemplate:
      "Passez a l'ere des agents IA autonomes a {city}. Nos agents intelligents executent des taches complexes, prennent des decisions eclairees et collaborent avec vos equipes pour decupler votre productivite.",
    features: [
      {
        title: "Agents decisionnels autonomes",
        description:
          "Deployez des agents IA capables d'analyser des situations complexes, de prendre des decisions selon vos regles metier et d'executer des actions de bout en bout sans supervision constante.",
      },
      {
        title: "Orchestration multi-agents",
        description:
          "Combinez plusieurs agents specialises qui collaborent entre eux pour traiter des workflows complexes : un agent recherche, un autre analyse, un troisieme redige et un dernier valide.",
      },
      {
        title: "Integration dans vos outils existants",
        description:
          "Nos agents IA se connectent a vos outils metier (CRM, ERP, messagerie, bases de donnees) et agissent directement dans votre ecosysteme pour executer des taches avec precision et fiabilite.",
      },
      {
        title: "Supervision et controle humain",
        description:
          "Gardez le controle total grace a des mecanismes de validation, des limites d'action configurables et des tableaux de bord de supervision qui vous permettent de monitorer et ajuster vos agents en temps reel.",
      },
    ],
    benefits: [
      "Execution autonome de taches complexes avec une fiabilite superieure a 95%",
      "Capacite a traiter des volumes illimites de taches en parallele",
      "Reduction drastique des delais de traitement des operations",
      "Controle total et transparence sur les actions des agents",
    ],
    faqTemplates: [
      {
        question:
          "Quelle est la difference entre un agent IA et un chatbot classique a {city} ?",
        answer:
          "Contrairement a un chatbot classique qui se contente de repondre aux questions, un agent IA deploye a {city} est capable d'executer des actions concretes dans votre systeme d'information. Il peut rechercher des informations, analyser des documents, envoyer des emails, mettre a jour votre CRM et prendre des decisions selon vos regles metier. C'est un veritable collaborateur numerique autonome.",
      },
      {
        question:
          "Les agents IA sont-ils fiables pour les entreprises de {city} ?",
        answer:
          "Oui, nos agents IA deployes aupres des entreprises de {city} sont conçus avec des mecanismes de fiabilite robustes. Chaque agent dispose de garde-fous configurables, de limites d'action claires et d'un systeme de validation humaine pour les decisions critiques. Nous implementons egalement des tests rigoureux et un monitoring en temps reel pour garantir un taux de fiabilite superieur a 95%.",
      },
      {
        question:
          "Quels cas d'usage pour les agents IA autonomes a {city} ?",
        answer:
          "Les entreprises de {city} utilisent nos agents IA pour de nombreux cas d'usage : veille concurrentielle automatisee, traitement de dossiers administratifs, gestion autonome de la relation fournisseur, analyse de donnees et generation de rapports, et meme la coordination de projets multi-equipes. Chaque agent est concu sur mesure pour repondre aux defis specifiques de votre secteur d'activite.",
      },
      {
        question:
          "Comment demarrer avec les agents IA autonomes a {city} ?",
        answer:
          "Pour demarrer avec les agents IA a {city}, nous suivons une approche progressive : nous identifions d'abord un cas d'usage precis et a fort impact dans votre organisation. Nous deployons ensuite un agent pilote en quelques semaines, mesurons les resultats et iterons. Une fois le premier agent valide, nous etendons la couverture a d'autres processus pour maximiser le retour sur investissement.",
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/**
 * Find a city by its slug.
 */
export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Find a service by its id.
 */
export function getService(id: string): GeoService | undefined {
  return services.find((s) => s.id === id);
}

/**
 * Build the geo URL for a service + city combination.
 * Example: getGeoUrl("automatisation-ia", "paris") => "/automatisation-ia-paris"
 */
export function getGeoUrl(serviceSlug: string, citySlug: string): string {
  return `/${serviceSlug}-${citySlug}`;
}

/**
 * Generate all 120 geo route combinations (6 services x 20 cities).
 */
export function getAllGeoRoutes(): Array<{
  path: string;
  serviceId: string;
  citySlug: string;
}> {
  const routes: Array<{ path: string; serviceId: string; citySlug: string }> =
    [];
  for (const service of services) {
    for (const city of cities) {
      routes.push({
        path: getGeoUrl(service.slug, city.slug),
        serviceId: service.id,
        citySlug: city.slug,
      });
    }
  }
  return routes;
}

/**
 * Calculate the Haversine distance in km between two lat/lng points.
 */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get geographically nearby cities, sorted by distance (closest first).
 * Excludes the city itself from the results.
 */
export function getNearbyCities(citySlug: string, limit: number = 5): City[] {
  const target = getCity(citySlug);
  if (!target) return [];

  return cities
    .filter((c) => c.slug !== citySlug)
    .map((c) => ({
      city: c,
      distance: haversineDistance(
        target.latitude,
        target.longitude,
        c.latitude,
        c.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((item) => item.city);
}

/**
 * Get all services except the one with the given id.
 */
export function getOtherServices(serviceId: string): GeoService[] {
  return services.filter((s) => s.id !== serviceId);
}
