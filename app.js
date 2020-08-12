let game = new Memory();
//Setup init vars of the game
//&&Need to allow a glimpse to the player at beginning of game to give a chance at winning
game.init();

//Grab all game cards
htmlGridItems = document.querySelectorAll(".grid-item");

//Find the font awesome class from the event
// e.currentTarget.firstElementChild.classList[1]

//Main Game event handler
for (gridItem of htmlGridItems) {
  gridItem.addEventListener("click", (e) => {
    game.revertCardsPicked();
    game.handleCard(e.currentTarget);
    game.checkMatch();
    game.updateHtml();
  });
}
