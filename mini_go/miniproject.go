//TODO
// make second player struct (PlayerFromFile)
// make print_to_file method and display_statistics method
// update display_statistics() function

package main

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

type PlayerInterface interface {
	GetName() string
	GetRoundsPlayed() int
	GetTotalCorrectGuesses() int
	GetTotalIncorrectGuesses() int
}

type PlayerFromFile struct {
	Name                    string
	Rounds_played           int
	Total_correct_guesses   int
	Total_incorrect_guesses int
}

type Player struct {
	Name                    string
	Rounds_played           int
	Total_correct_guesses   int
	Total_incorrect_guesses int
}

func (p *Player) GetName() string {
	return p.Name
}

func (p *Player) GetRoundsPlayed() int {
	return p.Rounds_played
}

func (p *Player) GetTotalCorrectGuesses() int {
	return p.Total_correct_guesses
}

func (p *Player) GetTotalIncorrectGuesses() int {
	return p.Total_incorrect_guesses
}

func (p *PlayerFromFile) GetName() string {
	return p.Name
}

func (p *PlayerFromFile) GetRoundsPlayed() int {
	return p.Rounds_played
}

func (p *PlayerFromFile) GetTotalCorrectGuesses() int {
	return p.Total_correct_guesses
}

func (p *PlayerFromFile) GetTotalIncorrectGuesses() int {
	return p.Total_incorrect_guesses
}

func start() string {
	fmt.Println()
	fmt.Println("Welcome to the Card Counter")
	fmt.Println("[1] Start")
	fmt.Println("[2] Instructions")
	fmt.Println("[3] Statistics")
	fmt.Println("[4] Exit")

	var input string
	fmt.Scanln(&input)
	return input
}

func instructions() {
	instructions := []string{"In the most common card counting system, the cards values are as follows:",
		"\n\n", "2-6 = +1", "7-9 = 0", "10-Ace = -1", "\n",
		"As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.",
		"\n", "The 'running count' is the total of every card value played so far.", "Each new game starts with a running count of 0.",
		"Keep track of the running count as each new card is played.",
		"\n", "After 5 rounds, the game will prompt you to enter what you think the running count is.",
		"\n", "The game will automatically end when you go through an entire deck of cards."}

	for _, s := range instructions {
		fmt.Println(s)
	}
	check_start_input(start())
}

func count() {
	cards := make(map[string][]string)
	cards["hearts"] = []string{"ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"}
	cards["diamonds"] = []string{"ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"}
	cards["spades"] = []string{"ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"}
	cards["clubs"] = []string{"ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"}

	var running_count = 0
	var rounds = 0
	var game = true
	var correct_guesses = 0
	var incorrect_guesses = 0

	// make player
	fmt.Println("Enter your player name: ")
	var playername string
	fmt.Scanln(&playername)

	var player = Player{playername, 0, 0, 0}

	for game {
		if rounds >= 50 {
			fmt.Println("You have gotten through an entire deck. Congrats.")
			display_statistics(player)
			check_start_input(start())
		}

		// choosing random suite
		rand.Seed(time.Now().UnixNano())
		var suit_names = []string{"hearts", "diamonds", "spades", "clubs"}
		var s = rand.Intn(len(suit_names))
		var suite string
		switch {
		case s == 0:
			suite = "hearts"
		case s == 1:
			suite = "diamonds"
		case s == 2:
			suite = "spades"
		case s == 3:
			suite = "clubs"
		}

		// choosing random card in suite
		current_suite := cards[suite]
		var c = rand.Intn(len(current_suite))
		var card = current_suite[c]

		// evaluating card
		if card == "2" || card == "3" || card == "4" || card == "5" || card == "6" {
			running_count += 1
		}
		if card == "10" || card == "jack" || card == "queen" || card == "king" || card == "ace" {
			running_count -= 1
		}

		rounds += 1
		player.Rounds_played += 1
		fmt.Println("The card is " + card + " of " + suite)
		fmt.Println("What is the running count?")
		var guess string
		fmt.Scanln(&guess)
		var guessInt, err = strconv.Atoi(guess)

		// handling error
		if err != nil {
			os.Exit(0)
		}

		if guessInt == running_count {
			correct_guesses += 1
			player.Total_correct_guesses += 1
		} else {
			incorrect_guesses += 1
			player.Total_incorrect_guesses += 1
		}

		if rounds%5 == 0 {
			fmt.Println("The running count is " + strconv.Itoa(running_count) + ".")
			if guessInt == running_count {
				fmt.Println("Your guess was correct!")
				fmt.Println()
			} else {
				fmt.Println("You did not guess the correct running count.")
				fmt.Println()
			}
			fmt.Println("Type 'continue' to keep playing or 'stop' to return to the home screen: ")
			var result string
			fmt.Scanln(&result)
			if result != "continue" {
				display_statistics(player)
				check_start_input(start())
			}
		}
	}

}

func display_statistics(player Player) {
	fmt.Println("Player Statistics:")
	fmt.Printf("Name: %s\n", player.GetName())
	fmt.Printf("Rounds Played: %d\n", player.GetRoundsPlayed())
	fmt.Printf("Total Correct Guesses: %d\n", player.GetTotalCorrectGuesses())
	fmt.Printf("Total Incorrect Guesses: %d\n", player.GetTotalIncorrectGuesses())

	check_start_input(start())
}

func display_statistics_start() {
	fmt.Println("Things have changed since the last version...")
	fmt.Println("Your statistics will display right after you end the game.")
	check_start_input(start())
}

func check_start_input(inp string) {
	switch {
	case inp == "1":
		count()
	case inp == "2":
		instructions()
	case inp == "3":
		display_statistics_start()
	case inp == "4":
		os.Exit(0)
	default:
		os.Exit(0)
	}

}

func main() {
	check_start_input(start())
}
