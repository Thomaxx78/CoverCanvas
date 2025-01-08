const canvas = document.getElementById('albumCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

// Redimensionner au chargement et lors du redimensionnement de la fenêtre
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


// Gradient background
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#12001a');
gradient.addColorStop(0.5, '#3a003a');
gradient.addColorStop(1, '#99004d');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const gridSize = 50;
const pyramidBaseX = canvas.width / 2;
const pyramidBaseY = canvas.height / 2 + 100;
const gridStartDistance = canvas.height / 2;

ctx.strokeStyle = '#ff00ff';
ctx.lineWidth = 1;

function drawGrid() {
    const numLines = 20;
    const minSpacing = 5;
    const maxSpacing = 40;

    let currentY = gridStartDistance;

    for (let i = 0; i < numLines; i++) {
        const t = i / numLines;
        const spacing = minSpacing + t * (maxSpacing - minSpacing);
        currentY += spacing;

        if (currentY > canvas.height) break;

        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(canvas.width, currentY);
        ctx.stroke();
    }
}


// Glowing sun
const sunX = canvas.width / 2;
const sunY = canvas.height / 5;
const sunRadius = 150;

const sunGradient = ctx.createRadialGradient(sunX, sunY, sunRadius / 2, sunX, sunY, sunRadius);
sunGradient.addColorStop(0, 'red');
sunGradient.addColorStop(1, 'transparent');

ctx.fillStyle = sunGradient;
ctx.beginPath();
ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
ctx.fill();

// 3D Closed Pyramid
function drawPyramid(x, y, size, color) {
    // 3D perspective effect
    const depth = 50; // The amount of depth the pyramid will have

    // Coordinates for 3D effect
    const topX = x;
    const topY = y - size / 2;
    const frontLeftX = x - size;
    const frontLeftY = y + size / 2;
    const frontRightX = x + size;
    const frontRightY = y + size / 2;
    const backLeftX = x - size + depth;
    const backLeftY = y + size / 2 + depth;
    const backRightX = x + size - depth;
    const backRightY = y + size / 2 + depth;

    // Drawing the 3D pyramid faces (front, left, right, and back faces)
    const pyramidGradient = ctx.createLinearGradient(x, y, x, y + size);
    pyramidGradient.addColorStop(0, 'black');
    pyramidGradient.addColorStop(1, color);

    // Front face
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(frontLeftX, frontLeftY);
    ctx.lineTo(frontRightX, frontRightY);
    ctx.closePath();
    ctx.fillStyle = pyramidGradient;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Left side face
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(frontLeftX, frontLeftY);
    ctx.lineTo(backLeftX, backLeftY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    // Right side face
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(frontRightX, frontRightY);
    ctx.lineTo(backRightX, backRightY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    // Back face (the bottom part that connects the sides)
    ctx.beginPath();
    ctx.moveTo(backLeftX, backLeftY);
    ctx.lineTo(backRightX, backRightY);
    ctx.lineTo(frontRightX, frontRightY);
    ctx.lineTo(frontLeftX, frontLeftY);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
}

// Draw grid and pyramid
drawGrid();
const pyramidSize = 150;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
drawPyramid(centerX, centerY - 75, pyramidSize, '#00ffff');