const bgMusic = document.getElementById('bgMusic');
const words = ["Happy", "Birthday", "Kolanthai"];
let currentIndex = 0;

const wordDisplay = document.getElementById('wordDisplay');
const cake = document.getElementById('cake');
const fireworks = document.getElementById('fireworks');

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

// Confetti emojis for the effect
const confettiEmojis = ["🎉", "✨", "🎊", "🥳", "💥", "🪅", "🧨"];

function showNextWord() {
    if (currentIndex < words.length) {
        wordDisplay.innerText = words[currentIndex];
        currentIndex++;
        setTimeout(showNextWord, 1500);
    } else {
        setTimeout(() => {
            cake.style.display = 'block';
            startFireworks();
            setTimeout(showFinalMessage, 3200);
        }, 800);
    }
}

// Confetti effect for fireworks
function startFireworks() {
    fireworks.style.display = 'block';
    fireworks.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        const conf = document.createElement('span');
        conf.className = 'confetti';
        conf.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        conf.style.left = Math.random() * 90 + '%';
        conf.style.animationDelay = (Math.random() * 0.7) + 's';
        conf.style.color = `hsl(${Math.random()*360}, 80%, 60%)`;
        fireworks.appendChild(conf);
    }
    // Remove confetti after animation
    setTimeout(() => { fireworks.innerHTML = ''; }, 2000);
}

function showFinalMessage() {
    fireworks.style.display = 'none';
    cake.style.display = 'none';

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
    if (yesScale < 2.2) { // Limit scale
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
