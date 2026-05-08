export const GAME_CONFIG = Object.freeze({
  title: 'Greek Mythology Guesser',
  rounds: 10,
  secondsPerRound: 30,
  minPlayers: 1,
  maxPlayers: 4
});

export const MYTH_FIGURES = Object.freeze([
  {
    id: 'hyperion',
    name: 'Hyperion',
    kind: 'Titan',
    epithet: 'Titan of heavenly light',
    symbol: '☀',
    colors: ['#f6c85f', '#d98c21', '#4d2c12'],
    image: './assets/deities/hyperion.svg',
    clue:
      'This elder Titan is linked with watchfulness, heavenly light, and the blazing path of the sun. In myth he is the father of Helios, Selene, and Eos, making him part of the family behind daylight, moonlight, and dawn.'
  },
  {
    id: 'crius',
    name: 'Crius',
    kind: 'Titan',
    epithet: 'Titan of constellations',
    symbol: '✦',
    colors: ['#9b7ede', '#26335f', '#0d1028'],
    image: './assets/deities/crius.svg',
    clue:
      'This lesser-known elder Titan is associated with the southern pillar of the sky, starry measures, and the ordering of constellations. He is often remembered through his children Astraeus, Pallas, and Perses.'
  },
  {
    id: 'kronos',
    name: 'Kronos',
    kind: 'Titan',
    epithet: 'Titan ruler of the Golden Age',
    symbol: '♄',
    colors: ['#c9b037', '#705d21', '#1f1b12'],
    image: './assets/deities/kronos.svg',
    clue:
      'This Titan overthrew his father with a sickle, ruled before the Olympians, and swallowed several of his children because he feared a prophecy. His son Zeus eventually forced him to give them back.'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    kind: 'Titan',
    epithet: 'Bearer of the heavens',
    symbol: '◎',
    colors: ['#73a5c6', '#365c7d', '#182b3a'],
    image: './assets/deities/atlas.svg',
    clue:
      'After the Titan war, this mighty figure was punished by having to hold up the sky. He is often pictured straining beneath a celestial sphere at the far western edge of the world.'
  },
  {
    id: 'rhea',
    name: 'Rhea',
    kind: 'Titaness',
    epithet: 'Mother of the Olympians',
    symbol: '◇',
    colors: ['#cf8fb3', '#7f4d7e', '#2e1831'],
    image: './assets/deities/rhea.svg',
    clue:
      'This Titaness is the mother of Zeus, Poseidon, Hades, Hera, Demeter, and Hestia. To save her youngest child from Kronos, she hid the baby and gave Kronos a stone wrapped like an infant.'
  },
  {
    id: 'iapetus',
    name: 'Iapetus',
    kind: 'Titan',
    epithet: 'Titan ancestor of mortals',
    symbol: '▱',
    colors: ['#8aa08a', '#4e644e', '#1b2f23'],
    image: './assets/deities/iapetus.svg',
    clue:
      'This elder Titan is best remembered as the father of Prometheus, Epimetheus, Atlas, and Menoetius. Through his family line he is strongly connected with the fate and struggles of humankind.'
  },
  {
    id: 'oceanus',
    name: 'Oceanus',
    kind: 'Titan',
    epithet: 'Titan of the world river',
    symbol: '≈',
    colors: ['#57c4d8', '#1b7898', '#0a2b43'],
    image: './assets/deities/oceanus.svg',
    clue:
      'This ancient Titan personifies the great river believed to encircle the world. He and Tethys are parents of many river gods and Oceanids, tying him to the deep waters around the earth.'
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    kind: 'Titan',
    epithet: 'Champion of humankind',
    symbol: '🔥',
    colors: ['#ff8a4c', '#b6312a', '#2b1111'],
    image: './assets/deities/prometheus.svg',
    clue:
      'This clever Titan tricked Zeus and stole fire to help mortals. For that gift to humanity, Zeus had him chained to a rock where an eagle came each day to torment him.'
  },
  {
    id: 'gaia',
    name: 'Gaia',
    kind: 'Primordial deity',
    epithet: 'Earth itself',
    symbol: '◌',
    colors: ['#7ac77a', '#3e7c45', '#18351f'],
    image: './assets/deities/gaia.svg',
    clue:
      'This primordial goddess is the living Earth. She gives birth to mountains, seas, and sky, and she is an ancestor of Titans, giants, and many divine families in Greek myth.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    kind: 'Primordial deity',
    epithet: 'The starry sky',
    symbol: '✧',
    colors: ['#76a4ff', '#233a83', '#090e2b'],
    image: './assets/deities/uranus.svg',
    clue:
      'This primordial sky god is the partner of Gaia and father of the Titans. His harsh rule ends when Kronos attacks him, separating sky from earth and opening the age of the Titans.'
  },
  {
    id: 'zeus',
    name: 'Zeus',
    kind: 'Olympian god',
    epithet: 'Lord of thunder',
    symbol: '⚡',
    colors: ['#f7f0a2', '#5874c5', '#1d275c'],
    image: './assets/deities/zeus.svg',
    clue:
      'This Olympian king rules the sky, thunder, lightning, law, and oaths. He defeated Kronos, led the gods from Mount Olympus, and is famous for carrying the thunderbolt.'
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    kind: 'Olympian god',
    epithet: 'Earth-shaking sea lord',
    symbol: '♆',
    colors: ['#54d3c2', '#176c8a', '#072f44'],
    image: './assets/deities/poseidon.svg',
    clue:
      'This Olympian rules the sea, storms, earthquakes, and horses. His symbol is the trident, and sailors feared or honored him whenever the waves grew wild.'
  },
  {
    id: 'hades',
    name: 'Hades',
    kind: 'Olympian god',
    epithet: 'Ruler of the underworld',
    symbol: '☾',
    colors: ['#8d7dc7', '#3d315f', '#120f21'],
    image: './assets/deities/hades.svg',
    clue:
      'This god rules the underworld and the realm of the dead. He is not the same as death itself, but he guards the hidden kingdom below and owns a helmet linked with invisibility.'
  },
  {
    id: 'hestia',
    name: 'Hestia',
    kind: 'Olympian goddess',
    epithet: 'Keeper of the hearth',
    symbol: '◍',
    colors: ['#ffd08a', '#c46a39', '#40231b'],
    image: './assets/deities/hestia.svg',
    clue:
      'This gentle Olympian goddess protects the hearth, home, family fire, and hospitality. Every household flame and public hearth could be treated as sacred to her.'
  },
  {
    id: 'demeter',
    name: 'Demeter',
    kind: 'Olympian goddess',
    epithet: 'Giver of grain',
    symbol: '✤',
    colors: ['#e4c94f', '#6ea34f', '#28391f'],
    image: './assets/deities/demeter.svg',
    clue:
      'This goddess rules grain, farming, harvest, and fertile fields. When her daughter Persephone is taken to the underworld, her grief helps explain the changing seasons.'
  },
  {
    id: 'hera',
    name: 'Hera',
    kind: 'Olympian goddess',
    epithet: 'Queen of Olympus',
    symbol: '◉',
    colors: ['#d8c1ff', '#7750b5', '#2d1b4f'],
    image: './assets/deities/hera.svg',
    clue:
      'This Olympian queen is linked with marriage, queenship, and family authority. She is the wife of Zeus and is often associated with the peacock and royal dignity.'
  },
  {
    id: 'dionysus',
    name: 'Dionysus',
    kind: 'Olympian god',
    epithet: 'Lord of revelry',
    symbol: '🍇',
    colors: ['#b062c7', '#5a2d82', '#20122d'],
    image: './assets/deities/dionysus.svg',
    clue:
      'This joyful and dangerous god is tied to wine, theater, ecstasy, vines, and wild celebration. His followers might carry ivy or a thyrsus in ecstatic festivals.'
  },
  {
    id: 'ares',
    name: 'Ares',
    kind: 'Olympian god',
    epithet: 'God of battle fury',
    symbol: '♂',
    colors: ['#f05a4f', '#8e2020', '#2b0e0e'],
    image: './assets/deities/ares.svg',
    clue:
      'This Olympian represents the brutal, noisy side of war: rage, bloodshed, and battle frenzy. Unlike Athena’s strategy, his power is raw violence and battlefield chaos.'
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    kind: 'Olympian god',
    epithet: 'Divine smith',
    symbol: '⚒',
    colors: ['#ffb15e', '#8f4e23', '#27150d'],
    image: './assets/deities/hephaestus.svg',
    clue:
      'This god is the master blacksmith of Olympus, maker of divine armor, clever machines, and beautiful metalwork. His forge, hammer, and fire mark his craft.'
  },
  {
    id: 'aphrodite',
    name: 'Aphrodite',
    kind: 'Olympian goddess',
    epithet: 'Goddess of love and beauty',
    symbol: '♡',
    colors: ['#ffb4c8', '#cc5f91', '#3d1730'],
    image: './assets/deities/aphrodite.svg',
    clue:
      'This goddess rules love, beauty, desire, and attraction. Myths connect her with sea foam, roses, doves, and the power to make gods and mortals fall in love.'
  },
  {
    id: 'athena',
    name: 'Athena',
    kind: 'Olympian goddess',
    epithet: 'Wise strategist',
    symbol: '🦉',
    colors: ['#b9c7d6', '#50677f', '#1d2835'],
    image: './assets/deities/athena.svg',
    clue:
      'This goddess sprang from Zeus’s head and rules wisdom, crafts, strategy, and just warfare. Her symbols include the owl, olive tree, shield, and aegis.'
  },
  {
    id: 'artemis',
    name: 'Artemis',
    kind: 'Olympian goddess',
    epithet: 'Mistress of the hunt',
    symbol: '☽',
    colors: ['#a9e7dc', '#3e8c80', '#153c3d'],
    image: './assets/deities/artemis.svg',
    clue:
      'This goddess protects wild animals, the hunt, young people, and moonlit wilderness. She is Apollo’s twin sister and is often shown with a bow and deer.'
  },
  {
    id: 'apollo',
    name: 'Apollo',
    kind: 'Olympian god',
    epithet: 'God of music and prophecy',
    symbol: '☼',
    colors: ['#ffe17c', '#e08c2f', '#3b2413'],
    image: './assets/deities/apollo.svg',
    clue:
      'This Olympian is tied to prophecy, music, healing, archery, poetry, and radiant order. His oracle at Delphi and his lyre are among his most famous signs.'
  },
  {
    id: 'hermes',
    name: 'Hermes',
    kind: 'Olympian god',
    epithet: 'Swift messenger',
    symbol: '☤',
    colors: ['#d2e7ff', '#4e7fc3', '#142849'],
    image: './assets/deities/hermes.svg',
    clue:
      'This quick-witted god is the messenger of Olympus, guide of travelers, tricksters, merchants, and souls. Winged sandals and the caduceus often point to him.'
  }
]);

export const REQUIRED_NAMES = Object.freeze(MYTH_FIGURES.map((figure) => figure.name));

