
let cardPictures = [] // will randomly select from the array of cards below based on the game difficulty 
const cardRange = ['watch', 'boot', 'whistle','shoot', 'cards', 'tactics', 'corner', 'flag', 'gloves', 'goal', 'jersey', 'medal', 'trophy', 'pitch', 'score' ];


// Store variables below to reduce amount stored in global space 

// Code sourced from several sources - https://www.youtube.com/watch?v=tjyDOHzKN0w&t=21s, https://www.youtube.com/watch?v=3uuQ3g92oPQ&t=909s

let cardsLength = 0; // Used in the gameBuild function depending on difficulty chosen 
let cardsPerGame = ''; // Depending on if the user has selected easy or medium/hard it will set the columns of cards
let columnStyle = ''; // game-board class will be adjusted for different sizings in CSS 
let firstCard, secondCard; // Checks for card matches 
let firstClick = 0; // avoids the same card being flipped more than once 
let maxPairs = 0; // 
let boardLock = false; //prevents two cards being clicked at the same time 
let time = 0; // time will be 60 seconds regardless of difficulty, which is altered by the maxPairs
let pairsMatched = 0; // checks matched cards and compares against maxPairs to see if the game has been won


// sourced from https://github.com/David-A-Ray for game set-up 

$('document').ready(function () {
    // grab the query parameter from the url and pass it to game setup
    mode = new URLSearchParams(window.location.search).get('mode');
    gameSetup(mode);
    { 
      gameBuild();
    }
});

    //use of a switch case here to determine card array length, pairs needed to win and layout depending on which mode is selected 
    function gameSetup(mode) {
        switch (mode) {
            case "Easy":
                maxPairs = 6;
                cardsLength = 12;
                cardsPerRow = 'col-3';
                colStyle = 'game-mode-easy';
                time = 60000;
                startTime = '0m : 60s';
                break;
            case "Medium":
                maxPairs = 9;
                cardsLength = 18;
                cardsPerRow = 'col-2';
                colStyle = 'game-mode-medium';
                time = 50000;
                startTime = '0m : 60s';
                break;
            case "Hard":
                maxPairs = 12;
                cardsLength = 24;
                cardsPerRow = 'col-2';
                colStyle = 'game-mode-hard';
                time = 60000;
                startTime = '1m : 65s';
                break;
                break;
        }
    }

    