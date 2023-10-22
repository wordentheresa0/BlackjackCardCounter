(define check_start_input
    (lambda (input)
        (cond
            ((string=? input "1")
                (display "count()") (newline))
            ((string=? input "2")
                (instructions) (newline))
            ((string=? input "3")
                (display_statistics_start) (newline))
            (else  
                (display "exit") (newline))
        )
    )
)



(define start
    (lambda ()
        (display "Welcome to the Card Counter") (newline)
        (display "[1] Start") (newline)
        (display "[2] Instructions") (newline)
        (display "[3] Statistics") (newline)
        (display "[4] Exit") (newline)

        ; getting user input
        (check_start_input (read-line))
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
        (display "The game will automatically end when you go through an entire deck of cards.") (newline) (newline)
        (start)
    )
)

(define display_statistics_start
    (lambda ()
        (display "Things have changed since the last version...") (newline)
        (display "Your statistics will display right after you end the game.") (newline) (newline)
        (start)
    )
)

; ################## EVERYTHING ABOVE WORKS #######################








; initialize deck
(define hearts '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define diamonds '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define spades '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))
(define clubs '("ace" 1 2 3 4 5 6 7 8 9 "jack" "queen" "king"))

; initialize game variables
(define running_count 0)
(define rounds 0)
(define correct_guesses 0)
(define incorrect_guesses 0)
(define player_name "")
(define user_input "")

; initialize random suite and card
(define rand_suite_num 0)
(define suite_list '())
(define suite_string "")
(define range "get_length_of_list suite")
(define ix "get_random_index range")
(define card "nth_elem ix suite")
(define guess "")


(define nth_card
    (lambda (n lst)
    ; get n element of l
    (cond
        ((null? lst)
            '())
        ((= n 0)
            (car lst))
        (else
            (nth_card (- n 1) (cdr lst))))))

(define get_length_of_list
    (lambda (n lst)
        (cond
            ((null? lst) n)
            (else (get_length_of_list (+ n 1) (cdr lst))))))

(define get_random_index
    (lambda (n) (random n)))

(define get_random_suite
    (lambda () (random 4)))

(define assign_random_suite    ; returns the entire suite list, not the name of the suite
    (lambda (n)
        (cond
            ((= n 0) hearts)
            ((= n 1) diamonds)
            ((= n 2) spades)
            ((= n 3) clubs))))

(define assign_suite_string
    (lambda (n)
        (cond
            ((= n 0) "hearts")
            ((= n 1) "diamonds")
            ((= n 2) "spades")
            ((= n 3) "clubs"))))


(define evaluate_card_num
    (lambda (card count)
        (cond
            ((or (< card 7) (= card 10)) (+ count 1))
            (else count))))

(define evaluate_card_string
    (lambda (card count)
        (cond
            ((member card '("jack" "queen" "king" "ace")) (- count 1))
            (else count))))


(define num_or_string
    (lambda (card count)
        (cond
            ((number? card) (evaluate_card_num card count))
            ((string? card) (evaluate_card_string card count)))))

(define evaluate_guess
    (lambda (guess running-count)
        (cond
            ((= guess running-count)
                (display "Correct! Running count is ") (display running-count) (newline)
                (set! correct_guesses (+ correct_guesses 1)))
            (else
                (display "Incorrect. Running count is ") (display running-count) (newline)
                (set! incorrect_guesses (+ incorrect_guesses 1))))))

(define get_player_name
  (lambda ()
    (display "Enter player name: ") (newline)
    (read-line)))

(define (mod5 rounds)
  (= (remainder rounds 5) 0))


; testing getting random suite and card
(define count
  (lambda ()
    (if (< rounds 52)
        (begin

        ; getting random suite
        (set! rand_suite_num (get_random_suite))
        (set! suite_list (assign_random_suite rand_suite_num))
        (set! suite_string (assign_suite_string rand_suite_num))

        ; getting random card 
            ; get length of list -> get random index -> get nth element
                ; range                 ix                  card
        (set! range (get_length_of_list 0 suite_list))
        (set! ix (get_random_index range))
        (set! card (nth_card ix suite_list))

        ; display and prompt
        (display "The card is ") (display card) (display " of ") (display suite_string) (newline)
        (display "What is the running count?") (newline)
        (set! guess (read-line))
        
        ; evaluate guess against the actual running count
        (set! running_count (num_or_string card running_count))
        (evaluate_guess (string->number guess) running_count)

        (set! rounds (+ rounds 1))
        (count)
        )
        (begin
          (display "Game over! You've played 52 rounds.") (newline)
          (display "Returning to the start...") (newline))
    )
  ))
(set! player_name (get_player_name))