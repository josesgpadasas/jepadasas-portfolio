'use client';

import { useCallback, useId, useRef, useState, type ReactNode } from 'react';
import type { LanguageMode } from '@/lib/assistant/language';
import {
  answerPortfolioQuestion,
  type AssistantMessage,
} from '@/lib/assistant/reply';
import type { PortfolioProfile } from '@/lib/portfolio';
import { AssistantMascot } from '@/features/portfolio/assistant-mascot';
import { AssistantMessageBody } from '@/features/portfolio/assistant-message';

type Props = {
  profile: PortfolioProfile;
};

function panelCopy(mode: LanguageMode) {
  const fil =
    mode === 'fil' || mode === 'auto' || mode === 'bilingual';
  if (mode === 'en') {
    return {
      subtitle: 'Ask about Joseph’s background',
      placeholder: 'Ask in English…',
      send: 'Send',
      note: 'Answers are built on your device from portfolio data only — no paid AI API.',
    };
  }
  if (mode === 'fil') {
    return {
      subtitle: 'Tanungin si Joseph',
      placeholder: 'Magtanong sa Filipino…',
      send: 'Ipadala',
      note: 'Mga sagot mula sa datos ng portfolio sa iyong device — walang bayad na AI API.',
    };
  }
  if (mode === 'bilingual') {
    return {
      subtitle: 'Ask · Tanungin',
      placeholder: 'English o Filipino…',
      send: 'Send',
      note: 'On-device answers from portfolio data · Walang bayad na AI API.',
    };
  }
  return {
    subtitle: fil ? 'Tanungin si Joseph' : 'Ask about Joseph',
    placeholder: 'Magtanong sa Filipino o English…',
    send: 'Ipadala',
    note: 'Mga sagot mula sa datos ng portfolio sa iyong device — walang bayad na AI API.',
  };
}

export function PortfolioAssistant({ profile }: Props) {
  const titleId = useId();
  const inputId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<LanguageMode>('auto');
  const [messages, setMessages] = useState<AssistantMessage[]>(() => [
    {
      role: 'assistant',
      content: answerPortfolioQuestion(profile, 'kamusta', 'auto'),
    },
  ]);

  const copy = panelCopy(mode);

  const send = useCallback(
    (text: string) => {
      const question = text.trim();
      if (!question) return;

      setMessages((prev) => [
        ...prev,
        { role: 'user', content: question },
        {
          role: 'assistant',
          content: answerPortfolioQuestion(profile, question, mode),
        },
      ]);
      setInput('');
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    },
    [mode, profile],
  );

  return (
    <>
      <button
        type="button"
        className={`assistant-mascot-trigger link-cta ${open ? 'assistant-mascot-trigger--open' : ''}`}
        aria-expanded={open}
        aria-controls="portfolio-assistant-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <AssistantMascot open={open} />
        <span className="sr-only">
          {open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        </span>
      </button>

      {open ? (
        <div
          id="portfolio-assistant-panel"
          role="dialog"
          aria-labelledby={titleId}
          className="assistant-panel"
        >
          <header className="assistant-panel__head">
            <div className="min-w-0">
              <p
                id={titleId}
                className="assistant-panel__eyebrow font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                Portfolio assistant
              </p>
              <p className="assistant-panel__title mt-1 text-sm font-semibold">
                {copy.subtitle}
              </p>
            </div>
            <button
              type="button"
              className="assistant-panel__close link-cta"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </header>

          <div
            className="assistant-panel__modes"
            role="group"
            aria-label="Language mode"
          >
            {(
              [
                ['auto', 'Auto (TL)'],
                ['en', 'EN'],
                ['fil', 'FIL'],
                ['bilingual', 'EN + FIL'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`assistant-mode-btn link-cta ${
                  mode === value ? 'assistant-mode-btn--active' : ''
                }`}
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            ref={listRef}
            className="assistant-panel__messages"
            aria-live="polite"
          >
            {messages.map((msg, i) => (
              <Bubble
                key={`${i}-${msg.role}-${msg.content.slice(0, 24)}`}
                className={
                  msg.role === 'user'
                    ? 'assistant-bubble assistant-bubble--user'
                    : 'assistant-bubble assistant-bubble--bot'
                }
              >
                {msg.role === 'user' ? (
                  <p className="assistant-bubble__text">{msg.content}</p>
                ) : (
                  <AssistantMessageBody text={msg.content} />
                )}
              </Bubble>
            ))}
          </div>

          <form
            className="assistant-panel__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Your question
            </label>
            <textarea
              id={inputId}
              rows={2}
              value={input}
              placeholder={copy.placeholder}
              className="assistant-panel__input"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button type="submit" className="assistant-panel__send link-cta">
              {copy.send}
            </button>
          </form>

          <p className="assistant-panel__note">{copy.note}</p>
        </div>
      ) : null}
    </>
  );
}

function Bubble({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={className}>{children}</div>;
}
