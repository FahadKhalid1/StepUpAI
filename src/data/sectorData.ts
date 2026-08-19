// =============================================================================
// Sector Data Layer — Step UpAI
//
// Sector pages (/solutions/<slug>) exist because SMEs search by their trade,
// not their postcode: a Nice restaurateur searches "répondre aux avis Google
// restaurant", never "automatisation IA Nice".
//
// RULE FOR ADDING A SECTOR: only add one where we have a NAMED client and real
// delivered work. The geo pages failed (65–70% mutual overlap, ~30 of 73 URLs
// indexed) precisely because they were templated. A sector page with invented
// proof is the same mistake in a new shape. If you cannot name the client and
// describe what was actually built, do not create the page.
// =============================================================================

export interface SectorProof {
  client: string;
  url?: string;
  fr: string;
  en: string;
}

export interface SectorPain {
  fr: string;
  en: string;
}

export interface SectorSolution {
  icon: 'reviews' | 'menu' | 'voice' | 'chat' | 'dashboard' | 'workflow' | 'mail' | 'cart';
  title: { fr: string; en: string };
  body: { fr: string; en: string };
}

export interface SectorFaq {
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

export interface Sector {
  slug: string;
  name: { fr: string; en: string };
  /** Short label for nav/cards */
  short: { fr: string; en: string };
  seoTitle: { fr: string; en: string };
  seoDescription: { fr: string; en: string };
  keywords: string[];
  headline: { fr: string; en: string };
  subhead: { fr: string; en: string };
  /** The specific operational problems of THIS trade. Not generic automation copy. */
  pains: SectorPain[];
  solutions: SectorSolution[];
  proof: SectorProof[];
  faqs: SectorFaq[];
}

export const sectors: Sector[] = [
  // ---------------------------------------------------------------------------
  // RESTAURANTS — strongest evidence: two named restaurants + two products
  // built for this exact market (Reviews Hub, MenuBoards).
  // ---------------------------------------------------------------------------
  {
    slug: 'restaurants',
    name: { fr: 'Restaurants et restauration', en: 'Restaurants and food service' },
    short: { fr: 'Restaurants', en: 'Restaurants' },
    seoTitle: {
      fr: 'IA et automatisation pour restaurants — avis Google, réservations, menus | Step UpAI',
      en: 'AI and automation for restaurants — Google reviews, bookings, menus | Step UpAI',
    },
    seoDescription: {
      fr: "Répondre aux avis Google automatiquement, prendre les réservations sans décrocher, afficher des menus toujours à jour. Solutions IA conçues pour la restauration, déployées chez Andaaz Desi Brasserie et Kurry Up à Paris.",
      en: 'Answer Google reviews automatically, take bookings without picking up the phone, keep menu displays current. AI built for food service, live at Andaaz Desi Brasserie and Kurry Up in Paris.',
    },
    keywords: [
      'répondre aux avis google restaurant',
      'automatisation restaurant',
      'logiciel réservation restaurant IA',
      'affichage menu digital restaurant',
      'chatbot restaurant',
      'IA restauration Paris',
    ],
    headline: {
      fr: "Votre équipe est en plein service. L'IA s'occupe du reste.",
      en: 'Your team is mid-service. Let the AI handle everything else.',
    },
    subhead: {
      fr: "Les avis Google qui s'accumulent, le téléphone qui sonne pendant le coup de feu, les menus imprimés déjà périmés. Trois problèmes de restaurant, pas trois problèmes d'entreprise — et nous les avons déjà résolus dans des restaurants parisiens.",
      en: "Google reviews piling up, the phone ringing mid-rush, printed menus already out of date. These are restaurant problems, not generic business problems — and we have already solved them in Paris restaurants.",
    },
    pains: [
      {
        fr: "Les avis Google restent sans réponse pendant des semaines. Or un établissement qui répond à ses avis est nettement mieux classé dans le pack local — et personne n'a le temps de rédiger vingt réponses après le service.",
        en: 'Google reviews go unanswered for weeks. A venue that replies to reviews ranks noticeably better in the local pack — and nobody has time to write twenty replies after service.',
      },
      {
        fr: "Le téléphone sonne à 20h30 pour une réservation. Soit quelqu'un quitte la salle, soit ça sonne dans le vide. Les deux coûtent de l'argent.",
        en: 'The phone rings at 8:30pm for a booking. Either someone leaves the floor, or it rings out. Both cost money.',
      },
      {
        fr: "Le menu change, les écrans et les fiches produit ne suivent pas. Le plat du jour d'hier est toujours affiché, et un client commande quelque chose qui n'existe plus.",
        en: 'The menu changes; the screens and product listings do not. Yesterday\'s special is still up, and a customer orders something that no longer exists.',
      },
      {
        fr: "Les plateformes de livraison, la caisse, la page Google et le site racontent quatre versions différentes des horaires et de la carte.",
        en: 'Delivery platforms, the till, the Google listing and the website tell four different stories about your hours and your menu.',
      },
    ],
    solutions: [
      {
        icon: 'reviews',
        title: { fr: 'Réponses automatiques aux avis Google', en: 'Automatic Google review replies' },
        body: {
          fr: "Reviews Hub lit chaque nouvel avis, rédige une réponse dans le ton de votre établissement et en français correct, puis vous la soumet — ou la publie seul si vous préférez. Les avis négatifs sont systématiquement remontés pour validation humaine avant publication.",
          en: 'Reviews Hub reads each new review, drafts a reply in your venue\'s voice and in correct French, then queues it for you — or publishes on its own if you prefer. Negative reviews are always escalated for human approval first.',
        },
      },
      {
        icon: 'voice',
        title: { fr: 'Agent vocal pour les réservations', en: 'Voice agent for bookings' },
        body: {
          fr: "Un agent vocal IA décroche quand la salle est pleine, prend la réservation, la confirme par SMS et l'inscrit dans votre agenda. Il parle français, comprend les accents et transfère à un humain dès que la demande sort du cadre.",
          en: 'An AI voice agent answers when the floor is busy, takes the booking, confirms by SMS and writes it into your calendar. It speaks French, handles accents, and hands off to a human the moment a request goes off-script.',
        },
      },
      {
        icon: 'menu',
        title: { fr: 'Affichage des menus toujours à jour', en: 'Menu displays that stay current' },
        body: {
          fr: "MenuBoards affiche vos cartes sur écran et les met à jour depuis une seule source. Vous changez le plat du jour une fois : les écrans en salle, la page web et les plateformes suivent.",
          en: 'MenuBoards puts your menus on screen and updates them from a single source. Change the daily special once and the in-room screens, your website and the platforms all follow.',
        },
      },
      {
        icon: 'chat',
        title: { fr: 'Chatbot commandes et renseignements', en: 'Ordering and enquiry chatbot' },
        body: {
          fr: "Horaires, allergènes, disponibilité, commande à emporter : les questions répétitives sont traitées sur le site sans mobiliser personne, en français comme en anglais pour la clientèle touristique.",
          en: 'Hours, allergens, availability, takeaway orders: repetitive questions get handled on the site without occupying anyone, in French and English for tourist trade.',
        },
      },
    ],
    proof: [
      {
        client: 'ANDAAZ Desi Brasserie',
        url: 'https://andaaz.fr',
        fr: "Restaurant indien et pakistanais dans le 17e arrondissement, près de la Porte Maillot. Nous avons construit leur site et déployé Reviews Hub sur leur fiche Google, avec réponses générées et validées avant publication.",
        en: 'Indian and Pakistani restaurant in the 17th arrondissement, near Porte Maillot. We built their website and deployed Reviews Hub against their Google listing, with replies generated and approved before publication.',
      },
      {
        client: 'Kurry Up',
        url: 'https://kurryup.fr',
        fr: "Spécialiste de la street food indienne. Boutique en ligne sur Shopify pour la commande à emporter, connectée à leur activité en salle.",
        en: 'Indian street food specialist. Shopify storefront for takeaway ordering, connected to their in-house operation.',
      },
      {
        client: 'Spicy Chick',
        url: 'https://spicychicken.fr',
        fr: "Restauration rapide à Bagnolet — burgers, tacos, wraps et poulet croustillant. Nous avons construit et hébergeons leur site de commande en Click & Collect, avec la carte et les horaires tenus à jour depuis une source unique.",
        en: 'Fast food in Bagnolet — burgers, tacos, wraps and crispy chicken. We built and host their Click & Collect ordering site, with menu and opening hours maintained from a single source.',
      },
    ],
    faqs: [
      {
        q: {
          fr: "L'IA répond-elle correctement en français, sans faute et sans ton robotique ?",
          en: 'Does the AI reply in correct, natural French?',
        },
        a: {
          fr: "Oui, et c'est le point sur lequel nous passons le plus de temps au paramétrage. Les réponses reprennent le vocabulaire de votre établissement. Vous validez les cinquante premières réponses avant de décider si vous laissez le système publier seul.",
          en: 'Yes, and it is the part we spend the most setup time on. Replies use your venue\'s own vocabulary. You approve the first fifty before deciding whether to let the system publish unattended.',
        },
      },
      {
        q: {
          fr: "Que se passe-t-il en cas d'avis très négatif ?",
          en: 'What happens with a very negative review?',
        },
        a: {
          fr: "Il n'est jamais publié automatiquement. Un avis en dessous d'un seuil que vous fixez est mis en attente et vous êtes notifié. Une mauvaise réponse à un avis à une étoile fait plus de dégâts que l'avis lui-même.",
          en: 'It is never answered automatically. Anything below a threshold you set is held and you are notified. A bad reply to a one-star review does more damage than the review did.',
        },
      },
      {
        q: {
          fr: "Est-ce que cela fonctionne avec TheFork, Uber Eats ou Deliveroo ?",
          en: 'Does this work with TheFork, Uber Eats or Deliveroo?',
        },
        a: {
          fr: "Pour les avis, nous couvrons Google en priorité car c'est là que se joue le référencement local. Les plateformes de réservation et de livraison sont intégrées au cas par cas selon les API disponibles — nous vous disons franchement ce qui est possible avant de commencer.",
          en: 'For reviews we prioritise Google, because that is where local ranking is decided. Booking and delivery platforms are integrated case by case depending on available APIs — we tell you plainly what is possible before starting.',
        },
      },
      {
        q: {
          fr: "Combien de temps pour être opérationnel ?",
          en: 'How long until it is running?',
        },
        a: {
          fr: "Reviews Hub est en service en quelques jours. Un agent vocal de réservation demande deux à trois semaines, le temps de couvrir correctement les cas particuliers : groupes, allergies, annulations.",
          en: 'Reviews Hub goes live within days. A booking voice agent takes two to three weeks, mostly to cover the edge cases properly: groups, allergies, cancellations.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ÉCOLES & FORMATION — two named clients, two case studies, two live apps.
  // ---------------------------------------------------------------------------
  {
    slug: 'ecoles-formation',
    name: { fr: 'Écoles et organismes de formation', en: 'Schools and training providers' },
    short: { fr: 'Écoles & formation', en: 'Schools & training' },
    seoTitle: {
      fr: "Automatisation pour écoles et centres de formation — inscriptions, suivi, administratif | Step UpAI",
      en: 'Automation for schools and training centres — enrolment, tracking, admin | Step UpAI',
    },
    seoDescription: {
      fr: "Inscriptions, suivi des élèves, relances de paiement et tableaux de bord sur mesure pour écoles et organismes de formation. Déployé chez Beelingue Academy et SJ Academy.",
      en: 'Enrolment, student tracking, payment reminders and custom dashboards for schools and training providers. Live at Beelingue Academy and SJ Academy.',
    },
    keywords: [
      'logiciel gestion école',
      'automatisation centre de formation',
      'tableau de bord école',
      'gestion inscriptions élèves',
      'automatisation administrative école',
      'CRM organisme de formation',
    ],
    headline: {
      fr: "L'administratif d'une école ne devrait pas occuper un poste à plein temps.",
      en: 'School admin should not be a full-time post.',
    },
    subhead: {
      fr: "Inscriptions saisies deux fois, relances de paiement oubliées, plannings tenus dans un tableur, parents qui écrivent le soir. Nous construisons les tableaux de bord et les automatisations qui absorbent ce travail — pour Beelingue Academy et SJ Academy notamment.",
      en: 'Enrolments keyed twice, payment reminders forgotten, timetables held in a spreadsheet, parents emailing at night. We build the dashboards and automations that absorb that work — for Beelingue Academy and SJ Academy among others.',
    },
    pains: [
      {
        fr: "Une inscription arrive par formulaire, puis quelqu'un la recopie dans un tableur, puis dans l'outil de facturation. Trois saisies, trois occasions de se tromper.",
        en: 'An enrolment arrives by form, then someone retypes it into a spreadsheet, then into the billing tool. Three entries, three chances to get it wrong.',
      },
      {
        fr: "Les impayés se découvrent en fin de trimestre, quand la relance est devenue une conversation gênante plutôt qu'un simple rappel.",
        en: 'Unpaid fees surface at end of term, by which point chasing them is an awkward conversation rather than a simple reminder.',
      },
      {
        fr: "Les données de présence, de niveau et de progression existent, mais dispersées dans des fichiers que personne ne consolide. Impossible de répondre à « comment va cet élève ? » sans une demi-heure de recherche.",
        en: 'Attendance, level and progress data all exist, scattered across files nobody consolidates. Answering "how is this student doing?" takes half an hour of digging.',
      },
      {
        fr: "Les parents et les stagiaires posent les mêmes quinze questions — horaires, tarifs, absences, certificats — et chacune interrompt quelqu'un.",
        en: 'Parents and trainees ask the same fifteen questions — hours, fees, absences, certificates — and each one interrupts somebody.',
      },
    ],
    solutions: [
      {
        icon: 'dashboard',
        title: { fr: 'Tableau de bord administratif sur mesure', en: 'Custom admin dashboard' },
        body: {
          fr: "Une interface unique pour les élèves, les groupes, les paiements et la présence. Construite autour de votre fonctionnement réel, pas d'un modèle générique de logiciel scolaire. C'est exactement ce que nous avons livré à Beelingue Academy.",
          en: 'One interface for students, groups, payments and attendance. Built around how you actually operate, not a generic school-software template. This is precisely what we delivered for Beelingue Academy.',
        },
      },
      {
        icon: 'workflow',
        title: { fr: 'Inscriptions sans ressaisie', en: 'Enrolment without re-keying' },
        body: {
          fr: "Le formulaire alimente directement le dossier élève, la facturation et la liste de classe. Une saisie, une source de vérité, et le dossier est complet avant que quiconque ouvre un tableur.",
          en: 'The form feeds the student record, billing and class list directly. One entry, one source of truth, and the record is complete before anyone opens a spreadsheet.',
        },
      },
      {
        icon: 'mail',
        title: { fr: 'Relances de paiement automatiques', en: 'Automatic payment reminders' },
        body: {
          fr: "Rappels échelonnés et polis, envoyés au bon moment, avec escalade vers un humain seulement si nécessaire. Le sujet cesse d'être une corvée mensuelle.",
          en: 'Staged, polite reminders sent at the right time, escalating to a human only when needed. It stops being a monthly chore.',
        },
      },
      {
        icon: 'chat',
        title: { fr: 'Assistant pour les questions courantes', en: 'Assistant for routine questions' },
        body: {
          fr: "Un assistant IA formé sur votre règlement, vos tarifs et votre calendrier répond aux parents et aux stagiaires à toute heure, et transmet à l'équipe ce qui demande un jugement humain.",
          en: 'An AI assistant trained on your policies, fees and calendar answers parents and trainees at any hour, and passes anything needing judgement to the team.',
        },
      },
    ],
    proof: [
      {
        client: 'Beelingue Academy',
        url: 'https://beelingueacademy.com',
        fr: "École de langues. Nous avons conçu et livré leur tableau de bord d'administration : gestion des élèves, des groupes, des paiements et du suivi pédagogique dans une seule interface.",
        en: 'Language school. We designed and delivered their admin dashboard: students, groups, payments and progress tracking in a single interface.',
      },
      {
        client: 'SJ Academy',
        fr: "Panneau d'administration dédié, avec assistant IA pour le traitement des demandes administratives récurrentes.",
        en: 'Dedicated administration panel, with an AI assistant handling recurring administrative requests.',
      },
    ],
    faqs: [
      {
        q: {
          fr: "Les données des élèves sont-elles conformes au RGPD ?",
          en: 'Is student data GDPR-compliant?',
        },
        a: {
          fr: "Oui, et c'est structurant dès la conception. Hébergement dans l'Union européenne, accès limité par rôle, durées de conservation définies avec vous. Les données de mineurs imposent des précautions supplémentaires que nous appliquons par défaut.",
          en: 'Yes, and it shapes the design from the start. EU hosting, role-limited access, retention periods agreed with you. Data on minors carries extra obligations, which we apply by default.',
        },
      },
      {
        q: {
          fr: "Faut-il abandonner nos outils actuels ?",
          en: 'Do we have to abandon our current tools?',
        },
        a: {
          fr: "Non. Dans la plupart des cas nous connectons ce qui existe déjà plutôt que de tout remplacer. Le remplacement n'a de sens que si l'outil actuel est le problème — et nous vous le dirons si c'est le cas.",
          en: 'No. In most cases we connect what already exists rather than replacing it. Replacement only makes sense when the current tool is the problem — and we will say so if it is.',
        },
      },
      {
        q: {
          fr: "Notre équipe administrative n'est pas technique. Est-ce un obstacle ?",
          en: 'Our admin team is not technical. Is that a problem?',
        },
        a: {
          fr: "C'est plutôt le point de départ. Un tableau de bord que le personnel n'ose pas utiliser n'a aucune valeur. Nous formons l'équipe sur ses tâches réelles et nous ajustons l'interface après quelques semaines d'usage.",
          en: 'It is rather the starting point. A dashboard staff are afraid to use is worthless. We train the team on their real tasks and adjust the interface after a few weeks of use.',
        },
      },
      {
        q: {
          fr: "Cela fonctionne-t-il pour un organisme de formation professionnelle, pas seulement une école ?",
          en: 'Does this work for professional training providers, not just schools?',
        },
        a: {
          fr: "Oui. Les mécaniques sont proches : inscriptions, sessions, présence, facturation, attestations. Les contraintes Qualiopi et le suivi des financeurs se modélisent de la même façon.",
          en: 'Yes. The mechanics are close: enrolment, sessions, attendance, billing, certificates. Qualiopi requirements and funder reporting model the same way.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // E-COMMERCE — Magic Afro + Kurry Up (both Shopify) + chatbot case study.
  // ---------------------------------------------------------------------------
  {
    slug: 'ecommerce',
    name: { fr: 'E-commerce et boutiques en ligne', en: 'E-commerce and online stores' },
    short: { fr: 'E-commerce', en: 'E-commerce' },
    seoTitle: {
      fr: 'IA pour e-commerce — chatbot produit, SAV automatisé, fiches produits | Step UpAI',
      en: 'AI for e-commerce — product chatbot, automated support, product copy | Step UpAI',
    },
    seoDescription: {
      fr: "Chatbot qui connaît votre catalogue, SAV automatisé, fiches produits générées, relances de panier. Boutiques Shopify accompagnées : Magic Afro, Kurry Up.",
      en: 'A chatbot that knows your catalogue, automated support, generated product copy, cart recovery. Shopify stores we work with: Magic Afro, Kurry Up.',
    },
    keywords: [
      'chatbot e-commerce français',
      'automatisation SAV e-commerce',
      'IA Shopify',
      'génération fiches produits IA',
      'relance panier abandonné',
      'agence IA e-commerce Paris',
    ],
    headline: {
      fr: 'Votre boutique vend la nuit. Votre service client dort.',
      en: 'Your store sells at night. Your support does not.',
    },
    subhead: {
      fr: "Les mêmes questions sur les tailles, les délais et le suivi de commande, cent fois par semaine. Les paniers abandonnés que personne ne relance. Les fiches produits jamais écrites. Nous automatisons cette part-là, sur Shopify comme ailleurs.",
      en: 'The same questions about sizes, delivery and order tracking, a hundred times a week. Abandoned carts nobody chases. Product pages never written. We automate that layer, on Shopify and elsewhere.',
    },
    pains: [
      {
        fr: "Le service client répond aux mêmes questions toute la journée : « où est ma commande », « ça taille comment », « vous livrez en combien de temps ». Un travail utile, mais qui ne demande pas un humain.",
        en: 'Support answers the same questions all day: where is my order, how does it fit, how long is delivery. Useful work, but it does not need a human.',
      },
      {
        fr: "Les paniers abandonnés partent sans relance, ou avec une relance générique envoyée trop tard, qui ressemble à du spam.",
        en: 'Abandoned carts go unchased, or get a generic reminder sent too late that reads like spam.',
      },
      {
        fr: "Un nouveau produit reste en ligne sans description correcte pendant des semaines, parce qu'écrire quarante fiches n'intéresse personne.",
        en: 'A new product sits online without proper copy for weeks, because writing forty product pages appeals to nobody.',
      },
      {
        fr: "Les avis clients ne sont ni sollicités ni exploités, alors qu'ils font la différence sur la conversion et sur le référencement.",
        en: 'Customer reviews are neither requested nor used, when they drive both conversion and search visibility.',
      },
    ],
    solutions: [
      {
        icon: 'chat',
        title: { fr: 'Chatbot qui connaît votre catalogue', en: 'A chatbot that knows your catalogue' },
        body: {
          fr: "Pas un chatbot générique : il est connecté à vos produits, vos stocks et vos commandes. Il répond sur les tailles, la disponibilité et le suivi, en français et en anglais, et transmet à un humain dès que la demande devient sensible.",
          en: 'Not a generic bot: it is connected to your products, stock and orders. It answers on sizing, availability and tracking, in French and English, and hands off the moment a request turns sensitive.',
        },
      },
      {
        icon: 'cart',
        title: { fr: 'Relances de panier qui ne ressemblent pas à du spam', en: 'Cart recovery that does not read as spam' },
        body: {
          fr: "Relances déclenchées au bon moment, avec le bon produit et un motif crédible. Peu de messages, mieux ciblés — pas une séquence de cinq emails identiques.",
          en: 'Reminders triggered at the right moment, with the right product and a credible reason. Fewer messages, better aimed — not a five-email identical sequence.',
        },
      },
      {
        icon: 'workflow',
        title: { fr: 'Fiches produits générées puis relues', en: 'Product copy generated, then reviewed' },
        body: {
          fr: "Descriptions, attributs et balises générés depuis vos données produit, dans votre ton, prêts à être relus plutôt qu'écrits de zéro. Quarante fiches deviennent une heure de relecture.",
          en: 'Descriptions, attributes and tags generated from your product data in your tone, ready to review rather than write from scratch. Forty products becomes an hour of proofreading.',
        },
      },
      {
        icon: 'reviews',
        title: { fr: 'Sollicitation et exploitation des avis', en: 'Requesting and using reviews' },
        body: {
          fr: "Demande d'avis envoyée au bon moment après livraison, réponses automatiques aux avis publiés, et remontée des signaux récurrents — ce que les clients reprochent vraiment à un produit.",
          en: 'Review requests sent at the right point after delivery, automatic replies to published reviews, and surfacing of recurring signals — what customers actually complain about.',
        },
      },
    ],
    proof: [
      {
        client: 'Magic Afro',
        url: 'https://magicafro.fr',
        fr: "Boutique Shopify. Accompagnement sur la présence en ligne et l'automatisation des tâches récurrentes de la boutique.",
        en: 'Shopify store. Work on online presence and automating the store\'s recurring tasks.',
      },
      {
        client: 'Kurry Up',
        url: 'https://kurryup.fr',
        fr: "Boutique Shopify de street food indienne : commande en ligne connectée à l'activité en salle. Un cas où e-commerce et restauration se recouvrent.",
        en: 'Indian street food Shopify store: online ordering connected to the in-house operation. A case where e-commerce and food service overlap.',
      },
    ],
    faqs: [
      {
        q: {
          fr: "Cela fonctionne-t-il avec Shopify, WooCommerce ou PrestaShop ?",
          en: 'Does this work with Shopify, WooCommerce or PrestaShop?',
        },
        a: {
          fr: "Oui pour les trois. Nous travaillons le plus souvent sur Shopify — Magic Afro et Kurry Up y sont — mais l'approche repose sur les API de la boutique, pas sur une plateforme en particulier.",
          en: 'Yes to all three. We work most often on Shopify — Magic Afro and Kurry Up are both there — but the approach relies on the store\'s APIs rather than any one platform.',
        },
      },
      {
        q: {
          fr: "Le chatbot peut-il inventer une réponse fausse sur un produit ?",
          en: 'Can the chatbot invent a wrong answer about a product?',
        },
        a: {
          fr: "C'est le risque réel de ce type d'outil et nous le traitons explicitement : le chatbot répond à partir de vos données produit et non de sa mémoire générale, et lorsqu'il n'a pas l'information il le dit et propose un contact humain. Un « je ne sais pas » vaut mieux qu'un mauvais renseignement sur un délai de livraison.",
          en: 'That is the genuine risk with these tools and we address it directly: the bot answers from your product data rather than its general memory, and when it lacks the information it says so and offers a human. An honest "I do not know" beats a wrong delivery estimate.',
        },
      },
      {
        q: {
          fr: "Nous vendons à l'international. Le multilingue est-il géré ?",
          en: 'We sell internationally. Is multilingual handled?',
        },
        a: {
          fr: "Oui. Le chatbot et les fiches produits fonctionnent en plusieurs langues à partir d'une seule source. C'est particulièrement utile quand une clientèle touristique achète en anglais un produit décrit en français.",
          en: 'Yes. The chatbot and product copy work across languages from a single source. This matters when tourist customers buy in English a product described in French.',
        },
      },
      {
        q: {
          fr: "Quel est le délai de mise en place ?",
          en: 'What is the setup time?',
        },
        a: {
          fr: "Un chatbot connecté au catalogue demande deux à trois semaines. Les relances de panier et la génération de fiches sont plus rapides, souvent une semaine, car elles dépendent moins de vos cas particuliers.",
          en: 'A catalogue-connected chatbot takes two to three weeks. Cart recovery and copy generation are faster, often a week, since they depend less on your edge cases.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // COMMERCE LOCAL & BEAUTÉ — Beauty Chic + Reviews Hub.
  // ---------------------------------------------------------------------------
  {
    slug: 'commerce-local',
    name: { fr: 'Commerce local, beauté et bien-être', en: 'Local retail, beauty and wellness' },
    short: { fr: 'Commerce local', en: 'Local retail' },
    seoTitle: {
      fr: 'IA pour commerces locaux — prise de rendez-vous, avis Google, rappels | Step UpAI',
      en: 'AI for local businesses — bookings, Google reviews, reminders | Step UpAI',
    },
    seoDescription: {
      fr: "Prise de rendez-vous automatisée, réduction des rendez-vous manqués et gestion des avis Google pour salons, instituts et commerces de proximité. Déployé chez Beauty Chic.",
      en: 'Automated bookings, fewer no-shows and Google review management for salons, studios and neighbourhood businesses. Live at Beauty Chic.',
    },
    keywords: [
      'prise de rendez-vous automatique salon',
      'réduire les rendez-vous manqués',
      'avis google commerce local',
      'automatisation institut de beauté',
      'agent vocal prise de rdv',
      'référencement local commerce Paris',
    ],
    headline: {
      fr: 'Un rendez-vous manqué, c\'est une heure de chiffre d\'affaires perdue.',
      en: 'A missed appointment is an hour of revenue gone.',
    },
    subhead: {
      fr: "Pour un salon ou un institut, l'agenda est le chiffre d'affaires. Nous automatisons la prise de rendez-vous, les rappels qui font revenir les clients, et les avis Google qui décident si un nouveau client pousse la porte.",
      en: 'For a salon or studio, the calendar is the revenue. We automate booking, the reminders that bring clients back, and the Google reviews that decide whether a new one walks in.',
    },
    pains: [
      {
        fr: "Le téléphone sonne pendant une prestation. Répondre, c'est interrompre une cliente ; ne pas répondre, c'est perdre une réservation.",
        en: 'The phone rings mid-treatment. Answering interrupts a client; not answering loses a booking.',
      },
      {
        fr: "Les rendez-vous manqués ne sont pas rattrapables : le créneau est perdu et il était réservé, donc invendable.",
        en: 'No-shows cannot be recovered: the slot is gone and it was booked, so it could not be resold.',
      },
      {
        fr: "La fiche Google est le premier contact d'un nouveau client, et elle affiche trois avis dont deux sans réponse.",
        en: 'The Google listing is a new client\'s first contact, and it shows three reviews, two of them unanswered.',
      },
      {
        fr: "Les clientes fidèles reviennent quand elles y pensent, pas quand il faudrait. Personne n'a le temps de relancer individuellement.",
        en: 'Regulars come back when they remember to, not when they should. Nobody has time to chase individually.',
      },
    ],
    solutions: [
      {
        icon: 'voice',
        title: { fr: 'Prise de rendez-vous sans décrocher', en: 'Bookings without answering the phone' },
        body: {
          fr: "Un agent vocal ou un formulaire intelligent prend le rendez-vous, vérifie la disponibilité réelle dans votre agenda et confirme par SMS. Vous ne quittez pas votre poste de travail.",
          en: 'A voice agent or smart form takes the booking, checks real availability in your calendar and confirms by SMS. You never leave your station.',
        },
      },
      {
        icon: 'mail',
        title: { fr: 'Rappels qui réduisent les absences', en: 'Reminders that cut no-shows' },
        body: {
          fr: "Confirmation à la réservation, rappel la veille, possibilité d'annuler en un clic. Une annulation la veille est récupérable ; une absence le jour même ne l'est pas.",
          en: 'Confirmation at booking, reminder the day before, one-tap cancellation. A day-before cancellation is recoverable; a same-day no-show is not.',
        },
      },
      {
        icon: 'reviews',
        title: { fr: 'Avis Google sollicités et traités', en: 'Google reviews requested and handled' },
        body: {
          fr: "Demande d'avis envoyée après la prestation, au moment où la cliente est satisfaite, puis réponse à chaque avis publié. Le volume et la fraîcheur des avis pèsent lourd dans le classement local.",
          en: 'Review request sent after the appointment, while the client is happy, then a reply to every published review. Review volume and recency weigh heavily in local ranking.',
        },
      },
      {
        icon: 'workflow',
        title: { fr: 'Relances de fidélisation', en: 'Retention follow-ups' },
        body: {
          fr: "Un message au bon intervalle selon la prestation — pas une newsletter mensuelle envoyée à tout le fichier. La cliente qui vient tous les deux mois est relancée à deux mois.",
          en: 'A message at the right interval for the treatment — not a monthly newsletter to the whole list. The client who comes every two months gets contacted at two months.',
        },
      },
    ],
    proof: [
      {
        client: 'Beauty Chic',
        fr: "Application client dédiée, hébergée et maintenue par nos soins, pour la gestion de leur activité et de leur relation client.",
        en: 'Dedicated client application, hosted and maintained by us, for managing their operation and client relationships.',
      },
    ],
    faqs: [
      {
        q: {
          fr: "L'agent vocal peut-il vraiment remplacer une prise de rendez-vous au téléphone ?",
          en: 'Can a voice agent really replace phone booking?',
        },
        a: {
          fr: "Pour un rendez-vous standard, oui. Pour une demande particulière — une prestation inhabituelle, une cliente qui hésite — il transfère à un humain. L'objectif n'est pas de supprimer le téléphone mais d'éviter que la moitié des appels sonne dans le vide pendant le service.",
          en: 'For a standard booking, yes. For anything unusual — an uncommon treatment, an undecided client — it hands off to a human. The goal is not to remove the phone but to stop half the calls ringing out during service.',
        },
      },
      {
        q: {
          fr: "S'intègre-t-il à l'agenda que nous utilisons déjà ?",
          en: 'Does it integrate with the calendar we already use?',
        },
        a: {
          fr: "Dans la plupart des cas oui, via l'API de votre logiciel de planning. Nous vérifions ce point avant de vous proposer quoi que ce soit — un système de réservation qui ne parle pas à votre agenda crée plus de problèmes qu'il n'en résout.",
          en: 'In most cases yes, via your scheduling software\'s API. We verify this before proposing anything — a booking system that does not talk to your calendar creates more problems than it solves.',
        },
      },
      {
        q: {
          fr: "Nous sommes un petit commerce. Est-ce disproportionné ?",
          en: 'We are a small business. Is this overkill?',
        },
        a: {
          fr: "Cela dépend du volume d'appels et du taux d'absence. Si vous perdez deux créneaux par semaine, le calcul est vite fait. Si vous en perdez un par mois, nous vous le dirons et vous conseillerons de commencer par les avis Google, qui coûtent moins et rapportent plus vite.",
          en: 'It depends on call volume and no-show rate. If you lose two slots a week, the maths is quick. If you lose one a month, we will say so and suggest starting with Google reviews, which cost less and pay back faster.',
        },
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

export function getSectorUrl(slug: string): string {
  return `/solutions/${slug}`;
}

export function getOtherSectors(slug: string): Sector[] {
  return sectors.filter((s) => s.slug !== slug);
}

export const sectorSlugs: string[] = sectors.map((s) => s.slug);
