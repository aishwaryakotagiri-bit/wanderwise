// Die-cut sticker illustrations, drawn in the app's sticker style.

const INK = { stroke: '#2B2B2B', strokeWidth: 1.8, strokeLinejoin: 'round', strokeLinecap: 'round' };

// White die-cut edge + soft contact shadow, shared by every sticker on the page.
export function StickerDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="die" x="-35%" y="-35%" width="170%" height="180%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="4.4" result="g" />
        <feFlood floodColor="#E3E1DC" />
        <feComposite in2="g" operator="in" result="gr" />
        <feMorphology in="SourceAlpha" operator="dilate" radius="3.6" result="d" />
        <feFlood floodColor="#FFFFFF" />
        <feComposite in2="d" operator="in" result="w" />
        <feOffset in="g" dy="3" result="o" />
        <feGaussianBlur in="o" stdDeviation="3" result="ob" />
        <feFlood floodColor="#000000" floodOpacity=".14" />
        <feComposite in2="ob" operator="in" result="sh" />
        <feMerge>
          <feMergeNode in="sh" />
          <feMergeNode in="gr" />
          <feMergeNode in="w" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}

function Sticker({ rotate, children }) {
  return (
    <svg className="sticker" width="64" height="64" viewBox="-12 -12 88 88" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <g filter="url(#die)">{children}</g>
    </svg>
  );
}

export function PlaneSticker() {
  const s = { stroke: '#2B2B2B', strokeWidth: 1.8, strokeLinejoin: 'round' };
  return (
    <Sticker rotate={-8}>
      <path d="M6 36 L50 18 Q60 14 62 20 Q63 26 54 30 L14 46 Z" fill="#FFFFFF" {...s} />
      <path d="M30 28 L22 10 L30 8 L44 22 Z" fill="#9F2BCF" {...s} />
      <path d="M34 40 L40 56 L47 53 L46 34 Z" fill="#9F2BCF" {...s} />
      <path d="M14 46 L6 42 L6 36" fill="#D39CED" {...s} />
      <circle cx="44" cy="24" r="2" fill="#2B2B2B" />
      <circle cx="38" cy="27" r="2" fill="#2B2B2B" />
    </Sticker>
  );
}

export function MatchaSticker() {
  return (
    <Sticker rotate={5}>
      <path d="M8 28 H56 Q55 52 32 56 Q9 52 8 28 Z" fill="#EFE7D8" {...INK} />
      <path d="M9 33 Q20 37 30 33 Q40 38 55 33 Q54 40 52 43 Q42 40 32 44 Q20 40 11 43 Q9 38 9 33 Z" fill="#7C9A62" opacity=".85" />
      <path d="M44 31 Q54 42 34 55 Q50 50 54 34 Z" fill="#CBBFA8" />
      <ellipse cx="32" cy="28" rx="24" ry="6" fill="#86AE5E" {...INK} />
      <ellipse cx="28" cy="27" rx="11" ry="2.4" fill="#B9D68F" />
      <rect x="22" y="55" width="20" height="4" rx="2" fill="#D9CDB6" {...INK} />
    </Sticker>
  );
}

// Five-petal sakura blossom used around the pagoda.
function Blossom({ cx, cy, r, petal, centre }) {
  const petals = petal >= 2
    ? [[0, -2.6], [2.5, -0.8], [1.5, 2.1], [-1.5, 2.1], [-2.5, -0.8]]
    : [[0, -2.3], [2.2, -0.7], [1.4, 1.9], [-1.4, 1.9], [-2.2, -0.7]];
  return (
    <>
      {petals.map(([dx, dy], i) => (
        <circle key={i} cx={+(cx + dx).toFixed(1)} cy={+(cy + dy).toFixed(1)} r={petal} fill="#F7C5D2" />
      ))}
      <circle cx={cx} cy={cy} r={centre} fill="#E07A98" />
    </>
  );
}

export function PagodaSticker() {
  return (
    <Sticker rotate={-3}>
      <rect x="14" y="55" width="36" height="5" rx="2" fill="#CFC8BB" {...INK} />
      <rect x="22" y="42" width="20" height="13" fill="#E5533A" {...INK} />
      <rect x="33" y="43" width="8" height="11" fill="#B93A26" />
      <rect x="29" y="46" width="6" height="9" fill="#2B2B2B" opacity=".7" />
      <rect x="24" y="29" width="16" height="10" fill="#E5533A" {...INK} />
      <rect x="33" y="30" width="6" height="8" fill="#B93A26" />
      <rect x="26" y="17" width="12" height="9" fill="#E5533A" {...INK} />
      <rect x="33" y="18" width="4" height="7" fill="#B93A26" />
      <path d="M12 44 Q32 37 52 44 L48 40.5 Q32 35 16 40.5 Z" fill="#3A3F47" {...INK} />
      <path d="M15 31 Q32 24 49 31 L45 27.5 Q32 22 19 27.5 Z" fill="#3A3F47" {...INK} />
      <path d="M18 19 Q32 12 46 19 L42 15.5 Q32 10 22 15.5 Z" fill="#3A3F47" {...INK} />
      <path d="M23 11 Q32 4 41 11 L37 7.5 Q32 2 27 7.5 Z" fill="#3A3F47" {...INK} />
      <rect x="31" y="0" width="2" height="9" fill="#3A3F47" />
      <path d="M6 54 Q12 44 20 46" fill="none" stroke="#6B4A2B" strokeWidth="1.6" />
      <Blossom cx={8} cy={50} petal={2.0} centre={1.2} />
      <Blossom cx={16} cy={45} petal={1.8} centre={1.1} />
      <Blossom cx={52} cy={48} petal={1.8} centre={1.1} />
      <path d="M58 52 Q54 46 48 47" fill="none" stroke="#6B4A2B" strokeWidth="1.4" />
    </Sticker>
  );
}

// App logo: a suitcase sticker with a map pin, on a soft purple halo.
export function Logo() {
  const line = { stroke: '#721194', strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' };
  return (
    <svg className="sticker hero__logo" width="120" height="120" viewBox="-14 -14 92 92" role="img" aria-label="Wanderwise logo">
      <defs>
        <filter id="halo" x="-30%" y="-30%" width="160%" height="160%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d" />
          <feGaussianBlur in="d" stdDeviation="1" result="db" />
          <feFlood floodColor="#F1DDF9" />
          <feComposite in2="db" operator="in" result="h" />
          <feMerge>
            <feMergeNode in="h" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#halo)">
        <path d="M24 18 V12 Q24 9 27 9 H37 Q40 9 40 12 V18" fill="none" {...line} />
        <rect x="25.5" y="11" width="13" height="3" rx="1.5" fill="#E3BFF3" {...line} />
        <rect x="4" y="18" width="56" height="38" rx="5" fill="#E3BFF3" {...line} />
        <path d="M4 25 Q4 18 11 18" fill="none" {...line} />
        <path d="M60 25 Q60 18 53 18" fill="none" {...line} />
        <path d="M4 49 Q4 56 11 56" fill="none" {...line} />
        <path d="M60 49 Q60 56 53 56" fill="none" {...line} />
        <path d="M4 26 L11 18 M53 18 L60 26 M4 48 L11 56 M53 56 L60 48" fill="none" {...line} />
        <rect x="17" y="18" width="5" height="38" fill="#F7EDFB" {...line} />
        <rect x="42" y="18" width="5" height="38" fill="#F7EDFB" {...line} />
        <rect x="15.5" y="33" width="8" height="6" rx="1.5" fill="#E3BFF3" {...line} />
        <rect x="40.5" y="33" width="8" height="6" rx="1.5" fill="#E3BFF3" {...line} />
        <path d="M32 44 C27.5 39 26 35.5 26 33 C26 29.7 28.7 27 32 27 C35.3 27 38 29.7 38 33 C38 35.5 36.5 39 32 44 Z" fill="#9F2BCF" {...line} />
        <circle cx="32" cy="33" r="2.2" fill="#FFFFFF" />
        <rect x="10" y="56" width="5" height="3" rx="1" fill="#721194" />
        <rect x="49" y="56" width="5" height="3" rx="1" fill="#721194" />
      </g>
    </svg>
  );
}
