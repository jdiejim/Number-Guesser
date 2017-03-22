// ============ Global Variables ============
// --Game Environment--
var level;
var lives;
var max;
var min;
var randomNumber;
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
// --Emojis--
// TODO: add emojis
var emojis = ["(¬‿¬)", "(◕‿◕✿)", "(ง'̀-'́)ง", "(~˘▾˘)~", "ʕ•ᴥ•ʔ", "༼ つ ◕_◕ ༽つ", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"];
var errorEmojis = [];
var startEmojis = [];
var winEmojis = [];

// TODO: rearange
// ============ Main ============
// ** Run Setup Game Environment **
setupGame();

// ** Main Game Function **
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

// ** Setup Game Environment **
function setupGame() {
  // --Game Environment--
  level = 1;
  lives = 5;
  max = 100;
  min = 0;
  randomNumber = getRandomInt(max, min);
  // --Render Start Emoji--
  loadEmoji();
  // --Update DOM Element Data--
  feedback.innerText = "Click Guess to START GAME!";
  guessInput.value = "";
  maxInput.value = max;
  minInput.value = min;
  // --Set Attribute for Defined Range Inputs--
  guessInput.setAttribute('max', max);
  guessInput.setAttribute('min', min);
}

function levelUp() {
  // --Game Environment--
  level += 1;
  lives = 5;
  max += 10;
  min -= 10;
  randomNumber = getRandomInt(max, min);
  // --Render Win Emoji--
  loadEmoji();
  // --Update DOM Element Data--
  feedback.innerText = "BOOM!";
  guessInput.value = "";
  maxInput.value = max;
  minInput.value = min;
  // --Update Attribute for Defined Range Inputs--
  guessInput.setAttribute('max', max);
  guessInput.setAttribute('min', min);

  // TODO: remove logs
  console.log(randomNumber);
  console.log(max);
  console.log(min);
}

function loadEmoji() {
  var randEmoji = getRandomInt(-1, 7);
  lastGuess.innerText = emojis[randEmoji];
}

function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ---- Events ----
guessBtn.addEventListener('click', main);

clearBtn.addEventListener('click', function () {
  guessInput.value = "";
});

resetBtn.addEventListener('click', setupGame);

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
// TODO: set new min and max envet
