import { GAME_CONFIG, MYTH_FIGURES } from './data.js';

const setupScreen = document.querySelector('#setup-screen');
const gameScreen = document.querySelector('#game-screen');
const resultScreen = document.querySelector('#result-screen');
const nameFields = document.querySelector('#name-fields');
const startButton = document.querySelector('#start-game');
const roundLabel = document.querySelector('#round-label');
const timerDisplay = document.querySelector('#timer');
const clueKind = document.querySelector('#clue-kind');
const clueText = document.querySelector('#clue-text');
const figureImage = document.querySelector('#figure-image');
const answerPanel = document.querySelector('#answer-panel');
const answerText = document.querySelector('#answer-text');
const revealButton = document.querySelector('#reveal-answer');
const nextRoundButton = document.querySelector('#next-round');
const scoreAward = document.querySelector('#score-award');
const awardButtons = document.querySelector('#award-buttons');
const awardStatus = document.querySelector('#award-status');
const scoreList = document.querySelector('#score-list');
const winnerLine = document.querySelector('#winner-line');
const finalScores = document.querySelector('#final-scores');
const menuCountdown = document.querySelector('#menu-countdown');
const returnMenuButton = document.querySelector('#return-menu');

const state = {
  players: [],
  deck: [],
  roundIndex: 0,
  currentFigure: null,
  timeLeft: GAME_CONFIG.secondsPerRound,
  timerId: null,
  resultTimerId: null,
  resultCountdown: 10,
  pointAwarded: false
};

function showScreen(screen) {
  [setupScreen, gameScreen, resultScreen].forEach((element) => {
    element.classList.toggle('hidden', element !== screen);
  });
}

function clearRoundTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function clearResultTimer() {
  if (state.resultTimerId) {
    clearInterval(state.resultTimerId);
    state.resultTimerId = null;
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function selectedPlayerCount() {
  const checked = document.querySelector('input[name="player-count"]:checked');
  return Number(checked?.value ?? GAME_CONFIG.minPlayers);
}

function renderNameFields(count = selectedPlayerCount()) {
  nameFields.innerHTML = '';

  for (let index = 1; index <= count; index += 1) {
    const label = document.createElement('label');
    label.className = 'name-field';
    label.htmlFor = `player-${index}`;
    label.innerHTML = `
      <span>Player ${index}</span>
      <input id="player-${index}" name="player-${index}" maxlength="18" placeholder="Hero name ${index}" autocomplete="off" />
    `;
    nameFields.append(label);
  }
}

function collectPlayers() {
  return [...nameFields.querySelectorAll('input')].map((input, index) => ({
    id: `player-${index + 1}`,
    name: input.value.trim() || `Player ${index + 1}`,
    score: 0
  }));
}

function renderScores() {
  scoreList.innerHTML = '';

  state.players.forEach((player) => {
    const scoreCard = document.createElement('article');
    scoreCard.className = 'score-card';
    scoreCard.innerHTML = `
      <img src="./assets/ui/score-token.svg" alt="" aria-hidden="true" />
      <span>${player.name}</span>
      <strong>${player.score}</strong>
    `;
    scoreList.append(scoreCard);
  });
}

function renderAwardButtons() {
  awardButtons.innerHTML = '';

  state.players.forEach((player) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'award-button';
    button.textContent = `Point for ${player.name}`;
    button.addEventListener('click', () => awardPoint(player.id));
    awardButtons.append(button);
  });

  const noPoint = document.createElement('button');
  noPoint.type = 'button';
  noPoint.className = 'award-button no-point';
  noPoint.textContent = 'No one got it';
  noPoint.addEventListener('click', () => recordNoPoint());
  awardButtons.append(noPoint);
}

function setAwardButtonsDisabled(disabled) {
  awardButtons.querySelectorAll('button').forEach((button) => {
    button.disabled = disabled;
  });
}

function startGame() {
  clearRoundTimer();
  clearResultTimer();
  state.players = collectPlayers();
  state.deck = shuffle(MYTH_FIGURES).slice(0, GAME_CONFIG.rounds);
  state.roundIndex = 0;
  showScreen(gameScreen);
  renderScores();
  startRound();
}

function startRound() {
  clearRoundTimer();

  if (state.roundIndex >= GAME_CONFIG.rounds) {
    showResults();
    return;
  }

  state.currentFigure = state.deck[state.roundIndex];
  state.timeLeft = GAME_CONFIG.secondsPerRound;
  state.pointAwarded = false;

  roundLabel.textContent = `Round ${state.roundIndex + 1} of ${GAME_CONFIG.rounds}`;
  timerDisplay.textContent = state.timeLeft;
  clueKind.textContent = state.currentFigure.kind;
  clueText.textContent = state.currentFigure.clue;
  figureImage.src = './assets/ui/mystery-scroll.svg';
  figureImage.alt = 'Mystery scroll hiding the answer';
  answerText.textContent = '';
  answerPanel.classList.add('hidden');
  scoreAward.classList.add('hidden');
  awardStatus.textContent = '';
  revealButton.classList.remove('hidden');
  revealButton.disabled = false;
  nextRoundButton.classList.add('hidden');
  nextRoundButton.disabled = true;

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    timerDisplay.textContent = state.timeLeft;

    if (state.timeLeft <= 0) {
      revealAnswer('Time is up!');
    }
  }, 1000);
}

function revealAnswer(reason = 'Answer revealed!') {
  if (!state.currentFigure) return;

  clearRoundTimer();
  timerDisplay.textContent = Math.max(state.timeLeft, 0);
  answerText.textContent = `${state.currentFigure.name} — ${state.currentFigure.epithet}`;
  answerPanel.classList.remove('hidden');
  figureImage.src = state.currentFigure.image;
  figureImage.alt = `${state.currentFigure.name} themed mythology portrait`;
  scoreAward.classList.remove('hidden');
  revealButton.classList.add('hidden');
  revealButton.disabled = true;
  nextRoundButton.classList.remove('hidden');
  nextRoundButton.disabled = true;
  awardStatus.textContent = `${reason} Press a player name to award the point.`;
  renderAwardButtons();
}

function awardPoint(playerId) {
  if (state.pointAwarded) return;
  const player = state.players.find((candidate) => candidate.id === playerId);
  if (!player) return;

  player.score += 1;
  state.pointAwarded = true;
  awardStatus.textContent = `${player.name} earns 1 point!`;
  setAwardButtonsDisabled(true);
  nextRoundButton.disabled = false;
  renderScores();
}

function recordNoPoint() {
  if (state.pointAwarded) return;
  state.pointAwarded = true;
  awardStatus.textContent = 'No point this round. The quest continues!';
  setAwardButtonsDisabled(true);
  nextRoundButton.disabled = false;
}

function nextRound() {
  state.roundIndex += 1;
  startRound();
}

function formatNameList(names) {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`;
}

function showResults() {
  clearRoundTimer();
  showScreen(resultScreen);

  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  const highestScore = sortedPlayers[0]?.score ?? 0;
  const winners = sortedPlayers.filter((player) => player.score === highestScore);
  const winnerNames = formatNameList(winners.map((player) => player.name));
  const wreathText = winners.length === 1 ? 'gets a laurel wreath' : 'get laurel wreaths';

  winnerLine.textContent = `${winnerNames} ${wreathText} with ${highestScore} point${highestScore === 1 ? '' : 's'}!`;
  finalScores.innerHTML = sortedPlayers
    .map(
      (player) => `
        <article class="final-score">
          <span>${player.name}</span>
          <strong>${player.score}</strong>
        </article>
      `
    )
    .join('');

  state.resultCountdown = 10;
  menuCountdown.textContent = `Returning to the main menu in ${state.resultCountdown} seconds.`;
  state.resultTimerId = setInterval(() => {
    state.resultCountdown -= 1;
    menuCountdown.textContent = `Returning to the main menu in ${state.resultCountdown} seconds.`;

    if (state.resultCountdown <= 0) {
      resetToMenu();
    }
  }, 1000);
}

function resetToMenu() {
  clearRoundTimer();
  clearResultTimer();
  state.players = [];
  state.deck = [];
  state.roundIndex = 0;
  state.currentFigure = null;
  renderNameFields();
  showScreen(setupScreen);
}

document.querySelectorAll('input[name="player-count"]').forEach((radio) => {
  radio.addEventListener('change', () => renderNameFields(Number(radio.value)));
});

startButton.addEventListener('click', startGame);
revealButton.addEventListener('click', () => revealAnswer('Answer revealed early!'));
nextRoundButton.addEventListener('click', nextRound);
returnMenuButton.addEventListener('click', resetToMenu);

renderNameFields();
