class Page {
  setPairs(numPairs) {
    if (numPairs) {
      this.score.innerHTML = `Score: ${score}`;
    } else {
      console.error("Invalid var cannot set score.");
    }
  }
  setFlips() {
    if (flips) {
      this.flips.innerHTML = `Flips: ${flips}`;
    } else {
      console.error("Invalid var cannot set flips");
    }
  }
  initPage() {
    this.cards.forEach((card) => {
      card.classList.add;
    });
  }
}
