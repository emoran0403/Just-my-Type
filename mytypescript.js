const initialGameState = {
  // makes an object with the intial game state, so that the game may be reset later
  playerIsReady: false,
  incorrectWords: 0,
  currentSentence: null,
  currentCharacter: null,
  currentWord: null,
  currentInput: null,
};

const beginning = ["ready"];

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

// let test = sentences[0].split(" ");
// console.log(test);

$(document).ready(function () {
  let currentGameState = { ...initialGameState };

  /**
   this copies the initialGameState object and names it currentGameState.  it has to go outside the keypress func, otherwise it will fire on every key
   */

  let s = 0; // serves as the index of the current sentence to traverse through the sentences array
  //let w = 0; // serves as the index of the current word to traverse through the sentences array
  let c = 0; // serves as the index of the current character
  currentGameState.currentSentence = beginning[s]; // sets the current sentence
  currentGameState.currentCharacter = beginning[s][c]; // sets the current character
  currentGameState.currentInput = "";

  if (currentGameState.playerIsReady === false) {
    // when the player is not ready, this will run.
    console.log("player is not ready");
    console.log(currentGameState);
    console.log(`you need to press ${currentGameState.currentCharacter}`);

    $(document).keypress(function (event) {
      let keyCode = event.which; // stores the ascii code for the key which was pressed
      //console.log(keyCode); // for checking the ascii code of the key that was pressed
      currentGameState.currentInput = $(`#${keyCode}`).text(); // gets the letter that was pressed via jQuery
      //document.getElementById(keyCode).innerHTML; // gets the letter that was pressed via DOM
      console.log(`you pressed ${currentGameState.currentInput}`);

      if (
        currentGameState.currentCharacter === currentGameState.currentInput && // this checks if the current input matches the needed character, while in the un-ready state
        currentGameState.playerIsReady === false
      ) {
        c++;
        currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array
        /*
        if (c === beginning[0].length) {
          c = 0;
          console.log("The player should be ready!");
          currentGameState.playerIsReady = true;
          console.log(currentGameState);
          currentGameState.currentSentence = sentences[s]; // sets the current sentence
          currentGameState.currentCharacter = sentences[s][c]; // sets the current character
        }*/
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      }
    });
  }
  //******************************************************When player is ready**************************************************************************** */
  if (currentGameState.playerIsReady === true) {
    $(document).keypress(function (event) {
      let keyCode = event.which; // stores the ascii code for the key which was pressed
      // console.log(keyCode);
      currentGameState.currentInput = $(`#${keyCode}`).text();
      console.log(`you pressed ${currentGameState.currentInput}`);

      if (
        currentGameState.currentCharacter === currentGameState.currentInput && // this checks if the current input matches the needed character, while in the ready state
        currentGameState.playerIsReady === true
      ) {
        c++;
        currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      }
    });
    /*
    if (
      currentGameState.currentWord[currentGameState.currentWord.length - 1] &&
      currentGameState.currentInput === currentGameState.currentCharacter
    ) {
    }
*/
    //console.log("you are definitely ready now!");
    c++;
    console.log(`you need to press ${currentGameState.currentCharacter}`);
    currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
    console.log(`you need to press ${currentGameState.currentCharacter}`);
  }
});

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
 *upper display starts at style="display: none;"  when shift is held, hide lower and show upper, when shift is released, hide upper and show lower
 *
 *
 *
 *
 */
