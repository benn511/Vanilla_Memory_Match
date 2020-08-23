class Memory {
  constructor() {
    //Html elements
    //Unique stats and info
    this.htmlPairs = document.querySelector("#pairs");
    this.htmlFlips = document.querySelector("#flips");
    this.htmlIcons = document.querySelectorAll(".fas");
    this.htmlGridItems = document.querySelectorAll(".grid-item");
    this.defaultIcon = "fa-question-circle";
    this.resetBtn = document.querySelector("#reset");
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
    this.numFlips = -1;
    this.maxPoints = 10;
    this.cardsPicked = [];
  }

  //Setup card stack, assign ids, shuffle cards
  init() {
    //Add two cards for each icon
    this.icons.forEach((icon) => {
      this.cards.push(icon);
      this.cards.push(icon);
    });

    //Setup frontend
    this.shuffleCards();
    this.addFAIcons();
    this.updateHtml();

    //Add an id to each grid-item to identify its class
    let id = 0;
    for (const gridItem of this.htmlGridItems) {
      gridItem.id = id;
      id++;
    }

    //setup reset button
    this.resetBtn.addEventListener("click", () => {
      this.resetGame();
    });
  }

  //---------Helper methods-----------
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  //-------------Game methods--------------

  firstFlip() {
    if (this.numFlips == -1) {
      return true;
    } else {
      return false;
    }
  }

  hideAllCards() {
    //Remove icons from every item
    for (let i = 0; i < this.htmlIcons.length; i++) {
      this.htmlIcons[i].classList.remove(this.cards[i]);
      this.htmlIcons[i].classList.add(this.defaultIcon);
    }
  }

  isValidTarget(target) {
    if (target.classList.contains("grid-item")) {
      return true;
    } else {
      return false;
    }
  }

  getTarget(e) {
    let target = e.target;
    if (target.classList.contains("grid-item")) {
      return target;
    } else if (target.classList.contains("grid-container")) {
      return target;
    } else if (target.classList.contains("fas")) {
      return target.parentElement;
    }
  }

  handleCard(card) {
    if (card) {
      if (
        card.classList.contains("clicked") ||
        card.classList.contains("done")
      ) {
        console.log("Please choose a different card");
        return;
      } else {
        this.numFlips++;
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
    } else if (this.cardsPicked.length == 2) {
      if (this.isMatch()) {
        this.numPairs++;
        this.cardsPicked.pop();
        this.cardsPicked.pop();
      }
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
    //remove extra css classes from elements
    for (const item of this.htmlGridItems) {
      item.classList.remove("clicked");
    }

    //Replace old FA icons with updated list
    this.rmFAIcons();
    this.rmDefaultIcons();
    this.shuffleCards();
    this.addFAIcons();

    //reset game vars
    this.numFlips = -1;
    this.numPairs = 0;
    this.cardsPicked = [];

    this.updateHtml(); //Front-end
  }

  //--------------Html updaters----------------
  setHtmlFlips() {
    if (this.numFlips >= 0) {
      this.htmlFlips.innerHTML = `Flips: ${this.numFlips}`;
    } else {
      this.htmlFlips.innerHTML = `Flips: ${0}`;
    }
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

  rmDefaultIcons() {
    for (const icon of this.htmlIcons) {
      icon.classList.remove(this.defaultIcon);
    }
  }
  addDefaultIcons() {
    for (const icon of this.htmlIcons) {
      icon.classList.add(this.defaultIcon);
    }
  }
  addFAIcons() {
    if (this.cards.length > 0) {
      //Add FA classes
      for (let i = 0; i < this.cards.length; i++) {
        //+1 to skip first icon used in stats
        this.htmlIcons[i + 1].classList.add(this.cards[i]);
      }
    } else {
      console.error("No cards in array to add FA icons with!");
    }
  }
  rmFAIcons() {
    if (this.cards.length > 0) {
      //Add FA classes
      for (let i = 0; i < this.cards.length; i++) {
        //+1 to skip first icon used in stats
        this.htmlIcons[i + 1].classList.remove(this.cards[i]);
      }
    } else {
      console.error("No cards in array to rm FA icons with!");
    }
  }
}
