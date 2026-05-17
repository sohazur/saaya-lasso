/* eslint-disable no-undef */
/* ============================================================
   SAAYA — Pakistani wedding atelier
   Product catalog + silhouette illustrations
   (Silhouettes are tone-on-tone placeholders; the user can drop
    real photography into each image-slot to override.)
   ============================================================ */

/* Fabric-tone backgrounds used for empty-state silhouettes.
   Each product picks a tasteful warm tone so the catalog feels
   curated even before real photos land. */
const TONES = {
  bridal:    'linear-gradient(160deg, #c89c4e 0%, #7a3326 60%, #4a1a18 100%)',
  oxblood:   'linear-gradient(160deg, #8d4a4f 0%, #5e2530 60%, #321515 100%)',
  saffron:   'linear-gradient(160deg, #e3b770 0%, #b8893c 55%, #6f4a17 100%)',
  emerald:   'linear-gradient(160deg, #5f9c7e 0%, #2f5d4b 60%, #173129 100%)',
  powder:    'linear-gradient(160deg, #b8c8dd 0%, #6f87a3 60%, #344658 100%)',
  ivory:     'linear-gradient(160deg, #f1e7d3 0%, #d8c8a8 55%, #a18b66 100%)',
  pearl:     'linear-gradient(160deg, #f7f2e6 0%, #d4cdb9 60%, #93896f 100%)',
  rose:      'linear-gradient(160deg, #d9a5a6 0%, #a06a72 60%, #5a3741 100%)',
  champagne: 'linear-gradient(160deg, #e6d6b3 0%, #b39463 60%, #6a4f24 100%)',
  teal:      'linear-gradient(160deg, #6ba5a5 0%, #2a5e63 60%, #112d31 100%)',
  parrot:    'linear-gradient(160deg, #aac86a 0%, #5f8434 60%, #294617 100%)',
  midnight:  'linear-gradient(160deg, #5e6a8c 0%, #2a3354 60%, #11132a 100%)',
};

/* ---------- Silhouette illustrations ----------
   Tone-on-tone CSS-drawn outfits. Each takes {tone} (gradient bg)
   and renders a stylised figure on it. Acts as a default that's
   replaced when the user drops a real photo into the image-slot. */

function SilLehenga({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.bridal }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        {/* atmospheric glow */}
        <defs>
          <radialGradient id={`rg-${tone}`} cx="50%" cy="35%" r="60%">
            <stop offset="0" stopColor="rgba(255,240,200,0.18)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id={`gold-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill={`url(#rg-${tone})`} />

        {/* head */}
        <ellipse cx="100" cy="48" rx="14" ry="17" fill="rgba(0,0,0,0.45)" />
        {/* dupatta drape over head */}
        <path d="M62 50 Q100 22 138 50 Q140 64 138 78 Q120 76 100 78 Q80 76 62 78 Q60 64 62 50 Z"
              fill="rgba(255,255,255,0.22)" stroke={`url(#gold-${tone})`} strokeWidth="0.5" />
        {/* dupatta flowing */}
        <path d="M62 76 Q40 110 38 156 Q44 158 50 156 Q56 110 70 84 Z"
              fill="rgba(255,255,255,0.16)" stroke={`url(#gold-${tone})`} strokeWidth="0.4" />
        <path d="M138 76 Q160 110 162 156 Q156 158 150 156 Q144 110 130 84 Z"
              fill="rgba(255,255,255,0.16)" stroke={`url(#gold-${tone})`} strokeWidth="0.4" />
        {/* bodice (choli) */}
        <path d="M80 84 Q100 90 120 84 L122 130 Q100 134 78 130 Z"
              fill="rgba(0,0,0,0.32)" />
        {/* zari border on choli */}
        <path d="M78 130 L122 130" stroke={`url(#gold-${tone})`} strokeWidth="1.2" opacity="0.85" />
        {/* arms */}
        <path d="M80 90 Q60 110 56 140" stroke="rgba(0,0,0,0.32)" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M120 90 Q140 110 144 140" stroke="rgba(0,0,0,0.32)" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* lehenga skirt — A-line, voluminous */}
        <path d="M76 130 Q50 180 36 234 L164 234 Q150 180 124 130 Z"
              fill="rgba(0,0,0,0.42)" />
        {/* skirt embroidery rings */}
        <g stroke={`url(#gold-${tone})`} fill="none" opacity="0.65">
          <path d="M62 170 Q100 178 138 170" strokeWidth="0.8" />
          <path d="M52 200 Q100 214 148 200" strokeWidth="0.9" />
          <path d="M44 222 Q100 240 156 222" strokeWidth="1.1" />
        </g>
        {/* sparkle accents */}
        <g fill="#fdf2d0" opacity="0.7">
          <circle cx="88" cy="148" r="0.8" />
          <circle cx="112" cy="156" r="0.7" />
          <circle cx="74" cy="184" r="0.9" />
          <circle cx="126" cy="190" r="0.7" />
          <circle cx="100" cy="208" r="1.0" />
          <circle cx="60" cy="216" r="0.6" />
          <circle cx="140" cy="216" r="0.6" />
        </g>
        {/* jewellery hint — maang tikka */}
        <circle cx="100" cy="36" r="1.4" fill={`url(#gold-${tone})`} />
      </svg>
    </div>
  );
}

function SilSharara({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.saffron }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-sh-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        {/* head */}
        <ellipse cx="100" cy="46" rx="13" ry="16" fill="rgba(0,0,0,0.4)" />
        {/* dupatta over shoulder */}
        <path d="M70 60 Q90 56 100 72 Q108 56 130 60 L138 84 Q100 88 62 84 Z"
              fill="rgba(255,255,255,0.18)" stroke={`url(#gold-sh-${tone})`} strokeWidth="0.4" />
        {/* kameez (long shirt) */}
        <path d="M70 82 L62 168 Q100 172 138 168 L130 82 Q100 86 70 82 Z"
              fill="rgba(0,0,0,0.32)" />
        {/* zari panel center */}
        <path d="M96 86 L96 168 M104 86 L104 168" stroke={`url(#gold-sh-${tone})`} strokeWidth="0.5" opacity="0.75" />
        <path d="M88 168 Q100 172 112 168" stroke={`url(#gold-sh-${tone})`} strokeWidth="1.1" opacity="0.9" />
        {/* arms */}
        <path d="M70 88 Q56 130 56 168" stroke="rgba(0,0,0,0.3)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M130 88 Q144 130 144 168" stroke="rgba(0,0,0,0.3)" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* sharara pants — wide flared from knee */}
        <path d="M76 168 L60 234 L96 234 Q98 200 96 170 Z" fill="rgba(0,0,0,0.38)" />
        <path d="M124 168 L140 234 L104 234 Q102 200 104 170 Z" fill="rgba(0,0,0,0.38)" />
        {/* hem embroidery */}
        <path d="M60 232 L96 232" stroke={`url(#gold-sh-${tone})`} strokeWidth="1.2" opacity="0.85" />
        <path d="M104 232 L140 232" stroke={`url(#gold-sh-${tone})`} strokeWidth="1.2" opacity="0.85" />
        {/* knee gather line */}
        <path d="M76 168 Q86 175 96 170" stroke={`url(#gold-sh-${tone})`} strokeWidth="0.6" opacity="0.6" fill="none" />
        <path d="M104 170 Q114 175 124 168" stroke={`url(#gold-sh-${tone})`} strokeWidth="0.6" opacity="0.6" fill="none" />
        {/* jewelled center accent */}
        <circle cx="100" cy="100" r="2" fill={`url(#gold-sh-${tone})`} />
      </svg>
    </div>
  );
}

function SilAnarkali({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.emerald }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-an-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="46" rx="13" ry="16" fill="rgba(0,0,0,0.4)" />
        {/* dupatta drape */}
        <path d="M68 56 Q100 50 132 56 Q138 62 142 78 Q100 84 58 78 Q62 62 68 56 Z"
              fill="rgba(255,255,255,0.16)" />
        {/* anarkali — fitted top, very full flowing skirt */}
        <path d="M82 80 Q100 84 118 80 L120 118 Q100 120 80 118 Z"
              fill="rgba(0,0,0,0.34)" />
        {/* skirt — voluminous, kalidar */}
        <path d="M80 118 Q44 200 34 234 L166 234 Q156 200 120 118 Z"
              fill="rgba(0,0,0,0.4)" />
        {/* paneling lines on skirt */}
        <g stroke={`url(#gold-an-${tone})`} fill="none" opacity="0.5" strokeWidth="0.5">
          <path d="M100 118 L100 234" />
          <path d="M90 120 Q70 180 56 234" />
          <path d="M110 120 Q130 180 144 234" />
          <path d="M82 120 Q56 180 38 234" />
          <path d="M118 120 Q144 180 162 234" />
        </g>
        {/* hem motif */}
        <path d="M36 232 Q100 246 164 232" stroke={`url(#gold-an-${tone})`} strokeWidth="1.4" fill="none" opacity="0.85" />
        <path d="M40 224 Q100 236 160 224" stroke={`url(#gold-an-${tone})`} strokeWidth="0.6" fill="none" opacity="0.55" />
        {/* arms */}
        <path d="M82 88 Q66 116 64 140" stroke="rgba(0,0,0,0.32)" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M118 88 Q134 116 136 140" stroke="rgba(0,0,0,0.32)" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* center embroidery panel */}
        <path d="M96 86 L96 118 M104 86 L104 118" stroke={`url(#gold-an-${tone})`} strokeWidth="0.5" opacity="0.85" />
        <circle cx="100" cy="102" r="2" fill={`url(#gold-an-${tone})`} />
      </svg>
    </div>
  );
}

function SilSaree({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.teal }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-sa-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="46" rx="13" ry="16" fill="rgba(0,0,0,0.42)" />
        {/* pallu drape from left shoulder across body */}
        <path d="M76 62 Q60 76 64 110 Q88 120 116 110 Q142 100 138 70 Q120 60 100 64 Q88 62 76 62 Z"
              fill="rgba(0,0,0,0.32)" />
        {/* pallu falling */}
        <path d="M64 110 Q56 156 50 220 Q60 222 70 220 Q78 156 84 116 Z"
              fill="rgba(0,0,0,0.36)" />
        {/* blouse hint */}
        <path d="M88 80 Q100 84 112 80 L114 104 Q100 108 86 104 Z"
              fill="rgba(0,0,0,0.42)" />
        {/* skirt — wrapped, falls straight */}
        <path d="M82 122 Q70 180 64 234 L136 234 Q130 180 118 122 Z"
              fill="rgba(0,0,0,0.36)" />
        {/* zari border on pallu */}
        <path d="M50 218 Q66 220 84 116" stroke={`url(#gold-sa-${tone})`} strokeWidth="1.2" fill="none" opacity="0.9" />
        <path d="M50 210 Q66 212 84 110" stroke={`url(#gold-sa-${tone})`} strokeWidth="0.5" fill="none" opacity="0.55" />
        {/* skirt border */}
        <path d="M64 232 L136 232" stroke={`url(#gold-sa-${tone})`} strokeWidth="1.4" opacity="0.85" />
        {/* paisley motif on pallu */}
        <g fill={`url(#gold-sa-${tone})`} opacity="0.55">
          <circle cx="58" cy="170" r="1.4" />
          <circle cx="64" cy="186" r="1.2" />
          <circle cx="60" cy="200" r="1.3" />
          <ellipse cx="56" cy="150" rx="2" ry="1" />
        </g>
      </svg>
    </div>
  );
}

function SilSherwani({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.ivory }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-sw-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        {/* head */}
        <ellipse cx="100" cy="48" rx="14" ry="17" fill="rgba(0,0,0,0.38)" />
        {/* turban (kullah) hint */}
        <path d="M84 36 Q100 22 116 36 Q118 44 116 50 Q100 46 84 50 Q82 44 84 36 Z"
              fill="rgba(0,0,0,0.45)" />
        <path d="M84 36 Q100 22 116 36" stroke={`url(#gold-sw-${tone})`} strokeWidth="0.6" fill="none" opacity="0.8" />
        {/* sherwani body — fitted, knee-length */}
        <path d="M76 78 L70 200 L130 200 L124 78 Q100 82 76 78 Z"
              fill="rgba(0,0,0,0.36)" />
        {/* center button placket */}
        <path d="M100 78 L100 200" stroke={`url(#gold-sw-${tone})`} strokeWidth="0.6" opacity="0.85" />
        {/* buttons */}
        <g fill={`url(#gold-sw-${tone})`}>
          {[88,108,128,148,168,188].map(y => <circle key={y} cx="100" cy={y} r="1.4" />)}
        </g>
        {/* mandarin collar */}
        <path d="M88 70 Q100 76 112 70 L112 80 Q100 82 88 80 Z" fill="rgba(0,0,0,0.45)" />
        <path d="M88 78 Q100 80 112 78" stroke={`url(#gold-sw-${tone})`} strokeWidth="0.6" opacity="0.85" />
        {/* arms */}
        <path d="M76 86 Q66 130 66 180" stroke="rgba(0,0,0,0.34)" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M124 86 Q134 130 134 180" stroke="rgba(0,0,0,0.34)" strokeWidth="11" strokeLinecap="round" fill="none" />
        {/* churidar pants below */}
        <path d="M80 200 L78 234 L98 234 L100 200 Z" fill="rgba(0,0,0,0.4)" />
        <path d="M120 200 L122 234 L102 234 L100 200 Z" fill="rgba(0,0,0,0.4)" />
        {/* hem detail */}
        <path d="M70 200 L130 200" stroke={`url(#gold-sw-${tone})`} strokeWidth="0.7" opacity="0.7" />
      </svg>
    </div>
  );
}

function SilKurtaWomen({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.rose }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-k-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="46" rx="13" ry="16" fill="rgba(0,0,0,0.4)" />
        {/* dupatta soft drape */}
        <path d="M64 60 Q100 56 136 60 Q140 66 138 76 Q100 80 62 76 Q60 66 64 60 Z"
              fill="rgba(255,255,255,0.16)" />
        {/* kurta — straight cut */}
        <path d="M76 82 L72 196 L128 196 L124 82 Q100 86 76 82 Z"
              fill="rgba(0,0,0,0.32)" />
        {/* arms */}
        <path d="M76 90 Q64 130 66 168" stroke="rgba(0,0,0,0.3)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M124 90 Q136 130 134 168" stroke="rgba(0,0,0,0.3)" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* center placket */}
        <path d="M100 86 L100 130" stroke={`url(#gold-k-${tone})`} strokeWidth="0.5" opacity="0.8" />
        <circle cx="100" cy="96" r="1.2" fill={`url(#gold-k-${tone})`} />
        <circle cx="100" cy="110" r="1.2" fill={`url(#gold-k-${tone})`} />
        <circle cx="100" cy="124" r="1.2" fill={`url(#gold-k-${tone})`} />
        {/* trouser */}
        <path d="M82 196 L78 234 L98 234 L100 196 Z" fill="rgba(0,0,0,0.36)" />
        <path d="M118 196 L122 234 L102 234 L100 196 Z" fill="rgba(0,0,0,0.36)" />
        {/* hem border */}
        <path d="M72 194 L128 194" stroke={`url(#gold-k-${tone})`} strokeWidth="0.7" opacity="0.7" />
      </svg>
    </div>
  );
}

function SilDupatta({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.champagne }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-d-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        {/* fabric draped over rod */}
        <path d="M30 70 Q100 60 170 70 L170 84 Q100 76 30 84 Z" fill="rgba(0,0,0,0.34)" />
        {/* main body — flowing fabric */}
        <path d="M30 84 Q70 200 60 230 Q100 220 140 230 Q130 200 170 84 Q100 92 30 84 Z"
              fill="rgba(0,0,0,0.3)" />
        {/* folds */}
        <path d="M60 100 Q72 180 70 226" stroke="rgba(0,0,0,0.18)" strokeWidth="6" fill="none" />
        <path d="M100 96 Q100 180 100 224" stroke="rgba(0,0,0,0.15)" strokeWidth="5" fill="none" />
        <path d="M140 100 Q128 180 130 226" stroke="rgba(0,0,0,0.18)" strokeWidth="6" fill="none" />
        {/* zari border bottom */}
        <path d="M60 230 Q100 220 140 230" stroke={`url(#gold-d-${tone})`} strokeWidth="1.6" fill="none" opacity="0.9" />
        <path d="M62 224 Q100 215 138 224" stroke={`url(#gold-d-${tone})`} strokeWidth="0.6" fill="none" opacity="0.55" />
        {/* embroidered booti motifs */}
        <g fill={`url(#gold-d-${tone})`} opacity="0.65">
          <circle cx="60" cy="140" r="1.4" />
          <circle cx="100" cy="160" r="1.6" />
          <circle cx="140" cy="140" r="1.4" />
          <circle cx="80" cy="190" r="1.4" />
          <circle cx="120" cy="190" r="1.4" />
          <ellipse cx="70" cy="170" rx="2" ry="0.8" />
          <ellipse cx="130" cy="170" rx="2" ry="0.8" />
        </g>
      </svg>
    </div>
  );
}

function SilJewellery({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.midnight }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-j-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fde7a8" />
            <stop offset="0.5" stopColor="#d9a937" />
            <stop offset="1" stopColor="#8c5d18" />
          </linearGradient>
        </defs>
        {/* jhumka left */}
        <g transform="translate(50 100)">
          <circle cx="0" cy="0" r="6" fill={`url(#gold-j-${tone})`} />
          <path d="M-22 8 Q0 14 22 8 Q22 36 0 56 Q-22 36 -22 8 Z" fill={`url(#gold-j-${tone})`} />
          <path d="M-18 14 Q0 18 18 14" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" fill="none" />
          <g fill="rgba(0,0,0,0.3)">
            {[-14, -7, 0, 7, 14].map((x, i) => <circle key={i} cx={x} cy={60 + ((i % 2) * 2)} r="2" />)}
          </g>
          <circle cx="-8" cy="32" r="1.4" fill="#fcefb8" opacity="0.85" />
        </g>
        {/* jhumka right (mirrored) */}
        <g transform="translate(150 100)">
          <circle cx="0" cy="0" r="6" fill={`url(#gold-j-${tone})`} />
          <path d="M-22 8 Q0 14 22 8 Q22 36 0 56 Q-22 36 -22 8 Z" fill={`url(#gold-j-${tone})`} />
          <path d="M-18 14 Q0 18 18 14" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" fill="none" />
          <g fill="rgba(0,0,0,0.3)">
            {[-14, -7, 0, 7, 14].map((x, i) => <circle key={i} cx={x} cy={60 + ((i % 2) * 2)} r="2" />)}
          </g>
          <circle cx="-8" cy="32" r="1.4" fill="#fcefb8" opacity="0.85" />
        </g>
        {/* necklace below */}
        <g transform="translate(100 180)">
          <path d="M-60 0 Q0 40 60 0" stroke={`url(#gold-j-${tone})`} strokeWidth="2" fill="none" />
          <path d="M-60 0 Q0 50 60 0" stroke={`url(#gold-j-${tone})`} strokeWidth="1" fill="none" opacity="0.7" />
          {[-40, -25, -10, 6, 22, 38].map((x, i) => (
            <circle key={i} cx={x} cy={20 + Math.abs(x)/3} r="2.2" fill={`url(#gold-j-${tone})`} />
          ))}
          <path d="M0 42 L-8 56 L0 64 L8 56 Z" fill={`url(#gold-j-${tone})`} />
          <circle cx="0" cy="52" r="1.6" fill="#7a3326" />
        </g>
      </svg>
    </div>
  );
}

function SilKhussa({ tone }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.ivory }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-kh-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        {/* shoe pair, slight angle */}
        <g transform="translate(50 130)">
          <path d="M0 30 Q4 8 36 4 Q72 4 80 18 Q82 28 78 36 Q60 44 30 42 Q4 40 0 30 Z"
                fill="rgba(0,0,0,0.36)" />
          <path d="M68 18 Q80 6 90 0 Q86 14 78 22" fill="rgba(0,0,0,0.42)" />
          {/* embroidery pattern */}
          <g stroke={`url(#gold-kh-${tone})`} fill="none" opacity="0.85" strokeWidth="0.5">
            <path d="M14 22 Q40 18 70 22" />
            <path d="M18 30 Q40 26 64 30" />
          </g>
          <g fill={`url(#gold-kh-${tone})`} opacity="0.8">
            <circle cx="30" cy="22" r="1.2" />
            <circle cx="48" cy="20" r="1.3" />
            <circle cx="62" cy="24" r="1.1" />
          </g>
        </g>
        <g transform="translate(80 168)">
          <path d="M0 30 Q4 8 36 4 Q72 4 80 18 Q82 28 78 36 Q60 44 30 42 Q4 40 0 30 Z"
                fill="rgba(0,0,0,0.36)" />
          <path d="M68 18 Q80 6 90 0 Q86 14 78 22" fill="rgba(0,0,0,0.42)" />
          <g stroke={`url(#gold-kh-${tone})`} fill="none" opacity="0.85" strokeWidth="0.5">
            <path d="M14 22 Q40 18 70 22" />
            <path d="M18 30 Q40 26 64 30" />
          </g>
          <g fill={`url(#gold-kh-${tone})`} opacity="0.8">
            <circle cx="30" cy="22" r="1.2" />
            <circle cx="48" cy="20" r="1.3" />
            <circle cx="62" cy="24" r="1.1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SilGharara({ tone }) {
  /* gharara is similar to sharara but with knee gather + heavier flare */
  return (
    <div style={{ position: 'absolute', inset: 0, background: TONES[tone] || TONES.champagne }}>
      <svg viewBox="0 0 200 250" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`gold-gh-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6c884" />
            <stop offset="1" stopColor="#a87729" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="46" rx="13" ry="16" fill="rgba(0,0,0,0.4)" />
        <path d="M64 56 Q100 50 136 56 Q140 66 138 80 Q100 86 62 80 Q60 66 64 56 Z"
              fill="rgba(255,255,255,0.2)" />
        {/* short kurti */}
        <path d="M76 84 L70 152 Q100 154 130 152 L124 84 Q100 88 76 84 Z" fill="rgba(0,0,0,0.34)" />
        <path d="M70 152 Q100 156 130 152" stroke={`url(#gold-gh-${tone})`} strokeWidth="1" opacity="0.85" />
        {/* arms */}
        <path d="M76 90 Q66 120 64 150" stroke="rgba(0,0,0,0.32)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M124 90 Q134 120 136 150" stroke="rgba(0,0,0,0.32)" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* gharara — straight from waist to knee, big flare from knee */}
        <path d="M78 152 L78 184 Q56 220 50 234 L98 234 L98 184 Q98 154 78 152 Z" fill="rgba(0,0,0,0.38)" />
        <path d="M122 152 L122 184 Q144 220 150 234 L102 234 L102 184 Q102 154 122 152 Z" fill="rgba(0,0,0,0.38)" />
        {/* knee gather (ghutti) — characteristic gharara feature */}
        <path d="M76 184 Q88 188 98 184" stroke={`url(#gold-gh-${tone})`} strokeWidth="1.2" fill="none" />
        <path d="M102 184 Q112 188 124 184" stroke={`url(#gold-gh-${tone})`} strokeWidth="1.2" fill="none" />
        <circle cx="88" cy="186" r="1.2" fill={`url(#gold-gh-${tone})`} />
        <circle cx="112" cy="186" r="1.2" fill={`url(#gold-gh-${tone})`} />
        {/* hem embroidery */}
        <path d="M50 232 L98 232" stroke={`url(#gold-gh-${tone})`} strokeWidth="1.4" opacity="0.85" />
        <path d="M102 232 L150 232" stroke={`url(#gold-gh-${tone})`} strokeWidth="1.4" opacity="0.85" />
        {/* booti motifs on flare */}
        <g fill={`url(#gold-gh-${tone})`} opacity="0.6">
          <circle cx="64" cy="210" r="1.2" />
          <circle cx="78" cy="215" r="1.2" />
          <circle cx="122" cy="215" r="1.2" />
          <circle cx="136" cy="210" r="1.2" />
        </g>
      </svg>
    </div>
  );
}

/* dispatch table */
const SILS = {
  lehenga: SilLehenga,
  sharara: SilSharara,
  anarkali: SilAnarkali,
  saree: SilSaree,
  sherwani: SilSherwani,
  kurta: SilKurtaWomen,
  dupatta: SilDupatta,
  jewellery: SilJewellery,
  khussa: SilKhussa,
  gharara: SilGharara,
};

/* ============================================================
   PRODUCT CATALOG — 8 pieces · 2 per category
   ============================================================ */
const PRODUCTS = [
  /* ───────── BRIDAL ───────── */
  {
    id: 'zara-bridal-lehenga',
    name: 'Zara',
    type: 'Bridal Lehenga',
    designer: 'Saaya Atelier',
    category: 'Bridal',
    price: 285000,
    silType: 'lehenga',
    tone: 'bridal',
    image: 'uploads/sequins-embroidered-silk-red-pakistani-bridal-wear-lehenga-llcv09965-1.webp',
    badge: 'BRIDAL',
    tagline: 'For the longest walk of your life.',
    blurb: 'A hand-embroidered bridal lehenga in oxblood crepe with antique-gold zardozi, kora, dabka and tilla work. The kalidar skirt opens to a full circle; the choli is silk-lined. Comes with a net dupatta with four-side hand-embroidered border. 60+ hours of work on each piece.',
    fabric: 'Crepe silk · net dupatta',
    work: 'Hand zardozi, kora, dabka, tilla, sequins',
    timeline: 'Made to order · 6–8 weeks',
    care: 'Dry clean only',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    colors: [
      { name: 'Oxblood', hex: '#5e2530' },
      { name: 'Maroon', hex: '#7a1f2b' },
      { name: 'Ink', hex: '#1f1812' },
    ],
  },
  {
    id: 'roohi-walima-gharara',
    name: 'Roohi',
    type: 'Walima Gharara',
    designer: 'Saaya Atelier',
    category: 'Bridal',
    price: 198000,
    silType: 'gharara',
    tone: 'champagne',
    image: 'uploads/Zareen-2.jpg',
    badge: 'NEW',
    tagline: 'Champagne, silver, and the morning after.',
    blurb: 'A walima gharara in champagne tissue with silver zardozi, sheesha and pearl detailing. The short kurti is hand-finished; the gharara legs gather at the knee with traditional ghutti. Pearl-embellished dupatta finishes the look.',
    fabric: 'Tissue silk · pearl-net dupatta',
    work: 'Silver zardozi, sheesha, pearl embellishment',
    timeline: 'Made to order · 5–6 weeks',
    care: 'Dry clean only',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne', hex: '#c5a85b' },
      { name: 'Pearl ivory', hex: '#ece3cb' },
      { name: 'Old rose', hex: '#a8767a' },
    ],
  },

  /* ───────── DAILY WEAR ───────── */
  {
    id: 'sana-lawn-kurta',
    name: 'Sana',
    type: 'Lawn Kurta Set',
    designer: 'Saaya Pret',
    category: 'Daily wear',
    price: 8500,
    silType: 'kurta',
    tone: 'powder',
    image: 'uploads/h253-007b-2c.webp',
    tagline: 'Lawn season, made gentle.',
    blurb: 'A two-piece in soft cotton lawn — printed digital floral kurta with chikankari trim, paired with cigarette-cut trousers. Light, breathable, made for the heat. Ships unstitched as a 2.5m cut, or stitched to your measurements.',
    fabric: 'Pure cotton lawn',
    work: 'Digital print, chikankari trim',
    timeline: 'Stitched · ships in 7–10 days',
    care: 'Machine wash cold · iron damp',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Unstitched'],
    colors: [
      { name: 'Powder blue', hex: '#a3b8d2' },
      { name: 'Sage', hex: '#a8c6b3' },
      { name: 'Coral', hex: '#d68b7a' },
    ],
  },
  {
    id: 'maira-embroidered-suit',
    name: 'Maira',
    type: 'Embroidered Lawn Suit',
    designer: 'Saaya Pret',
    category: 'Daily wear',
    price: 14500,
    silType: 'kurta',
    tone: 'rose',
    image: 'uploads/D-2Front_A_aee9619b-93c1-4be6-93aa-e7275c445575_395x523.webp',
    badge: 'NEW',
    tagline: 'The everyday suit that quietly outperforms.',
    blurb: 'A three-piece embroidered lawn suit: front-paneled kurta with neckline embroidery, plain cotton trousers, and a printed chiffon dupatta. The needle-work is fine enough to wear to dinner.',
    fabric: 'Lawn · chiffon dupatta',
    work: 'Neckline embroidery, schiffli detail',
    timeline: 'Stitched · ships in 7–10 days',
    care: 'Dry clean recommended',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Unstitched'],
    colors: [
      { name: 'Dusty rose', hex: '#a06a72' },
      { name: 'Cement', hex: '#9c9384' },
      { name: 'Pistachio', hex: '#a8c69a' },
    ],
  },

  /* ───────── FORMAL ───────── */
  {
    id: 'anaya-chiffon-anarkali',
    name: 'Anaya',
    type: 'Chiffon Anarkali',
    designer: 'Saaya Atelier',
    category: 'Formal',
    price: 78000,
    silType: 'anarkali',
    tone: 'powder',
    image: 'uploads/Ruffle-Gown-Designs-New-Collection.webp',
    tagline: 'Quiet, but not at all shy.',
    blurb: 'A powder-blue chiffon anarkali with delicate silver zari, French knots, and sequin scatter. Cinched at the empire waist; the skirt floats. Comes with a dupatta embroidered all-over in matching silver thread.',
    fabric: 'Chiffon · matching dupatta',
    work: 'Silver zari, French knots, sequins',
    timeline: 'Made to order · 4–5 weeks',
    care: 'Dry clean only',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Powder blue', hex: '#a3b8d2' },
      { name: 'Soft mint', hex: '#a8c6b3' },
      { name: 'Pearl', hex: '#ece3cb' },
    ],
  },
  {
    id: 'sahar-chiffon-saree',
    name: 'Sahar',
    type: 'Chiffon Saree',
    designer: 'Saaya Atelier',
    category: 'Formal',
    price: 68000,
    silType: 'saree',
    tone: 'teal',
    image: 'uploads/Teal_Blue_Scalloped_Border_Satin_Chiffon_Saree_Front.webp',
    tagline: 'Deep teal, a paisley pallu, six metres of evening.',
    blurb: 'A 6-metre chiffon saree in deep teal with a hand-embroidered paisley pallu in antique gold zari. Comes with an unstitched blouse piece in matching teal and detailed stitching guide.',
    fabric: 'Pure chiffon · unstitched blouse',
    work: 'Hand zari pallu, beaded edge',
    timeline: 'Ships in 1–2 weeks',
    care: 'Dry clean recommended',
    sizes: ['One size'],
    colors: [
      { name: 'Deep teal', hex: '#2a5e63' },
      { name: 'Ink', hex: '#1f1812' },
      { name: 'Oxblood', hex: '#5e2530' },
    ],
  },

  /* ───────── MEN'S ───────── */
  {
    id: 'sarmad-sherwani',
    name: 'Sarmad',
    type: 'Groom Sherwani',
    designer: 'Saaya Atelier — Men',
    category: "Men's",
    price: 145000,
    silType: 'sherwani',
    tone: 'ivory',
    image: 'uploads/S_B21June3931copy_2e872344-4ca1-4f39-a645-3eab5b5bb64f.webp',
    badge: 'GROOM',
    tagline: 'Tailored for one day, kept for a lifetime.',
    blurb: 'A classic knee-length sherwani in raw-silk ivory with antique-gold tilla embroidery along the placket, collar, and cuffs. Lined in habotai silk. Paired with churidar trousers and a traditional kullah turban.',
    fabric: 'Raw silk · habotai lining',
    work: 'Tilla embroidery, hand-finished buttons',
    timeline: 'Made to order · 6–8 weeks',
    care: 'Dry clean only',
    sizes: ['38', '40', '42', '44', '46', 'Custom'],
    colors: [
      { name: 'Ivory', hex: '#ece3cb' },
      { name: 'Camel', hex: '#a78b5f' },
      { name: 'Midnight', hex: '#1a2238' },
    ],
  },
  {
    id: 'hashim-kurta',
    name: 'Hashim',
    type: 'Raw Silk Kurta Pajama',
    designer: 'Saaya — Men',
    category: "Men's",
    price: 22500,
    silType: 'sherwani',
    tone: 'midnight',
    image: 'uploads/il_1080xN.5167906123_d64o.webp',
    tagline: 'A clean kurta for every event in between.',
    blurb: 'A fitted raw-silk kurta with mandarin collar and subtle tonal pintucking, worn with straight-cut pajama trousers. Cut for the events that fall between the headline ones — sangeet, mehndi guests, eid dinners.',
    fabric: 'Raw silk',
    work: 'Tonal pintuck detailing, bone buttons',
    timeline: 'Stitched · ships in 10–14 days',
    care: 'Dry clean recommended',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { name: 'Midnight', hex: '#1a2238' },
      { name: 'Charcoal', hex: '#2c2c2c' },
      { name: 'Ivory', hex: '#ece3cb' },
    ],
  },
];

const CATEGORIES = ['All', 'Bridal', 'Daily wear', 'Formal', "Men's"];

/* lookbook tiles for the home page — one per category, fronted by a real photo */
const LOOKBOOK = [
  { id: 'bridal', name: 'Bridal',     desc: 'Lehenga · gharara · sharara', tone: 'bridal',   silType: 'lehenga',  image: 'uploads/sequins-embroidered-silk-red-pakistani-bridal-wear-lehenga-llcv09965-1.webp' },
  { id: 'daily',  name: 'Daily wear', desc: 'Lawn · cotton · pret',         tone: 'powder',   silType: 'kurta',    image: 'uploads/h253-007b-2c.webp' },
  { id: 'formal', name: 'Formal',     desc: 'Anarkali · saree',             tone: 'teal',     silType: 'anarkali', image: 'uploads/Teal_Blue_Scalloped_Border_Satin_Chiffon_Saree_Front.webp' },
  { id: 'mens',   name: "Men's",      desc: 'Sherwani · kurta',             tone: 'ivory',    silType: 'sherwani', image: 'uploads/S_B21June3931copy_2e872344-4ca1-4f39-a645-3eab5b5bb64f.webp' },
];

Object.assign(window, { PRODUCTS, CATEGORIES, SILS, TONES, LOOKBOOK });
