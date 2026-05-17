/* eslint-disable no-undef */
/* ============================================================
   FOYER SHOP — product data + SVG illustrations
   ============================================================ */

/* ---- Illustrations ----
   Each accepts {accent, color} and returns an inline SVG that fills its
   container via viewBox + width="100%" height="100%". Stroke-based,
   monochrome on --fg with sparing amber accents. Matches Foyer's
   currentColor + opacity:.75 iconography rule, but turned up to readable
   product silhouettes. */

function IlluHoodie({ accent, color }) {
  const c = color || 'var(--fg)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <path d="M40 80 L40 175 Q40 180 45 180 L155 180 Q160 180 160 175 L160 80" />
      {/* sleeves */}
      <path d="M40 80 L18 110 L30 135 L52 122" />
      <path d="M160 80 L182 110 L170 135 L148 122" />
      {/* shoulder */}
      <path d="M40 80 Q60 60 78 56" />
      <path d="M160 80 Q140 60 122 56" />
      {/* hood */}
      <path d="M78 56 Q82 38 100 38 Q118 38 122 56" />
      <path d="M78 56 Q92 78 100 80 Q108 78 122 56" />
      {/* drawstrings */}
      <path d="M92 76 L94 102" />
      <path d="M108 76 L106 102" />
      <circle cx="94" cy="105" r="2.2" fill={c} stroke="none" />
      <circle cx="106" cy="105" r="2.2" fill={c} stroke="none" />
      {/* pocket */}
      <path d="M62 135 L138 135 Q138 158 100 158 Q62 158 62 135 Z" opacity=".55" />
      {/* embroidered F */}
      <g transform="translate(96 105)" stroke={accent || 'var(--amber)'} strokeWidth="2">
        <path d="M0 0 L8 0 M0 0 L0 14 M0 6 L6 6" />
      </g>
    </svg>
  );
}

function IlluBell({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* base plate */}
      <ellipse cx="100" cy="158" rx="62" ry="8" />
      <path d="M38 158 L38 166 Q38 170 42 170 L158 170 Q162 170 162 166 L162 158" />
      {/* dome */}
      <path d="M52 158 Q52 80 100 70 Q148 80 148 158" />
      <ellipse cx="100" cy="158" rx="48" ry="5" opacity=".55" />
      {/* highlight */}
      <path d="M68 140 Q66 110 84 88" opacity=".4" />
      {/* button */}
      <circle cx="100" cy="64" r="6" />
      <circle cx="100" cy="64" r="2.5" fill={a} stroke="none" />
      <line x1="100" y1="58" x2="100" y2="50" stroke={c} />
      {/* sound waves */}
      <g stroke={a} opacity=".85">
        <path d="M155 90 Q168 100 162 118" />
        <path d="M163 80 Q183 102 174 130" opacity=".55" />
        <path d="M45 90 Q32 100 38 118" />
        <path d="M37 80 Q17 102 26 130" opacity=".55" />
      </g>
    </svg>
  );
}

function IlluMug({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <path d="M52 60 L52 152 Q52 168 68 168 L120 168 Q136 168 136 152 L136 60 Z" />
      {/* rim ellipse */}
      <ellipse cx="94" cy="60" rx="42" ry="8" />
      {/* handle */}
      <path d="M136 80 Q166 80 166 110 Q166 138 136 138" />
      {/* steam */}
      <g stroke={a} opacity=".9">
        <path d="M76 50 Q72 42 78 34 Q82 26 76 18" />
        <path d="M96 50 Q92 42 98 34 Q102 26 96 18" opacity=".7" />
        <path d="M116 50 Q112 42 118 34 Q122 26 116 18" opacity=".5" />
      </g>
      {/* mic grille on the side */}
      <g transform="translate(72 95)" stroke={a} fill="none" strokeWidth="1.4">
        <rect x="0" y="0" width="20" height="34" rx="10" />
        <line x1="-6" y1="40" x2="26" y2="40" />
        <line x1="10" y1="40" x2="10" y2="48" />
      </g>
    </svg>
  );
}

function IlluTee({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M68 40 L40 60 L26 92 L52 102 L52 168 Q52 174 58 174 L142 174 Q148 174 148 168 L148 102 L174 92 L160 60 L132 40 Q120 56 100 56 Q80 56 68 40 Z" />
      <path d="M68 40 Q84 62 100 62 Q116 62 132 40" opacity=".5" />
      {/* concentric rings — "listening" graphic */}
      <g stroke={a}>
        <circle cx="100" cy="120" r="6" fill={a} />
        <circle cx="100" cy="120" r="14" opacity=".7" />
        <circle cx="100" cy="120" r="24" opacity=".4" />
        <circle cx="100" cy="120" r="34" opacity=".2" />
      </g>
    </svg>
  );
}

function IlluPins({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* three round pins in a row */}
      {[
        { cx: 50, label: 'idle',     ring: false },
        { cx: 100, label: 'listening', ring: true },
        { cx: 150, label: 'speaking', ring: true, hot: true }
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy="100" r="28" />
          <circle cx={p.cx} cy="100" r="22" opacity=".4" />
          {/* mic glyph */}
          <g stroke={p.hot ? a : c} strokeWidth="1.6">
            <rect x={p.cx - 5} y="88" width="10" height="14" rx="5" fill="none" />
            <path d={`M${p.cx - 9} 100 Q${p.cx - 9} 108 ${p.cx} 108 Q${p.cx + 9} 108 ${p.cx + 9} 100`} />
            <line x1={p.cx} y1="108" x2={p.cx} y2="114" />
          </g>
          {p.ring && (
            <circle cx={p.cx} cy="100" r="34" stroke={p.hot ? a : c} opacity={p.hot ? .85 : .5} strokeDasharray="2 4" />
          )}
          {/* pin post */}
          <line x1={p.cx} y1="128" x2={p.cx} y2="142" />
          <circle cx={p.cx} cy="146" r="3" fill={c} stroke="none" />
        </g>
      ))}
    </svg>
  );
}

function IlluCap({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* crown */}
      <path d="M40 130 Q40 70 100 60 Q160 70 160 130" />
      <path d="M40 130 L40 140 Q40 144 44 144 L156 144 Q160 144 160 140 L160 130 Z" />
      {/* brim */}
      <path d="M40 140 Q22 148 22 158 L120 158 Q160 158 178 158 Q178 148 160 140" />
      {/* panels */}
      <path d="M100 60 L100 130" opacity=".35" />
      <path d="M72 64 Q72 96 78 130" opacity=".35" />
      <path d="M128 64 Q128 96 122 130" opacity=".35" />
      {/* button */}
      <circle cx="100" cy="60" r="3.5" fill={c} stroke="none" />
      {/* embroidered F */}
      <g transform="translate(92 92)" stroke={a} strokeWidth="2.2">
        <line x1="0" y1="0" x2="0" y2="22" />
        <line x1="0" y1="0" x2="14" y2="0" />
        <line x1="0" y1="10" x2="10" y2="10" />
      </g>
    </svg>
  );
}

function IlluStickers({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* sticker 1 — bracketed tag shape */}
      <g transform="translate(20 40) rotate(-8)">
        <rect x="0" y="0" width="86" height="34" rx="4" fill={c} fillOpacity=".06" />
        <text x="10" y="22" fontFamily="ui-monospace,monospace" fontSize="12" fill={c}>[ FOYER ]</text>
      </g>
      {/* sticker 2 — circle mic */}
      <g transform="translate(110 30) rotate(12)">
        <circle cx="32" cy="32" r="30" fill={a} fillOpacity=".14" stroke={a} />
        <g stroke={a} strokeWidth="1.8">
          <rect x="25" y="20" width="14" height="20" rx="7" fill="none" />
          <path d="M19 34 Q19 46 32 46 Q45 46 45 34" />
          <line x1="32" y1="46" x2="32" y2="54" />
        </g>
      </g>
      {/* sticker 3 — quote bubble */}
      <g transform="translate(36 110) rotate(4)">
        <path d="M0 0 L96 0 Q104 0 104 8 L104 36 Q104 44 96 44 L36 44 L24 56 L26 44 L8 44 Q0 44 0 36 Z"
              fill={c} fillOpacity=".06" />
        <text x="14" y="26" fontFamily="Inter,sans-serif" fontSize="13" fill={c} fontWeight="500">hello.</text>
      </g>
      {/* sticker 4 — squiggle */}
      <g transform="translate(132 124) rotate(-14)" stroke={a} strokeWidth="2">
        <path d="M0 12 Q8 0 16 12 Q24 24 32 12 Q40 0 48 12" fill="none" />
      </g>
    </svg>
  );
}

function IlluMat({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* mat — slightly tilted */}
      <g transform="translate(100 110) rotate(-6) translate(-100 -100)">
        <rect x="22" y="60" width="156" height="80" rx="4" fill={c} fillOpacity=".04" />
        <rect x="30" y="68" width="140" height="64" rx="3" />
        {/* fringe top */}
        <g stroke={c} strokeWidth="1.2">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={'t' + i} x1={26 + i * 8.4} y1="60" x2={26 + i * 8.4} y2="56" />
          ))}
        </g>
        {/* fringe bottom */}
        <g stroke={c} strokeWidth="1.2">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={'b' + i} x1={26 + i * 8.4} y1="140" x2={26 + i * 8.4} y2="144" />
          ))}
        </g>
        {/* text */}
        <text x="100" y="106" textAnchor="middle" fontFamily="Inter,sans-serif"
              fontSize="14" fontWeight="500" letterSpacing="0.2em" fill={a}>SPEAK FREELY</text>
        <text x="100" y="122" textAnchor="middle" fontFamily="ui-monospace,monospace"
              fontSize="8" letterSpacing="0.3em" fill={c} opacity=".5">[ WELCOME ]</text>
      </g>
    </svg>
  );
}

function IlluJournal({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* journal body — slight angle */}
      <g transform="translate(100 100) rotate(-4) translate(-100 -100)">
        <rect x="50" y="30" width="100" height="140" rx="3" fill={c} fillOpacity=".05" />
        <rect x="50" y="30" width="100" height="140" rx="3" />
        {/* spine */}
        <line x1="50" y1="30" x2="50" y2="170" />
        <line x1="54" y1="34" x2="54" y2="166" opacity=".4" />
        {/* binding */}
        <g stroke={c} opacity=".5">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="58" y1={42 + i * 22} x2="62" y2={42 + i * 22} />
          ))}
        </g>
        {/* title block */}
        <rect x="68" y="50" width="68" height="2" fill={c} stroke="none" />
        <text x="68" y="74" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600"
              letterSpacing="0.16em" fill={c}>VOICE</text>
        <text x="68" y="90" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600"
              letterSpacing="0.16em" fill={c}>JOURNAL</text>
        {/* lines */}
        <g stroke={c} opacity=".25">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="68" y1={118 + i * 8} x2="132" y2={118 + i * 8} />
          ))}
        </g>
        {/* bookmark */}
        <path d="M124 30 L124 60 L132 54 L140 60 L140 30" fill={a} stroke={a} />
      </g>
    </svg>
  );
}

function IlluKeychain({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* ring */}
      <circle cx="56" cy="60" r="22" />
      <circle cx="56" cy="60" r="14" opacity=".4" />
      {/* chain */}
      <g opacity=".7">
        <circle cx="80" cy="78" r="3.5" />
        <circle cx="92" cy="92" r="3.5" />
        <circle cx="104" cy="106" r="3.5" />
      </g>
      {/* mic body */}
      <g transform="translate(116 116)">
        <rect x="0" y="0" width="36" height="56" rx="18" stroke={a} fill={a} fillOpacity=".1" />
        <line x1="6" y1="14" x2="30" y2="14" stroke={a} opacity=".6" />
        <line x1="6" y1="22" x2="30" y2="22" stroke={a} opacity=".6" />
        <line x1="6" y1="30" x2="30" y2="30" stroke={a} opacity=".6" />
      </g>
      <path d="M108 152 Q108 168 134 168 Q160 168 160 152" stroke={a} />
      <line x1="134" y1="168" x2="134" y2="180" stroke={a} />
      <line x1="124" y1="180" x2="144" y2="180" stroke={a} />
    </svg>
  );
}

function IlluCandle({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* jar */}
      <path d="M58 70 L58 170 Q58 178 66 178 L134 178 Q142 178 142 170 L142 70 Z" />
      <ellipse cx="100" cy="70" rx="42" ry="6" />
      {/* wax line */}
      <line x1="58" y1="88" x2="142" y2="88" opacity=".4" />
      {/* label */}
      <rect x="70" y="108" width="60" height="40" stroke={c} opacity=".6" />
      <text x="100" y="124" textAnchor="middle" fontFamily="Inter,sans-serif"
            fontSize="9" letterSpacing="0.2em" fill={c}>IDLE</text>
      <text x="100" y="138" textAnchor="middle" fontFamily="ui-monospace,monospace"
            fontSize="6" letterSpacing="0.18em" fill={c} opacity=".5">AMBER · TOBACCO · OAK</text>
      {/* wick */}
      <line x1="100" y1="70" x2="100" y2="46" />
      {/* flame */}
      <path d="M100 46 Q92 38 100 22 Q108 38 100 46 Z" fill={a} stroke={a} />
      <path d="M100 42 Q96 36 100 28 Q104 36 100 42 Z" fill="#fff8e0" stroke="none" opacity=".8" />
      {/* glow */}
      <circle cx="100" cy="30" r="20" fill={a} opacity=".06" stroke="none" />
    </svg>
  );
}

/* ---------- products ---------- */
const PRODUCTS = [
  {
    id: 'whisper-bell',
    name: 'Whisper Bell',
    sub: 'Brass desk bell',
    price: 28,
    illu: IlluBell,
    category: 'Objects',
    badge: 'NEW',
    tagline: 'Ring once. The agent picks up the call.',
    blurb: 'A solid brass concierge bell, polished to a mirror finish. We hand it to every founder we onboard — when your website finally has a voice, you may as well have a way to summon it.',
    variants: { Finish: ['Brass', 'Matte black'], Engraving: ['None', 'Custom 12 ch'] },
    spec: ['Solid brass, 78 mm dome', 'Felt-lined hardwood base', 'Weighs 240 g', 'Boxed in matchbook sleeve'],
    ships: '2–3 business days',
  },
  {
    id: 'hello-hoodie',
    name: 'Hello Hoodie',
    sub: 'Heavyweight 14oz fleece',
    price: 92,
    illu: IlluHoodie,
    category: 'Apparel',
    badge: 'BESTSELLER',
    tagline: 'For sitting in the same chair for 14 hours.',
    blurb: 'Cut from 14oz brushed-back fleece, dyed in small lots. Embroidered F on the chest, "[ tryfoyer.ai ]" on the back collar. Runs slightly oversized — size down for a closer fit.',
    variants: { Size: ['XS', 'S', 'M', 'L', 'XL', '2XL'], Color: ['Ink', 'Bone', 'Amber'] },
    spec: ['14oz brushed-back fleece', 'Embroidered chest mark', 'Heavy-gauge metal eyelets', 'Sewn-in care label'],
    ships: '5–7 business days',
  },
  {
    id: 'static-mug',
    name: 'Static Mug',
    sub: 'Stoneware espresso, 4oz',
    price: 22,
    illu: IlluMug,
    category: 'Objects',
    tagline: 'Cup of dark roast. Cup of quiet.',
    blurb: 'Thrown in small batches, glazed in matte ink. Each mug carries a slightly raised mic-grille pattern on one side — you can feel it through the glaze.',
    variants: { Glaze: ['Ink', 'Bone', 'Amber'] },
    spec: ['Stoneware, 4oz', 'Hand-thrown, slight variation', 'Dishwasher safe', 'Microwave safe'],
    ships: '3–5 business days',
  },
  {
    id: 'listening-tee',
    name: 'Listening Tee',
    sub: 'Garment-dyed midweight',
    price: 36,
    illu: IlluTee,
    category: 'Apparel',
    tagline: 'A graphic that pulses when you stand near a speaker.',
    blurb: 'Midweight 7oz cotton, garment-dyed. Front carries the listening-ring graphic in screen-printed amber ink that catches the light at an angle.',
    variants: { Size: ['XS', 'S', 'M', 'L', 'XL'], Color: ['Ink', 'Cement', 'Bone'] },
    spec: ['7oz combed cotton', 'Garment-dyed for soft hand', 'Water-based ink', 'Boxy unisex fit'],
    ships: '3–5 business days',
  },
  {
    id: 'state-pins',
    name: 'State Pins',
    sub: 'Enamel trio — idle / listening / speaking',
    price: 14,
    illu: IlluPins,
    category: 'Objects',
    badge: 'NEW',
    tagline: 'Three states. Wear yours.',
    blurb: 'Hard enamel pins, 22 mm diameter, in a foil-stamped envelope. Pin them to a bag, a denim jacket, a corkboard. One looks great, three look better.',
    variants: { Set: ['Full trio', 'Listening only', 'Speaking only'] },
    spec: ['22 mm hard enamel', 'Polished brass plating', 'Rubber clutch backs', 'Foil-stamped envelope'],
    ships: '2–3 business days',
  },
  {
    id: 'wordmark-cap',
    name: 'Wordmark Cap',
    sub: 'Six-panel unstructured',
    price: 38,
    illu: IlluCap,
    category: 'Apparel',
    tagline: 'Soft-front, low-profile, mostly worn backwards.',
    blurb: 'A washed cotton six-panel with a small embroidered F at center front. Antique-brass buckle closure. Breaks in after a week and softens forever.',
    variants: { Color: ['Ink', 'Bone', 'Olive'] },
    spec: ['100% washed cotton twill', 'Unstructured crown', 'Antique-brass adjuster', 'One size fits most'],
    ships: '3–5 business days',
  },
  {
    id: 'echo-stickers',
    name: 'Echo Sticker Pack',
    sub: 'Six die-cut vinyl',
    price: 9,
    illu: IlluStickers,
    category: 'Paper',
    tagline: 'Stick them on the laptop. The agent already lives in there.',
    blurb: 'Six die-cut weatherproof vinyl stickers: bracketed wordmark, mic glyph, speech bubble, idle ring, listening ring, and an amber squiggle. Slipped into a chipboard envelope.',
    variants: { Pack: ['Standard 6', 'Double pack 12'] },
    spec: ['Weatherproof vinyl', 'Matte laminate', 'Cut-to-shape', 'Indoor + outdoor'],
    ships: '2–3 business days',
  },
  {
    id: 'welcome-mat',
    name: 'Welcome Mat',
    sub: 'Coir, 24 × 16 in',
    price: 44,
    illu: IlluMat,
    category: 'Home',
    tagline: 'The most obvious gift for a launch.',
    blurb: 'Heavy coir-fiber doormat, ink-screened with the line we say back to every visitor. Goes on a porch, in an office vestibule, or in front of a server rack — your call.',
    variants: { Size: ['Standard', 'Long runner'] },
    spec: ['Natural coir fiber', 'Anti-slip vinyl backing', '24 × 16 in', 'Hose-rinse clean'],
    ships: '5–7 business days',
  },
  {
    id: 'voice-journal',
    name: 'Voice Journal',
    sub: 'Softcover notebook, 192 pp',
    price: 24,
    illu: IlluJournal,
    category: 'Paper',
    tagline: 'For the things the agent will never hear you say.',
    blurb: 'Otabind softcover, 192 dot-grid pages, 100 gsm ivory paper. Foil-stamped wordmark on the back. Lays flat to the page, every page.',
    variants: { Cover: ['Ink', 'Bone'], Inside: ['Dot grid', 'Ruled', 'Blank'] },
    spec: ['192 pages, 100 gsm', 'Otabind soft cover', 'Foil-stamped back', '5.5 × 8.25 in'],
    ships: '2–3 business days',
  },
  {
    id: 'mic-keychain',
    name: 'Mic Keychain',
    sub: 'Cast brass, 38 mm',
    price: 18,
    illu: IlluKeychain,
    category: 'Objects',
    tagline: 'Pocketable. Slightly heavy. Pleasingly cold.',
    blurb: 'Sand-cast brass keychain shaped like a vintage broadcast mic. Solid weight in the hand. Comes on a split-ring with a small leather tab debossed with the wordmark.',
    variants: { Finish: ['Polished brass', 'Antique brass'] },
    spec: ['Sand-cast brass', '38 mm body', 'Leather tab', '25 mm split-ring'],
    ships: '2–3 business days',
  },
  {
    id: 'idle-candle',
    name: 'Idle Candle',
    sub: '9oz amber + tobacco + oak',
    price: 36,
    illu: IlluCandle,
    category: 'Home',
    tagline: 'Burns for the length of one strategy call.',
    blurb: 'Soy-coconut wax in a re-usable amber glass. Notes of tobacco leaf, oak resin, and warm orange peel. 48-hour burn time. Re-fillable.',
    variants: { Size: ['9oz', '14oz'], Scent: ['Idle', 'Listening', 'Speaking'] },
    spec: ['Soy-coconut wax blend', 'Cotton wick', '48-hour burn (9oz)', 'Refillable amber glass'],
    ships: '3–5 business days',
  },
  {
    id: 'founders-tote',
    name: "Founders' Tote",
    sub: 'Heavyweight canvas',
    price: 28,
    illu: IlluHoodie, // reuse shape via different draw? we'll skip a unique one and reuse the hoodie illu mapped lightly
    category: 'Apparel',
    tagline: "Hauls the laptop, the wires, the launch-day jitters.",
    blurb: 'A 16oz natural canvas tote with reinforced cotton webbing handles and a screen-printed bracketed wordmark. Big enough for a 16" laptop plus a hardback book.',
    variants: { Color: ['Natural', 'Ink'] },
    spec: ['16oz natural canvas', 'Reinforced webbing handles', '15 × 16 × 4 in', 'Interior pocket'],
    ships: '3–5 business days',
  },
];

/* swap tote to use a tote-shaped illustration */
function IlluTote({ accent, color }) {
  const c = color || 'var(--fg)';
  const a = accent || 'var(--amber)';
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"
         stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* bag body */}
      <path d="M48 78 L52 174 Q52 180 58 180 L142 180 Q148 180 148 174 L152 78 Z" />
      {/* handles */}
      <path d="M72 78 Q72 38 100 38 Q128 38 128 78" />
      <path d="M80 78 Q80 46 100 46 Q120 46 120 78" opacity=".5" />
      {/* stitch line */}
      <line x1="52" y1="92" x2="148" y2="92" opacity=".4" />
      {/* bracketed wordmark */}
      <text x="100" y="138" textAnchor="middle" fontFamily="ui-monospace,monospace"
            fontSize="11" letterSpacing="0.2em" fill={a}>[ FOYER ]</text>
      <line x1="76" y1="148" x2="124" y2="148" stroke={a} opacity=".5" />
    </svg>
  );
}
PRODUCTS[PRODUCTS.length - 1].illu = IlluTote;

const CATEGORIES = ['All', 'Apparel', 'Objects', 'Paper', 'Home'];

Object.assign(window, {
  PRODUCTS, CATEGORIES,
  IlluHoodie, IlluBell, IlluMug, IlluTee, IlluPins, IlluCap,
  IlluStickers, IlluMat, IlluJournal, IlluKeychain, IlluCandle, IlluTote,
});
