const cards = document.querySelectorAll(".card"),
  err = document.querySelector(".err"),
  cli = document.querySelector(".click"),
  reset = document.querySelector(".reset");

let matchedCard = 0,
  cardOne,
  cardTwo,
  move = 0,
  error = 0,
  disableDeck = false,
  ann = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

ann.sort(() => (Math.random() > 0.5 ? 1 : -1));

const shuffleCard = () => {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  move = 0;
  error = 0;
  err.textContent = error;
  cli.textContent = move;
  ann.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `img/img-${ann[i]}.svg`;
    card.addEventListener("click", flipCard);
  });
};

const matchCards = (img1, img2) => {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 18) {
      setTimeout(() => {
        shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  ++error;
  err.textContent = error;
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
};

const flipCard = (e) => {
  ++move;
  cli.textContent = move;
  let clikedCard = e.target;
  if (clikedCard != cardOne && !disableDeck) {
    clikedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clikedCard);
    }
    cardTwo = clikedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelectorAll("img")[1].src,
      cardTwoImg = cardTwo.querySelectorAll("img")[1].src;
    matchCards(cardOneImg, cardTwoImg);
  }
};

cards.forEach((card, i) => {
  let imgTag = card.querySelector(".back-view img");
  imgTag.src = `img/img-${ann[i]}.svg`;
  card.addEventListener("click", flipCard);
});

reset.addEventListener("click", shuffleCard);
