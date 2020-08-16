let game = new Memory();
//Setup init vars of the game
game.init();

//Grab all game cards
htmlGrid = document.querySelector(".grid-container");
htmlGrid.addEventListener("click", (e) => {
  console.log("Click event");
  let target = game.getTarget(e);
  if (game.isValidTarget(target)) {
    if (game.firstFlip()) {
      console.log("Games first click");
      game.hideAllCards();
      game.numFlips++;
    } else {
      game.revertCardsPicked();
      game.handleCard(target);
      game.checkMatch();
      game.updateHtml();
    }
  }
});
