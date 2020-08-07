//Page vars
const score = document.querySelector(".score");
const cardDivs = document.querySelectorAll(".card");
const resetBtn = document.querySelector(".reset");
const message = document.querySelector(".message");
//Game vars
let points = 0;
let firstCard = -1;
let numPairs = Math.floor(cardDivs.length / 2);
let maxPoints = numPairs;
//Initial array containing all the pairs of cards
let cards = [];
let cardsPicked = [];

//Helper functions
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const isMatch = () => {
  if (cardsPicked.length < 2) {
    return false;
  } else {
    if (cardsPicked[0].id == cardsPicked[1].id) {
      return true;
    } else {
      return false;
    }
  }
};

const rmPair = () => {
  //Cards matched. Remove from game
  console.log("Correct guess!.");
  //Remove id
  cardsPicked[0].id = "";
  cardsPicked[1].id = "";
};

const flipPair = () => {
  //Clear content
  cardsPicked[0].innerHTML = "";
  cardsPicked[1].innerHTML = "";
  //Remove class of clicked
  cardsPicked[0].classList.remove("clicked");
  cardsPicked[1].classList.remove("clicked");
};

const clearCardsPicked = () => {
  while (cardsPicked.length > 0) {
    cardsPicked.pop();
  }
};

const resetGame = () => {
  //Assign id's to html elements
  shuffle(cards);
  let index = 0;
  if (cardDivs.length == cards.length) {
    for (cardDiv of cardDivs) {
      cardDiv.classList.remove("clicked");
      cardDiv.id = cards[index];
      cardDiv.innerHTML = "";
      // cardDiv.innerHTML = cards[index];
      index++;
    }
  }
  points = 0;
  cardsPicked = [];
  score.innerHTML = `Score: ${points}`;
  message.classList.remove("win");
};

const handleFirstCard = (e) => {
  console.log("Picking first card!");
  //Change card background and show contents
  let firstCard = e.target;
  firstCard.classList.add("clicked");
  firstCard.innerHTML = firstCard.id;
  cardsPicked.push(firstCard);
  console.log("Pushed card", firstCard);
};

const handleSecondCard = (e) => {
  console.log("Picked second card");
  let secondCard = e.target;
  //Don't let player pick the same card
  if (secondCard.classList[1]) {
    console.log("Cant pick same card!");
    return;
  } else {
    cardsPicked.push(secondCard);
  }
  //Change card background
  cardsPicked[1].classList.add("clicked");
  //Show contents
  cardsPicked[1].innerHTML = cardsPicked[1].id;
};
