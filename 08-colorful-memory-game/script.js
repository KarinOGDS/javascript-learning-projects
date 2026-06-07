const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

let cards = [];
let selectedCards = [];
let score = 0;
let gameInterval;
let isChecking = false;

const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('startbtn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function generateCards() {
    gameContainer.innerHTML = '';

    for (const color of cards) {
        const card = document.createElement('div');

        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';

        gameContainer.appendChild(card);
    }
}

function handleCardClick(event) {
    const card = event.target;

    if (
        !card.classList.contains('card') ||
        card.classList.contains('matched') ||
        selectedCards.includes(card) ||
        isChecking
    ) {
        return;
    }

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;

    selectedCards.push(card);

    if (selectedCards.length === 2) {
        isChecking = true;

        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');

        score += 2;

        scoreElement.textContent = `Score: ${score}`;

        if (score === cards.length) {
            clearInterval(gameInterval);

            alert('Congratulations! You won!');

            startButton.disabled = false;
        }
    } else {
        card1.textContent = '?';
        card2.textContent = '?';

        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = [];
    isChecking = false;
}

function startGame() {
    clearInterval(gameInterval);

    score = 0;
    selectedCards = [];
    isChecking = false;

    scoreElement.textContent = 'Score: 0';

    cards = shuffle([...colors, ...colors]);

    generateCards();

    startButton.disabled = true;

    startGameTimer(30);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;

    gameInterval = setInterval(() => {
        timeLeft--;

        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);

            alert('Game Over!');

            startButton.disabled = false;
        }
    }, 1000);
}

gameContainer.addEventListener('click', handleCardClick);

startButton.addEventListener('click', startGame);