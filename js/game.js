const canvas = document.getElementById('oceano');
const ctx = canvas.getContext('2d');
const puntosElement = document.getElementById('puntos');
const mensajeElemento = document.getElementById('mensaje');

const buzoImg = new Image();
buzoImg.src = '../assets/img/juego3/diver.png';

const basuraImg = new Image();
basuraImg.src = '../assets/img/juego3/botella2.png';


const delfinImg = new Image();
delfinImg.src = '../assets/img/juego3/delfin.png';

const salmonImg = new Image();
salmonImg.src = '../assets/img/juego3/salmon.png';


// --------------------------VARIABLES
let buzo = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 60,
    height: 60,
    speed: 5
};

let basura = [
    { x: 100, y: 100, width: 40, height: 40 },
    { x: 300, y: 200, width: 40, height: 40 },
    { x: 650, y: 500, width: 40, height: 40 },
];

let delfin = [
    { x: 600, y: 100, width: 40, height: 40 },
];


let salmon = [
    { x: 600, y: 430, width: 40, height: 40 },
];

let puntos = 0;

//-------------------------- FUNCIONES
function ajustarCanvas() {
    if (window.innerWidth <= 600) {
        canvas.width = 400;
        canvas.height = 300;
    } else {
        canvas.width = 800;
        canvas.height = 600;
    }

    // Ajustar posiciones de elementos si es necesario
    buzo.x = canvas.width / 2;
    buzo.y = canvas.height / 2;

    basura = [
        { x: 100 * canvas.width / 800, y: 100 * canvas.height / 600, width: 40, height: 40 },
        { x: 300 * canvas.width / 800, y: 200 * canvas.height / 600, width: 40, height: 40 },
        { x: 650 * canvas.width / 800, y: 500 * canvas.height / 600, width: 40, height: 40 },
    ];

    delfin = [
        { x: 600 * canvas.width / 800, y: 100 * canvas.height / 600, width: 40, height: 40 },
    ];

    salmon = [
        { x: 600 * canvas.width / 800, y: 430 * canvas.height / 600, width: 40, height: 40 },
    ];
}

ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);
function dibujarDiver() {
    ctx.drawImage(buzoImg, buzo.x, buzo.y, buzo.width, buzo.height);
}

function dibujarBolsa() {
    basura.forEach(item => {
        ctx.drawImage(basuraImg, item.x, item.y, item.width, item.height);
    });
}


function dibujarDelfin() {
    delfin.forEach(item => {
        ctx.drawImage(delfinImg, item.x, item.y, item.width, item.height);
    });
}


function dibujarSalmon() {
    salmon.forEach(item => {
        ctx.drawImage(salmonImg, item.x, item.y, item.width, item.height);
    });
}

// Dibujador de basura, delfines y nuestro buzo
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarDiver();
    dibujarBolsa();
    dibujarDelfin();
    dibujarSalmon();
}

function encontroBasura() {
    basura.forEach((item, index) => {
        if (buzo.x < item.x + item.width &&
            buzo.x + buzo.width > item.x &&
            buzo.y < item.y + item.height &&
            buzo.y + buzo.height > item.y) {
            basura.splice(index, 1);
            puntos += 10;
            puntosElement.textContent = 'Puntos: ' + puntos;
            mensajeElemento.textContent = 'Encontraste basura. Sigue así!!';
        }
    });
}

function encontroDelfin() {
    delfin.forEach((item, index) => {
        if (buzo.x < item.x + item.width &&
            buzo.x + buzo.width > item.x &&
            buzo.y < item.y + item.height &&
            buzo.y + buzo.height > item.y) {
            delfin.splice(index, 1);
            puntos += 20;
            puntosElement.textContent = 'Puntos: ' + puntos;
            mensajeElemento.textContent = 'Salvaste un animal. Puntos Extra!';
        }
    });
}



function encontroSalmon() {
    salmon.forEach((item, index) => {
        if (buzo.x < item.x + item.width &&
            buzo.x + buzo.width > item.x &&
            buzo.y < item.y + item.height &&
            buzo.y + buzo.height > item.y) {
            salmon.splice(index, 1);
            puntos += 20;
            puntosElement.textContent = 'Puntos: ' + puntos;
            mensajeElemento.textContent = 'Salvaste un animal. Puntos Extra!';
        }
    });
}

function verificarFinDeJuego() {
    if (puntos == 70) {
        mensajeElemento.textContent = '¡Felicidades! Has alcanzado el puntaje máximo. Fin de juego.';
    }
}

function gameLoop() {
    update();
    encontroBasura();
    encontroDelfin();
    encontroSalmon();
    verificarFinDeJuego();
    requestAnimationFrame(gameLoop);
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            buzo.y -= buzo.speed;
            break;
        case 'ArrowDown':
            buzo.y += buzo.speed;
            break;
        case 'ArrowLeft':
            buzo.x -= buzo.speed;
            break;
        case 'ArrowRight':
            buzo.x += buzo.speed;
            break;
    }
});

buzoImg.onload = basuraImg.onload = gameLoop;
