const canvas = document.getElementById('albumCanvas');
const ctx = canvas.getContext('2d');

const mountainColorInput = document.getElementById('mountainColor');
const gridColorInput = document.getElementById('gridColor');
const sunColorInput = document.getElementById('sunColor');
const textBorderInput = document.getElementById('textColor');
const starsAmountInput = document.getElementById('stars');
const SunRadiusInput = document.getElementById('sun');
const applyColors = document.getElementById('applyColors');

applyColors.addEventListener('click', () => {
    drawCanvas();
});

function resizeCanvas() {
    canvas.width = 400;
    canvas.height = 400;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f0f0f');
    gradient.addColorStop(0.5, '#0f0f0f');
    gradient.addColorStop(1, '#0f0f0f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    const sunColor = sunColorInput.value;
    const sunX = canvas.width / 2;
    const sunY = canvas.height / 1.525;
    const sunRadius = SunRadiusInput.value;

    const sunGradient = ctx.createRadialGradient(sunX, sunY, sunRadius / 2, sunX, sunY, sunRadius);
    sunGradient.addColorStop(0, sunColor);
    sunGradient.addColorStop(1, 'transparent');

    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    drawMountains();
    drawGridBackground();
    drawGrid();
    drawTextRectangle();
}

function drawStars() {
    const starCount = starsAmountInput.value;
    const glowEffect = 2;

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = glowEffect;

    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.shadowBlur = 0;
}

function drawGridBackground() {
    const gridHeight = canvas.height * 0.80;
    const gridWidth = canvas.width;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, gridHeight, gridWidth, canvas.height - gridHeight);
}

function drawGrid() {
    const gridHeight = canvas.height * 0.80;
    const peakSpacing = canvas.width / 20;
    const glowEffect = 10;
    const gridColor = gridColorInput.value;
    
    ctx.strokeStyle = gridColor;
    ctx.shadowColor = gridColor;
    ctx.shadowBlur = glowEffect;
    ctx.lineWidth = 1;

    const centerX = canvas.width / 2;

    for (let x = 0; x <= canvas.width; x += peakSpacing) {
        let inclination = 0;
        const distanceFromCenter = Math.abs(x - centerX);

        if (x === centerX) {
            inclination = 0;
        } else {
            const maxIncline = 150;
            const factor = distanceFromCenter / centerX;
            inclination = Math.sign(x - centerX) * (factor * maxIncline);
        }

        ctx.beginPath();
        ctx.moveTo(x, gridHeight);
        ctx.lineTo(x + inclination, canvas.height);
        ctx.stroke();
    }

    const horizontalStepBase = 15;
    const maxSpacingIncrease = 10;

    for (let y = gridHeight; y <= canvas.height; y += horizontalStepBase) {
        const distanceFromBottom = canvas.height - y;
        const spacingIncrease = (distanceFromBottom / canvas.height) * maxSpacingIncrease;

        const spacing = horizontalStepBase + spacingIncrease;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        y += spacing - horizontalStepBase;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, gridHeight, canvas.width, canvas.height - gridHeight / 6);

    ctx.shadowBlur = 0;
}

function drawMountains() {
    const mountainColors = '#000000';
    const glowEffect = 10;
    const minimumBaseHeight = canvas.height * 0.70;
    let mountainBaseHeight = canvas.height * 0.80;

    mountainBaseHeight = Math.max(mountainBaseHeight, minimumBaseHeight);

    const minPeakHeightLayer1 = 100;
    const minPeakHeightLayer2 = 70;
    const minPeakHeightLayer3 = 40;

    ctx.lineWidth = 3;

    for (let i = 0; i < 3; i++) {
        const peakCount = 5;
        const peakSpacing = canvas.width / peakCount;

        let peakHeight;
        let minPeakHeight;

        if (i === 0) {
            peakHeight = 60;
            minPeakHeight = minPeakHeightLayer1;
        } else if (i === 1) {
            peakHeight = 80;
            minPeakHeight = minPeakHeightLayer2;
        } else {
            peakHeight = 100;
            minPeakHeight = minPeakHeightLayer3;
        }

        peakHeight = Math.max(peakHeight, minPeakHeight);

        ctx.strokeStyle = mountainColorInput.value;
        ctx.shadowColor = mountainColorInput.value;
        ctx.shadowBlur = glowEffect;

        ctx.fillStyle = mountainColors;
        ctx.beginPath();
        ctx.moveTo(0, mountainBaseHeight);

        for (let j = 0; j <= peakCount; j++) {
            const x = j * peakSpacing;
            const y = mountainBaseHeight - peakHeight * Math.random();
            
            const adjustedY = Math.max(y, mountainBaseHeight - minPeakHeight);
            
            ctx.lineTo(x, adjustedY);
        }

        ctx.lineTo(canvas.width, mountainBaseHeight);
        ctx.lineTo(canvas.width, canvas.height * 0.85);
        ctx.lineTo(0, canvas.height * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
}

function drawTextRectangle() {
    const rectWidth = 200;
    const rectHeight = 150;
    const borderRadius = 20;

    const rectX = (canvas.width - rectWidth) / 2;
    const rectY = 20;

    ctx.fillStyle = '#0f0f0f';
    ctx.beginPath();
    ctx.moveTo(rectX + borderRadius, rectY);
    ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, borderRadius);
    ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, borderRadius);
    ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, borderRadius);
    ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, borderRadius);
    ctx.closePath();
    ctx.fill();

    ctx.font = '50px "New Rocker"';
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = textBorderInput.value;
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = ["DAFT", "PUNK"];
    const lineHeight = 60;

    const totalTextHeight = lines.length * lineHeight;
    const textStartY = rectY + (rectHeight - totalTextHeight) / 2 + lineHeight / 2;

    lines.forEach((line, index) => {
        const textY = textStartY + index * lineHeight;
        ctx.strokeText(line, rectX + rectWidth / 2, textY);
        ctx.fillText(line, rectX + rectWidth / 2, textY);
    });
}

drawCanvas();