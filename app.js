let game = new Memory();
//Setup init vars of the game
//&&Need to allow a glimpse to the player at beginning of game to give a chance at winning
game.init();

//Grab all game cards
htmlGrid = document.querySelector(".grid-container");
htmlGrid.addEventListener("click", (e) => {
  if (game.firstFlip()) {
    game.hideAllCards();
    game.numFlips++;
  } else {
    game.revertCardsPicked();
    game.handleCard(e.currentTarget);
    game.checkMatch();
    game.updateHtml();
  }
});

//Find the font awesome class from the event
// e.currentTarget.firstElementChild.classList[1]
