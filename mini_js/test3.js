const { exit } = require('process');
const prompt = require('prompt-sync')();
const readline = require('readline');

class Game {
    constructor() {
        this.runningCount = 0;
        this.rounds = 0;
        this.correct_guesses = 0;
        this.incorrect_guesses = 0;
    }

    get getRunningCount() {
        return this.runningCount;
    }

    get getRounds() {
        return this.rounds;
    }

    get getCorrectGuesses() {
        return this.correct_guesses;
    }

    get getIncorrectGuesses() {
        return this.incorrect_guesses;
    }

    set setRunningCount(rc) {
        this.runningCount = rc;
    }

    set setRounds(r) {
        this.rounds = r;
    }

    set setCorrectGuesses(g) {
        this.correct_guesses = g;
    }

    set setIncorrectGuesses(g) {
        this.incorrect_guesses = g;
    }

    display() {
        console.log("Running Count: " + this.runningCount);
        console.log("Rounds: " + this.rounds);
        console.log("Correct Guesses: " + this.correct_guesses);
        console.log("Incorrect Guesses: " + this.incorrect_guesses);
    }
}

class Player {
    constructor() {
        this.name = "";
        this.roundsPlayed = 0;
        this.totalCorrectGuesses = 0;
        this.totalIncorrectGuesses = 0;
    }

    get getName() {
        return this.name;
    }

    get getRoundsPlayed() {
        return this.roundsPlayed;
    }

    get getTotalCorrectGuesses() {
        return this.totalCorrectGuesses;
    }

    get getTotalIncorrectGuesses() {
        return this.totalIncorrectGuesses;
    }

    set setName(n) {
        this.name = n;
    }

    set setRoundsPlayed(r) {
        this.roundsPlayed = r;
    }

    set setTotalCorrectGuesses(g) {
        this.totalCorrectGuesses = g;
    }

    set setTotalIncorrectGuesses(g) {
        this.totalIncorrectGuesses = g;
    }

    display() {
        console.log("Player Name: " + this.name);
        console.log("Rounds Played: " + this.roundsPlayed);
        console.log("Total Correct Guesses: " + this.totalCorrectGuesses);
        console.log("Total Incorrect Guesses: " + this.totalIncorrectGuesses);
    }
}

class Deck {
    constructor() {
        this.hearts = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
        this.diamonds = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
        this.spades = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
        this.clubs = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    }

    get getHearts() {
        return this.hearts;
    }

    get getDiamonds() {
        return this.diamonds;
    }

    get getSpades() {
        return this.spades;
    }

    get getClubs() {
        return this.clubs;
    }

    set setHearts(h) {
        this.hearts = h;
    }

    set setDiamonds(d) {
        this.diamonds = d;
    }

    set setSpades(s) {
        this.spades = s;
    }

    set setClubs(c) {
        this.clubs = c;
    }

    display() {
        console.log("Hearts: " + this.hearts);
        console.log("Diamonds: " + this.diamonds);
        console.log("Spades: " + this.spades);
        console.log("Clubs: " + this.clubs);        
    }
}


function startScreen() {
    console.log("Welcome to the Card Counter");
    console.log("[1] Start");
    console.log("[2] Instructions");
    console.log("[3] Statistics");
    console.log("[4] Exit");

    let input = prompt();
    return input;
}

function displayInstructions() {
    console.log();
    instructionsArray = ["In the most common card counting system, the cards values are as follows:",
    "\n\n", "2-6 = +1", "7-9 = 0", "10-Ace = -1", "\n",
    "As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.",
    "\n", "The 'running count' is the total of every card value played so far.", "Each new game starts with a running count of 0.",
    "Keep track of the running count as each new card is played.",
    "\n", "After 5 rounds, the game will prompt you to enter what you think the running count is.",
    "\n", "The game will automatically end when you go through an entire deck of cards."
    ]

    for (let i = 0; i < instructionsArray.length; ++i) {
        console.log(instructionsArray[i]);
    }
    console.log();

    checkStartInput(startScreen());
}

function displayStatisticsStart() {
    console.log("\nYour statistics will display after you finish a game.\n");
    checkStartInput(startScreen());
}

function checkStartInput(input) {
    switch(input) {
        case "1":
            console.log("count");
            break;
        case "2":
            console.log(displayInstructions());
            break;
        case "3":
            console.log(displayStatisticsStart());
            break;
        default:
            exit();
    }
}

function count() {
    let game = new Game();
    let deck = new Deck();
    let player = new Player();

}



function main() {
    count();
    //checkStartInput(startScreen());
    // g = new Game();
    // g.display();
    // console.log(g.getCorrectGuesses);
    // g.setCorrectGuesses = 4;
    // g.display();
}

main();