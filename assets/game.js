
let cardPictures = [] // will randomly select from the array of cards below based on the game difficulty 
const cardRange = ['watch', 'boot', 'whistle','shoot', 'cards', 'tactics', 'corner', 'flag', 'gloves', 'goal', 'jersey', 'medal', 'trophy', 'pitch', 'score' ];


// Store variables below to reduce amount stored in global space 

// Code sourced from several sources - https://www.youtube.com/watch?v=tjyDOHzKN0w&t=21s, https://www.youtube.com/watch?v=3uuQ3g92oPQ&t=909s

let cardsLength = 0; // Used in the gameBuild function depending on difficulty chosen 
let cardsPerGame = ''; // Depending on if the user has selected easy or medium/hard it will set the columns of cards
let columnStyle = ''; // game-board class will be adjusted for different sizings in CSS 
let firstCard, secondCard; // Checks for card matches 
let maxPairs = 0; // 
let time = 0; // time will be 100 seconds regardless of diffculty 


// Event Listener to allow all the html and JS to load fully before game can begin, https://www.youtube.com/watch?v=3uuQ3g92oPQ&t=909s
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready()); 
} else {
    ready ();
}

function ready () {

}