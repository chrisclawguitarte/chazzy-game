import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { GAME_CONFIG, MYTH_FIGURES, REQUIRED_NAMES } from '../src/data.js';

const expectedNames = [
  'Hyperion',
  'Crius',
  'Kronos',
  'Atlas',
  'Rhea',
  'Iapetus',
  'Oceanus',
  'Prometheus',
  'Gaia',
  'Uranus',
  'Zeus',
  'Poseidon',
  'Hades',
  'Hestia',
  'Demeter',
  'Hera',
  'Dionysus',
  'Ares',
  'Hephaestus',
  'Aphrodite',
  'Athena',
  'Artemis',
  'Apollo',
  'Hermes'
];

assert.equal(GAME_CONFIG.title, 'Greek Mythology Guesser');
assert.equal(GAME_CONFIG.minPlayers, 1);
assert.equal(GAME_CONFIG.maxPlayers, 4);
assert.equal(GAME_CONFIG.secondsPerRound, 30);
assert.equal(GAME_CONFIG.rounds, 10);
assert.equal(MYTH_FIGURES.length, expectedNames.length);
assert.deepEqual(REQUIRED_NAMES, expectedNames);
assert.equal(new Set(MYTH_FIGURES.map((figure) => figure.id)).size, MYTH_FIGURES.length);
assert.equal(new Set(MYTH_FIGURES.map((figure) => figure.name)).size, MYTH_FIGURES.length);

for (const figure of MYTH_FIGURES) {
  assert.ok(figure.clue.length >= 120, `${figure.name} needs a useful clue`);
  assert.match(figure.image, /^\.\/assets\/deities\/[a-z-]+\.svg$/);
  await access(new URL(`../${figure.image.replace('./', '')}`, import.meta.url), constants.R_OK);
}

const gameSource = await readFile(new URL('../src/game.js', import.meta.url), 'utf8');
assert.match(gameSource, /shuffle\(MYTH_FIGURES\)\.slice\(0, GAME_CONFIG\.rounds\)/, 'round deck should be random');
assert.match(gameSource, /setInterval/, 'game should run a visible countdown');
assert.match(gameSource, /awardPoint/, 'game should award points by player name buttons');
assert.match(gameSource, /resetToMenu/, 'game should return to the main menu after results');

const uiAssets = [
  'mystery-scroll.svg',
  'laurel-wreath.svg',
  'olympus-sky.svg',
  'main-menu-pediment.svg',
  'score-token.svg',
  'timer-hourglass.svg',
  'answer-scroll.svg',
  'player-token.svg'
];

for (const asset of uiAssets) {
  await access(new URL(`../assets/ui/${asset}`, import.meta.url), constants.R_OK);
}

console.log('Greek Mythology Guesser data, rules, and asset coverage verified.');

