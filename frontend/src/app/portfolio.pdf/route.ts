import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import { createElement, type ReactElement } from 'react';
import { getPortfolioProfile } from '@/data/portfolio/profile';
import { PORTFOLIO_PDF_FILENAME } from '@/features/portfolio/download-pdf-button';
import { PortfolioDocument } from '@/features/portfolio/pdf/portfolio-document';

async function renderPortfolioPdf(): Promise<Uint8Array> {
  'use cache';
  const buffer = await renderToBuffer(
    createElement(PortfolioDocument, {
      profile: getPortfolioProfile(),
    }) as ReactElement<DocumentProps>,
  );
  return new Uint8Array(buffer);
}

export async function GET() {
  const pdf = await renderPortfolioPdf();
  return new Response(pdf as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${PORTFOLIO_PDF_FILENAME}"`,
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
