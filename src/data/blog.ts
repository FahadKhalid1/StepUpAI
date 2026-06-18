// ─────────────────────────────────────────────────────────────────────────────
// Step UpAI — Blog data source (single source of truth for all blog posts)
//
// The automated blog pipeline (n8n Publishing Agent) appends new BlogPost
// objects to the `posts` array below, then commits + pushes to
// github.com/FahadKhalid1/StepUpAI → Vercel auto-deploys.
//
// Content is bilingual (fr primary / en) to match the site's LanguageContext.
// `content` is light markdown: `## H2`, `### H3`, `**bold**`, `- list`, blank-line
// paragraphs. FAQ is stored structured (for FAQPage schema → AEO/GEO) AND rendered.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'fr';

export interface Localized {
  en: string;
  fr: string;
}

export interface BlogFAQ {
  q: Localized;
  a: Localized;
}

export interface BlogPost {
  slug: string;
  title: Localized;
  excerpt: Localized;
  /** Light-markdown article body, per language. */
  content: Localized;
  author: Localized;
  /** ISO date YYYY-MM-DD */
  date: string;
  /** Human-readable, e.g. { en: '8 min read', fr: '8 min de lecture' } */
  readTime: Localized;
  /** Single primary category id (matches a key in blogCategories). */
  category: string;
  tags: string[];
  featured: boolean;
  /** Tailwind gradient classes for the cover, e.g. 'from-blue-600 to-purple-700'. */
  coverGradient: string;
  /** Optional real cover image URL (overrides the gradient when present). */
  image?: string;
  /** Structured FAQ → rendered + emitted as FAQPage JSON-LD (answer-engine optimization). */
  faq?: BlogFAQ[];
}

export const blogCategories: Record<string, Localized> = {
  ai: { en: 'AI & Automation', fr: 'IA & Automatisation' },
  chatbots: { en: 'Chatbots', fr: 'Chatbots' },
  voice: { en: 'Voice AI', fr: 'IA Vocale' },
  data: { en: 'Data & Analytics', fr: 'Données & Analytics' },
  industry: { en: 'Industry', fr: 'Secteur' },
  web: { en: 'Web Development', fr: 'Développement Web' },
  ecommerce: { en: 'E-commerce', fr: 'E-commerce' },
};

export const posts: BlogPost[] = [
  // 2026-06-17: all articles removed — faulty/fabricated (firm citations + invented charts); clean versions regenerating to dashboard for review
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  // Newest first.
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return getAllPosts().find((p) => p.featured);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags)));
}

// ─── Topical clusters: blog category ↔ service landing page ──────────────────

/** Map a post category to the matching service landing page (e.g. /chatbot-ia-paris). */
export const categoryToService: Record<string, { slug: string; label: Localized }> = {
  ai: { slug: 'automatisation-ia', label: { fr: "l'automatisation IA", en: 'AI automation' } },
  chatbots: { slug: 'chatbot-ia', label: { fr: 'les chatbots IA', en: 'AI chatbots' } },
  voice: { slug: 'appels-ia', label: { fr: "les agents d'appels IA", en: 'AI voice agents' } },
  data: { slug: 'automatisation-ia', label: { fr: "l'automatisation IA", en: 'AI automation' } },
  industry: { slug: 'automatisation-ia', label: { fr: "l'automatisation IA", en: 'AI automation' } },
  web: { slug: 'developpement-web', label: { fr: 'le développement web', en: 'web development' } },
};

const serviceToCategories: Record<string, string[]> = {
  'automatisation-ia': ['ai', 'data', 'industry'],
  'appels-ia': ['voice'],
  'chatbot-ia': ['chatbots'],
  'developpement-web': ['web'],
  'agents-ia': ['ai'],
  'email-marketing-ia': [],
};

/** Posts relevant to a service landing page, for service↔blog topical clustering. */
export function getPostsForService(serviceId: string, limit = 3): BlogPost[] {
  const cats = serviceToCategories[serviceId] ?? [];
  return getAllPosts()
    .filter((p) => cats.includes(p.category))
    .slice(0, limit);
}
