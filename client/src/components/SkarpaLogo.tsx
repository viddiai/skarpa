interface SkarpaLogoProps {
  className?: string;
  /** Height in pixels (width scales proportionally) */
  height?: number;
}

/**
 * Skarpa wordmark logo in brand red (#C8232C).
 * Renders as styled text to avoid font-dependency issues with SVG.
 */
export default function SkarpaLogo({ className = "", height = 28 }: SkarpaLogoProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: height,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: "#C8232C",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      skarpa
    </span>
  );
}
