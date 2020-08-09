class Memory {
  constructor() {
    //Html elements
    //Unique stats and info
    this.htmlPairs = document.querySelector("#pairs");
    this.htmlFlips = document.querySelector("#flips");
    this.htmlIcons = document.querySelectorAll(".fas");
    this.htmlGridItems = document.querySelectorAll(".grid-item");
    this.icons = [
      "fa-bomb",
      "fa-anchor",
      "fa-apple-alt",
      "fa-bell",
      "fa-bone",
      "fa-car",
      "fa-headphones",
      "fa-feather",
      "fa-hippo",
      "fa-hamburger",
    ];
    this.cards = [];
    this.numPairs = 0;
    this.maxPoints = 10;
    this.cardsPicked = [];
    // this.clicks = 0;
  }
  init() {
    //Add two cards for each icon
    this.icons.forEach((icon) => {
      this.cards.push(icon);
      this.cards.push(icon);
    });

    this.shuffleCards();

    //Add the corresponding icon class to each html game card
    for (let i = 0; i < this.cards.length; i++) {
      this.htmlIcons[i].classList.add(this.cards[i]);
    }
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  //Event methods
  handleCard(card) {
    if (card) {
      if (card.classList[1] == "clicked") {
        console.log("Please choose a different card");
        return;
      } else {
        console.log("Nice pick");
        card.classList.add("clicked");
        this.cardsPicked.push(card);
      }
    } else {
      console.error("Problem with card passed.");
    }
  }

  checkMatch() {
    if (this.isMatch()) {
      //Increase points
      //Don't remove .clicked
      this.numPairs++;
      //unflip cards
    } else if (this.cardsPicked.length > 2 || this.cardsPicked.length < 0) {
      console.error("Card underflow/overflow. Check logic");
    } else {
      console.log("Not enough cards picked yet");
    }
  }

  isMatch() {
    if (this.cardsPicked.length == 2) {
      //Check for match
      let icon1 = cardsPicked[0].firstElementChild[1];
      let icon2 = cardsPicked[1].firstElementChild[1];
      if (icon1 == icon2) {
        return true;
      }
    } else {
      return false;
    }
  }

  checkForWin() {
    //Is game over?
    //Check for max points
  }

  //Html updaters
  setHtmlFlips() {
    this.flips.innerHTML = `Flips: ${flips}`;
  }
  setHtmlPairs() {
    this.score.innerHTML = `Score: ${score}`;
  }
}
