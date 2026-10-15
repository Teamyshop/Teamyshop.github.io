import React from 'react';
import { Product } from '../types';

interface ShoeVisualProps {
  product: Product;
  className?: string;
  isHero?: boolean;
}

export const ShoeVisual: React.FC<ShoeVisualProps> = ({
  product,
  className = '',
  isHero = false
}) => {
  const { category, colorScheme } = product;
  const primary = colorScheme.primary;
  const accent = colorScheme.accent;
  const sole = colorScheme.sole;

  // Render distinct silhouettes based on sport category
  return (
    <div
      className={`relative flex items-center justify-center select-none overflow-hidden ${
        isHero ? 'w-full h-full' : 'w-full aspect-[4/3]'
      } ${className}`}
    >
      {/* Background subtle studio glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-90"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${accent}25 0%, rgba(247,247,242,0) 70%)`
        }}
      />

      {/* SVG Shoe Illustration */}
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full max-h-full object-contain filter drop-shadow-xl transition-transform duration-300 ease-out ${
          isHero ? 'animate-float' : 'group-hover:scale-105 group-hover:-translate-y-1'
        }`}
      >
        <defs>
          <linearGradient id={`grad-upper-${product.id}`} x1="50" y1="50" x2="450" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={primary} />
            <stop offset="70%" stopColor={primary} stopOpacity="0.92" />
            <stop offset="100%" stopColor={primary === '#FFFFFF' ? '#E2E8F0' : '#0A0A0A'} />
          </linearGradient>

          <linearGradient id={`grad-midsole-${product.id}`} x1="80" y1="200" x2="440" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={sole} />
            <stop offset="100%" stopColor={sole === '#FFFFFF' ? '#CBD5E1' : '#1E293B'} />
          </linearGradient>

          <linearGradient id={`grad-accent-${product.id}`} x1="120" y1="120" x2="380" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={accent} stopOpacity="0.8" />
          </linearGradient>

          <radialGradient id={`shadow-${product.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Contact Shadow */}
        <ellipse
          cx="250"
          cy="285"
          rx="170"
          ry="16"
          fill={`url(#shadow-${product.id})`}
        />

        {/* --- SILHOUETTE 1: BADMINTON (Low cut, agile lateral wrap, gum sole) --- */}
        {category === 'badminton' && (
          <g transform="translate(10, 0)">
            {/* Outsole (Gum Non-Marking) */}
            <path
              d="M75 255 C120 262 200 265 290 260 C360 256 425 240 440 220 L445 228 C430 250 365 272 285 275 C190 278 110 274 65 264 Z"
              fill={sole === '#E2E8F0' ? '#D97706' : '#C7F464'}
              opacity="0.95"
            />
            {/* Gum Sole Traction Grip Lines */}
            <path d="M120 264 L135 270 M160 266 L175 272 M200 267 L215 273 M240 267 L255 273 M320 262 L335 266 M360 257 L375 261" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

            {/* Midsole Layer */}
            <path
              d="M70 235 C115 242 195 245 285 240 C355 236 420 215 440 195 L445 218 C430 238 360 258 285 262 C195 265 115 262 70 255 Z"
              fill={`url(#grad-midsole-${product.id})`}
            />

            {/* Main Upper */}
            <path
              d="M70 235 C65 180 85 130 115 110 C135 95 160 100 175 125 C190 150 215 155 260 160 C320 165 385 180 435 195 C442 205 440 212 435 220 C360 238 290 240 70 235 Z"
              fill={`url(#grad-upper-${product.id})`}
            />

            {/* Breathable Mesh Texture Dots */}
            <g fill={primary === '#FFFFFF' ? '#94A3B8' : '#334155'} opacity="0.4">
              <circle cx="280" cy="180" r="1.5" /><circle cx="295" cy="182" r="1.5" /><circle cx="310" cy="185" r="1.5" /><circle cx="325" cy="188" r="1.5" />
              <circle cx="275" cy="190" r="1.5" /><circle cx="290" cy="192" r="1.5" /><circle cx="305" cy="195" r="1.5" /><circle cx="320" cy="198" r="1.5" />
              <circle cx="285" cy="200" r="1.5" /><circle cx="300" cy="202" r="1.5" /><circle cx="315" cy="205" r="1.5" />
            </g>

            {/* Teamy Dynamic Motion Lightning Streak (Accent) */}
            <path
              d="M140 145 L220 170 L195 195 L275 190 L210 230 L340 190 L390 198"
              fill="none"
              stroke={`url(#grad-accent-${product.id})`}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Heel Counter Reinforcement (Anti-rollover TPU) */}
            <path
              d="M72 210 C70 170 85 140 110 125 C125 150 115 195 90 232 Z"
              fill={accent}
              opacity="0.85"
            />

            {/* Collar & Tongue */}
            <path
              d="M120 108 C135 95 155 98 168 115 C150 125 135 125 120 108 Z"
              fill="#151515"
            />
            {/* Laces */}
            <path d="M165 128 L210 155 M180 138 L225 162 M195 148 L240 170" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />

            {/* Teamy Wordmark badge on tongue */}
            <text x="145" y="112" fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">TEAMY</text>
          </g>
        )}

        {/* --- SILHOUETTE 2: TENNIS (Heavier build, reinforced toe, herringbone outrigger) --- */}
        {category === 'tennis' && (
          <g transform="translate(10, 0)">
            {/* Outsole (Sturdy All-court rubber) */}
            <path
              d="M68 250 C110 256 190 258 280 254 C350 250 420 235 442 215 L448 225 C425 248 355 268 275 272 C185 276 105 272 60 262 Z"
              fill={sole}
            />

            {/* Lateral Outrigger / TPU Stabilizer */}
            <path
              d="M210 235 C240 235 265 220 270 205 L275 245 C250 250 225 248 210 235 Z"
              fill={accent}
            />

            {/* Midsole */}
            <path
              d="M65 230 C110 238 190 240 280 235 C350 230 415 210 438 188 L444 212 C422 232 355 252 280 256 C190 260 110 256 65 248 Z"
              fill={`url(#grad-midsole-${product.id})`}
            />

            {/* Main Upper (Rigid support) */}
            <path
              d="M65 230 C60 175 78 128 112 105 C132 90 158 95 174 120 C188 142 215 148 260 154 C320 160 385 174 435 188 C444 200 442 208 438 215 C360 230 290 234 65 230 Z"
              fill={`url(#grad-upper-${product.id})`}
            />

            {/* DragGuard Toe Cap (Reinforced durability for slides) */}
            <path
              d="M370 172 C395 178 425 186 438 192 C442 205 435 215 410 220 C380 215 365 195 370 172 Z"
              fill={primary === '#FFFFFF' ? '#E2E8F0' : '#27272A'}
              stroke={accent}
              strokeWidth="2"
            />

            {/* Lateral Armor Webbing */}
            <path
              d="M170 135 Q220 180 280 185 M190 145 Q240 190 295 195 M210 155 Q260 200 310 205"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Stiff Heel Cup */}
            <path
              d="M68 200 C66 160 80 130 105 118 C118 140 110 185 85 225 Z"
              fill={accent}
              opacity="0.75"
            />

            {/* Lacing System */}
            <path d="M165 120 L205 145 M178 130 L220 154 M192 140 L234 163 M206 150 L248 172" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

            <text x="145" y="104" fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">TEAMY PRO</text>
          </g>
        )}

        {/* --- SILHOUETTE 3: RUNNING (Aerodynamic curved rocker sole, high stack foam, carbon streak) --- */}
        {category === 'running' && (
          <g transform="translate(10, 0)">
            {/* Rocker Curve High-Stack Midsole (Max Cushioning) */}
            <path
              d="M60 235 C100 245 180 252 270 248 C360 242 410 215 448 175 L455 195 C420 238 360 268 265 272 C170 275 95 268 55 255 Z"
              fill={`url(#grad-midsole-${product.id})`}
            />

            {/* Embedded Carbon Plate Line (Spring plate) */}
            <path
              d="M100 245 C180 252 260 248 350 235 C390 225 425 205 445 180"
              fill="none"
              stroke={accent}
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Ultra-light Engineered Mesh Upper */}
            <path
              d="M65 235 C58 175 75 120 115 95 C132 84 158 90 172 115 C185 138 215 145 265 150 C330 155 395 165 440 178 C448 188 444 195 440 200 C360 220 280 230 65 235 Z"
              fill={`url(#grad-upper-${product.id})`}
            />

            {/* Forward Aerodynamic Speed Swoop Line */}
            <path
              d="M130 130 C190 170 290 180 410 185"
              fill="none"
              stroke={`url(#grad-accent-${product.id})`}
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Perforated Ventilation Zones */}
            <g fill={accent} opacity="0.5">
              <circle cx="310" cy="165" r="2" /><circle cx="325" cy="167" r="2" /><circle cx="340" cy="170" r="2" />
              <circle cx="305" cy="173" r="2" /><circle cx="320" cy="175" r="2" /><circle cx="335" cy="178" r="2" />
              <circle cx="315" cy="183" r="2" /><circle cx="330" cy="185" r="2" />
            </g>

            {/* Curved Heel Fin (Achilles tendon protection) */}
            <path
              d="M65 210 C60 165 72 125 98 108 C108 128 102 175 80 225 Z"
              fill={accent}
              opacity="0.9"
            />

            {/* Lightweight Speed Laces */}
            <path d="M160 115 L195 138 M172 125 L208 147 M185 134 L220 156 M198 143 L232 165" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />

            <text x="140" y="98" fill="#151515" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="sans-serif">TEAMY FLOW</text>
          </g>
        )}
      </svg>
    </div>
  );
};
