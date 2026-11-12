import Fuse from 'fuse.js';
import type { PortfolioProfile } from '@/lib/portfolio';

export type KnowledgeChunk = {
  id: string;
  title: string;
  body: string;
  tags: string;
};

export function buildKnowledgeChunks(profile: PortfolioProfile): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: 'identity',
      title: 'Full name and profile',
      body: `Full name: ${profile.name}. Professional title: ${profile.title}. Headline: ${profile.headline}. Location: ${profile.location}.`,
      tags:
        'name full name pangalan buong pangalan sino identity tawag kilala profile persona',
    },
    {
      id: 'summary',
      title: 'Professional summary',
      body: `${profile.name}. ${profile.title}. ${profile.headline}. ${profile.location}. ${profile.summary}`,
      tags: 'about summary biography profile intro',
    },
    {
      id: 'meta',
      title: 'Profile details',
      body: `Sector: National Government. Current agency highlight: Department of Agriculture. Eligibility: Career Service Professional. Location: ${profile.location}.`,
      tags: 'sector government eligibility location agency',
    },
    {
      id: 'focus',
      title: 'Current focus areas',
      body: profile.focusAreas.join('; '),
      tags: 'focus priorities areas specialization',
    },
  ];

  for (const item of profile.experience) {
    chunks.push({
      id: `exp-${item.organization}-${item.period}`,
      title: `${item.role} — ${item.organization}`,
      body: `${item.role} at ${item.organization}. Period: ${item.period}. ${
        item.location ? `Location: ${item.location}. ` : ''
      }${item.highlights.join(' ')}`,
      tags: `experience role work ${item.organization} ${item.role} karanasan trabaho`,
    });
  }

  for (const cap of profile.capabilities) {
    chunks.push({
      id: `cap-${cap.title}`,
      title: cap.title,
      body: `${cap.description} Tools: ${cap.tools.join(', ')}.`,
      tags: `skills capabilities ${cap.title} ${cap.tools.join(' ')}`,
    });
  }

  chunks.push({
    id: 'competencies',
    title: 'Technology stack',
    body: profile.competencies.join(', '),
    tags: 'stack technologies tools competencies tech',
  });

  for (const item of profile.education) {
    chunks.push({
      id: `edu-${item.institution}`,
      title: item.degree,
      body: `${item.degree} at ${item.institution}${
        item.location ? `, ${item.location}` : ''
      }. Period: ${item.period}.`,
      tags: 'education degree school university edukasyon',
    });
  }

  for (const project of profile.projects) {
    chunks.push({
      id: `proj-${project.title}`,
      title: project.title,
      body: `${project.title} (${project.period}) — ${project.organization}. ${project.summary} Highlights: ${project.highlights.join('; ')}. Tools: ${project.tools.join(', ')}.`,
      tags: `project ${project.organization} ${project.title} ${project.tools.join(' ')} proyekto`,
    });
  }

  const links = profile.links.map((l) => `${l.label}: ${l.href}`).join(' ');
  chunks.push({
    id: 'connect',
    title: 'Professional links',
    body: `Portfolio site: https://im-josesgpadasas.vercel.app. PDF: /portfolio.pdf. ${links}`,
    tags: 'contact linkedin connect email link portfolio pdf download',
  });

  return chunks;
}

export function searchKnowledge(
  chunks: KnowledgeChunk[],
  query: string,
  limit = 4,
): KnowledgeChunk[] {
  const fuse = new Fuse(chunks, {
    keys: [
      { name: 'title', weight: 0.35 },
      { name: 'body', weight: 0.45 },
      { name: 'tags', weight: 0.2 },
    ],
    threshold: 0.42,
    ignoreLocation: true,
  });
  return fuse.search(query, { limit }).map((r) => r.item);
}
