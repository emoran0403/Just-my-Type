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

  "type", // these sentences",
  "you", // will need punctuation!",
  "don't", // press enter or space when you finish a line",
  "time", // will start when you finish the next line",
  "ready",
];

const sentences = [
  //* makes an array with the sentences for the player to type - these are the actual game sentences
  "Big one",
  "Small two",
  "test three",
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

  let sentenceHere = document.getElementById("sentence");
  sentenceHere.innerHTML = beginning[s];
  let letterHere = document.getElementById("target-letter");
  let feedback = document.getElementById("feedback");

  let yellowBlock = $("#yellow-block"); // enables movement of the yellow block with the updatePage function

  console.log(`you need to press ${currentGameState.currentCharacter}`); // logs the current character to press

  updatePage();

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

    if (
      currentGameState.playerIsReady === false &&
      currentGameState.currentInput
    ) {
      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        // When the input matches the expected character
        c++; // this increments the character index
        currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the 'next' character based on the value of 'c'

        updatePage();

        if (s === beginning.length - 1 && c === beginning[s].length) {
          //! prettier removes the parentheses from (sentences.length-1)
          // this if block moves the player out of the tutorial and into the game if the 2 conditions are met:
          // first condition checks if the 's' matches the length of the entire array, thus if the player is at the last sentence of the array
          // second condition checks if 'c' matches the length of the 'current sentence' as denoted by the value of 's'
          moveToGame();
        }

        // console.log(`beginning s is ${beginning[s]}`); //?for debugging

        if (
          c === beginning[s].length &&
          currentGameState.playerIsReady === false
        ) {
          // this if block just checks if the player advances to the next sentence
          // condition checks if 'c' matches the length of the 'current sentence' as denoted by the value of 's'
          console.log(`beginning s is ${beginning[s]}`);
          setNewSentence();
          //! i think this is getting called right after the tutorial is over - look at the if block placement?
        }

        //console.log(`you need to press ${currentGameState.currentCharacter}`);
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
      if (currentGameState.currentCharacter === currentGameState.currentInput) {
        // When the input matches the expected character
        c++; // this increments the character index
        currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the 'next' character based on the value of 'c'
        updatePage();

        if (s === sentences.length - 1 && c === sentences[s].length) {
          //! prettier removes the parentheses from (sentences.length-1)
          // this if block moves the player out of the game and into the results if the 2 conditions are met:
          // first condition checks if the 's' matches the length of the entire array, thus if the player is at the last sentence of the array
          // second condition checks if 'c' matches the length of the 'current sentence' as denoted by the value of 's'
          showResults();
        }
        if (
          c === sentences[s].length &&
          currentGameState.playerIsReady === true &&
          s < sentences.length - 1
        ) {
          // this if block just checks if the player advances to the next sentence
          // condition checks if 'c' matches the length of the 'current sentence' as denoted by the value of 's'
          setNewSentence();
        }
        //console.log(`you need to press ${currentGameState.currentCharacter}`);
      } else {
        // when the input does not match the expected character
        startOverLoser();
      }
    }
  });

  //******************************************************Functions here*****************************************************************************/

  function startOverLoser() {
    // this function is called when the player types an incorrect character
    console.warn("start over loser fired"); //? for debugging
    c = 0; // sets character index to zero
    console.log(`c is now ${c}`); //? for debugging
    currentGameState.incorrectWords++; // increments the incorrect word count
    console.warn(
      //? for debugging
      `Your current incorrect word count is: ${currentGameState.incorrectWords}`
    );
    currentGameState.currentInput = null; // sets the current input to null

    if (currentGameState.playerIsReady === false) {
      // this occurs when an incorrect character is typed during the tutorial
      currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the beginning array
    } else {
      // this occurs when an incorrect character is typed during the game
      currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the beginning array
    }
    console.log(`you need to press ${currentGameState.currentCharacter}`); // logs the current character to press
    updatePage();
  }

  function setNewSentence() {
    c = 0; // sets character index to zero, so that the player starts at the beginning of the new sentence
    s++; // increments the sentence index by 1, so that the player will start on the next sentence

    if (currentGameState.playerIsReady === false) {
      currentGameState.currentCharacter = beginning[s][c]; // sets the current character to the first character in the 'beginning' array
      currentGameState.currentInput = null; // this prevents startOverLoser from firing immediately upon typing the last character of the previous sentence
      console.log(currentGameState);
      updatePage();
    } else {
      currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character in the 'beginning' array
      currentGameState.currentInput = null; // this prevents startOverLoser from firing immediately upon typing the last character of the previous sentence
      console.log(currentGameState);
      updatePage();
    }
  }

  function showResults() {
    console.log("The game is over, results will show later");
    letterHere.innerHTML = "";
    sentenceHere.innerHTML = "";
    feedback.innerHTML = `You typed ${wordCount} words in y minutes for a words per minute of z`;

    /*
    console.log(
      `You typed ${currentGameState.incorrectWords} words incorrectly`
    );
    console.log(`You took ${elapsedTime} to finish the game`);
    console.log(`You typed at a rate of ${wordsPerMinute}`);
    */
  }
  function moveToGame() {
    // moves the player out of the tutorial and into the game
    c = 0; // sets 'c' to zero to ensure the player starts on the first character
    s = 0; // sets 's' to zero to ensure the player starts on the first sentence
    console.log("The player should be ready!");
    currentGameState.playerIsReady = true; //  sets the player is ready status to true so that the game can begin
    currentGameState.currentCharacter = sentences[s][c]; // sets the current character to the first character of the first sentence of the sentences array
    updatePage();

    currentGameState.currentInput = null; // this prevents startOverLoser from firing immediately upon typing the last character of the previous sentence
  }
  function updatePage() {
    // this function updates the page by calling the update character and update sentence functions, and also moves the yellow block
    let yellowPixelMovement = newYellowPosition();
    yellowBlock.css("left", `${yellowPixelMovement}px`);

    updateCharacterOnPage();
    updateSentenceOnPage();
  }
  function updateCharacterOnPage() {
    if (currentGameState.playerIsReady === false) {
      // this function will change the current character on the page with respect to playerIsReady
      letterHere.innerHTML = beginning[s][c]; // sets the sentence text
    } else {
      letterHere.innerHTML = sentences[s][c]; // sets the sentence text
    }
  }
  function updateSentenceOnPage() {
    if (currentGameState.playerIsReady === false) {
      // this function will change the current sentence on the page with respect to playerIsReady
      sentenceHere.innerHTML = beginning[s]; // shows the sentence
    } else {
      sentenceHere.innerHTML = sentences[s]; // shows the sentence
    }
  }
  function newYellowPosition() {
    // this function moves the yellow block according to the current character position
    // note than when 'startOverLoser' is called, c is set to '0' before this function is called, thus returning the block to the starting position
    let yellowOffSet = c * 17.5;
    return yellowOffSet;
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

//*  array[s][c]

array.length is the amount of sentences in the array
array[s].length is the amount of characters for sentence 's'
array[s][c] is the character at index 'c' in sentence 's'
array[s][c].length looks at how many characters are at the 'c' position in sentence 's', this will always be 1

thus if s and c are at max, then we are at the end char of the end sentence

//! this wont work if (s = array[s].length && c === array[s][c].length) { then we are at the last char of the last sentence}
*/

/*
when to move on to next sentence?
if (c === array[s][c].length) {then we are at the last char of the particular sentence}


*/
