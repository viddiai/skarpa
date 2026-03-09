/**
 * BookCover — SVG-based book cover component for "Guide för Företagssäljare"
 *
 * Renders an A4-proportioned (210:297) book cover matching the Skarpa brand.
 * Uses inline SVG so it scales perfectly and doesn't require an external image.
 */
export default function BookCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: "210 / 297" }}
    >
      <svg
        viewBox="0 0 420 594"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full rounded-sm"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.12))" }}
      >
        {/* Background */}
        <rect width="420" height="594" rx="4" fill="#FAFAFA" />

        {/* Subtle border */}
        <rect
          x="0.5"
          y="0.5"
          width="419"
          height="593"
          rx="3.5"
          stroke="#E5E7EB"
          strokeWidth="1"
        />

        {/* Geometric arrow/chart lines — decorative background */}
        {/* Large diagonal lines */}
        <line x1="80" y1="480" x2="360" y2="220" stroke="#1B5091" strokeWidth="3" strokeOpacity="0.12" />
        <line x1="60" y1="520" x2="340" y2="260" stroke="#1B5091" strokeWidth="2" strokeOpacity="0.08" />
        <line x1="100" y1="500" x2="380" y2="240" stroke="#93AECB" strokeWidth="1.5" strokeOpacity="0.15" />

        {/* Horizontal crossing lines */}
        <line x1="120" y1="350" x2="380" y2="350" stroke="#93AECB" strokeWidth="1" strokeOpacity="0.12" />
        <line x1="140" y1="400" x2="390" y2="400" stroke="#93AECB" strokeWidth="1" strokeOpacity="0.10" />

        {/* Diamond/chevron shapes */}
        <path
          d="M200 320 L260 370 L200 420 L140 370 Z"
          stroke="#1B5091"
          strokeWidth="1.5"
          strokeOpacity="0.10"
          fill="none"
        />
        <path
          d="M240 290 L310 350 L240 410 L170 350 Z"
          stroke="#93AECB"
          strokeWidth="1"
          strokeOpacity="0.08"
          fill="none"
        />

        {/* Main upward arrow */}
        <g>
          {/* Arrow shaft — gradient from light to dark */}
          <path
            d="M180 480 L180 320 L260 320 L260 480 Z"
            fill="url(#arrowGradient)"
            opacity="0.15"
          />
          {/* Arrow body with 3D effect */}
          <path
            d="M170 380 L220 280 L270 380"
            stroke="#1B5091"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.25"
            fill="none"
          />
          {/* Main bold arrow */}
          <path
            d="M200 460 C200 460 220 360 250 330 C280 300 320 290 340 270"
            stroke="#1B5091"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* Arrowhead */}
          <path
            d="M330 260 L350 270 L340 290"
            stroke="#1B5091"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.3"
          />
          {/* Secondary smaller arrow */}
          <path
            d="M160 470 C160 470 190 400 220 370 C250 340 280 330 300 315"
            stroke="#93AECB"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M290 308 L308 315 L300 332"
            stroke="#93AECB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.25"
          />
        </g>

        {/* Title text */}
        <text
          x="40"
          y="120"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="46"
          fill="#1B5091"
          letterSpacing="-0.5"
        >
          GUIDE FÖR
        </text>
        <text
          x="40"
          y="172"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="46"
          fill="#1B5091"
          letterSpacing="-0.5"
        >
          FÖRETAGS-
        </text>
        <text
          x="40"
          y="224"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="700"
          fontSize="46"
          fill="#1B5091"
          letterSpacing="-0.5"
        >
          SÄLJARE
        </text>

        {/* Subtitle */}
        <text
          x="40"
          y="264"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="400"
          fontSize="16"
          fill="#6B7280"
          letterSpacing="0"
        >
          Strategier och insikter för framgångsrik
        </text>
        <text
          x="40"
          y="286"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="400"
          fontSize="16"
          fill="#6B7280"
          letterSpacing="0"
        >
          försäljning av ditt företag
        </text>

        {/* Skarpa logo at bottom */}
        <text
          x="210"
          y="556"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="600"
          fontSize="24"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          <tspan fill="#1B5091">skarp</tspan>
          <tspan fill="#DC2626">a</tspan>
        </text>

        {/* Bottom divider line */}
        <line x1="160" y1="530" x2="260" y2="530" stroke="#E5E7EB" strokeWidth="1" />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="arrowGradient" x1="220" y1="480" x2="220" y2="320">
            <stop offset="0%" stopColor="#1B5091" stopOpacity="0" />
            <stop offset="100%" stopColor="#1B5091" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
