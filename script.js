const bgMusic = document.getElementById('bgMusic');
const words = [
    " Happy ",
    " Birthday ",
    " Kolanthai "
];
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

// --- Fireworks Animation (unchanged, omitted for brevity) ---

function showNextWord() {
    if (currentIndex < words.length) {
        wordDisplay.innerHTML = words[currentIndex];
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

// Yes/No button logic (unrestricted Yes growth, No floats above Yes when needed)
yesButton.style.transform = `scale(${yesScale})`;

yesButton.addEventListener('click', () => {
    result.innerHTML = '<h3>Here’s your chocolate! 🍫🍫🍫</h3>';
    responseButtons.style.display = 'none';
});

noButton.addEventListener('click', () => {
    yesScale += 0.3;
    yesButton.style.transform = `scale(${yesScale})`;
    // If Yes is very large, move No above Yes
    if (yesScale > 2.2) {
        responseButtons.classList.add('no-above');
    } else {
        responseButtons.classList.remove('no-above');
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
