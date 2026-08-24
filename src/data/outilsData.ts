// =============================================================================
// Outils Data Layer — Step UpAI
//
// Free, ungated tools at /outils/*. They exist to reach people who are NOT
// searching for an AI agency: they search for something they need anyway and
// arrive here. The offer always sits UNDER the answer, never in front of it.
//
// RULE: a tool only ships if it stays correct without anyone remembering to
// update it. No dated legal claims, no curated lists that rot, no dataset we
// do not control. A stale tool is worse than no tool.
//
// Copy lives here (fr/en pairs), same convention as sectorData.ts — the older
// LanguageContext key system is reserved for chrome shared across pages.
// =============================================================================

export interface Bilingual {
  fr: string;
  en: string;
}

export interface ToolMeta {
  slug: string;
  name: Bilingual;
  tagline: Bilingual;
  icon: 'reviews' | 'invoice' | 'search' | 'calculator';
  status: 'live' | 'soon';
}

/** Everything listed on the /outils hub. `soon` items render disabled, no link. */
export const outils: ToolMeta[] = [
  {
    slug: 'generateur-reponse-avis-google',
    name: { fr: 'Générateur de réponse aux avis Google', en: 'Google review reply generator' },
    tagline: {
      fr: "Collez un avis, obtenez une réponse prête à publier — dans votre ton, en deux phrases.",
      en: 'Paste a review, get a ready-to-post reply — in your tone, in two sentences.',
    },
    icon: 'reviews',
    status: 'live',
  },
  {
    slug: 'facturation-electronique',
    name: { fr: 'Facturation électronique : êtes-vous prêt ?', en: 'E-invoicing: are you ready?' },
    tagline: {
      fr: 'Vos dates limites de réception et d’émission, selon la taille réelle de votre entreprise.',
      en: 'Your reception and issuance deadlines, based on your company’s actual size class.',
    },
    icon: 'invoice',
    status: 'soon',
  },
  {
    slug: 'calculateur-roi-automatisation',
    name: { fr: "Calculateur : le coût de vos tâches manuelles", en: 'Calculator: the cost of your manual tasks' },
    tagline: {
      fr: 'Ce qu’une tâche répétitive vous coûte par an, et à partir de quand l’automatiser est rentable.',
      en: 'What a repetitive task costs you per year, and when automating it pays for itself.',
    },
    icon: 'calculator',
    status: 'soon',
  },
];

export const outilsHub = {
  seoTitle: {
    fr: 'Outils gratuits pour les PME et commerces — sans inscription | Step UpAI',
    en: 'Free tools for small businesses — no signup | Step UpAI',
  },
  seoDescription: {
    fr: "Des outils gratuits et sans inscription pour les dirigeants de PME, commerces et restaurants en France : réponses aux avis Google, facturation électronique, calcul du coût des tâches manuelles.",
    en: 'Free, no-signup tools for French small-business owners: Google review replies, e-invoicing readiness, the real cost of manual tasks.',
  },
  keywords: [
    'outils gratuits entreprise',
    'outil gratuit PME',
    'répondre avis Google',
    'facturation électronique 2026',
    'calculateur automatisation',
  ],
  headline: {
    fr: 'Des outils gratuits, sans inscription.',
    en: 'Free tools, no signup.',
  },
  subhead: {
    fr: "Nous construisons des automatisations pour des PME et des commerces en Île-de-France. Voici quelques-uns de nos outils, utilisables librement — sans compte, sans e-mail à laisser, sans limite d'essai.",
    en: 'We build automations for small businesses in and around Paris. Here are some of our tools, free to use — no account, no email required, no trial limit.',
  },
  soonLabel: { fr: 'Bientôt', en: 'Coming soon' },
  openLabel: { fr: "Ouvrir l'outil", en: 'Open the tool' },
};

// ---------------------------------------------------------------------------
// TOOL 1 — Google review reply generator
//
// The reply rules below MIRROR the Reviews Hub product prompt exactly (see
// REVIEWS_HUB.md §3). Free sample and paid product must speak with one voice.
// Do not add rules here without changing them there too.
// ---------------------------------------------------------------------------

export interface ToolFaq {
  q: Bilingual;
  a: Bilingual;
}

export interface ReplyExample {
  rating: number;
  review: Bilingual;
  reply: Bilingual;
}

export const reviewTool = {
  slug: 'generateur-reponse-avis-google',

  seoTitle: {
    fr: 'Générateur de réponse aux avis Google — gratuit, sans inscription | Step UpAI',
    en: 'Google review reply generator — free, no signup | Step UpAI',
  },
  seoDescription: {
    fr: "Collez un avis Google, obtenez une réponse professionnelle prête à publier, en français ou en anglais. Gratuit, sans inscription, sans limite. Pensé pour les restaurants, salons et commerces.",
    en: 'Paste a Google review and get a professional, ready-to-post reply in French or English. Free, no signup, no limit. Built for restaurants, salons and local shops.',
  },
  keywords: [
    'répondre à un avis Google',
    'réponse avis Google négatif exemple',
    'modèle réponse avis client',
    'générateur réponse avis',
    'avis Google restaurant',
    'répondre avis client négatif',
  ],

  headline: {
    fr: 'Répondez à un avis Google en dix secondes.',
    en: 'Answer a Google review in ten seconds.',
  },
  subhead: {
    fr: "Collez l'avis, choisissez le ton, obtenez une réponse en deux phrases dans la langue du client. Vous relisez, vous copiez, vous publiez. Gratuit et sans inscription.",
    en: 'Paste the review, pick a tone, get a two-sentence reply in the customer’s own language. You read it, copy it, post it. Free, no signup.',
  },

  form: {
    reviewLabel: { fr: "L'avis du client", en: 'The customer review' },
    reviewPlaceholder: {
      fr: "Collez ici l'avis Google tel qu'il a été écrit…",
      en: 'Paste the Google review exactly as it was written…',
    },
    reviewHint: {
      fr: 'Laissez vide si le client a mis une note sans commentaire.',
      en: 'Leave empty if the customer left a rating with no comment.',
    },
    ratingLabel: { fr: 'Note laissée', en: 'Rating given' },
    businessTypeLabel: { fr: "Type d'établissement", en: 'Type of business' },
    businessNameLabel: { fr: "Nom de l'établissement (facultatif)", en: 'Business name (optional)' },
    businessNamePlaceholder: { fr: 'Ex. Le Comptoir du Marais', en: 'e.g. The Corner Bistro' },
    toneLabel: { fr: 'Ton de la réponse', en: 'Tone of the reply' },
    submit: { fr: 'Générer la réponse', en: 'Generate the reply' },
    submitting: { fr: 'Rédaction en cours…', en: 'Writing…' },
    regenerate: { fr: 'Proposer une autre version', en: 'Try another version' },
    copy: { fr: 'Copier', en: 'Copy' },
    copied: { fr: 'Copié', en: 'Copied' },
    resultLabel: { fr: 'Votre réponse', en: 'Your reply' },
    editHint: {
      fr: 'Vous pouvez modifier le texte avant de le copier.',
      en: 'You can edit the text before copying it.',
    },
    disclaimer: {
      fr: 'Relisez avant de publier. Vous restez responsable de la réponse publiée sur votre fiche.',
      en: 'Read it before posting. You remain responsible for what appears on your listing.',
    },
    privacy: {
      fr: "L'avis que vous collez est envoyé à un modèle d'IA pour rédiger la réponse. Rien n'est conservé : ni l'avis, ni la réponse.",
      en: 'The review you paste is sent to an AI model to draft the reply. Nothing is stored — neither the review nor the reply.',
    },
  },

  businessTypes: [
    { value: 'restaurant', label: { fr: 'Restaurant, café, boulangerie', en: 'Restaurant, café, bakery' } },
    { value: 'salon', label: { fr: 'Salon de coiffure, beauté, barbier', en: 'Hair, beauty, barber' } },
    { value: 'commerce', label: { fr: 'Commerce, boutique', en: 'Shop, retail' } },
    { value: 'hotel', label: { fr: 'Hôtel, hébergement', en: 'Hotel, accommodation' } },
    { value: 'services', label: { fr: 'Services, artisan, profession libérale', en: 'Services, trades, professional' } },
    { value: 'autre', label: { fr: 'Autre', en: 'Other' } },
  ],

  tones: [
    { value: 'chaleureux', label: { fr: 'Chaleureux', en: 'Warm' } },
    { value: 'professionnel', label: { fr: 'Professionnel', en: 'Professional' } },
    { value: 'concis', label: { fr: 'Concis', en: 'Concise' } },
  ],

  states: {
    skipTitle: {
      fr: 'Cet avis semble abusif — mieux vaut ne pas répondre.',
      en: 'This review looks abusive — better not to reply.',
    },
    skipBody: {
      fr: "Insultes, attaques personnelles, propos discriminatoires ou diffamatoires : répondre publiquement à ce type d'avis l'amplifie et vous expose. La bonne démarche est de le signaler à Google pour suppression, depuis votre fiche d'établissement. Si le signalement échoue, une réponse d'une phrase, factuelle et sans émotion, reste préférable à un échange.",
      en: 'Insults, personal attacks, discriminatory or defamatory content: replying publicly to this kind of review amplifies it and exposes you. The right move is to report it to Google for removal from your business profile. If the report fails, a single factual, unemotional sentence beats an argument.',
    },
    errorTitle: { fr: "La génération n'a pas abouti", en: 'The reply could not be generated' },
    errorBody: {
      fr: "Réessayez dans un instant. Si cela persiste, écrivez-nous — nous répondrons avec une proposition rédigée à la main.",
      en: 'Try again in a moment. If it keeps failing, write to us and we will send a hand-written suggestion.',
    },
    rateLimitedTitle: { fr: 'Vous avez atteint la limite horaire', en: 'You have hit the hourly limit' },
    rateLimitedBody: {
      fr: "L'outil est gratuit et sans inscription, donc plafonné pour rester disponible pour tout le monde. Réessayez dans une heure — ou laissez Reviews Hub s'en charger en continu.",
      en: 'The tool is free and ungated, so it is capped to stay available for everyone. Try again in an hour — or let Reviews Hub handle it continuously.',
    },
    unavailableTitle: { fr: "L'outil est très demandé aujourd'hui", en: 'The tool is in high demand today' },
    unavailableBody: {
      fr: "La limite quotidienne est atteinte. Revenez demain, ou découvrez Reviews Hub, qui traite vos avis sans plafond.",
      en: 'Today’s limit has been reached. Come back tomorrow, or take a look at Reviews Hub, which handles your reviews without a cap.',
    },
    emptyReview: { fr: 'Choisissez au moins une note.', en: 'Pick a rating at least.' },
    tooLong: { fr: 'Avis trop long (1500 caractères maximum).', en: 'Review too long (1500 characters max).' },
  },

  cta: {
    title: {
      fr: 'Vous venez de répondre à un avis. Reviews Hub répond à tous les autres.',
      en: 'You just answered one review. Reviews Hub answers all the others.',
    },
    body: {
      fr: "Reviews Hub surveille votre fiche Google et prépare une réponse pour chaque nouvel avis, dans le ton de votre établissement. Vous gardez le contrôle avant publication. 4,99 €/mois, 7 jours d'essai gratuit.",
      en: 'Reviews Hub watches your Google listing and drafts a reply for every new review, in your business’s own tone. You stay in control before anything is published. €4.99/month, 7-day free trial.',
    },
    button: { fr: 'Découvrir Reviews Hub', en: 'Discover Reviews Hub' },
    url: 'https://reviewshub.step-upai.com',
  },

  // -- Editorial content. This is what actually earns the page its ranking:
  // -- the widget itself is ~80 words of DOM.
  rulesTitle: {
    fr: 'Répondre aux avis Google : cinq règles qui changent tout',
    en: 'Answering Google reviews: five rules that matter',
  },
  rules: [
    {
      title: { fr: 'Répondez vite, surtout aux avis négatifs', en: 'Reply fast, especially to negative reviews' },
      body: {
        fr: "Une réponse dans les 24 à 48 heures montre que quelqu'un lit. Passé une semaine, la réponse ne s'adresse plus au client mécontent — elle s'adresse aux prochains lecteurs, ce qui reste utile, mais l'occasion de récupérer le client est passée.",
        en: 'A reply within 24 to 48 hours shows someone is reading. After a week, the reply no longer speaks to the unhappy customer — it speaks to future readers, which still helps, but the chance to win them back is gone.',
      },
    },
    {
      title: { fr: 'Deux phrases suffisent', en: 'Two sentences are enough' },
      body: {
        fr: "Les longues justifications se lisent comme de la défense. Une reconnaissance courte, sincère, sans excuse alambiquée, est plus crédible qu'un paragraphe qui explique pourquoi le client a tort.",
        en: 'Long justifications read as defensiveness. A short, sincere acknowledgement beats a paragraph explaining why the customer is wrong.',
      },
    },
    {
      title: { fr: 'Répondez dans la langue du client', en: 'Reply in the customer’s language' },
      body: {
        fr: "Google traduit automatiquement les avis, ce qui trompe : un avis affiché en français peut avoir été écrit en anglais ou en italien. Répondez dans la langue d'origine — c'est celle que le client relira.",
        en: 'Google auto-translates reviews, which misleads: a review shown in French may have been written in English or Italian. Reply in the original language — that is the one the customer will read.',
      },
    },
    {
      title: { fr: 'Ne promettez rien que vous ne ferez pas', en: 'Never promise what you will not do' },
      body: {
        fr: "« Nous vous remboursons », « cela ne se reproduira plus » : ces phrases se retournent contre vous si rien ne suit. Reconnaissez, remerciez, invitez à revenir. C'est tout ce qu'une réponse publique doit faire.",
        en: '"We will refund you", "this will never happen again": these turn against you when nothing follows. Acknowledge, thank, invite them back. That is all a public reply needs to do.',
      },
    },
    {
      title: { fr: 'Répondez aussi aux avis positifs', en: 'Answer the positive ones too' },
      body: {
        fr: "C'est là que la plupart des commerces abandonnent, et c'est l'erreur la moins coûteuse à corriger. Un établissement qui répond à tout le monde signale qu'il est tenu par quelqu'un d'attentif — au client suivant comme à Google.",
        en: 'This is where most businesses give up, and it is the cheapest mistake to fix. A business that answers everyone signals that someone attentive is running it — to the next customer and to Google alike.',
      },
    },
  ],

  examplesTitle: { fr: 'Exemples de réponses', en: 'Example replies' },
  examplesIntro: {
    fr: "Quatre cas courants, avec la réponse que nous publierions. Le générateur ci-dessus suit exactement la même logique.",
    en: 'Four common cases, with the reply we would publish. The generator above follows exactly the same logic.',
  },
  examples: [
    {
      rating: 5,
      review: {
        fr: 'Excellent accueil, plats copieux et service rapide. On reviendra !',
        en: 'Great welcome, generous portions and fast service. We will be back!',
      },
      reply: {
        fr: "Merci beaucoup pour ce retour, il fait vraiment plaisir à toute l'équipe. Au plaisir de vous accueillir à nouveau très bientôt.",
        en: 'Thank you so much for this feedback — it means a lot to the whole team. We look forward to welcoming you back soon.',
      },
    },
    {
      rating: 2,
      review: {
        fr: "Attente de 40 minutes pour être servis un mardi soir, alors que la salle était à moitié vide.",
        en: 'Forty minutes to be served on a Tuesday evening, with the room half empty.',
      },
      reply: {
        fr: "Nous comprenons votre frustration et nous vous présentons nos excuses pour cette attente. Nous espérons avoir l'occasion de vous offrir un service à la hauteur lors d'une prochaine visite.",
        en: 'We understand your frustration and we are sorry for the wait. We hope to have the chance to give you the service you expected on a future visit.',
      },
    },
    {
      rating: 3,
      review: {
        fr: 'Correct sans plus. Le cadre est agréable mais les prix sont élevés pour ce que c’est.',
        en: 'Fine, nothing more. Nice setting but pricey for what it is.',
      },
      reply: {
        fr: "Merci d'avoir pris le temps de partager votre ressenti, nous en tenons compte. Nous serions heureux de vous accueillir à nouveau pour vous faire changer d'avis.",
        en: 'Thank you for taking the time to share your impression — we take it on board. We would be glad to welcome you again and change your mind.',
      },
    },
    {
      rating: 5,
      review: { fr: '', en: '' },
      reply: {
        fr: "Merci beaucoup pour votre note, c'est un vrai encouragement pour l'équipe. Au plaisir de vous revoir bientôt.",
        en: 'Thank you very much for the rating — it is a real encouragement for the team. We hope to see you again soon.',
      },
    },
  ],

  faqs: [
    {
      q: { fr: 'Faut-il vraiment répondre aux avis négatifs ?', en: 'Should you really reply to negative reviews?' },
      a: {
        fr: "Oui, et pas pour convaincre l'auteur de l'avis : pour les lecteurs suivants. Un avis négatif sans réponse est lu comme une accusation acceptée. Le même avis suivi d'une réponse courte et posée est lu comme un incident traité. La très grande majorité des futurs clients lisent les réponses avant de décider.",
        en: 'Yes — not to convince the reviewer, but for everyone who reads next. An unanswered negative review reads as an accepted accusation. The same review followed by a short, calm reply reads as an incident handled. Most prospective customers read the replies before deciding.',
      },
    },
    {
      q: { fr: 'Peut-on faire supprimer un avis Google ?', en: 'Can a Google review be removed?' },
      a: {
        fr: "Seulement s'il enfreint les règles de Google : propos haineux, contenu hors sujet, spam, conflit d'intérêts, informations personnelles. Un avis simplement injuste ou exagéré ne sera pas supprimé. Le signalement se fait depuis votre fiche d'établissement, et le délai de traitement est variable. Répondre reste plus rapide et plus efficace que d'attendre une suppression improbable.",
        en: 'Only if it breaks Google’s policies: hate speech, off-topic content, spam, conflict of interest, personal information. A merely unfair or exaggerated review will not be removed. You report it from your business profile, and processing times vary. Replying is faster and more effective than waiting for an unlikely removal.',
      },
    },
    {
      q: { fr: "L'outil est-il vraiment gratuit ?", en: 'Is the tool really free?' },
      a: {
        fr: "Oui, sans inscription, sans e-mail à laisser et sans limite d'essai. Il est plafonné par heure pour éviter les abus automatisés, rien de plus. Nous le proposons parce qu'il montre concrètement ce que fait notre produit Reviews Hub, qui traite les avis en continu plutôt qu'un par un.",
        en: 'Yes — no signup, no email, no trial limit. There is an hourly cap to prevent automated abuse, nothing more. We offer it because it shows concretely what our Reviews Hub product does, handling reviews continuously rather than one at a time.',
      },
    },
    {
      q: { fr: 'Que devient l’avis que je colle ?', en: 'What happens to the review I paste?' },
      a: {
        fr: "Il est transmis à un modèle d'IA le temps de rédiger la réponse, puis rien n'est conservé : ni l'avis, ni la réponse générée. Nous ne mesurons que des compteurs anonymes (nombre de générations, note choisie, langue) pour savoir si l'outil sert à quelque chose.",
        en: 'It is sent to an AI model just long enough to draft the reply, and nothing is kept — neither the review nor the generated reply. We only record anonymous counters (number of generations, chosen rating, language) to know whether the tool is useful.',
      },
    },
    {
      q: { fr: 'La réponse est-elle publiée automatiquement ?', en: 'Is the reply posted automatically?' },
      a: {
        fr: "Non. Cet outil rédige, vous publiez. Même notre produit payant, Reviews Hub, prépare la réponse et vous laisse valider avant publication : personne ne parle au nom de votre établissement sans votre accord.",
        en: 'No. This tool drafts, you publish. Even our paid product, Reviews Hub, prepares the reply and leaves the approval to you: nobody speaks for your business without your say-so.',
      },
    },
    {
      q: { fr: 'Répond-il en anglais et dans d’autres langues ?', en: 'Does it reply in English and other languages?' },
      a: {
        fr: "La réponse est rédigée dans la langue de l'avis, pas dans celle du site. Un avis écrit en anglais, en espagnol ou en italien obtient une réponse dans cette langue — c'est celle que le client relira sur votre fiche.",
        en: 'The reply is written in the language of the review, not the language of this site. A review written in English, Spanish or Italian gets a reply in that language — the one the customer will read on your listing.',
      },
    },
  ] as ToolFaq[],
};

export const toolSlugs: string[] = outils.filter((t) => t.status === 'live').map((t) => t.slug);
