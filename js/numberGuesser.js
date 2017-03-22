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
var lastGuess = document.getElementById('last-guess');
var rangeContainer = document.getElementById('range-container');
// --Emojis--
var errorEmojis = ['(ಥ﹏ಥ)', 'ಥ_ಥ', '༼ つ ◕_◕ ༽つ', 'ლ(ಠ益ಠლ)', '༼ つ ಥ_ಥ ༽つ'];
var startEmojis = ["(ง'̀-'́)ง", '(◕‿◕✿)', '(¬‿¬)', '╚(ಠ_ಠ)=┐', '(｡◕‿◕｡)'];
var winEmojis = ['(~˘▾˘)~', '~(˘▾˘~)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(づ｡◕‿‿◕｡)づ', '♥‿♥' ];

// TODO: rearange main

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
    loadEmoji('error');
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

// TODO: figure how to make max and min disape
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
  loadEmoji('win');
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

function loadEmoji(type) {
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
function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

// TODO: Bug on random variable; suggestion: setupGame with defaul min max as parameters
setRangeBtn.addEventListener('click', function(event) {
  setupGame();
  max = maxInput.value;
  min = minInput.value;
  console.log('max');
  console.log(max);
  console.log('min');
  console.log(min);
  console.log('random');
  console.log(randomNumber);
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  // main();
  console.log('max value');
  console.log(maxInput.value);
});

// TODO: level up message with new rules
// TODO: lose game event
// TODO: lives and lost emoji
