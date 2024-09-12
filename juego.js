const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 5,
    dx: 0,
    dy:0
};

function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
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

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
