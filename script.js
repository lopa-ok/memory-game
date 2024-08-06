const board = document.getElementById('game-board');
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function initializeBoard() {
    // Shuffle card values
    cardValues.sort(() => Math.random() - 0.5);

    // Create cards
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.textContent = this.dataset.value;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

initializeBoard();
