//Game vars
let numPairs = 0;
let firstCard = -1;
let secondCard = -1;
const cardDivs = document.querySelectorAll(".card");
var numCards = Math.floor(cardDivs.length / 2);
var cards = [];
console.log(numCards);
for (let i = 1; i <= numCards; i++) {
  cards.push(i);
  cards.push(i);
}
console.log(cards);

//Helper functions
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffle(cards);
console.log(cards);

const handleCardClick = (e) => {
  console.log(e);
  //firstCard =
  //check card data
  //if first card then -> store card data
  //if second card compare data with first
  //if card is a match then add points
};

//Event handler for each card
for (cardDiv of cardDivs) {
  cardDiv.addEventListener("click", handleCardClick);
}

let index = 0;
if (cardDivs.length == cards.length) {
  for (cardDiv of cardDivs) {
    cardDiv.id = cards[index];
    cardDiv.innerHTML = cards[index];
    index++;
    // cardDiv.cla
  }
}
