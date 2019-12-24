/*
 * Create a list that holds all of your cards
 */
const icons = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

const cardContainer = document.querySelector(".deck");

let openedCard = [];
let matchedCard = [];

/*
 * Initialize the game
 */

function init() {
  // Create the cards
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    //   card.innerHTML = "<i class='" + icons[i] + "'</i>";  old syntax
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardContainer.appendChild(card);

    // Add click  event to each card
    click(card);
  }
}

/*
 * Click event listener
 */

function click(card) {
  // Card Click Event
  card.addEventListener("click", function() {
    const currentCard = this;
    const previousCard = openedCard[0];
    // console.log(card.innerHTML);

    //we have an existing OPENED cards

    if (openedCard.length === 1) {
      card.classList.add("open", "show", "disable");
      openedCard.push(this);

      // we should compare our 2 opened cards!
      compare(currentCard, previousCard);
    } else {
      //we don't have an existing OPENED cards
      currentCard.classList.add("open", "show", "disable");
      openedCard.push(this);
    }
  });
}

/*
 * Compare the 2 cards!
 */

function compare(currentCard, previousCard) {
  // Matcher
  if (currentCard.innerHTML === previousCard.innerHTML) {
    // Matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCard.push(currentCard, previousCard);
    //Reset Card
    openedCard = [];
    // console.log("Matched!");

    // Check if game is over !
    isOver();
  } else {
    // wait for 500ms then, do this!
    setTimeout(function() {
      // Doesn't Match
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("show", "show", "disable");
      // Reset Card

      // console.log("Doesn't Matched!");
    }, 500);
    openedCard = [];
  }
  addMoves();
}

/*
 * Check if the game is over!
 */

function isOver() {
  if (matchedCard.length === icons.length) {
    alert(" Game is Over !!!");
  }
}

/*
 * Add moves!
 */

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMoves() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set the ratings
  ratings();
}

/*
 * Rating!
 */

const startsContainer = document.querySelector(".starts");

function ratings() {
  // switch (moves) {
  //   case 20:
  //     `<li><i class="fa fa-star"></i></li>
  //   <li><i class="fa fa-star"></i></li>`;
  //     break;

  //   case 25:
  //     `<li><i class="fa fa-star"></i></li>`;
  //     break;
  // }

  startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  if (moves < 25) {
    startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
  } else if (moves > 25) {
    startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  } else {
    startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
  }
}

/*
 * Restart the button!
 */

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  // Delete all cards !

  cardContainer.innerHTML = "";
  //Call `init` to create new cards !

  init();

  // Reset any RELATED variable!
  matchedCard = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
});

/*-------- Start the game first time !!!!!--------------*/
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
