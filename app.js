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
};
//Event handlers
const handleCardClick = (e) => {
  if (points < 10) {
    //Play game
  } else {
    console.log("Game is currently over! You win!");
  }
  // newBoard();
  if (firstCard == -1) {
    handleFirstCard(e);
  } else {
    handleSecondCard(e);
    //Reset first pick
    firstCard = -1;
  }
};
initSetup();

newBoard();
