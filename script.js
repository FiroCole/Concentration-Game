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
      {img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODNiN2Q4dDY2YzFpODFtcm82b2d0ZzB0NHRmMmRhMmIyYmViaThrMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72F4nTnhd0fxsVhK/giphy.gif", matched:false },
      {img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm50MHFmZzd1N2pxajNrbzhrdGNvOWllZGdyc2hyc2dvanBjMjQ5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBt89baFDqwLIME/giphy.gif", matched:false },
      {img: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnAyMDN0ZXBheXBsMzk4MTc2djRqM3Y4a3Y4OW1uNnRkazZ5bDgzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o72EU9yuLyplAjD8I/giphy.gif", matched:false },
      {img: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q5dWx3NGpkdjMzcDFpaGJmNmZ2ZWF4ZGZ6ejJrNW44dnA4Nnd3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT8qBpPuxa4VT9R2b6/giphy.gif", matched:false },
      
      
          ]
  const CARD_BACK = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2VqcGU3NTA5ZzA5dm9hOXhtNDUyemlkbGNueHQ3eTBoMXN0dDFoaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E1Y9oysdqAhoc/giphy.gif";
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
  // 2.6)Ignore clicks: A variable to ignore user clicks before game starts.
  let ignoreClicks
  
  //let cards
  let cards; //array that holds the card objects  
  
  //creat counter for number of incorrects
  let numBad;
  let numGood;
  //******************************************************* */
  // 3) Cached Elements
  // 3.1)Card Elements: Store references to the four elements on the page that represent the card positions.
  let boardEl = document.getElementById("board").addEventListener("click", handleChoice)
  // 3.2)Play Again Button: Store the reference to the "Play Again" button for resetting the game.
  let playBtnEl = document.querySelector("button");
  // 3.3)Timer Display: Store the reference to the element that will display the remaining time.
  // !!!! come back to this latter
  const msgEl = document.getElementById("bad")
  const msgElgood = document.getElementById("good")
  const msgElwin = document.getElementById("win")
  const msgElwrong = document.getElementById("win")

  //******************************************************* */
  // 4) Initialize Game
  // 4.1) Shuffle and Setup Board: Randomly arrange the card identifiers within the board array to start each game with a different configuration. *** I may or may not randomize the cards, depending on the difficulty
  // 4.2) Reset Variables: Set the first flip, second flip, matches count, and win status to their initial values.
  // 4.3) Render Board and Timer: Update the webpage to show the initial state of the game board and set the timer to its starting value.
  init();
  
  function init(){
    cards = getShuffledCards();
    firstFlip = null;
    secondFlip = null;
    ignoreClicks = false;
    numBad = 0;
    numGood = 0;
    win = null;
    render();
  }
  
  function getShuffledCards() {
    let tempCards =[];
    let cards =[];
    for(let card of SOURCE_CARDS) {
      tempCards.push({...card},{...card}); //to make independent copies of each card so that they render seperately
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
      //idx.toString;
      const imgEl = document.getElementById(idx);
      let src = (card.matched || card ===firstFlip || card ===secondFlip) ? card.img : CARD_BACK ;
      imgEl.src = src;
    msgEl.innerHTML= `Incorrect Guesses: ${numBad}`;
    msgElgood.innerHTML= `Correct Guesses: ${numGood}`;
    renderMessage()
    });

    
  }
//update all inpacted state, then call render()
  function handleChoice(evt) {
    /*setTimeout(() => {
  console.log("Delayed for 1 second.");
}, 1000);*/
    const cardIdx = parseInt(evt.target.id);
        if (isNaN(cardIdx) || win || ignoreClicks) return;
    const card = cards[cardIdx];
    if (firstFlip) {
      if (firstFlip.img === card.img) {
        firstFlip.matched = card.matched = true;
        numGood++
        firstFlip = null;
        msgElwin.innerText = "It's A Match!";
      } 
      else {
        //firstFlip = card;
        secondFlip = card;
        setTimeout((card) => {
          firstFlip = null;
          secondFlip = null;
        }, 10);
        numBad++;
        msgElwin.innerText = "Wrong Guess!";
      }
    } else {
      firstFlip = card;
    }
    renderMessage();
    getWinner();
    render();

    setTimeout(() => {
      init();
    }, 1000);
  }

  function getWinner() {
    if (numBad ===2 || win===false) {
      win=false;
      setTimeout(() => {
        init();
        return;
      }, 1000)  
    }
    else if (numGood ===SOURCE_CARDS.length) {
      win=true
      init();}

  }


  function renderMessage() {
    if (win===true) {
      msgElwin.innerText = "You won! Congratulations!";
    } else if (win===false) {
      msgElwin.innerText = "You lose"
      return;
    } 
  }
  