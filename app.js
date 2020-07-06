const initSetup = () => {
  //Push cards into array
  for (let i = 1; i <= numPairs; i++) {
    cards.push(i);
    cards.push(i);
  }
  //Add event handlers to all cards
  for (cardDiv of cardDivs) {
    cardDiv.addEventListener("click", handleCardClick);
  }
  //Reset button event handler
  resetBtn.addEventListener("click", resetBoard);

  //Setup fresh board
  resetBoard();
};
//Event handlers
const handleCardClick = (e) => {
  if (points < maxPoints) {
    //Game is live
    if (firstCard == -1) {
      handleFirstCard(e);
    } else {
      handleSecondCard(e);
      //Reset first pick
      // firstCard = -1;
    }
  } else {
    //No more pairs are available
    console.log("Congradulations on finding all pairs! You win!");
  }
};
initSetup();
