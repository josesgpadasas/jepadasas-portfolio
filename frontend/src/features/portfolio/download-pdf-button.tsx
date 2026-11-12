import { IconDownload } from '@/features/portfolio/nav-icons';

export const PORTFOLIO_PDF_PATH = '/portfolio.pdf';
export const PORTFOLIO_PDF_FILENAME = 'Joseph-Esguerra-Padasas-Portfolio.pdf';

export function DownloadPdfButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={PORTFOLIO_PDF_PATH}
      download={PORTFOLIO_PDF_FILENAME}
      className={`download-pdf-btn link-cta ${className}`}
    >
      <IconDownload className="download-pdf-btn__icon" aria-hidden />
      <span>Download PDF</span>
    </a>
  );
}
