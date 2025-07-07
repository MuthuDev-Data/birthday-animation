const bgMusic = document.getElementById('bgMusic');

const birthdayButton = document.querySelector('.birthday-button__button');
birthdayButton.addEventListener('click', () => {
    bgMusic.play();

    setTimeout(() => {
        document.getElementById('response-buttons').style.opacity = '1';
    }, 14000);
});

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const result = document.getElementById('result');

let yesScale = 1.5;

yesButton.style.transform = `scale(${yesScale})`;

yesButton.addEventListener('click', () => {
    result.innerHTML = '<h3>Here’s your chocolate! 🍫🍫🍫</h3>';
    document.getElementById('response-buttons').style.display = 'none';
});

noButton.addEventListener('click', () => {
    yesScale += 0.3;
    yesButton.style.transform = `scale(${yesScale})`;
});
