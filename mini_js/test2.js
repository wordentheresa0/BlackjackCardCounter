const { exit } = require('process');
const prompt = require('prompt-sync')();
const readline = require('readline');

function gameRound(deck, game) {
    // choosing random suite
    let keysArray = Object.keys(deck);
    let randomIndex = Math.floor(Math.random() * keysArray.length);
    let key = keysArray[randomIndex];
    //let suiteString = keyToString(key);
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
    
    if (game.rounds >= 50) {
        console.log("You have gotten through an entire deck. Congrats");
        game.status = false
        //display statistics
        //check_start_input(start())
    }
    else {
        gameRound(deck, game);
    }

    console.log(game.running_count);
        

    
}

count();