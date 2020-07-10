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
    if (e.target.id == "" && cardsPicked.length !== 2) {
      console.log("Can't pick null card!");
      return;
    }

    if (cardsPicked.length === 0) {
      handleFirstCard(e);
    } else if (cardsPicked.length === 1) {
      handleSecondCard(e);
    } else if (cardsPicked.length === 2) {
      if (isMatch()) {
        //Update score
        points++;
        score.innerHTML = `Score: ${points}`;
        //Remove cards from board
        rmPair();
      } else {
        //Flip cards back over
        flipPair();
      }

      //Clear stack regardless of right or wrong pair
      cardsPicked.pop();
      cardsPicked.pop();
    } else {
      console.log(
        "Game glitched! Cards picked over or underflowed",
        "Cards picked length: ",
        cardsPicked
      );
    }
  } else {
    //No more pairs are available
    console.log("Congratulations on finding all pairs! You win!");
  }
};
initSetup();
