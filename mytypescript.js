const initialGameState = {
  // makes an object with the intial game state, so that the game may be reset later
  playerIsReady: false,
  gameIsOver: false,
  incorrectWords: 0,
  currentSentence: null,
  currentCharacter: null,
  currentWord: null,
  currentInput: null,
};

const beginning = [
  //* makes an array with the sentences for the player to type - these are the instructions

  "type this sentence",
  "the sentences you need to type will show up here",
  "you do not need to press enter or space when you finish a line",
  "a timer will start when you finish the next line",
  "ready",
];

const sentences = [
  //* makes an array with the sentences for the player to type - these are the actual game sentences
  "Big one",
  "Small two",
  "test three seven",
  /*
  "this one is easy",
  "His name is Ervin Howell", // ;)
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
/*
const timer = new Date();
let timeOne = timer.getTime();
let timeTwo;
let timeThree;

console.log(timeOne);


start timer on document load
get time upon pressing ready

calc elapsed time
check if ready and time is greater than elapsed time?
*/

$(document).ready(function () {
  let currentGameState = { ...initialGameState }; // this copies the initialGameState object and names it currentGameState.  it has to go outside the keypress func, otherwise it will fire on every key

  // setting the currentGateState variables
  let s = 0; // serves as the index of the current sentence to traverse through the sentences array
  //let w = 0; // serves as the index of the current word to traverse through the sentences array
  let c = 0; // serves as the index of the current character
  currentGameState.currentSentence = beginning[s]; // sets the current sentence
  currentGameState.currentCharacter = beginning[s][c]; // sets the current character
  currentGameState.currentInput = ""; // sets the current input as an empty string
  let elapsedTime = -1;
  let wordsPerMinute = -1;

  console.log(`you need to press ${currentGameState.currentCharacter}`); // logs the current character to press

  document.getElementById("target-letter").innerHTML = beginning[s]; // sets the sentence text

  let wordCount = sentences.join(" ").split(" ").length; // wordCount is the count of the words of the sentences array.  i can reference this later to calc the words per minute
  //console.log(wordCount);

  $(document).keydown(function (event) {
    // this function will show the uppercase keyboard, and apply a background to pressed keys
    //let thisKeyString = thisKey.toString(); //**did not work
    let thisKey = event.key;
    //console.log(`${thisKey} was just pressed`); //? for debugging
    let thisKeyCode = event.which;
    //console.log(`${thisKeyCode} code was just pressed`); //? for debugging
    //$(`#${thisKey}`).css("background-color", "lightblue");

    $(`span:contains('${thisKey}')`).css("background-color", "lightblue"); // highlights the key pressed.  selector looks for the specific character within all spans of the html

    //*!  backslash, single quote, and spacebar keys do not hightlight from event.key
    // fixed this with the IF statements below

    if (thisKeyCode === 220) {
      // sets highlighting for the backslash key
      $(`#${92}`).css("background-color", "lightblue");
    }
    if (thisKeyCode === 222) {
      // sets highlighting for the single quote key
      $(`#${39}`).css("background-color", "lightblue");
    }
    if (thisKeyCode === 32) {
      // sets highlighting for the spacebar
      $(`#${32}`).css("background-color", "lightblue");
    }

    if (event.key === "Shift") {
      // when Shift is pressed, this will swap the to the appropriate keyboard
      // console.log("Key down was fired"); //?for debugging
      // console.log("Shift was pressed!");//?for debugging
      // console.log(event.key);//?for debugging
      $("#keyboard-lower-container").css("display", "none"); // hide the lower keyboard
      $("#keyboard-upper-container").css("display", "inherit"); // show the upper keyboard - inherit should restore it to the default display
    }
  });

  $(document).keyup(function (event) {
    // this function will swap keyboards, and reset the background of pressed keys
    //! if 2 keys are held, and one is released, both backgrounds are un-highlighted. - this probably isn't a big deal

    $("span").css("background-color", "#F5F5F5"); // removes the highlighting of the key by reverting to the default, i had to hardcode the color.  selector looks for the specific character within all spans of the html
    $(`#${32}`).css("background-color", "#F5F5F5"); // restores the spacebar background to default. this is separate because in the html, the spacebar is a div, and the above would not capture it
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
        // When the input matches the expected character
        c++;
        currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array

        if (s === beginning.length && c === beginning[s][c].length) {
          //when the player types the last character of the last sentence, they are done with tutorial
          console.log("The player should be ready!");

          currentGameState.playerIsReady = true;
          currentGameState.currentInput = null; // sets the current input to null so that the startover function does not immediately fire upon pressing the 'y' from 'ready'

          setNewSentence();
        }
        if (c === beginning[s][c].length) {
          //when the player completes a sentence of the tutorial
          setNewSentence();
        }
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      } else {
        // when the input does not match the expected character
        startOverLoser();
      }
    }

    //******************************************************When player is ready*****************************************************************************/

    if (
      currentGameState.playerIsReady === true &&
      currentGameState.currentInput
    ) {
      //console.log(currentGameState); //? for debugging
      //! this if block fires immediately after player pesses the 'y' from 'ready' which changes the playerIsReady status to true
      //! the problem is that currentCharacter = B and currentInput = y upon pressing the 'y' from 'ready'

      //! i fixed this by setting currentGameState.currentInput = null immediately upon finishing the 'y' from 'ready'
      //! then i added the && currentGameState.currentInput, which evaluates to false when there is no input, because null is falsy
      //! however, upon typing a character, currentGameState.currentInput is assigned a value, which is truthy

      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        // When the input matches the expected character
        c++;
        currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array

        if (c === sentences[s].length) {
          //!  need to fix this here^^
          // when the player has reached the end of the current sentence
          s++; // moves to the next sentence index
          setNewSentence();
          console.log("The player is moving on!");
        }
        console.log(`you need to press ${currentGameState.currentCharacter}`);
      } else {
        // when the input does not match the expected character
        console.log(`current char = ${currentGameState.currentCharacter}`);
        console.log(`current input = ${currentGameState.currentInput}`);
        startOverLoser();
      }
    }
  });

  function startOverLoser() {
    console.warn("start over loser fired");
    c = 0; // sets character index to zero
    currentGameState.incorrectWords++; // increments the incorrect word count
    console.log(`c is ${c}`); //? for debugging
    console.warn(
      //? for debuggin
      `Your current incorrect word count is: ${currentGameState.incorrectWords}`
    );
    currentGameState.currentInput = ""; // sets the current input as an empty string
    console.log(`you need to press ${currentGameState.currentCharacter}`); // logs the current character to press

    if (currentGameState.playerIsReady === false) {
      // this occurs when an incorrect character is typed during the tutorial
      currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array
    } else {
      // this occurs when an incorrect character is typed during the game
      currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
    }
  }

  function setNewSentence() {
    c = 0; // sets character index to zero
    s++; // increments the sentence index by 1

    if (currentGameState.playerIsReady === false) {
      // chooses the correct sentence array for tutorial or in-game
      currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array
      document.getElementById("target-letter").innerHTML = beginning[s]; // sets the current sentence text
    } else {
      // chooses the correct sentence array for tutorial or in-game
      currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
      document.getElementById("target-letter").innerHTML = sentences[s]; // sets the current sentence text
    }
  }

  function showResults() {
    console.log("The game is over!");
    console.log(
      `You typed ${currentGameState.incorrectWords} words incorrectly`
    );
    console.log(`You took ${elapsedTime} to finish the game`);
    console.log(`You typed at a rate of ${wordsPerMinute}`);
  }
});

/**
 *
 * todo - make keypress function detect if shift was pressed so i can hide / display the proper keyboard //*? done
 * todo - highlight the current character on the keyboard, then unhighlight it //*? done
 * todo - make the current sentence show up //*?done
 * todo - add a timer that starts when player has finished typing 'ready'
 *  - use a date function to set a start time, call it again to set an end time, and diff = time elapsed
 * todo - make the yellow block move upon each correct key press
 *  - when c increments, have it also move the yellow block
 * todo - split each sentence element into their own array to set up current words
 *  - video @1:33 starts the array methods for splitting etc
 * todo - if an incorrect character is entered, to reset the current word progress
 *  - if (currentGameState.currentCharacter !== currentGameState.currentInput) then keep w and set c=0
 * todo - move on from a sentence element in the sentences array after finishing the last work in that sentence
 * todo -
 * todo -
 *
 *
 */

/*
 * defines the major code blocks
 * document ready function
 * {
 * keypress function
 * {
 * if not ready {at end of block - set currentGameState.playerIsReady to "true" based on typing the final character of the final word of the "beginning" array}
 * if ready {at end of block - currentGameState.set gameIsOver to "true" based on typing the final character of the final word of the "beginning" array}
 * if done{ needs to display the time taken, incorrect instances, a restart button to set currentGameState back to initialGameState}
 * }
 * }
 */

/*
how to move on when the last char of the last sentence is typed?

s = current sentence
c = current character

array[s].length is the amount of sentences in the array
array[s][c].length is the amoung of characters of that particular sentence

thus if s and c are at max, then we are at the end char of the end sentence

if (s = array[s].length && c === array[s][c].length) { then we are at the last char of the last sentence}
*/

/*
when to move on to next sentence?
if (c === array[s][c].length) {then we are at the last char of the particular sentence}


*/
