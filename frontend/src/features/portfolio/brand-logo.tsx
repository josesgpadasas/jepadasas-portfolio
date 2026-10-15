type Props = {
  className?: string;
  title?: string;
};

/** JP monogram — keep in sync with `src/app/icon.svg`. */
export function BrandLogo({
  className,
  title = 'Joseph Esguerra Padasas',
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect width="32" height="32" rx="6" fill="#1b2a4e" />
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="4"
        fill="#f5f8fc"
        stroke="#b9d1ea"
        strokeWidth="1.25"
      />
      <text
        x="16"
        y="16.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Segoe UI, ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#1b2a4e"
        letterSpacing="-0.08em"
      >
        JP
      </text>
      <rect x="24.25" y="5.25" width="3.25" height="3.25" rx="1" fill="#5eead4" />
    </svg>
  );
}
