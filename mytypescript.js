const initialGameState = {
  // makes an object with the intial game state, so that the game may be reset later
  playerIsReady: false,
  incorrectWords: 0,
  currentSentence: null,
  currentCharacter: null,
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
  // console.log("awyea weve got jq linked!");
  // console.log(sentences);

  $(document).keypress(function (event) {
    // console.log("this should show when i press a key on my document");

    let currentGameState = { ...initialGameState }; // this copies the initialGameState object and names it currentGameState

    if (currentGameState.playerIsReady) {
      // when the player is ready, this will run.  this happens after they type ready
      // console.log("player is ready!");
    } else {
      // when the player is not ready, this will run.
      // console.log("player is not ready!");

      /**
      .which + keypress = ASCII code for the character that was entered, nice.  Key press respects uppercase vs lowercase characters
      */

      let keyCode = event.which; // stores the ascii code for the key which was pressed
      //let keyLetter =
      console.log($(`#${keyCode}`).text()); // takes the ascii code, finds that id from html, then returns the text stored there, thus giving the character that was pressed
      //$(`#${keyCode}`).css({ backgroundColor: "Blue" });
    }
  });
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
 *
 *
 *
 *
 *
 *
 *
 *
 */
