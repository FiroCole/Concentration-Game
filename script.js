/*----- constants -----*/


/*----- state variables -----*/


/*----- cached elements  -----*/

/*----- event listeners -----*/


/*----- functions -----*/


//******************************************************* */
// 1) Define Game Constants
    //each card will then be shuffled
    const SOURCE_CARDS = [
      {img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZkcmoxcGIydzcwMDZ2NTVndTkyMWNkaTUwbTd1eGdzNzB3ZXVyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HFjO0S9m8Cy7WJa/giphy.gif", matched:false},
      {img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHdxbnkxbHFmb3g2cWVjMGRveG5rZmV4YTZpMHRpbXZ3OHY1cXQyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72Ffdfgr3lcGniU0/giphy.gif", matched:false },
  ]
  
  const CARD_BACK = "https://giphy.com/embed/E1Y9oysdqAhoc";
  // 1.2) Game Time Limit: Set a maximum duration of 1 minute for the game to be completed.
  let timeLimit = 60000 //60,000 msecs is one minute
  //******************************************************* */
  // 2)Declare State Variables
  // 2.1)Board Array: An array to represent the game board with cards that hide the fruits. Initially, this could contain pairs of identifiers [0, 0, 1, 1] for Guava and Passionfruit.
  let board;
  // 2.2)First Flip: A variable to store the index of the first card flipped.
  let firstFlip;
  // 2.3)Second Flip: A variable to store the index of the second card flipped.
  let secondFlip;
  // 2.4)Matches Count: A variable to track the number of successful matches. A match occurs when the first and second flips reveal the same fruit.
  let match;
  // 2.5)Game Win Status: A variable to indicate game status; null for ongoing, 0 for loss, and 1 for win. Winning is defined as finding all matches.
  let win;
  
  
  //let cards
  let cards; //array that holds the card objects  
  
  //******************************************************* */
  // 3) Cached Elements
  // 3.1)Card Elements: Store references to the four elements on the page that represent the card positions.
  let boardEl = document.getElementById("board");
  // 3.2)Play Again Button: Store the reference to the "Play Again" button for resetting the game.
  let playBtnEl = document.querySelector("button");
  // 3.3)Timer Display: Store the reference to the element that will display the remaining time.
  // !!!! come back to this latter
  
  //******************************************************* */
  // 4) Initialize Game
  // 4.1) Shuffle and Setup Board: Randomly arrange the card identifiers within the board array to start each game with a different configuration. *** I may or may not randomize the cards, depending on the difficulty
  // 4.2) Reset Variables: Set the first flip, second flip, matches count, and win status to their initial values.
  // 4.3) Render Board and Timer: Update the webpage to show the initial state of the game board and set the timer to its starting value.
  init();
  
  function init(){
    cards = getShuffledCards();
    firstFlip = null;
    render();
  }
  
  function getShuffledCards() {
    let tempCards =[];
    let cards =[];
    for(let card of SOURCE_CARDS) {
      tempCards.push(card,card);
     }
  while(tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx,1)[0];
    cards.push(card);
  }
    //console.log(cards);
    return cards;
    
  }
  
  function render() {
    cards.forEach(function(card,idx){
      idx.toString;
      const imgEl = document.getElementById(idx);
      imgEl.src = card.img;
      console.log(imgEl)
    });
  }
  //******************************************************* */
  // 5) Implement Event Listeners
  // 5.1) Card Click Listener: Attach an event listener to each card. When a card is clicked:
    // Determine the card's index in the board array.
    // Reveal the fruit by changing the card's appearance based on the index.
    // If it's the first card flipped, store its index in First Flip. If it's the second, store its index in Second Flip.
    // If two cards are flipped, check for a match. If they match, increase the Matches Count. If they don't match, flip them back over after a brief delay.
    // Check if Matches Count equals 2 (all pairs found) to determine a win. Update the Game Win Status accordingly and display a winning message.
  // 5.2) Play Again Button Listener: When the "Play Again" button is clicked, reset all state variables and shuffle the board for a new game.
  
  
  //******************************************************* */
  // 6) Handle Timer Logic
  // 6.1) Start Timer: Begin the countdown when the first card is flipped.
  // 6.2) End Game On Timeout: If the timer reaches 0 before all matches are found, set the Game Win Status to 0 (loss) and prompt the player to try again.
  
  
  //******************************************************* */
  // 7) Handle Game Win or Loss Logic
  // 7.1) Check for Win: After each successful match, check if Matches Count indicates that all pairs have been found. If so, update Game Win Status to 1 and display a congratulatory message.
  // 7.2) Game Timeout: If the time limit is reached before all matches are found, consider the game lost and offer the player an option to play again.
  
  