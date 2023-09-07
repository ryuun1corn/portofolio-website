// Selectors
const difficultyButton = document.getElementById("difficulty");
const optionsNumber = document.getElementById("options-number");
const optionsButton = document.getElementById("options-button");
const gameText = document.getElementById("game-text");
const rgbText = document.getElementById("rgb-text");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");
const guessButtons = document.querySelector(".guesses");
var answerId;
var difficult = false;
var guesses;
var finished = false;

// Events
optionsButton.addEventListener("click", getColour);
guessButtons.addEventListener("click", checkAnswer);
difficultyButton.addEventListener("click", getHealth);
difficultyButton.addEventListener("click", getColour);

// Functions
function getColour(e) {
    if (e) {
        e.preventDefault();
    }

    if (optionsNumber.value >= 2) {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        rgbText.innerHTML = String(red) + ", " + String(green) + ", " + String(blue);
        
        while (guessButtons.firstChild) {
            guessButtons.removeChild(guessButtons.lastChild);
        }

        var counter = 1;
        answerId = Math.floor(Math.random() * (Number(optionsNumber.value) + 1));
        while (answerId == 0) {
            answerId = Math.floor(Math.random() * (Number(optionsNumber.value) + 1));
        }
        for (var i = 0; i < optionsNumber.value; i++) {
            var guess = document.createElement("button");
            guess.id = String(counter);
            guessButtons.appendChild(guess);
             
            if (counter === answerId) {
                guess.style.background = `rgb(${red}, ${green}, ${blue})`;
                guess.style.border = `rgb(${red}, ${green}, ${blue})`;
            } else {
                var randomRed = Math.floor(Math.random() * 256);
                var randomGreen = Math.floor(Math.random() * 256);
                var randomBlue = Math.floor(Math.random() * 256);
                
                guess.style.background = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
                guess.style.border = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
            }

            if (difficult === false) {
                guesses = Number(optionsNumber.value) - 1;
                gameText.innerHTML = "Health = " + guesses;
            } else {
                guesses = Math.floor(Number(optionsNumber.value) / 2);
                gameText.innerHTML = "Health = " + guesses;
            }
            finished = false;
            counter++;
        }

    } else {
        alert("Hmm");
    }
}

function checkAnswer(e) {
    var guessButton = e.target;
    var winnerButton = document.getElementById(`${String(answerId)}`);
    console.clear();
    if (finished === true) {
    } else if (Number(guessButton.id) === answerId && Number(guesses) > 0) {
        gameText.innerHTML = "YOU WON!!";
        winnerButton.style.width = "150px";
        winnerButton.style.height = "150px";
        setTimeout(getColour, 3000);
        finished = true;
    } else if (Number(guesses) > 1) {
        guesses -= 1;
        gameText.innerHTML = "Health = " + guesses;
    } else {
        gameText.innerHTML = "YOU LOSE!!"
        winnerButton.style.width = "150px";
        winnerButton.style.height = "150px";
        setTimeout(getColour, 3000);
        finished = true;
    }
}

function getHealth(e) {
    var buttonDiff = e.target;
    if (buttonDiff.id == "easy") {
        easyButton.style.color = "white";
        easyButton.style.background = "black";
        easyButton.style.border = "black";

        hardButton.style.color = "black";
        hardButton.style.background = "white";
        hardButton.style.border = "white";
        difficult = false;
    } else {
        hardButton.style.color = "white";
        hardButton.style.background = "black";
        hardButton.style.border = "black";
        
        easyButton.style.color = "black";
        easyButton.style.background = "white";
        easyButton.style.border = "white";
        difficult = true;
        getColour();
    }
}
