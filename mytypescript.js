const initialGameState = {
  // makes an object with the intial game state, so that the game may be reset later
  playerIsReady: false,
  incorrectWords: 0,
  currentSentence: null,
  currentWord: null,
};

$(document).ready(function () {
  //console.log("awyea weve got jq linked!");

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
      console.log($(`#${keyCode}`).text()); // takes the ascii code, finds that id from html, then returns the text stored there, thus giving the character that was pressed
    }
  });
});
