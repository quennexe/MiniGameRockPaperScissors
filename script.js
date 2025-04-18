const choices = ['rock', 'paper', 'scissors'];
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const outcomeDisplay = document.getElementById('result');
const resetButton = document.getElementById('reset-btn');

let userScore = 0;
let computerScore = 0;
let ties = 0;


const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const tieSound = new Audio("tie.mp3");

function game(userChoice) {
    const computerChoice = getComputerChoice(userChoice);

    userChoiceDisplay.textContent = `Senin Seçimin: ${emoji(userChoice)} (${userChoice})`;
    computerChoiceDisplay.textContent = `Bilgisayarın Seçimi: ${emoji(computerChoice)} (${computerChoice})`;

    const winner = determineWinner(userChoice, computerChoice);
    outcomeDisplay.textContent = winner;
    resetButton.style.display = 'inline-block';
}

function getComputerChoice(userChoice) {
    const difficulty = document.getElementById("difficulty-select").value;

    if (difficulty === "easy") {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    if (difficulty === "hard") {
        if (userChoice === 'rock') return 'paper';
        if (userChoice === 'paper') return 'scissors';
        if (userChoice === 'scissors') return 'rock';
    }

    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(user, computer) {
    if (user === computer) {
        ties++;
        updateScore();
        tieSound.play();
        return "Beraberlik!";
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        userScore++;
        updateScore();
        winSound.play();
        return "Kazandın!";
    } else {
        computerScore++;
        updateScore();
        loseSound.play();
        return "Kaybettin!";
    }
}

function updateScore() {
    document.getElementById("user-score").textContent = `Sen: ${userScore}`;
    document.getElementById("computer-score").textContent = `Bilgisayar: ${computerScore}`;
    document.getElementById("ties").textContent = `Beraberlik: ${ties}`;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    ties = 0;
    updateScore();
    outcomeDisplay.textContent = "";
    userChoiceDisplay.textContent = "";
    computerChoiceDisplay.textContent = "";
    resetButton.style.display = 'none';
}

function emoji(choice) {
    if (choice === "rock") return "🪨";
    if (choice === "paper") return "📄";
    if (choice === "scissors") return "✂️";
}