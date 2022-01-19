const initialGameState = {
  // makes an object with the intial game state, so that the game may be reset later
  playerIsReady: false,
  incorrectWords: 0,
  currentSentence: null,
  currentCharacter: null,
  currentInput: null,
};

const beginning = ["Ready"];

const sentences = [
  // makes an array with the sentences for the player to type
  "Test sentence one",
  "Test sentence 2!",
  /**
     "this one is easy",
     "Capitals are a little more difficult",
     "How About Some Title Case",
     'Maybe, with some punctuation, "this!" will be a little easier; or not?',
     "howaboutasentencetypedasifyourspacebarwasbroken",
     "maybe-you-just-want-to-dash-your-way-through-the-game",
     "their, they're, there, to, two, too",
     "1, 1, 2, 3, 5, 8, and 13 start the Fibonacci Sequence",
     "(-b+sqrt(b^2-4ac))/2a and (-b-sqrt(b^2-4ac)) give the roots of the general quadratic: ax^2+bx+c=0",
     "last one!",
     "jk"
     */
];

$(document).ready(function () {
  let currentGameState = { ...initialGameState };

  /**
  this copies the initialGameState object and names it currentGameState.  it has to go outside the keypress func, otherwise it will fire on every key
  */

  currentGameState.currentSentence = beginning[0]; // sets the current Sentence to Ready
  currentGameState.currentCharacter = beginning[0][0]; // sets the current character to R
  currentGameState.currentInput = "";

  if (currentGameState.playerIsReady === false) {
    // when the player is not ready, this will run.
    console.log("player is not ready");
    console.log(currentGameState);

    $(document).keypress(function (event) {
      let keyCode = event.which; // stores the ascii code for the key which was pressed
      console.log(keyCode);
      let letter = document.getElementById(keyCode).innerHTML; // gets the letter that was pressed
      console.log(letter);
      let idnum = $("#114").text(); // finds id 114 and returns the character there, thus going from ascii to character
      // i need to do the above dynamically with jquery.  this is where im leaving off for today :)
      console.log(idnum);
      let newnum = $("keycode");
      console.log(newnum);

      /*
      console.log(`the key code is ${keyCode}`);
      let thisletter = $("#${keyCode}").text();
      console.log(`the letter is ${thisletter}`);

      console.log($(`the text is #${keyCode}`).text()); // takes the ascii code, finds that id from html, then returns the text stored there, thus giving the character that was pressed
      console.log(currentGameState);
*/
      /*if (currChar === currentGameState.currentCharacter) {
        console.log("the right key was pressed");
        console.log(currentGameState);
      }*/
    });
  }

  if (currentGameState.playerIsReady === true) {
    // when the player is ready, this will run.

    console.log("player is ready");
    $(document).keypress(function (event) {
      //remove me
    });
  }
});

/**
 *
 *
 *
 *
 *
 *
 * start at playerIsReady: false
 * this means game must be looking for key presses
 * i can have 2 key press functions, one looking for when player is ready and not ready,but do i need that?
 *
 * when the player has typed ready, set playerIsReady: true
 *
 *
 *
 *
 *
 *how to check if the correct key was pressed?
 get the ascii code from the event
 translate that into the character
 use if to compare that to the current character
 if true then increment the current letter
 if the letter is the last letter of the word, increment the word
 if the word is the last word of the sentence, go to the next sentence
 *
 *
 *
 *
 *
 *
 *
 */
