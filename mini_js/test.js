const { exit } = require('process');
const prompt = require('prompt-sync')();
const readline = require('readline');

const r1 = readline.createInterface(process.stdin, process.stdout);

function start() {
    console.log("Welcome to the Card Counter");
    console.log("[1] Start");
    console.log("[2] Instructions");
    console.log("[3] Statistics");
    console.log("[4] Exit");

    let input = prompt();
    return input;
}

function check_start_input(inp) {
    switch(inp) {
        case "1":
            console.log("count");
            break;
        case "2":
            console.log(instructions());
            break;
        case "3":
            console.log(display_statistics_start());
            break;
        default:
            exit();
    } 
}

function instructions() {
    console.log();
    instructionsArray = ["In the most common card counting system, the cards values are as follows:",
    "\n\n", "2-6 = +1", "7-9 = 0", "10-Ace = -1", "\n",
    "As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.",
    "\n", "The 'running count' is the total of every card value played so far.", "Each new game starts with a running count of 0.",
    "Keep track of the running count as each new card is played.",
    "\n", "After 5 rounds, the game will prompt you to enter what you think the running count is.",
    "\n", "The game will automatically end when you go through an entire deck of cards."
    ];

    for (let i = 0; i < instructionsArray.length; i++){
        console.log(instructionsArray[i]);
    }
    console.log();

    check_start_input(start());
}

function display_statistics_start() {
    console.log();
    console.log("Things have changed since the last version...");
    console.log("Your statistics will display right after you end the game.");
    console.log();
    check_start_input(start());
}

function keyToString(key) {
    if (key === 'h') {
        return "hearts";
    }
    if (key === 'd') {
        return "diamonds";
    }
    if (key === 's') {
        return "spades";
    }
    else {
        return "clubs"
    }
}



function count() {
    let hearts = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    let diamonds = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    let spades = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    let clubs = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

    let deck = {
        h: hearts,
        d: diamonds,
        s: spades,
        c: clubs
    };

    let game = {
        running_count: 0,
        rounds: 0,
        correct_guesses: 0,
        incorrect_guesses: 0,
        status: true
    };
    
    while (game.status) {
        if (game.rounds >= 50) {
            console.log("You have gotten through an entire deck. Congrats");
            game.status = false
            //display statistics
            //check_start_input(start())
        }

        // choosing random suite
        let keysArray = Object.keys(deck);
        let randomIndex = Math.floor(Math.random() * keysArray.length);
        let key = keysArray[randomIndex];
        let suiteString = keyToString(key);
        let suite = deck[key];

        // choosing random card in suite
        randomIndex = Math.floor(Math.random() * suite.length);
        let card = suite[randomIndex];
       
        // evaluating card
        if (card === "2" || card === "3" || card === "4" || card === "5" || card === "6") {
            game.running_count++;
        }
        if (card === "10" || card === "jack" || card === "queen" || card === "king" || card === "ace") {
            game.running_count--;
        }

        game.rounds++;

        /////////////////////////////////////////
        //////// THERE IS A BUG HERE ////////////
        // displaying card, getting guess
        console.log("The card is " + card + " of " + suiteString);
        r1.setPrompt("What is the running count? ");
        r1.prompt();
        r1.on('line', (age) => {
            console.log(`Age received by the user: ${age}`);
            r1.close();
        });
        

        // // evaluating guess
        // if (guess === parseInt(game.running_count)) {
        //     game.correct_guesses++;
        // } 
        // else {
        //     game.incorrect_guesses++;
        // }

        // // rounds%5
        // if (game.rounds % 5 === 0) {
        //     console.log("The running count is " + game.running_count + ".");
        //         if (guess === parseInt(game.running_count)) {
        //             console.log("Your guess was correct!");
        //         }
        //         else {
        //             console.log("You did not guess the correct running count.")
        //         }
            

        //     // ask playing if they want to continue
        // }
        

    }
}


//check_start_input(start());
count();