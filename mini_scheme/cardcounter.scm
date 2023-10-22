; change this to go to the actual functions when they work
(define check_start_input
    (lambda (input)
        (cond
            ((= input 1)
                (display "count()") (newline))
            ((= input 2)
                (display "instructions()") (newline))
            ((= input 3)
                (display "display_statistics_start()") (newline))
            (else  
                (display "exit") (newline))
        )
    )
)

; add check_start_input(start()) after
(define display_statistics_start
    (lambda ()
        (display "Things have changed since the last version...")
        (newline)
        (display "Your statistics will display right after you end the game.")
        (newline)
    )
)

(define instructions
    (lambda ()
        (display "In the most common card counting system, the cards values are as follows:") (newline)
        (display "2-6 = +1") (newline)
        (display "7-9 = 0") (newline)
        (display "10-Ace = -1") (newline)
        (display "As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.") (newline)
        (display "The 'running count' is the total of every card value played so far.") (newline)
        (display "Each new game starts with a running count of 0.")(newline)
        (display "Keep track of the running count as each new card is played.") (newline)
        (display "After 5 rounds, the game will prompt you to enter what you think the running count is.") (newline)
        (display "The game will automatically end when you go through an entire deck of cards.") (newline)
    )
)

(define start
    (lambda ()
        (display "Welcome to the Card Counter")
        (newline)
        (display "[1] Start")
        (newline)
        (display "[2] Instructions")
        (newline)
        (display "[3] Statistics")
        (newline)
        (display "[4] Exit")
        (newline)
    )
)

(define display_statistics
    (lambda (name rounds_played total_correct_guesses total_incorrect_guesses)
        (display "Name: ") (display name)
        (newline)
        (display "Rounds played: ") (display rounds_played)
        (newline)
        (display "Total correct guesses: ") (display total_correct_guesses)
        (newline)
        (display "Total incorrect guesses: ") (display total_incorrect_guesses)
        (newline)
    )
)

(define get_length_of_list
    (lambda (n lst)
        (cond
            ((null? lst)
                n)
            (else
                (get_length_of_list (+ n 1) (cdr lst)))
        )
    )
)

(define get_random_index
    (lambda (n)
        (random n)
   )
)

(define get_random_suite
    (lambda ()
        (random 4)
    )
)

(define assign_random_suite    ; returns the entire suite list, not the name of the suite
    (lambda (n)
        (cond
            ((= n 0) hearts)
            ((= n 1) diamonds)
            ((= n 2) spades)
            ((= n 3) clubs)
        )
    )
)

(define nth_card
    (lambda (n lst)
    ; get n element of l
    (cond
        ((null? lst)
            '())
        ((= n 1)
            (car lst))
        (else
            (nth_card (- n 1) (cdr lst))
        )
    )
    )
)

(define evaluate_card_num
    (lambda (card count)
        (cond
            ((< card 7) (+ count 1))
            ((= card 10) (- count 1))
        )
    )
)

(define evaluate_card_string
    (lambda (card count)
        (cond
            ((= card "jack") (- count 1))
            ((= card "queen") (- count 1))
            ((= card "king") (- count 1))
            ((= card "ace") (- count 1))
        )
    )
)

(define num_or_string
    (lambda (card count)
        (cond
            ((number? card) (evaluate_card_num card count))
            ((string? card) (evaluate_card_string card count))
        )
    )
)

(define game
    (lambda ()

        ; initialize deck

        ; initialize game variables
        

;        (display "Enter player name: ")
;       (define player_name (read-line))

        ; getting random suite and card

        ; evaluate card and update running count
;        (set! running_count (+ running_count ((evaluate_card_num card running_count))))
        
        ; add one to rounds
;        (set! rounds (+ rounds 1))

        ;print the card and its suite
;        (display "The card is ") (display card) (display " of ") (display suite) ;;;;;;CHANGE THE SUITE THING LATER
;        (newline)
        ; print "What is the running count"
;        (display "What is the running count?") (newline)

        ; get users guess
;        (define guess (read-line))

        ; evaluate guess against the actual running count

        ; if rounds%5 == 0 then evaluate guess with running count and print statement accordingly

        ; as if player wants to keep playing

        ; get players response

        ; evaluate players response

        ; if the response is not "continue", display statistics and go to home screen
    )
)


(define hearts '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define diamonds '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define spades '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define clubs '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define running_count 0)
(define rounds 0)
(define game #t)
(define correct_guesses 0)
(define incorrect_guesses 0)


(define player_name (read-line))

(define suite (assign_random_suite (get_random_suite)))
(define range (get_length_of_list suite))
(define ix (get_random_index range))
(define card (nth_elem ix suite))

(set! running_count (+ running_count ((evaluate_card_num card running_count))))

(set! rounds (+ rounds 1))

;(define guess (read-line))