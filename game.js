class Memory {
  constructor() {
    //Html elements
    //Unique stats and info
    this.htmlPairs = document.querySelector("#pairs");
    this.htmlFlips = document.querySelector("#flips");
    //Game Cards
    this.htmlIcons = document.querySelectorAll(".fas");
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
    this.points = 0;
    this.firstCard = -1;
    this.numPairs = 0;
    this.maxPoints = 10;
    this.cardsPicked = [];
    this.page = new Page();
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  init() {
    //Add two cards for each icon
    this.icons.forEach((icon) => {
      this.cards.push(icon);
      this.cards.push(icon);
    });
    this.shuffleCards();
  }
}
