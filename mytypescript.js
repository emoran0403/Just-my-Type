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
  "Big one",
  "Small two",
  /*
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
  "jk",
  */
];

$(document).ready(function () {
  let currentGameState = { ...initialGameState }; // this copies the initialGameState object and names it currentGameState.  it has to go outside the keypress func, otherwise it will fire on every key

  // setting the currentGateState variables
  let s = 0; // serves as the index of the current sentence to traverse through the sentences array
  //let w = 0; // serves as the index of the current word to traverse through the sentences array
  let c = 0; // serves as the index of the current character
  currentGameState.currentSentence = beginning[s]; // sets the current sentence
  currentGameState.currentCharacter = beginning[s][c]; // sets the current character
  currentGameState.currentInput = ""; // sets the current input as an empty string

  console.log(`you need to press ${currentGameState.currentCharacter}`); // logs the current character to press

  document.getElementById("target-letter").innerHTML = beginning[s]; // sets the current sentence text

  $(document).keydown(function (event) {
    // this function will show the uppercase keyboard, and apply a background to pressed keys
    //let thisKeyString = thisKey.toString(); //**did not work
    let thisKey = event.key;
    console.log(`${thisKey} was just pressed`); //? for debugging
    let thisKeyCode = event.which; //? for debugging
    console.log(`${thisKeyCode} code was just pressed`);
    //$(`#${thisKey}`).css("background-color", "lightblue");

    //*!  these keys do not hightlight from event.key:  \  '   <spacebar>

    if (thisKeyCode === 220) {
      // sets highlighting for  \
      $(`#${92}`).css("background-color", "lightblue");
      //thisKeyCode = null;
    }
    if (thisKeyCode === 222) {
      // sets highlighting for  '\'
      $(`#${39}`).css("background-color", "lightblue");
      //thisKeyCode = null;
    }
    if (thisKeyCode === 32) {
      // sets highlighting for  spacebar
      $(`#${32}`).css("background-color", "lightblue");
      //thisKeyCode = null;
    }

    $(`span:contains('${thisKey}')`).css("background-color", "lightblue"); // highlights the key pressed.  selector looks for the specific character within all spans of the html

    if (event.key === "Shift") {
      // when Shift is pressed
      // console.log("Key down was fired"); //?for debugging
      // console.log("Shift was pressed!");//?for debugging
      // console.log(event.key);//?for debugging
      $("#keyboard-lower-container").css("display", "none"); // hide the lower keyboard
      $("#keyboard-upper-container").css("display", "inherit"); // show the upper keyboard - inherit should restore it to the default display
    }
  });

  $(document).keyup(function (event) {
    // this function will hide the uppercase keyboard, and reset the background of pressed keys
    $("span").css("background-color", "#F5F5F5"); // removes the highlighting of the key by reverting to the default, i had to hardcode the color.  selector looks for the specific character within all spans of the html
    $(`#${32}`).css("background-color", "#F5F5F5"); // restores the spacebar background to default
    if (event.key === "Shift") {
      // console.log("Key up was fired"); //?for debugging
      // console.log("Shift was released!"); //?for debugging
      // console.log(event.key); //?for debugging
      $("#keyboard-upper-container").css("display", "none"); // hide the lower keyboard
      $("#keyboard-lower-container").css("display", "inherit"); // show the upper keyboard - inherit should restore it to the default display
    }
  });

  $(document).keypress(function (event) {
    // defines the keypress function upon which the game logic runs
    let keyCode = event.which; // stores the ascii code for the key which was pressed
    currentGameState.currentInput = $(`#${keyCode}`).text(); // gets the letter that was pressed via jQuery // <document.getElementById(keyCode).innerHTML;> // gets the letter that was pressed via DOM
    console.log(`you pressed ${currentGameState.currentInput}`); // logs the key that was pressed as a letter not ascii

    //******************************************************When player is not ready*****************************************************************************/

    if (currentGameState.playerIsReady === false) {
      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        //
        c++;
        currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array

        if (c === beginning[0].length) {
          c = 0;
          console.log("The player should be ready!");
          currentGameState.playerIsReady = true;
          currentGameState.currentSentence = sentences[s]; // sets the current sentence
          currentGameState.currentCharacter = sentences[s][c]; // sets the current character
          console.log(currentGameState);
          document.getElementById("target-letter").innerHTML = sentences[s]; // sets the current sentence text
        }
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      }
    }

    //******************************************************When player is ready*****************************************************************************/

    if (currentGameState.playerIsReady === true) {
      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        //
        c++;
        currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array

        if (c === sentences[s].length) {
          c = 0;
          s++;
          console.log("The player is moving on!");
          document.getElementById("target-letter").innerHTML = sentences[s]; // sets the current sentence text
          currentGameState.currentSentence = sentences[s]; // sets the current sentence
          currentGameState.currentCharacter = sentences[s][c]; // sets the current character
          console.log(currentGameState);
        }
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      }
    }
  });
});

/**
 *
 * todo - make keypress function detect if shift was pressed so i can hide / display the proper keyboard //*? done
 * todo - highlight the current character on the keyboard, then unhighlight it
 * todo - add a timer that starts when player has finished typing 'ready'
 * todo - make the yellow block move upon each correct key press
 * todo - make the current sentence show up //*?done
 * todo - split each sentence element into their own array to set up current words
 * todo - if an incorrect character is entered, to reset the current word progress
 * todo - move on from a sentence element in the sentences array after finishing the last work in that sentence
 * todo - 
 * todo - 
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
 */

/*
 * defines the major code blocks
 * document ready function
 * {
 * keypress function
 * {
 * if not ready {}
 * if ready {}
 * }
 * }
 */

/*


      // console.log(keyCode);
      currentGameState.currentInput = $(`#${keyCode}`).text();

      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        c++;
        currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
        if ((c = sentences[0].length)) {
          s++;
          c = 0;
          console.log("should move on to test sentence 2?");
          console.log(currentGameState);
        }
        console.log(`you need to press ${currentGameState.currentCharacter}`);
        console.log(`C = ${c}`);
        console.log(`sentences length = ${sentences[0].length}`);
      }

      /*
    if (
      currentGameState.currentWord[currentGameState.currentWord.length - 1] &&
      currentGameState.currentInput === currentGameState.currentCharacter
    ) {
    }
*/
