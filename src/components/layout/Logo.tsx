export const Logo = ({ size = 32, className = "", style = {}, theme = "dark" }: { size?: number, className?: string, style?: any, theme?: string }) => {
  const brandShadow = theme === 'dark'
    ? 'drop-shadow(0 0 10px rgba(255, 140, 0, 0.5))'
    : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, filter: brandShadow }}
    >
      <g transform="translate(50, 50)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path
              d="M-4 -12 L4 -12 L6 -28 L0 -34 L-6 -28 Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <line x1="-3" y1="-18" x2="3" y2="-18" stroke="currentColor" strokeWidth="1.2" />
            <line x1="0" y1="-12" x2="0" y2="-34" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 -12 L10 0" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
            <circle cx="0" cy="-38" r="3.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
          </g>
        ))}
        <circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </g>
    </svg>
  );
};
