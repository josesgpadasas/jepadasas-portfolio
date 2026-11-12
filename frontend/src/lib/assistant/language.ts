export type ReplyLanguage = 'en' | 'fil';
export type LanguageMode = 'auto' | 'en' | 'fil' | 'bilingual';

const FIL_MARKERS =
  /\b(ano|saan|sino|paano|bakit|kailan|alin|mga|ang|ng|sa|ni|kay|ko|mo|niya|nila|ikaw|ako|tayo|kami|kayo|ba|nga|po|opo|ho|naman|din|rin|lang|daw|dito|doon|yun|iyon|ito|trabaho|proyekto|karanasan|edukasyon|kasanayan|talaga|portfolio|kagawaran|kamusta|salamat|ginawa|ginagawa|kasalukuyan|nakaraan|propesyon|kakayahan|pangalan|buong|tawag|kilala|nakatira|taga)\b|[¿¡]|ñ/i;

const EN_MARKERS =
  /\b(what|who|where|when|why|how|which|tell|about|please|hello|hi|hey|the|your|his|her|name|full|contact|download|list|show|current|experience|project|skill|education|is|are|was|were|do|does|did|can|could|would|work|role|title|agency)\b/i;

/** Auto mode defaults to Filipino unless the message is clearly in English. */
export function detectReplyLanguage(message: string): ReplyLanguage {
  const normalized = message.trim();
  if (!normalized) return 'fil';

  const filHits = (normalized.match(FIL_MARKERS) ?? []).length;
  const enHits = (normalized.match(EN_MARKERS) ?? []).length;

  if (filHits > 0 && filHits >= enHits) return 'fil';
  if (enHits > 0 && enHits > filHits) return 'en';

  // Short Latin-script questions without Filipino cues → English (e.g. "What is your name?").
  if (
    enHits > 0 &&
    /^[\x00-\x7F?'".!,]+$/.test(normalized) &&
    /\?/.test(normalized)
  ) {
    return 'en';
  }

  return 'fil';
}

export function resolveLanguages(
  message: string,
  mode: LanguageMode,
): ReplyLanguage[] {
  if (mode === 'en') return ['en'];
  if (mode === 'fil') return ['fil'];
  if (mode === 'bilingual') return ['en', 'fil'];
  return [detectReplyLanguage(message)];
}

export function joinBilingual(
  parts: Partial<Record<ReplyLanguage, string>>,
  langs: ReplyLanguage[],
): string {
  const blocks = langs
    .map((lang) => parts[lang]?.trim())
    .filter((block): block is string => Boolean(block));
  if (blocks.length <= 1) return blocks[0] ?? '';
  return blocks.join('\n\n—\n\n');
}
