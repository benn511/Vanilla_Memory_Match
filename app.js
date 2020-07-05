//Game vars
let points = 0;
let firstCard = -1;
const score = document.querySelector(".score");
const cardDivs = document.querySelectorAll(".card");
var numPairs = Math.floor(cardDivs.length / 2);

//Initial array containing all the pairs of cards
var cards = [];
for (let i = 1; i <= numPairs; i++) {
  cards.push(i);
  cards.push(i);
}
//Helper functions
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//Event handlers
const handleCardClick = (e) => {
  console.log(e);
  // newBoard();
  if (firstCard == -1) {
    firstCard = e;
    console.log(firstCard);
  } else {
    let secondCard = e;
    if (
      firstCard.target.id == secondCard.target.id &&
      firstCard.target.id != ""
    ) {
      //Get rid of first and second card
      firstCard.target.innerHTML = "";
      firstCard.target.id = "";
      secondCard.target.innerHTML = "";
      secondCard.target.id = "";

      points++;
      score.innerHTML = `Score: ${points}`;
    }
    firstCard = -1;
  }
};

for (cardDiv of cardDivs) {
  cardDiv.addEventListener("click", handleCardClick);
}

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

newBoard();
