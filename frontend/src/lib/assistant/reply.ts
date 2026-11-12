import {
  buildKnowledgeChunks,
  searchKnowledge,
  type KnowledgeChunk,
} from '@/lib/assistant/knowledge';
import {
  joinBilingual,
  resolveLanguages,
  type LanguageMode,
  type ReplyLanguage,
} from '@/lib/assistant/language';
import type { PortfolioProfile } from '@/lib/portfolio';

export type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type Intent =
  | 'greeting'
  | 'name'
  | 'location'
  | 'about'
  | 'role'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'focus'
  | 'contact'
  | 'pdf'
  | 'search';

/** High-priority patterns checked before the general list. */
const PRIORITY_INTENTS: { intent: Intent; pattern: RegExp }[] = [
  {
    intent: 'name',
    pattern:
      /(?:what(?:'s|\s+is)\s+(?:your|his|her|their|the)\s+(?:full\s+)?name|(?:your|his|her)\s+(?:full\s+)?name\??$|who\s+are\s+you|sino\s+(?:ka|siya|si\s+[\w-]+)|anong\s+(?:ang\s+)?(?:buong\s+)?pangalan|ano\s+ang\s+(?:buong\s+)?pangalan|pangalan\s+(?:mo|niya|nya)|(?:buong|full)\s+pangalan|kilala\s+(?:bilang|sa\s+pangalang)|tawag\s+(?:sa\s+)?(?:kanya|iyo))/i,
  },
  {
    intent: 'location',
    pattern:
      /\b(where\s+(?:do\s+you\s+live|is\s+he\s+based|does\s+he\s+live|from)|saan\s+(?:siya\s+)?(?:nakatira|naga|galing|based)|taga\s+saan|lokasyon|location\b)/i,
  },
];

const INTENT_PATTERNS: { intent: Intent; pattern: RegExp }[] = [
  {
    intent: 'greeting',
    pattern:
      /^(hi|hello|hey|good\s+(morning|afternoon|evening)|kamusta|magandang\s+(umaga|hapon|gabi)|musta)\b/i,
  },
  {
    intent: 'about',
    pattern:
      /\b(about|summary|biography|who\s+is|tell\s+me\s+about|introduce|sino\s+(si|ka)|pakilala|background|kwento)\b/i,
  },
  {
    intent: 'role',
    pattern:
      /\b(current\s+role|job\s+now|position|title|trabaho(\s+ngayon)?|posisyon|titulo|role\s+ngayon|present\s+role)\b/i,
  },
  {
    intent: 'experience',
    pattern:
      /\b(experience|work\s+history|employment|career|karanasan|trabaho|empleyo|agency|agencies|kagawaran)\b/i,
  },
  {
    intent: 'projects',
    pattern:
      /\b(project|portfolio|system|platform|proyekto|gawa|ginawa|deliverable|dhsud|dilg|nfrdi)\b/i,
  },
  {
    intent: 'skills',
    pattern:
      /\b(skill|capabilit|stack|technolog|tool|kasanayan|kakayahan|tech|programming|database)\b/i,
  },
  {
    intent: 'education',
    pattern:
      /\b(education|degree|school|university|edukasyon|pinag-aralan|kolehiyo|feu)\b/i,
  },
  {
    intent: 'focus',
    pattern: /\b(focus|priorit|specializ|ekspertisa|priority\s+areas)\b/i,
  },
  {
    intent: 'contact',
    pattern:
      /\b(contact|connect|linkedin|email|message|makipag-ugnay|link|website|site)\b/i,
  },
  {
    intent: 'pdf',
    pattern: /\b(pdf|download|resume|cv|portfolio\s+file|i-download)\b/i,
  },
];

function detectIntent(message: string): Intent {
  const text = message.trim();
  for (const { intent, pattern } of PRIORITY_INTENTS) {
    if (pattern.test(text)) return intent;
  }
  for (const { intent, pattern } of INTENT_PATTERNS) {
    if (pattern.test(text)) return intent;
  }
  return 'search';
}

function fullName(profile: PortfolioProfile): string {
  return profile.name.trim();
}

function filterProjects(profile: PortfolioProfile, message: string) {
  const q = message.toLowerCase();
  return profile.projects.filter((p) => {
    const hay = `${p.title} ${p.organization} ${p.summary}`.toLowerCase();
    if (q.includes('dhsud') && hay.includes('dhsud')) return true;
    if (q.includes('dilg') && hay.includes('dilg')) return true;
    if (q.includes('nfrdi') && hay.includes('nfrdi')) return true;
    if (q.includes('covid') && hay.includes('covid')) return true;
    return false;
  });
}

function textEn(intent: Intent, profile: PortfolioProfile, message: string): string {
  switch (intent) {
    case 'greeting':
      return `Hello! I'm the portfolio assistant for **${profile.name}**. Ask about his role, agencies, projects, skills, education, or how to connect. Answers come only from this site’s published content.`;
    case 'name':
      return `His full name is **${fullName(profile)}**.\n\nHe is listed on this portfolio as **${profile.title}** (${profile.headline}).`;
    case 'location':
      return `**${fullName(profile)}** is based in **${profile.location}**.`;
    case 'about':
      return `**${profile.name}** is a **${profile.title}** (${profile.headline}). He is based in **${profile.location}**.\n\n${profile.summary}`;
    case 'role': {
      const current = profile.experience.find((e) =>
        /present/i.test(e.period),
      );
      if (!current) {
        return `${profile.name} is listed as **${profile.title}** (${profile.headline}).`;
      }
      return `**Current role:** ${current.role}\n**Organization:** ${current.organization}\n**Period:** ${current.period}\n\nOfficial title on the portfolio: **${profile.title}**.`;
    }
    case 'experience': {
      const lines = profile.experience.map(
        (e) =>
          `• **${e.role}** — ${e.organization} (${e.period})${
            e.location ? ` · ${e.location}` : ''
          }`,
      );
      return `**Work experience** (${profile.experience.length} roles):\n\n${lines.join('\n')}`;
    }
    case 'projects': {
      const filtered = filterProjects(profile, message);
      const list = (filtered.length > 0 ? filtered : profile.projects).slice(
        0,
        filtered.length > 0 ? 10 : 6,
      );
      const lines = list.map(
        (p) =>
          `• **${p.title}** (${p.period}) — ${p.organization}\n  ${p.summary}${
            p.tools.length ? `\n  Tools: ${p.tools.join(', ')}` : ''
          }`,
      );
      const note =
        filtered.length > 0
          ? `Filtered by your question (${filtered.length} match(es)).`
          : `Showing ${list.length} of ${profile.projects.length} projects.`;
      return `**Previous projects**\n_${note}_\n\n${lines.join('\n\n')}`;
    }
    case 'skills': {
      const caps = profile.capabilities
        .map(
          (c) =>
            `**${c.title}** — ${c.description}\n_Tools:_ ${c.tools.join(', ')}`,
        )
        .join('\n\n');
      return `**Skills & capabilities**\n\n${caps}\n\n**Technology stack:** ${profile.competencies.join(', ')}`;
    }
    case 'education': {
      const lines = profile.education.map(
        (e) =>
          `• **${e.degree}** — ${e.institution}${
            e.location ? `, ${e.location}` : ''
          } (${e.period})`,
      );
      return `**Education**\n\n${lines.join('\n')}`;
    }
    case 'focus':
      return `**Current focus areas:**\n\n${profile.focusAreas
        .map((f, i) => `${i + 1}. ${f}`)
        .join('\n')}`;
    case 'contact': {
      const links = profile.links
        .map((l) => `• [${l.label}](${l.href})`)
        .join('\n');
      return `**Connect**\n\n• Portfolio: https://im-josesgpadasas.vercel.app\n${links || '• LinkedIn is listed in the Connect section of the site.'}\n\nUse the **Connect** section for the LinkedIn preview.`;
    }
    case 'pdf':
      return `You can download a structured **4-page PDF** from the **Download PDF** button (hero area or side navigation) or directly at **/portfolio.pdf** — filename: \`Joseph-Esguerra-Padasas-Portfolio.pdf\`.`;
    case 'search':
      return formatSearch(profile, message, 'en');
    default:
      return formatSearch(profile, message, 'en');
  }
}

function textFil(intent: Intent, profile: PortfolioProfile, message: string): string {
  switch (intent) {
    case 'greeting':
      return `Kumusta! Ako ang portfolio assistant ni **${profile.name}**. Puwede mong itanong ang tungkol sa kanyang trabaho, mga ahensya, proyekto, kasanayan, edukasyon, o paano makipag-ugnay. Ang mga sagot ay galing lamang sa nilalaman ng portfolio na ito.`;
    case 'name':
      return `Ang buong pangalan niya ay **${fullName(profile)}**.\n\nNakalista siya sa portfolio bilang **${profile.title}** (${profile.headline}).`;
    case 'location':
      return `Nakatira si **${fullName(profile)}** sa **${profile.location}**.`;
    case 'about':
      return `Si **${profile.name}** ay **${profile.title}** (${profile.headline}). Nakatira siya sa **${profile.location}**.\n\n${profile.summary}`;
    case 'role': {
      const current = profile.experience.find((e) =>
        /present/i.test(e.period),
      );
      if (!current) {
        return `Nakalista si ${profile.name} bilang **${profile.title}** (${profile.headline}).`;
      }
      return `**Kasalukuyang tungkulin:** ${current.role}\n**Ahensya / opisina:** ${current.organization}\n**Panahon:** ${current.period}\n\nOpisyal na titulo sa portfolio: **${profile.title}**.`;
    }
    case 'experience': {
      const lines = profile.experience.map(
        (e) =>
          `• **${e.role}** — ${e.organization} (${e.period})`,
      );
      return `**Karanasan sa trabaho** (${profile.experience.length} tungkulin):\n\n${lines.join('\n')}`;
    }
    case 'projects': {
      const filtered = filterProjects(profile, message);
      const list = (filtered.length > 0 ? filtered : profile.projects).slice(
        0,
        filtered.length > 0 ? 10 : 6,
      );
      const lines = list.map(
        (p) =>
          `• **${p.title}** (${p.period}) — ${p.organization}\n  ${p.summary}`,
      );
      return `**Mga naunang proyekto**\n\n${lines.join('\n\n')}`;
    }
    case 'skills':
      return `**Mga kasanayan:** ${profile.capabilities
        .map((c) => c.title)
        .join('; ')}.\n\n**Technology stack:** ${profile.competencies.join(', ')}. Tingnan ang seksyong Skills & Capabilities sa site para sa buong detalye.`;
    case 'education': {
      const lines = profile.education.map(
        (e) => `• **${e.degree}** — ${e.institution} (${e.period})`,
      );
      return `**Edukasyon**\n\n${lines.join('\n')}`;
    }
    case 'focus':
      return `**Mga prayoridad na lugar ng trabaho:**\n\n${profile.focusAreas
        .map((f, i) => `${i + 1}. ${f}`)
        .join('\n')}`;
    case 'contact':
      return `**Makipag-ugnay**\n\n• Portfolio: https://im-josesgpadasas.vercel.app\n• LinkedIn: nakalista sa seksyong **Connect** (may preview doon).\n\nWalang public email sa portfolio; gamitin ang LinkedIn para sa propesyonal na mensahe.`;
    case 'pdf':
      return `Puwede mong i-download ang **PDF portfolio** (4 na pahina) sa button na **Download PDF** o sa **/portfolio.pdf** — file: \`Joseph-Esguerra-Padasas-Portfolio.pdf\`.`;
    case 'search':
      return formatSearch(profile, message, 'fil');
    default:
      return formatSearch(profile, message, 'fil');
  }
}

function formatSearch(
  profile: PortfolioProfile,
  message: string,
  lang: ReplyLanguage,
): string {
  const chunks = searchKnowledge(buildKnowledgeChunks(profile), message, 4);
  if (chunks.length === 0) {
    return lang === 'fil'
      ? `Pasensya na — wala akong tiyak na sagot sa portfolio data para sa tanong na iyan. Subukang itanong ang tungkol sa karanasan, proyekto, kasanayan, edukasyon, o LinkedIn.`
      : `I don't have a confident match in the portfolio data for that question. Try asking about experience, projects, skills, education, or LinkedIn.`;
  }
  const header =
    lang === 'fil'
      ? 'Narito ang pinakamalapit na impormasyon mula sa portfolio:'
      : 'Here is the closest information from the portfolio:';
  return `${header}\n\n${formatChunks(chunks, lang)}`;
}

function formatChunks(chunks: KnowledgeChunk[], lang: ReplyLanguage): string {
  return chunks
    .map((c) => {
      const body =
        c.body.length > 420 ? `${c.body.slice(0, 417).trimEnd()}…` : c.body;
      return lang === 'fil'
        ? `**${c.title}**\n${body}`
        : `**${c.title}**\n${body}`;
    })
    .join('\n\n');
}

export function answerPortfolioQuestion(
  profile: PortfolioProfile,
  message: string,
  mode: LanguageMode = 'auto',
): string {
  const trimmed = message.trim();
  if (!trimmed) {
    return joinBilingual(
      {
        en: 'Please type a question about Joseph’s professional background.',
        fil: 'Mag-type ng tanong tungkol sa propesyonal na background ni Joseph.',
      },
      resolveLanguages('help', mode),
    );
  }

  const intent = detectIntent(trimmed);
  const langs = resolveLanguages(trimmed, mode);

  const parts: Partial<Record<ReplyLanguage, string>> = {};
  if (langs.includes('en')) parts.en = textEn(intent, profile, trimmed);
  if (langs.includes('fil')) parts.fil = textFil(intent, profile, trimmed);

  return joinBilingual(parts, langs);
}
