'use strict';

// Assigning all required elements to variables here

// Elements that need updating

const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

// The unhide the dice image

const diceEl = document.querySelector('.dice');

// All the button elements

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// All variables needed for the game mechanics

let scores;
let currentScore;
let activePlayer;

// This variable is set to false when a player has reached >= 100
let playing = true;

// Lets create an init function here and reset all elements

const init = () => {
  // resets all the variables

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset the score elements to zero
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Reset the current score element to zero

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // Resetting the player--active class

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Removes player--winner class from both player elements

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

// invoke the init function to initialise settings for the whole app

init();

// Lets create a helper function here to switch the player

/*
    * Reset the playing variable to true - would have been set to false if player reached 100
    * Reset the currentScore variable of the active player 
    * Reset the score element to zero of the active player
    * Update the activePlayer variable to other player
    * Change the section style background to player--active for the switched player
    
*/

const switchPlayer = () => {
  playing = true;

  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Lets begin when the user clicks on the "Roll the dice" button

/*

    * Determine if playing variable is true
    * Remove the hidden class from dice element to unhide the image
    * Generate a random number between 1 - 6 for the dice roll
    * Update the dice element's SRC attribute with this rolled dynamic value
    * Check if the dice roll is not a 1 
    * If not 1 then update the current score element of the active player else switch the player 


*/

btnRoll.addEventListener('click', function () {
  if (playing) {
    const rolled = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');

    diceEl.src = `./images/dice-${rolled}.png`;

    console.log(diceEl.src);

    if (rolled !== 1) {
      // Update the currentScore variable with the random dice roll
      currentScore += rolled;

      console.log(currentScore);
      // Update the current score element to the currentScore
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player

      switchPlayer();
    }
  }
});

// When the user clicks to hold their current score

/*

    * Check if the playing variable is truthy
    * Check if the currentScore is not >= 100 
    * Save the current score to the score variable based on the active player
    * Render the score of the active player
    * Switch the player
    * If the currentScore is >= 100 then change player variable to false and apply player--winner styles by adding it to the active player and remove player--active from the classList
    * Set the player variable to false
    * Render the current score to zero
    * Hide the dice image from view 

*/

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    console.log(scores);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // If scores[activePlayer] is >= 100 then apply player--winner styles and hide the dice image from view

    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .getElementById(`player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .getElementById(`player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`current--${activePlayer}`).textContent = 0;

      diceEl.classList.add('hidden');
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

// To restart the game user clicks on "Play new game" button, all elements and variables will be reset using init() function.

btnNew.addEventListener('click', init);
