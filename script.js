const bgMusic = document.getElementById('bgMusic');
const words = ["Happy", "Birthday", "Kolanthai"];
let currentIndex = 0;

const wordDisplay = document.getElementById('wordDisplay');
const cake = document.getElementById('cake');
const fireworksCanvas = document.getElementById('fireworks');

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const roses = document.getElementById('roses');
const responseButtons = document.getElementById('response-buttons');

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const result = document.getElementById('result');

const muteBtn = document.getElementById('muteBtn');
const birthdayButton = document.querySelector('.birthday-button__button');
const birthdayBtnBox = document.getElementById('birthdayBtnBox');

let yesScale = 1.5;

// --- Fireworks Animation ---
let fireworksActive = false;
let fwParticles = [];
function randomColor() {
    const colors = ['#ff5252', '#ffeb3b', '#00e676', '#40c4ff', '#ffd740', '#d500f9', '#ff4081'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function launchFirework() {
    const w = fireworksCanvas.width;
    const h = fireworksCanvas.height;
    const x = Math.random() * w * 0.8 + w * 0.1;
    const y = Math.random() * h * 0.4 + h * 0.1;
    const color = randomColor();
    for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * 2 * Math.PI;
        const speed = Math.random() * 2 + 2;
        fwParticles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color
        });
    }
}
function drawFireworks() {
    const ctx = fireworksCanvas.getContext('2d');
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fwParticles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
    });
}
function updateFireworks() {
    fwParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= 0.015;
    });
    fwParticles = fwParticles.filter(p => p.alpha > 0);
}
function animateFireworks() {
    if (!fireworksActive) return;
    drawFireworks();
    updateFireworks();
    if (fwParticles.length < 60) launchFirework();
    requestAnimationFrame(animateFireworks);
}
function startFireworks() {
    fireworksCanvas.style.display = 'block';
    fireworksActive = true;
    resizeFireworks();
    fwParticles = [];
    for (let i = 0; i < 3; i++) setTimeout(launchFirework, i * 350);
    animateFireworks();
    setTimeout(() => {
        fireworksActive = false;
        fireworksCanvas.style.display = 'none';
    }, 2800);
}
function resizeFireworks() {
    fireworksCanvas.width = fireworksCanvas.offsetWidth;
    fireworksCanvas.height = fireworksCanvas.offsetHeight;
}
window.addEventListener('resize', resizeFireworks);

// --- Sequence Logic ---
function showNextWord() {
    if (currentIndex < words.length) {
        wordDisplay.innerText = words[currentIndex];
        currentIndex++;
        setTimeout(showNextWord, 1500);
    } else {
        setTimeout(() => {
            cake.style.display = 'flex';
            setTimeout(() => {
                startFireworks();
                setTimeout(showFinalMessage, 3200);
            }, 900);
        }, 800);
    }
}

function showFinalMessage() {
    cake.style.display = 'none';
    fireworksCanvas.style.display = 'none';
    line1.style.display = 'block';
    setTimeout(() => {
        line2.style.display = 'block';
        roses.style.display = 'flex';
        responseButtons.style.display = 'flex';
    }, 1200);
}

birthdayButton.addEventListener('click', () => {
    bgMusic.play();
    birthdayBtnBox.style.display = 'none';
    showNextWord();
});

// Yes/No button logic
yesButton.style.transform = `scale(${yesScale})`;

yesButton.addEventListener('click', () => {
    result.innerHTML = '<h3>Here’s your chocolate! 🍫🍫🍫</h3>';
    responseButtons.style.display = 'none';
});

noButton.addEventListener('click', () => {
    if (yesScale < 2.2) {
        yesScale += 0.3;
        yesButton.style.transform = `scale(${yesScale})`;
    }
    noButton.classList.add('shake');
    setTimeout(() => noButton.classList.remove('shake'), 400);
});

// Music mute/unmute
muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
});

// Optional: Pause music on page hide (mobile)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) bgMusic.pause();
    else if (!bgMusic.muted && !birthdayBtnBox.style.display) bgMusic.play();
});
