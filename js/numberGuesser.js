// ============ Global Variables ============
// --Game Environment--
var level;
var lives;
var max;
var min;
var randomNumber;
var settingsVisibility;
// --Inputs--
var maxInput = document.getElementById('maxInput');
var minInput = document.getElementById('minInput');
var guessInput = document.getElementById('guessInput');
var settingsBtn = document.getElementById('settingsBtn');
// --Buttons--
var guessBtn = document.getElementById('guessBtn');
var clearBtn = document.getElementById('clearBtn');
var resetBtn = document.getElementById('resetBtn');
var setRangeBtn = document.getElementById('setRangeBtn');
// --Elements--
var errorMsg = document.getElementById('error-msg');
var feedback = document.getElementById('feedback');
var indicator = document.getElementById('indicator');
var lastGuess = document.getElementById('last-guess');
var newRanges = document.getElementById('new-ranges');
var rangeContainer = document.getElementById('range-container');

// TODO: rearange main

// ============ Main ============
// ** Run Setup Game Environment **
setupGame();

// ** Main Game Function **
function main() {
  console.log(randomNumber);
  // --Get Guess Number--
  var guess = parseInt(guessInput.value);
  // --Update DOM Element Data--
  errorMsg.innerText = "";
  indicator.innerText = "Your last guess was";
  lastGuess.innerText = guess;
  newRanges.className = "";
  newRanges.innerText = "";

// --Error Checker--
  if (guess > max || guess < min || isNaN(guess)) {
    errorMsg.innerText = "Please enter a number between " + min + " and " + max;
    feedback.innerText = "Please enter a Number";
    indicator.innerText = "Boo! Not Cool";
    loadEmoji('error');
  }

// --Guess Number Comparison--
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
  }
}

// ============ Functions ============
// TODO: sort alpha names
// ** Setup Game Environment **
function setupGame() {
  // --Game Environment--
  level = 1;
  lives = 5;
  max = 100;
  min = 0;
  randomNumber = getRandomInt(max, min);
  settingsVisibility = false;
  // --Render Start Emoji--
  loadEmoji('start');
  // --Update DOM Element Data--
  feedback.innerText = "Click Guess to START GAME!";
  guessInput.value = "";
  indicator.innerText = "Good Luck!";
  maxInput.value = 100;
  minInput.value = 0;
  newRanges.className = "";
  newRanges.innerText = "";
  // --Set Attribute for Defined Range Inputs--
  guessInput.setAttribute('max', 100);
  guessInput.setAttribute('min', 0);
}

function levelUp() {
  // --Game Environment--
  level += 1;
  lives = 5;
  max += 10;
  min -= 10;
  randomNumber = getRandomInt(max, min);
  // --Render Win Emoji--
  loadEmoji('win');
  // --Update DOM Element Data--
  feedback.innerText = "BOOM!";
  guessInput.value = "";
  indicator.innerText = "Awesome! Get Ready!";
  newRanges.className += "spark";
  newRanges.innerText = "Level " + level + ":   Guess between " + min + " and " + max;
  maxInput.value = max;
  minInput.value = min;
  // --Update Attribute for Defined Range Inputs--
  guessInput.setAttribute('max', max);
  guessInput.setAttribute('min', min);

  // TODO: remove logs
  console.log(randomNumber);
}

function customGame() {
  // --Game Environment--
  level = 1;
  lives = 5;
  randomNumber = getRandomInt(max, min);
  settingsVisibility = false;
  // --Render Start Emoji--
  loadEmoji('start');
  // --Update DOM Element Data--
  feedback.innerText = "Click Guess to START GAME!";
  guessInput.value = "";
  indicator.innerText = "Good Luck!";
  maxInput.value = max;
  minInput.value = min;
  newRanges.className = "";
  newRanges.innerText = "";
  // --Set Attribute for Defined Range Inputs--
  guessInput.setAttribute('max', max);
  guessInput.setAttribute('min', min);
}

function loadEmoji(type) {
  // --Emoji Types--
  var errorEmojis = ['(ಥ﹏ಥ)', 'ಥ_ಥ', '༼ つ ◕_◕ ༽つ', 'ლ(ಠ益ಠლ)', '༼ つ ಥ_ಥ ༽つ'];
  var startEmojis = ["(ง'̀-'́)ง", '(◕‿◕✿)', '(¬‿¬)', '╚(ಠ_ಠ)=┐', '(｡◕‿◕｡)'];
  var winEmojis = ['(~˘▾˘)~', '~(˘▾˘~)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', 'ヾ(⌐■_■)ノ♪', '♥‿♥' ];
  // --Generate Random Emoji Based on Type--
  var randEmoji = getRandomInt(-1, 5);
  switch (type) {
    case 'error':
      lastGuess.innerText = errorEmojis[randEmoji];
      break;
    case 'win':
      lastGuess.innerText = winEmojis[randEmoji];
      break;
    case 'start':
      lastGuess.innerText = startEmojis[randEmoji];
      break;
    default:
      lastGuess.innerText = startEmojis[randEmoji];
  }
}

// TODO: check random forumla
function getRandomInt(maxVal, minVal) {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

// ============ Events ============
guessBtn.addEventListener('click', main);

clearBtn.addEventListener('click', function () {
  guessInput.value = "";
});

resetBtn.addEventListener('click', setupGame);

// --Enter Key Funcionality--
guessInput.addEventListener('keyup', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    main();
  }
  if (event.keyCode == 27) {
    guessInput.value = "";
  }
});

// --Toggle Input Range Container--
settingsBtn.addEventListener('click', function(event) {
  event.preventDefault();
  if (settingsVisibility) {
    rangeContainer.style.display = 'none';
    settingsVisibility = false;
  }
  else {
    rangeContainer.style.display = 'block';
    settingsVisibility = true;
  }
});

setRangeBtn.addEventListener('click', function(event) {
  max = parseInt(maxInput.value);
  min = parseInt(minInput.value);
  customGame();
  // TODO: remove log
  console.log(randomNumber);
});

// BUG: set max and min maybe wit default
// TODO: emoji win animation
// TODO: lose game event
// TODO: lives and lost emoji
// TODO: hearts lose lives
// TODO: scoring
// TODO: 2players
// TODO: create readme.md IMPORTAN!!!!!!!!!!!!!!!!!
// TODO: disabled buttons
