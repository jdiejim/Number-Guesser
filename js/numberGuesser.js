// ============ Global Variables ============
// Game Environment
var level;
var lives;
var max;
var min;
var randomNumber;
var settingsVisibility;
// Inputs
var guessInput = document.getElementById('guessInput');
var maxInput = document.getElementById('maxInput');
var minInput = document.getElementById('minInput');
var settingsBtn = document.getElementById('settingsBtn');
// Buttons
var clearBtn = document.getElementById('clearBtn');
var guessBtn = document.getElementById('guessBtn');
var resetBtn = document.getElementById('resetBtn');
var setRangeBtn = document.getElementById('setRangeBtn');
// Elements
var emojiElement = document.getElementById('emoji-element');
var errorMsg = document.getElementById('error-msg');
var feedback = document.getElementById('feedback');
var indicator = document.getElementById('indicator');
var lastGuess = document.getElementById('last-guess');
var newRanges = document.getElementById('new-ranges');
var rangeContainer = document.getElementById('range-container');

// ================= Main ===================

setupGame();          // Setup Game Environment to default values

// Main Function checks for errors and starts game
function main() {
  console.log(randomNumber);
  var guess = parseInt(guessInput.value);         // Gets value from guess input

  // Update DOM Element Data
  errorMsg.innerText = "";                        // Removes text in error message
  indicator.innerText = "Your last guess was";    // Indicator default text
  lastGuess.innerText = guess;                    // Element displays last guess
  emojiElement.innerText = "";
  newRanges.className = "";                       // Removes animation from new ranges element
  newRanges.innerText = "";                       // Removes text from new ranges element

// Error filter
  if (guess > max || guess < min || isNaN(guess)) {
    errorMsg.innerText = "Please enter a number \n between " + min + " and " + max;  // Displays error message to user
    feedback.innerText = "Please enter a Number";                                 // Feedback element asks user for new input
    indicator.innerText = "Boo! Not Cool";                                        // Indicator alerts message to user
    loadEmoji('error');                                                           // Renders emoji of type error
  }

// Guess Number Comparison
  if (guess > randomNumber) {
    feedback.innerText = "That is too high";          // Updates feedback with meesage
    lives -= 1;
  }
  if (guess < randomNumber) {
    feedback.innerText = "That is too low";           // Updates feedback with meesage
    lives -= 1;
  }
  if (guess === randomNumber) {
    levelUp();                                        // Setup for next level environment
  }
}

// =============== Functions =================

// Default Setup for Game Environment
function setupGame() {
  level = 1;                              // Updates level to default value
  lives = 5;                              // Updates lives to default value
  max = 100;                              // Updates max range to default value
  min = 0;                                // Updates min range to default value
  randomNumber = getRandomInt(max, min);  // Generates random number with default ranges for round
  settingsVisibility = false;             // Settings element not visible
  loadEmoji('start');                     // Renders emoji of type start

  // Update DOM Elements Data to default values
  errorMsg.innerText = "";
  feedback.innerText = "Click Guess to START GAME!";
  guessInput.value = "";
  indicator.innerText = "Good Luck!";
  maxInput.value = 100;                                                 // Sets max Input value to default range
  minInput.value = 0;                                                   // Sets min Input value to default range
  newRanges.className = "";                                             // Removes animation to new ranges element
  newRanges.innerText = "";

  // Sets Attributes for Default Range Inputs
  guessInput.setAttribute('max', 100);          // Sets attribute to default value
  guessInput.setAttribute('min', 0);            // Sets attribute to default value
}

// Level Up Setup for Game Environment after User wins round
function levelUp() {
  level += 1;                               // Increases level of difficulty by 1
  lives = 5;                                // Updates lives to default value
  max += 10;                                // Increases max range by 10
  min -= 10;                                // Reduces min range by 10
  randomNumber = getRandomInt(max, min);    // Generates new random number with new ranges for round
  loadEmoji('win');                         // Renders emoji of type win

  // Update DOM Elements Data after user wind round
  feedback.innerText = "BOOM!";
  guessInput.value = "";
  indicator.innerText = "Awesome! Get Ready!";
  newRanges.className += "spark";                                                         // Adds animation to new ranges element
  newRanges.innerText = "Level " + level + ":   Guess between " + min + " and " + max + "\n Click Guess Button to start";    // Updates new ranges element text
  maxInput.value = max;                                                                   // Sets max Input value to new max range
  minInput.value = min;                                                                   // Sets min Input value to new min range

  // Sets Attributes for Updated Range Inputs
  guessInput.setAttribute('max', max);        // Sets attribute to updated value
  guessInput.setAttribute('min', min);        // Sets attribute to updated value
}

// Custom Setup for Game Environment after User defines ranges
function customGame() {
  level = 1;                                  // Updates level to default value
  lives = 5;                                  // Updates lives to default value
  randomNumber = getRandomInt(max, min);      // Generates random number with custom ranges for round
  loadEmoji('start');                         // Renders emoji of type start

  // Update DOM Element Data
  feedback.innerText = "Click Guess to START GAME!";
  guessInput.value = "";
  indicator.innerText = "Good Luck!";
  maxInput.value = max;                                                   // Sets max Input value to custom max range
  minInput.value = min;                                                   // Sets min Input value to custom min range
  newRanges.className = "";                                               // Removes animation to new ranges element
  newRanges.innerText = "";

  // Set Attribute for Defined Range Inputs
  guessInput.setAttribute('max', max);        // Sets attribute to custom value
  guessInput.setAttribute('min', min);        // Sets attribute to custom value
}

// Generates random interger between two values inclusive
function getRandomInt(maxVal, minVal) {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

function loadEmoji(type) {
  // Emojis Arrays
  var errorEmojis = [
    '(ಥ﹏ಥ)',
    'ಥ_ಥ',
    '༼ つ ◕_◕ ༽つ',
    'ლ(ಠ益ಠლ)',
    '༼ つ ಥ_ಥ ༽つ'
  ];
  var startEmojis = [
    "(ง'̀-'́)ง",
    '(◕‿◕✿)',
    '(¬‿¬)',
    '╚(ಠ_ಠ)=┐',
    '(｡◕‿◕｡)'
  ];
  var winEmojis = [
    '(~˘▾˘)~',
    '~(˘▾˘~)',
    '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    'ヾ(⌐■_■)ノ♪',
    '♥‿♥'
  ];
  var randEmoji = getRandomInt(-1, 5);                // Generates random index for array
  lastGuess.innerText = "";
  switch (type) {                                     // Selects emoji based on type parameter and random index
    case 'error':
      emojiElement.innerText = errorEmojis[randEmoji];
      break;
    case 'win':
      emojiElement.innerText = winEmojis[randEmoji];
      break;
    case 'start':
      emojiElement.innerText = startEmojis[randEmoji];
      break;
    default:
      emojiElement.innerText = startEmojis[randEmoji];
  }
}

// ================ Events ==================

clearBtn.addEventListener('click', function () {              // Clear Button Event: clears value in guess input
  guessInput.value = "";
});

guessBtn.addEventListener('click', main);                     // Guess Button Event: triggers main() to start game

guessInput.addEventListener('keyup', function(event) {        // Overides Enter/Esc Key default functionality
  if (event.keyCode == 13) {
    event.preventDefault();                                   // Overides Enter Key default functionality
    main();                                                   // Triggers main() to start game
  }
  if (event.keyCode == 27) {
    guessInput.value = "";                                    // Esc Key clears value in guess input
  }
});

resetBtn.addEventListener('click', setupGame);                // Reset Button Event: set up new game with default environment

setRangeBtn.addEventListener('click', function(event) {       // Range Button Event: triggers custom Game Environment with defined input ranges
  max = parseInt(maxInput.value);
  min = parseInt(minInput.value);
  customGame();
});

settingsBtn.addEventListener('click', function(event) {       // Setting Button Event: Toggles element style display property to hide range container
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



//phase 1
// TODO: README.md

//phase 2
// TODO: clear button disabled
// TODO: rest button disabled

//phase 4
// TODO: 2 player
// TODO: Scoring based on time
// TODO: Game to teach basic arithmetic to kids
// TODO: Update UI

//Important!
// TODO: Responsive CSS
// TODO: Aria and Accesibility
// TODO: HTML semantics
// TODO: HTML tags
// TODO: id names

//other
// TODO: emoji win Animations
// TODO: lives functionality
// TODO: lose game event
// TODO: hearts lose lives
// TODO: hearts animations
