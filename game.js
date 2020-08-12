class Memory {
  constructor() {
    //Html elements
    //Unique stats and info
    this.htmlPairs = document.querySelector("#pairs");
    this.htmlFlips = document.querySelector("#flips");
    this.htmlIcons = document.querySelectorAll(".fas");
    this.htmlGridItems = document.querySelectorAll(".grid-item");
    this.defaultIcon = "fa-question-circle";
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
    this.numFlips = 0;
    this.maxPoints = 10;
    this.cardsPicked = [];
    // this.clicks = 0;
  }

  //Setup card stack, assign ids, shuffle cards
  init() {
    //Add two cards for each icon
    this.icons.forEach((icon) => {
      this.cards.push(icon);
      this.cards.push(icon);
    });

    this.shuffleCards();

    //Add FA classes
    for (let i = 0; i < this.cards.length; i++) {
      this.htmlIcons[i].classList.add(this.cards[i]);
      // this.htmlIcons[i].classList.add("fa-question-circle");
    }

    //Add an id to each grid-item to identify its class
    let id = 0;
    for (const gridItem of this.htmlGridItems) {
      gridItem.id = id;
      id++;
    }
  }

  //---------Helper methods-----------
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  //-------------Game methods--------------

  handleCard(card) {
    if (card) {
      if (
        card.classList.contains("clicked") ||
        card.classList.contains("done")
      ) {
        console.log("Please choose a different card");
        return;
      } else {
        console.log("Nice pick");
        card.classList.add("clicked");
        this.cardsPicked.push(card);
        this.revealCard(card);
      }
    } else {
      console.error("Problem with card passed.");
    }
  }

  checkMatch() {
    if (this.cardsPicked.length > 2 || this.cardsPicked.length < 0) {
      console.error("Card underflow/overflow. Check logic");
    } else if (this.cardsPicked.length == 1) {
      console.log("Not at two cards yet. Didn't compare");
      return;
    } else {
      console.log("Comparing...");
    }

    if (this.isMatch()) {
      console.log("Found a match");
      //Increase points
      this.numPairs++;
      //Add a class to know not to select card again
      this.cardsPicked[0].classList.add("done");
      this.cardsPicked[1].classList.add("done");
    } else {
      console.log("No match!");
    }
  }

  revealCard(card) {
    if (card) {
      card.firstElementChild.classList.remove("fa-question-circle");
      card.firstElementChild.classList.add(this.cards[card.id]);
    } else {
      console.error("Error revealing card. Check method");
    }
  }

  revertCardsPicked() {
    if (this.cardsPicked.length == 2) {
      this.numFlips++;
      if (this.cardsPicked[0].classList.contains("done")) {
        this.cardsPicked.pop();
        this.cardsPicked.pop();
      } else {
        //Select FA icon classes
        let class1 = this.cardsPicked[0].firstElementChild.classList[1];
        let class2 = this.cardsPicked[1].firstElementChild.classList[1];
        //Remove FA class
        this.cardsPicked[0].firstElementChild.classList.remove(class1);
        this.cardsPicked[1].firstElementChild.classList.remove(class2);

        //Reset card to have no class of clicked and a question mark FA icon
        this.cardsPicked[0].classList.remove("clicked");
        this.cardsPicked[1].classList.remove("clicked");
        this.cardsPicked[0].firstElementChild.classList.add(this.defaultIcon);
        this.cardsPicked[1].firstElementChild.classList.add(this.defaultIcon);

        //Reset stack
        this.cardsPicked.pop();
        this.cardsPicked.pop();
      }
    } else {
      console.log("Cannot revert less than two cards...");
      return;
    }
  }

  isMatch() {
    if (this.cardsPicked.length == 2) {
      //Check for match
      let icon1 = this.cardsPicked[0].firstElementChild.classList[1];
      let icon2 = this.cardsPicked[1].firstElementChild.classList[1];
      if (icon1 == icon2) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  gameOver() {
    if (this.numPairs == 10) {
      return true;
    } else {
      return false;
    }
  }

  resetGame() {
    this.numFlips = 0;
    this.numPairs = 0;
  }

  //--------------Html updaters----------------
  setHtmlFlips() {
    this.htmlFlips.innerHTML = `Flips: ${this.numFlips}`;
  }
  setHtmlPairs() {
    this.htmlPairs.innerHTML = `Score: ${this.numPairs}`;
  }
  updateHtml() {
    this.setHtmlFlips();
    this.setHtmlPairs();
    if (this.gameOver()) {
      alert("Game over!");
    }
  }
}
