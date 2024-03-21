//************************************************************************************************************** */
//************************************************************************************************************** */
// 1) Define Game Constants
//each card will then be shuffled
const SOURCE_CARDS = [
  { img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZkcmoxcGIydzcwMDZ2NTVndTkyMWNkaTUwbTd1eGdzNzB3ZXVyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HFjO0S9m8Cy7WJa/giphy.gif", matched: false },
  { img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHdxbnkxbHFmb3g2cWVjMGRveG5rZmV4YTZpMHRpbXZ3OHY1cXQyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72Ffdfgr3lcGniU0/giphy.gif", matched: false },
  { img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODNiN2Q4dDY2YzFpODFtcm82b2d0ZzB0NHRmMmRhMmIyYmViaThrMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72F4nTnhd0fxsVhK/giphy.gif", matched: false },
  { img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm50MHFmZzd1N2pxajNrbzhrdGNvOWllZGdyc2hyc2dvanBjMjQ5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBt89baFDqwLIME/giphy.gif", matched: false },
  { img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnAyMDN0ZXBheXBsMzk4MTc2djRqM3Y4a3Y4OW1uNnRkazZ5bDgzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72EU9yuLyplAjD8I/giphy.gif", matched: false },
  { img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q5dWx3NGpkdjMzcDFpaGJmNmZ2ZWF4ZGZ6ejJrNW44dnA4Nnd3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBpPuxa4VT9R2b6/giphy.gif", matched: false },
]
const CARD_BACK = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2VqcGU3NTA5ZzA5dm9hOXhtNDUyemlkbGNueHQ3eTBoMXN0dDFoaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E1Y9oysdqAhoc/giphy.gif";


//************************************************************************************************************** */
//************************************************************************************************************** */

// 2)Declare State Variables
// 2.1)Board Array: An array to represent the game board with cards that hide the fruits. Initially, this could contain pairs of identifiers [0, 0, 1, 1] for Guava and Passionfruit.
let board;
// 2.2)First Flip: A variable to store the index of the first card flipped.
let firstFlip;
// 2.3)Second Flip: A variable to store the index of the second card flipped.
let secondFlip;
// 2.5) Game Win Status: A variable to indicate game status; null for ongoing, false for loss, and true for win. 
//Winning is defined as finding all matches.
let win;

// 2.6) Create array that holds the card objects   
let cards; 

// 2.7) Create counter for number of incorrect and correct cards
let numBad;
let numGood;


//************************************************************************************************************** */
//************************************************************************************************************** */
// 3) Cached Elements
// 3.1) Board Elements: Store references to the board on the page that represent the card positions. Create an event listener for clicking on the cards
let boardEl = document.getElementById("board").addEventListener("click", handleChoice)

// 3.3) Message Displays

const msgEl = document.getElementById("bad") // mismtach
const msgElgood = document.getElementById("good") // correct match
const msgElwin = document.getElementById("win") //game win/lose


//************************************************************************************************************** */
//************************************************************************************************************** */
// 4) Initialize Game
// 4.1) Shuffle and Setup Board: Randomly arrange the card identifiers within the board array to start each game with a different configuration. *** I may or may not randomize the cards, depending on the difficulty
// 4.2) Reset Variables: Set the first flip, second flip, matches count, and win status to their initial values.
// 4.3) Render Board and Timer: Update the webpage to show the initial state of the game board and set the timer to its starting value.
init();

function init() {
  cards = getShuffledCards();
  firstFlip = null;
  secondFlip = null;
  numBad = 0;
  numGood = 0;
  win = null;
  msgElwin.innerText = "";
  render();
}

//************************************************************************************************************** */
//************************************************************************************************************** */
//  5.1) Create all functions 
function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card }); //to make independent copies of each card so that they render seperately
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
  }
  return cards;
}

function render() {
  cards.forEach(function (card, idx) {
    const imgEl = document.getElementById(idx);
    let src = (card.matched || card === firstFlip || card === secondFlip) ? card.img : CARD_BACK;
    imgEl.src = src;
    msgEl.innerHTML = `Incorrect Guesses: ${numBad}`;
    msgElgood.innerHTML = `Correct Guesses: ${numGood}`;
    renderMessage()
  });


}

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  if (isNaN(cardIdx) || win) return;
  const card = cards[cardIdx];
  if (firstFlip) {
    if (firstFlip.img === card.img) {
      firstFlip.matched = card.matched = true;
      numGood++
      firstFlip = null;
      msgElwin.innerText = "It's A Match!";
      setTimeout(() => {
        msgElwin.innerText = "";
      }, 3000);
    }
    else {
      secondFlip = card;
      setTimeout(() => {
        firstFlip = null;
        secondFlip = null;
      }, 10);
      numBad++;
      msgElwin.innerText = "Wrong Guess!";
      setTimeout(() => {
        msgElwin.innerText = "";
      }, 3000);
    }
  } else {
    firstFlip = card;
  }
  renderMessage();
  getWinner();
  render();

  // Game Time Limit: Set a maximum duration of 5 minute for the game to be completed.
  setTimeout(() => {
    msgElwin.innerText = "Your Time is Over. You Lost";
    init();
  }, 50000);
}

function getWinner() {
  if (numBad === 4 || win === false) {
    win = false;
    setTimeout(() => {
      init();
      return;
    }, 1000)
  }
  else if (numGood === SOURCE_CARDS.length) {
    win = true
    init();
  }
}


function renderMessage() {
  if (win === true) {
    msgElwin.innerText = "You won! Congratulations!";
  } else if (win === false) {
    msgElwin.innerText = "You lose"
    return;
  }
}
