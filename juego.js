const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Cargar la imagen de fondo
const backgroundImage = new Image();
backgroundImage.src = 'images/Space.jpg'; // Asegúrate de que la ruta sea correcta


// Cargar la imagen de la nave
const spaceshipImage = new Image();
spaceshipImage.src = 'images/nave.png'; // Asegúrate de que la ruta sea correcta


const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 100,
    height: 100,
    speed: 5,
    dx: 0,
    dy:0
};

// Esperar a que la imagen se cargue antes de dibujar
spaceshipImage.onload = function() {
    update();
};

// Función para dibujar la imagen de fondo
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}


// Función para dibujar la imagen de la nave
function drawPlayer() {
    ctx.drawImage(spaceshipImage, player.x, player.y, player.width, player.height);
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Limitar movimiento a los bordes del canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

}

function update() {
    movePlayer();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(); 
    drawPlayer();
    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight') player.dx = player.speed;
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
    if (e.key === 'ArrowUp') player.dy = -player.speed;
    if (e.key === 'ArrowDown') player.dy = player.speed;
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') player.dx = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
}
let imagesLoaded = 0;
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        update(); // Iniciar la actualización solo después de que ambas imágenes se hayan cargado
    }
}


backgroundImage.onload = imageLoaded;
spaceshipImage.onload = imageLoaded;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
