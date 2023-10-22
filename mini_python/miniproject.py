import random

class PlayerFromFile:
    def __init__(self, name, rounds_played, total_correct_guesses, total_incorrect_guesses):
        self.name = name
        self.rounds_played = rounds_played
        self.total_correct_guesses = total_correct_guesses
        self.total_incorrect_guesses = total_incorrect_guesses

    def display_statistics(self):
        print(f"Player Name: {self.name}")
        print(f"Rounds Played: {self.rounds_played}")
        print(f"Total Correct Guesses: {self.total_correct_guesses}")
        print(f"Total Incorrect Guesses: {self.total_incorrect_guesses}")

    def update_file(self):
        player_data = []
        with open("stats.txt", 'r') as f:
            lines = f.readlines()
            for i in range(0, len(lines), 4):
                name = lines[i].strip()
                rounds_played = int(lines[i+1].strip())
                total_correct_guesses = int(lines[i+2].strip())
                total_incorrect_guesses = int(lines[i+3].strip())

                if name == self.name:
                    rounds_played = self.rounds_played
                    total_correct_guesses = self.total_correct_guesses
                    total_incorrect_guesses = self.total_incorrect_guesses

                player_data.extend([name, str(rounds_played), str(total_correct_guesses), str(total_incorrect_guesses)])

        with open("stats.txt", 'w') as f:
            for data in player_data:
                f.write(data + '\n')  


class Player:
    def __init__(self, name):
        self.name = name
        self.rounds_played = 0
        self.total_correct_guesses = 0
        self.total_incorrect_guesses = 0

    def display_statistics(self):
        print(f"Player Name: {self.name}")
        print(f"Rounds Played: {self.rounds_played}")
        print(f"Total Correct Guesses: {self.total_correct_guesses}")
        print(f"Total Incorrect Guesses: {self.total_incorrect_guesses}")

    def print_to_file(self):
        with open("stats.txt", 'a') as f:
            f.write(str(self.name) + '\n')
            f.write(str(self.rounds_played) + '\n')
            f.write(str(self.total_correct_guesses) + '\n')
            f.write(str(self.total_incorrect_guesses) + '\n')

def display_statistics():
    with open("stats.txt", 'r') as f:
        lines = f.readlines()
        print("Player Statistics:")
        for line in lines:
            print(line.strip())

def check_start_input(inp):
    if (inp == "1"):
        count()
    elif (inp == "2"):
        instructions()
    elif (inp == "3"):
        check_start_input(start())
    elif (inp == "4"):
        f.close()
        exit()
    else:
        f.close()
        exit()

def start():
    print("\n")
    print("Welcome to the Card Counter\n")
    print("[1] Start")
    print("[2] Instructions")
    print("[3] Statistics")
    print("[4] Exit")
    result = input("Enter: ")
    return result

def instructions():
    instructions = ["\n",
    "In the most common card counting system, the cards values are as follows:",
    "\n\n", "2-6 = +1", "7-9 = 0", "10-Ace = -1", "\n",
    "As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.",
    "\n", "The 'running count' is the total of every card value played so far.", "Each new game starts with a running count of 0.",
    "Keep track of the running count as each new card is played.",
    "\n", "After 5 rounds, the game will prompt you to enter what you think the running count is.",
    "\n", "The game will automatically end when you go through an entire deck of cards."]

    for line in instructions:
        print(line)

def count():
    suits = {
        "hearts": ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"],
        "diamonds": ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"],
        "spades": ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"],
        "clubs": ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"]
    }

    player_name = input("Enter your player name: ")

    #go through file and see if the name is already there
    player = None
    with open("stats.txt", 'r') as f:
        lines = f.readlines()
        for i in range(0, len(lines), 4):
            name = lines[i].strip()
            rounds_played = int(lines[i+1].strip())
            total_correct_guesses = int(lines[i+2].strip())
            total_incorrect_guesses = int(lines[i+3].strip())
            
            if name == player_name:
                player = PlayerFromFile(name, rounds_played, total_correct_guesses, total_incorrect_guesses)
                break

    if player is None:
        player = Player(player_name)

    running_count = 0
    rounds = 0
    game = True

    while (game == True):

        if (rounds >= 50):
            print("You have gotten through an entire deck. Congrats")
            if player.__class__.__name__ == "Player":
                player.display_statistics()
                player.print_to_file()
            elif player.__class__.__name__ == "PlayerFromFile":
                player.display_statistics()
                player.update_file()
            check_start_input(start())

        available_suits = [suit for suit, cards in suits.items() if len(cards) > 0]

        random_suit_name = random.choice(available_suits)
        random_suit = suits[random_suit_name]
        card = random.choice(random_suit)
        random_suit.remove(card)

        if (card == "2" or card == "3" or card == "4" or card == "5" or card == "6"):
            running_count += 1
        elif (card == "10" or card == "jack" or card == "queen" or card == "king" or card == "ace"):
            running_count -= 1

        
        rounds += 1
        player.rounds_played += 1
        print("The card is " + card + " of " + random_suit_name)
        guess = input("What is the running count?\n")

        if guess == str(running_count):
            player.total_correct_guesses += 1
        elif guess != str(running_count):
            player.total_incorrect_guesses += 1

        print("\n")
        if(rounds%5 == 0):
            print("The running count is " + str(running_count) + ".\n")
            if (guess == str(running_count)):
                print("Your guess was correct!\n\n")
            else:
                print("You did not guess the correct running count.\n\n")


            result = input("Type 'continue' to keep playing or 'stop' to return to the home screen: ")
            if (result != "continue"):
                if player.__class__.__name__ == "Player":
                    player.print_to_file()
                else:
                    player.update_file()
                check_start_input(start())
            else:
                print("\n")


inp = start()
f = open("stats.txt", 'a')
if (inp == "1"):
    count()
elif (inp == "2"):
    instructions()
elif (inp == "3"):
    display_statistics()
    check_start_input(start())
elif (inp == "4"):
    f.close()
    exit()
else:
    f.close()
    exit()