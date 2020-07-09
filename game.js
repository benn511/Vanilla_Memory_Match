//Game vars
let points = 0;
let firstCard = -1;
const score = document.querySelector(".score");
const cardDivs = document.querySelectorAll(".card");
const resetBtn = document.querySelector(".reset");
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
  if (cardsPicked[0].id == cardsPicked[1].id) {
    return true;
  } else {
    return false;
  }
};

const resetBoard = () => {
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
};

const handleFirstCard = (e) => {
  console.log("Picked first card");
  if (e.target.id == "") {
    console.log("Cannot select empty card");
    return;
  } else {
    //Change card background and show contents
    let firstCard = e.target;
    firstCard.classList.add("clicked");
    firstCard.innerHTML = firstCard.id;
    cardsPicked.push(firstCard);
    console.log("Pushed card", firstCard);
  }
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
  //Check if cards match
  if (isMatch()) {
    points++;
    score.innerHTML = `Score: ${points}`;
  }
  //Change card background
  cardsPicked[1].classList.add("clicked");
  //Show contents
  cardsPicked[1].innerHTML = cardsPicked[1].id;
};
