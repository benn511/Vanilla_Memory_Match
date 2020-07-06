//Game vars
let points = 0;
let firstCard = -1;
const score = document.querySelector(".score");
const cardDivs = document.querySelectorAll(".card");
let numPairs = Math.floor(cardDivs.length / 2);
//Initial array containing all the pairs of cards
let cards = [];

//Helper functions
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const newBoard = () => {
  shuffle(cards);
  //Assign id's to html elements
  let index = 0;
  if (cardDivs.length == cards.length) {
    for (cardDiv of cardDivs) {
      cardDiv.id = cards[index];
      cardDiv.innerHTML = cards[index];
      index++;
    }
  }
};

const handleFirstCard = (e) => {
  firstCard = e;
  //Add a class to prevent player from clicking same card
  firstCard.target.classList.add("clicked");
};

const handleSecondCard = (e) => {
  let secondCard = e;
  //Don't let player pick the same card
  if (secondCard.target.classList[1]) {
    console.log("Cant pick same card!");
    return;
  }
  //Check if cards match
  if (
    firstCard.target.id == secondCard.target.id &&
    firstCard.target.id != ""
  ) {
    //add class to second card
    secondCard.target.classList.add("clicked");
    //clear cards of their content
    firstCard.target.innerHTML = "";
    firstCard.target.id = "";
    secondCard.target.innerHTML = "";
    secondCard.target.id = "";

    //Increase points on correct pair
    points++;
    score.innerHTML = `Score: ${points}`;
  }
};
