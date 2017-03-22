
// ---- Global Variables ----
var emojis = ["(¬‿¬)", "(◕‿◕✿)", "(ง'̀-'́)ง", "(~˘▾˘)~", "ʕ•ᴥ•ʔ", "༼ つ ◕_◕ ༽つ", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"];
var level = 1;
var lives = 5;
var max = 100;
var min = 0;
var randomNumber = getRandomInt(max, min);
// --Inputs--
var maxInput = document.getElementById('maxInput');
var minInput = document.getElementById('minInput');
var guessInput = document.getElementById('guessInput');
var settingsBtn = document.getElementById('settingsBtn');
// --Buttons--
var guessBtn = document.getElementById('guessBtn');
var clearBtn = document.getElementById('clearBtn');
var resetBtn = document.getElementById('resetBtn');
// --Text--
var errorMsg = document.getElementById('error-msg');
var lastGuess = document.getElementById('last-guess');
var feedback = document.getElementById('feedback');

// TODO: larger loading function
// --Render Emoji--
loadEmoji();

// TODO: rearrage
// TODO: loading function
// --Display Range Inputs--
minInput.value = min;
maxInput.value = max;

// TODO: set max and min
// ---- Main ----
function main() {
  console.log(randomNumber);
  var guess = parseInt(guessInput.value);
  lastGuess.innerText = guess;

// --Error Filter--
// TODO: out of range function toggle on and off; reset emoji

// TODO: error functions should render bad emoji and feedback should update
  if (guess > max || guess < min) {
    errorMsg.innerText = "Out of range! Please enter number between " + min + " - " + max;
  }

  if (isNaN(guess)) {
    lastGuess.innerText = ":(";
    feedback.innerText = "Please enter a numeric value";
    console.log('error');
  }

// --Game--
  if (guess > randomNumber) {
    feedback.innerText = "That is too high";
    lives -= 1;
  }
  if (guess < randomNumber) {
    feedback.innerText = "That is too low";
    lives -= 1;
  }
  if (guess === randomNumber) {
    levelUp();
    // TODO: add level msg
  }
}

// ---- Functions ----
// TODO: sort alpha names

function setupGame() {
  // TODO: setup variables
// TODO: setup attributes for input max and min
// TODO: render emjojis
// TODO: render max and min input
}

function loadEmoji() {
  var randEmoji = getRandomInt(-1, 7);
  lastGuess.innerText = emojis[randEmoji];
}

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function levelUp() {
  randomNumber = getRandomInt(max, min);
  feedback.innerText = "BOOM!";
  guessInput.value = "";
  loadEmoji();
  level += 1;
  lives = 5;
  max += 10;
  min -= 10;

  console.log(randomNumber);
  console.log(max);
  console.log(min);
}

function resetGame() {
  randomNumber = getRandomInt(max, min);
  loadEmoji();
  feedback.innerText = "Click Guess to START!";
  guessInput.value = "";
  level = 1;
  lives = 5;
  max = 100;
  min = 1;
  // TODO: setup game

  console.log(randomNumber);
  console.log(max);
  console.log(min);
}

// ---- Events ----
guessBtn.addEventListener('click', main);

clearBtn.addEventListener('click', function () {
  guessInput.value = "";
});

resetBtn.addEventListener('click', resetGame);

// --Input: Enter key calls main() insted of reloading page--
// TODO: escape code
guessInput.addEventListener('keyup', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    main();
  }
  if (event.keyCode == 27) {
    guessInput.value = "";
  }
});

// --Input: calls toggleRangeClass() instead of reloading page--
settingsBtn.addEventListener('click', function(event) {
  event.preventDefault();
});

// TODO: comment with ====
// TODO: make max a min disaper event listener
