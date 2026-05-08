import { mkdir, writeFile } from 'node:fs/promises';
import { MYTH_FIGURES } from '../src/data.js';

const DEITY_DIR = new URL('../assets/deities/', import.meta.url);
const UI_DIR = new URL('../assets/ui/', import.meta.url);

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function deitySvg(figure, index) {
  const [light, mid, dark] = figure.colors;
  const motifRotation = (index * 23) % 360;
  const pillarOpacity = figure.kind.includes('Titan') ? 0.42 : 0.28;
  const starOpacity = figure.kind.includes('Primordial') ? 0.8 : 0.48;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img">
  <title>${escapeXml(figure.name)} mythology portrait asset</title>
  <defs>
    <radialGradient id="aura" cx="50%" cy="34%" r="72%">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="58%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" x2="100%">
      <stop offset="0%" stop-color="#fff2b7"/>
      <stop offset="48%" stop-color="#d9a441"/>
      <stop offset="100%" stop-color="#7c4b16"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="13" flood-color="#000000" flood-opacity="0.36"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="56" fill="url(#aura)"/>
  <g opacity="${pillarOpacity}">
    <path d="M70 418h372v38H70z" fill="#fff6ca"/>
    <path d="M96 156h44v248H96zM372 156h44v248h-44z" fill="#fff6ca"/>
    <path d="M76 128h360l-24 34H100z" fill="#fff6ca"/>
  </g>
  <g transform="rotate(${motifRotation} 256 256)" opacity="${starOpacity}">
    <path d="M256 38l16 56 55-18-30 50 48 33-58 6 5 59-36-47-36 47 5-59-58-6 48-33-30-50 55 18z" fill="#ffffff"/>
    <circle cx="104" cy="245" r="10" fill="#ffffff"/>
    <circle cx="409" cy="279" r="8" fill="#ffffff"/>
    <circle cx="356" cy="101" r="7" fill="#ffffff"/>
  </g>
  <circle cx="256" cy="262" r="158" fill="#11162f" opacity="0.38"/>
  <circle cx="256" cy="250" r="139" fill="none" stroke="url(#gold)" stroke-width="14"/>
  <g filter="url(#shadow)">
    <path d="M174 372c14-70 47-108 82-108s68 38 82 108z" fill="#f8dfac"/>
    <circle cx="256" cy="204" r="67" fill="#ffe0ac"/>
    <path d="M188 204c8-64 45-98 76-98 42 0 76 42 76 98-40-25-94-24-152 0z" fill="${dark}"/>
    <path d="M166 380c24-44 54-70 90-70s66 26 90 70z" fill="${mid}"/>
    <circle cx="230" cy="204" r="8" fill="#2d1e19"/>
    <circle cx="282" cy="204" r="8" fill="#2d1e19"/>
    <path d="M229 237c20 16 38 16 58 0" fill="none" stroke="#7e4931" stroke-width="8" stroke-linecap="round"/>
  </g>
  <circle cx="256" cy="112" r="56" fill="url(#gold)" opacity="0.96"/>
  <text x="256" y="132" text-anchor="middle" font-size="58" font-family="Georgia, 'Times New Roman', serif" font-weight="900" fill="#231707">${escapeXml(figure.symbol)}</text>
  <path d="M77 450c96-26 262-26 358 0" fill="none" stroke="#ffe9a8" stroke-width="6" opacity="0.68" stroke-linecap="round"/>
</svg>
`;
}

const uiAssets = {
  'mystery-scroll.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img">
  <title>Mystery scroll</title>
  <defs>
    <linearGradient id="paper" x1="0%" x2="100%">
      <stop offset="0%" stop-color="#e5b96a"/>
      <stop offset="18%" stop-color="#fff1c8"/>
      <stop offset="82%" stop-color="#f6d68e"/>
      <stop offset="100%" stop-color="#a66d27"/>
    </linearGradient>
  </defs>
  <rect x="112" y="70" width="288" height="372" rx="28" fill="url(#paper)"/>
  <path d="M112 94c-54 0-54 72 0 72h36V94zM400 346h-36v72h36c54 0 54-72 0-72z" fill="#c88735"/>
  <path d="M158 150h196M158 204h196M158 258h196M158 312h124" stroke="#8a5921" stroke-width="16" stroke-linecap="round" opacity=".34"/>
  <circle cx="256" cy="252" r="82" fill="#151329" opacity=".1"/>
  <text x="256" y="289" text-anchor="middle" font-size="120" font-family="Georgia, serif" font-weight="900" fill="#704318">?</text>
</svg>`,
  'laurel-wreath.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img">
  <title>Golden laurel wreath</title>
  <defs>
    <linearGradient id="leaf" x1="0%" x2="100%">
      <stop offset="0%" stop-color="#fff4a6"/>
      <stop offset="60%" stop-color="#d5a536"/>
      <stop offset="100%" stop-color="#7b5218"/>
    </linearGradient>
  </defs>
  <circle cx="256" cy="256" r="150" fill="none" stroke="#6d4918" stroke-width="12" opacity=".5"/>
  <g fill="url(#leaf)">
    ${Array.from({ length: 15 }, (_, i) => {
      const y = 398 - i * 22;
      const x = 172 - Math.sin(i / 2) * 48;
      const rotate = -58 + i * 3;
      const rightX = 512 - x;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y}" rx="19" ry="42" transform="rotate(${rotate} ${x.toFixed(1)} ${y})"/><ellipse cx="${rightX.toFixed(1)}" cy="${y}" rx="19" ry="42" transform="rotate(${-rotate} ${rightX.toFixed(1)} ${y})"/>`;
    }).join('')}
  </g>
  <path d="M145 404c63 52 159 52 222 0" fill="none" stroke="#d5a536" stroke-width="16" stroke-linecap="round"/>
  <path d="M220 416l36 52 36-52" fill="#c88e2f"/>
</svg>`,
  'olympus-sky.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#18244f"/>
      <stop offset="48%" stop-color="#41316f"/>
      <stop offset="100%" stop-color="#101226"/>
    </linearGradient>
    <radialGradient id="sun" cx="54%" cy="22%" r="46%">
      <stop offset="0%" stop-color="#ffe7a1" stop-opacity=".76"/>
      <stop offset="70%" stop-color="#e59f49" stop-opacity=".09"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#sky)"/>
  <rect width="1600" height="1000" fill="url(#sun)"/>
  <path d="M0 610c150-70 258-56 388-108 108-44 208-136 322-112 76 16 124 92 204 96 111 5 182-129 298-114 117 15 177 164 388 106v522H0z" fill="#0d112a" opacity=".84"/>
  <path d="M0 708c200-52 328-22 490-78 130-45 232-112 350-71 91 32 157 101 269 76 147-33 268-133 491-46v411H0z" fill="#141a3f"/>
  <g fill="#fff8d8" opacity=".32">
    <circle cx="180" cy="118" r="5"/><circle cx="1290" cy="160" r="4"/><circle cx="1080" cy="94" r="3"/><circle cx="714" cy="142" r="4"/><circle cx="1454" cy="244" r="5"/>
  </g>
</svg>`,
  'main-menu-pediment.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 260" role="img">
  <title>Greek temple pediment</title>
  <defs>
    <linearGradient id="stone" x1="0%" x2="100%">
      <stop offset="0%" stop-color="#fff7d7"/>
      <stop offset="55%" stop-color="#d8c18d"/>
      <stop offset="100%" stop-color="#8d7347"/>
    </linearGradient>
  </defs>
  <path d="M40 142L360 34l320 108z" fill="url(#stone)"/>
  <rect x="76" y="142" width="568" height="32" fill="#b99254"/>
  <rect x="104" y="174" width="512" height="34" fill="url(#stone)"/>
  <g fill="#f7e9bd">
    <rect x="134" y="198" width="54" height="54"/><rect x="258" y="198" width="54" height="54"/><rect x="408" y="198" width="54" height="54"/><rect x="532" y="198" width="54" height="54"/>
  </g>
  <circle cx="360" cy="116" r="42" fill="#805b25" opacity=".45"/>
  <path d="M360 82l10 26h28l-22 17 9 26-25-16-25 16 9-26-22-17h28z" fill="#ffe69c"/>
</svg>`,
  'score-token.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
  <title>Bronze score token</title>
  <defs><radialGradient id="coin"><stop offset="0%" stop-color="#fff2a8"/><stop offset="70%" stop-color="#d99831"/><stop offset="100%" stop-color="#724312"/></radialGradient></defs>
  <circle cx="64" cy="64" r="58" fill="url(#coin)"/>
  <circle cx="64" cy="64" r="43" fill="none" stroke="#7a4b16" stroke-width="6" opacity=".55"/>
  <text x="64" y="83" text-anchor="middle" font-size="58" font-family="Georgia, serif" font-weight="900" fill="#3b240b">Ω</text>
</svg>`,
  'timer-hourglass.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
  <title>Hourglass timer</title>
  <path d="M34 10h60M34 118h60" stroke="#ffe7a3" stroke-width="12" stroke-linecap="round"/>
  <path d="M42 18c0 28 15 34 28 46-13 12-28 18-28 46h44c0-28-15-34-28-46 13-12 28-18 28-46z" fill="#251d3c" stroke="#d59a32" stroke-width="8"/>
  <path d="M52 32h24c-3 11-9 18-12 22-3-4-9-11-12-22zM64 76c10 8 17 16 18 27H46c1-11 8-19 18-27z" fill="#ffe29a"/>
</svg>`,
  'answer-scroll.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220" role="img">
  <title>Answer scroll accent</title>
  <path d="M44 30h272v160H44z" fill="#f5d68c" opacity=".36"/>
  <path d="M64 70h232M64 112h180M64 154h216" stroke="#8b5c25" stroke-width="14" stroke-linecap="round" opacity=".25"/>
  <path d="M44 30c-42 0-42 54 0 54h36V30zM316 136h-36v54h36c42 0 42-54 0-54z" fill="#d49a3a" opacity=".5"/>
</svg>`,
  'player-token.svg': `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img">
  <title>Player hero token</title>
  <circle cx="64" cy="64" r="58" fill="#243565"/>
  <path d="M34 105c7-25 18-38 30-38s23 13 30 38z" fill="#f3d29b"/>
  <circle cx="64" cy="47" r="24" fill="#ffdca7"/>
  <path d="M40 48c6-24 24-34 48-18 2 7 0 15-4 22-15-10-29-11-44-4z" fill="#34231a"/>
  <path d="M32 110h64" stroke="#d9a33b" stroke-width="8" stroke-linecap="round"/>
</svg>`
};

await mkdir(DEITY_DIR, { recursive: true });
await mkdir(UI_DIR, { recursive: true });

await Promise.all(
  MYTH_FIGURES.map((figure, index) => writeFile(new URL(`${figure.id}.svg`, DEITY_DIR), deitySvg(figure, index)))
);

await Promise.all(
  Object.entries(uiAssets).map(([fileName, svg]) => writeFile(new URL(fileName, UI_DIR), `${svg}\n`))
);

console.log(`Generated ${MYTH_FIGURES.length} deity portraits and ${Object.keys(uiAssets).length} UI assets.`);

