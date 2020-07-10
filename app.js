//Remove timer functions because of bugs.
//Add a initial check to see if cards are currently selected to show cards picked until player picks next card.

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

    //Don't allow user to pick empty card
    if (e.target.id == "") {
      console.log("Can't pick null card!");
      return;
    }
    if (cardsPicked.length === 0) {
      handleFirstCard(e);
    } else {
      if (isMatch()) {
      } else {
        handleSecondCard(e);
      }
      //on wrong pair show glimpse but reset content and remove class
      if (isMatch()) {
        setTimeout(() => {
          //Cards matched. Remove from game
          console.log("Short pause since correct.");
          cardsPicked[0].id = "";
          cardsPicked[1].id = "";
          cardsPicked.pop();
          cardsPicked.pop();
        }, 500);
      } else {
        setTimeout(() => {
          console.log("Incorrect guess take a glimpse!");
          cardsPicked[0].classList.remove("clicked");
          cardsPicked[1].classList.remove("clicked");
          cardsPicked[0].innerHTML = "";
          cardsPicked[1].innerHTML = "";
          cardsPicked.pop();
          cardsPicked.pop();
        }, 1000);
      }
    }
  } else {
    //No more pairs are available
    console.log("Congratulations on finding all pairs! You win!");
  }
};
initSetup();
