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

let yesScale = 1.5;

function showNextWord() {
    if (currentIndex < words.length) {
        wordDisplay.innerText = words[currentIndex];
        currentIndex++;
        setTimeout(showNextWord, 2000);
    } else {
        setTimeout(() => {
            cake.style.display = 'block';
            startFireworks();
            setTimeout(showFinalMessage, 5000);
        }, 1000);
    }
}

function startFireworks() {
    fireworks.style.display = 'block';
}

function showFinalMessage() {
    fireworks.style.display = 'none';
    cake.style.display = 'none';

    line1.style.display = 'block';
    setTimeout(() => {
        line2.style.display = 'block';
        roses.style.display = 'flex';
        responseButtons.style.display = 'flex';
    }, 1500);
}

const birthdayButton = document.querySelector('.birthday-button__button');
birthdayButton.addEventListener('click', () => {
    bgMusic.play();
    document.querySelector('.birthday-button').style.display = 'none';
    showNextWord();
});

yesButton.style.transform = `scale(${yesScale})`;

yesButton.addEventListener('click', () => {
    result.innerHTML = '<h3>Here’s your chocolate! 🍫🍫🍫</h3>';
    responseButtons.style.display = 'none';
});

noButton.addEventListener('click', () => {
    yesScale += 0.3;
    yesButton.style.transform = `scale(${yesScale})`;
    noButton.style.zIndex = '1';
    yesButton.style.zIndex = '0';
});
