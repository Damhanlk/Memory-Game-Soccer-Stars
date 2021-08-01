let cardPictures = []; // will randomly select from the array of cards below based on the game difficulty 
const cardRange = ['watch', 'boot', 'whistle','shoot', 'referee-cards', 'tactics', 'corner', 'flag', 'gloves', 'goal', 'jersey', 'medal', 'trophy', 'pitch', 'score' ];


// Store variables below to reduce amount stored in global space 

// Code sourced from several sources and adapted - https://www.youtube.com/watch?v=tjyDOHzKN0w&t=21s, https://www.youtube.com/watch?v=3uuQ3g92oPQ&t=909s

let cardsLength = 0; // Used in the gameBuild function depending on difficulty chosen 
let cardsPerGame = ''; // Depending on if the user has selected easy or medium/hard it will set the columns of cards
let columnStyle = ''; // game-board class will be adjusted for different sizings in CSS 
let firstCard, secondCard; // Checks for card matches 
let clickOne = 0; // avoids the same card being flipped more than once 
let maxPairs = 0; // pairs needed to win 
let boardLocked = false; //prevents two cards being clicked at the same time 
let time = 0; // time will be 60 seconds regardless of difficulty, which is altered by the maxPairs
let pairsMatched = 0; // checks cards in firstCard and secondCard arrays and checks to see if the game has been won
let startTime = ""; // sets time depending on level of game difficulty
let mode = ''; // used for game set up 
let cardFlippedState = false; // has card been flipped or not yet


// game ready function sourced from https://github.com/David-A-Ray for set-up 

$('document').ready(function () {
    // grab the query parameter from the url and pass it to game setup
    mode = new URLSearchParams(window.location.search).get('mode');
    gameSetup(mode); {
        gameBuild();
    }
        
    });

    //use of a switch case here to determine card array length, pairs needed to win and layout depending on which mode is selected 
    function gameSetup(mode) {
        switch (mode) {
            case "Easy":
                maxPairs = 6; // value checked against pairsMatched value to determine if game has been won 
                cardsLength = 12; // sets max amount of cards generated 
                cardsPerGame = 'col-3'; // sets layout of cards 
                columnStyle = 'game-mode-easy'; // calls from DOM what to be used in the gameBuild function
                time = 60000; // time for countdown timer 
                startTime = '60s';
                break;
            case "Medium":
                maxPairs = 9;
                cardsLength = 18;
                cardsPerGame = 'col-2';
                columnStyle = 'game-mode-medium';
                time = 60000;
                startTime = '60s';
                break;
            case "Hard":
                maxPairs = 12;
                cardsLength = 24;
                cardsPerGame = 'col-2';
                columnStyle = 'game-mode-hard';
                time = 60000;
                startTime = '60s';
                break;
        }
    }


 // function to build the game based off level choice
 // easy, medium and hard modes as stated above will have differing card amounts 
 // random card selection from the cardRange array, our images for the flip side of the cards - Fisher-Yates method utilised
 
function gameBuild() {
    let game = document.getElementById("game-card-container");
    game.classList.add(columnStyle); //adds class to alter css based on easy/medium/hard level

    $("#timer").html(startTime); //sets start time display before timer() function is called

// Fisher Yates shuffle code adapted from https://medium.com/@omar.rashid2/fisher-yates-shuffle-a2aa15578d2f
    
    
    let shuffled = cardRange.sort(function () { return 0.5 - Math.random(); });
    let selected = shuffled.slice(0, maxPairs);
    cardPictures = selected.concat(selected); cardPictures.sort(function () { return 0.5 - Math.random(); });

    for (let i = 0; i < cardsLength; i++) { //loop to repeat until correct number of cards generated from gameSetup functuion
        let card = document.createElement('div'); //creates a div
        card.className = (`${cardsPerGame} cards`); //adds to class names to card div
        card.setAttribute('data-id', cardPictures[i]); //sets data-id to match cardPictures[loop] used to check for matching cards
        card.addEventListener('click', flipCard); //adds event listener to each card for animation and flipCard function below

        let frontOfCard = document.createElement('div');
        frontOfCard.className = `cardFront ${cardPictures[i]}`; //creates a front of card div with css class and one of the sport themed images in the cardRange above

        let backOfCard = document.createElement('div');
        backOfCard.className = "cardBack"; //creates a back of card div with css class, in this case, the ball picture which features on every card's back

        card.append(frontOfCard, backOfCard); //appends front and back div's to card div
        game.appendChild(card); //appends card to game container DIV in the DOM and repeats loop
    }
}


// Game Playability Functions 

// flip card function which alters css styling, showing the other side of the card when clicked.
// Event listener in gameBuild when clicked 


function flipCard() {
    // first click of card initialises timer countdown function 
    clickOne += 1;
    if (clickOne == 1) timer(time) // time is set within the gameSetup function and differs by difficulty, and the first click will start it
    
    // NEW LINE TEST FOR BOARD LOCKED

    if (boardLocked) return; //checks if boardLocked is true and returns out of function
    if (this === firstCard) return; //checks the same card isn't clicked twice


    this.classList.toggle('flip'); //if valid, flips card using css class which controls the animation on the y and x axis


    // Function checks to see if card has been flipped, and stores either firstCard or secondCard in an array to be checked for matches
    if (!cardFlippedState) {
        cardFlippedState = true;
        firstCard = this; 
        return;
    }
    secondCard = this; 

    cardMatchCheck(); //function called to check stored firstCard and secondCard for matches
}



// Function to check firstCard vs secondCard for matches - influence https://medium.com/free-code-camp/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae

function cardMatchCheck() {
    let checkMatch = firstCard.dataset.id === secondCard.dataset.id; // checks if the two images are the same 
    checkMatch ? matchedPair() : noMatchedPair(); // if they are, the matchedPair function is called, if not, the noMatchedPair is called
}

// when firstCard and secondCard's ID is equal, the event listener is removed, +1 is added to the pairsMatched value
function matchedPair() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    pairsMatched += 1;

    checkWinGame();
}

function checkWinGame() {
    let gameVictory = pairsMatched === maxPairs;
    gameVictory ? (clearInterva(gameTime), gameWon()) : resetBoardState();
}

function noMatchedPair() {
    boardLocked = true; //prevents further clicks till function complete
    setTimeout(() => { //timeout used to show cards very briefly 
        firstCard.classList.remove('flip'); //removes flip class in css file so flip animation occurs again, flipping the cards back
        secondCard.classList.remove('flip'); 
        resetBoardState(); //calls resetBoardState function
    }, 750); // short time to allow function to take place without obstructing gameplay 

}


// clears values used in checkForMatch function and resets board so the player can flip again 

function resetBoardState() {
    [cardFlippedState, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}






// Game timer - code sourced from https://stackoverflow.com/questions/23025867/game-timer-javascript and adapted 

function timer() { //time value taken from gameSetup 
    time = new Date().getTime() + (time); //sets time to count down
    gameTime = setInterval(function () { //uses interval to refresh display
        let now = new Date().getTime(); //sets current time
        timeDiff = time - now; //calcs time difference in correct format
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); //works out minutes
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); //works out seconds
        timeRemaining = (minutes * 60) + seconds;
        $("#timer").html(minutes + "m : " + seconds + "s "); //updates timer in game.html
        
        if (timeDiff < 1000) { //when timer runs out, the game is over
            clearInterval(gameTime);
            $("#timer").html("Game Over");
            gameOver();
        }
    }, 1000); //counts down by one second at a time 
}





// Game over function called when timer runs out 

function gameOver() { 
    $('#gameOverModal').modal('toggle');
}




