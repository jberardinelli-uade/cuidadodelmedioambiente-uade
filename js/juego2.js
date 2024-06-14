document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');

    // Crear el array de cartas con imágenes y audios
    const cardsArray = [
        {name: 'card1', img: 'img/pulmon_verde.png', audio: 'audio/pulmon_verde.mp3'},
        {name: 'card1', img: 'img/pulmon_verde.png', audio: 'audio/pulmon_verde.mp3'},
        {name: 'card2', img: 'img/reunion_por_el_planeta.png', audio: 'audio/card2.mp3'},
        {name: 'card2', img: 'img/reunion_por_el_planeta.png', audio: 'audio/card2.mp3'},
        {name: 'card3', img: 'img/tres_erres.png', audio: 'audio/card3.mp3'},
        {name: 'card3', img: 'img/tres_erres.png', audio: 'audio/card3.mp3'},
        {name: 'card4', img: 'img/ahorro_de_energia.png', audio: 'audio/card4.mp3'},
        {name: 'card4', img: 'img/ahorro_de_energia.png', audio: 'audio/card4.mp3'},
        {name: 'card5', img: 'img/dia_mundial_del_agua.png', audio: 'audio/card5.mp3'},
        {name: 'card5', img: 'img/dia_mundial_del_agua.png', audio: 'audio/card5.mp3'},
        {name: 'card6', img: 'img/moda_circular.png', audio: 'audio/card6.mp3'},
        {name: 'card6', img: 'img/moda_circular.png', audio: 'audio/card6.mp3'},
        {name: 'card7', img: 'img/residuos_electronicos.png', audio: 'audio/card7.mp3'},
        {name: 'card7', img: 'img/residuos_electronicos.png', audio: 'audio/card7.mp3'},
        {name: 'card8', img: 'img/composta.png', audio: 'audio/card8.mp3'},
        {name: 'card8', img: 'img/composta.png', audio: 'audio/card8.mp3'}
    ];

    // Barajar las cartas
    cardsArray.sort(() => 0.5 - Math.random());

    // Crear las cartas en el tablero de juego
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardName = card.name;
        cardElement.dataset.cardAudio = card.audio;
        cardElement.style.backgroundImage = `url(${card.img})`;
        cardElement.innerHTML = `<div class="back"></div>`;
        gameBoard.appendChild(cardElement);
    });

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function playAudio(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
    }

    function checkForMatch() {
        if (firstCard.dataset.cardName === secondCard.dataset.cardName) {
            playAudio(firstCard.dataset.cardAudio); // Reproduce el audio del acierto
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
});
