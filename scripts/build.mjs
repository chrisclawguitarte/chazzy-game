import { access, cp, mkdir, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { MYTH_FIGURES } from '../src/data.js';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const requiredFiles = [
  'index.html',
  'src/data.js',
  'src/game.js',
  'src/styles.css',
  'assets/ui/mystery-scroll.svg',
  'assets/ui/laurel-wreath.svg',
  'assets/ui/olympus-sky.svg',
  'assets/ui/main-menu-pediment.svg',
  'assets/ui/score-token.svg',
  'assets/ui/timer-hourglass.svg',
  'assets/ui/answer-scroll.svg',
  'assets/ui/player-token.svg',
  ...MYTH_FIGURES.map((figure) => figure.image.replace('./', ''))
];

for (const file of requiredFiles) {
  await access(new URL(file, root), constants.R_OK);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await Promise.all([
  cp(new URL('index.html', root), new URL('index.html', dist)),
  cp(new URL('src', root), new URL('src', dist), { recursive: true }),
  cp(new URL('assets', root), new URL('assets', dist), { recursive: true })
]);

console.log(`Built static game in ${dist.pathname}`);

