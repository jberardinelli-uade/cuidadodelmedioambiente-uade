document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game');
    const gameOverlay = document.getElementById('game-overlay');
    const startButton = document.getElementById('start-button');
    const messageContainer = document.getElementById('message');
    const totalItems = 15;
    let itemsRemoved = 0;

    function startGame() {
        gameOverlay.style.display = 'none';
        initializeGame();
    }

    function createRandomPosition() {
        const x = Math.floor(Math.random() * (gameContainer.clientWidth - 20));
        const y = Math.floor(Math.random() * (gameContainer.clientHeight / 2) + (gameContainer.clientHeight / 2));
        return { x, y };
    }

    function initializeGame() {
        const elementTypes = ['botella.png', 'papel.png', 'caja.png', 'pizza.png'];
        for (let i = 0; i < totalItems; i++) {
            const randomIndex = Math.floor(Math.random() * elementTypes.length);
            const elementType = elementTypes[randomIndex];

            const item = document.createElement('img');
            item.src = `../assets/img/juego1/${elementType}`; 
            item.classList.add('item');
            const position = createRandomPosition();
            item.style.left = `${position.x}px`;
            item.style.top = `${position.y}px`;

            item.addEventListener('click', () => {
                shrinkItem(item);
            });

            gameContainer.appendChild(item);
        }

        
        setTimeout(() => {
            if (itemsRemoved < totalItems) {
                showMessage('Perdiste. Inténtalo de nuevo.');
            }
        }, 30000);
    }

    function shrinkItem(item) {
        let shrinkCount = 0;
        const shrinkInterval = setInterval(() => {
            if (shrinkCount < 5) {
                const newSize = item.clientWidth / 2;
                item.style.width = `${newSize}px`;
                item.style.height = `${newSize}px`;
                shrinkCount++;
            } else {
                clearInterval(shrinkInterval);
                item.remove();
                itemsRemoved++;
                if (itemsRemoved === totalItems) {
                    showMessage('¡Felicitaciones! Has ganado.');
                }
            }
        }, 100);
    }

    function showMessage(text) {
        messageContainer.textContent = text;
        messageContainer.classList.remove('hidden');
    }

    startButton.addEventListener('click', startGame);
});
