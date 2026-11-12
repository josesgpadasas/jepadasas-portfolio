import type { ReactNode } from 'react';

/** Minimal inline **bold** and [label](url) for assistant text (no HTML from model). */
export function AssistantMessageBody({ text }: { text: string }) {
  const blocks = text.split('\n\n—\n\n');

  return (
    <div className="assistant-message__body space-y-4">
      {blocks.map((block, i) => (
        <div key={i} className="space-y-2 whitespace-pre-wrap text-sm leading-relaxed">
          {block.split('\n').map((line, j) => (
            <p key={j} className={line.startsWith('_') ? 'text-[var(--color-muted)]' : undefined}>
              {renderInline(line)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function renderInline(line: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > last) {
      nodes.push(line.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-[var(--color-navy)]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (m) {
        nodes.push(
          <a
            key={key++}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-accent)] underline underline-offset-2"
          >
            {m[1]}
          </a>,
        );
      }
    }
    last = match.index + token.length;
  }

  if (last < line.length) nodes.push(line.slice(last));
  if (nodes.length === 0) return [line];
  return nodes;
}
