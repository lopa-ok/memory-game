const board = document.getElementById('game-board');
const startMenu = document.getElementById('start-menu');

const difficultyLevels = {
    easy: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'],
    medium: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    hard: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O']
};
let cards = [];
let flippedCards = [];
let matchedCards = [];
let isProcessing = false;

function startGame(difficulty) {
    const cardValues = difficultyLevels[difficulty];
    startMenu.style.display = 'none';
    board.className = `game-board ${difficulty}`;
    board.style.display = 'grid';
    initializeBoard(cardValues);
}

function initializeBoard(cardValues) {
    // Shuffle card values
    cardValues.sort(() => Math.random() - 0.5);

    // Create cards
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = value;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (isProcessing || flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        isProcessing = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    flippedCards = [];
    isProcessing = false;

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}
