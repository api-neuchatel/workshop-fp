// Type: [A] => [A]
export function shuffle(array) {
    return array.slice().sort(() => Math.random() - 0.5)
}

// Type: [A] => A
export function getRandomCard(deck) {
    return shuffle(deck)[0]
}

// Type: ([A], A) => A
export function getCard(deck, card) { return card }

// Type: [A] => A
export function player1Strategy(deck) { return getRandomCard(deck) }

// Type: A => A
export function player2Strategy(deck, card) { return getCard(deck, card) }

// Type: ([A], A) => [A]
export function without(array, element) {
    return [...array.slice(0, array.indexOf(element)), ...array.slice(array.indexOf(element) + 1)]
}

// Type: (Int, Int) => String
export function endMessage(player1Score, player2Score) {
    const score = "Score: " + player1Score + " - " + player2Score + "\n"

    if(player1Score > player2Score) { return score + "Player 1 wins!" }
    else if(player2Score > player1Score) { return score + "Player 2 wins!" }
    return score + "No winner."
}

// Type: State => String
export function turnMessage(state) {
    return "*** New Turn! ***\n" +
            "Player 1 plays " + state.player1Card + "\n" +
            "Player 2 plays " + state.player2Card + "\n"
}

// Type: State => State
export function nextState(state) {
    let bounty = getRandomCard(state.bountyDeck)
    let player1Card = player1Strategy(state.player1Deck)
    let player2Card = player2Strategy(state.player2Deck, bounty)

    return {
        bountyDeck: without(state.bountyDeck, bounty),
        player1Deck: without(state.player1Deck, player1Card),
        player2Deck: without(state.player2Deck, player2Card),
        bounty: bounty,
        player1Card: player1Card,
        player2Card: player2Card,
        player1Score: player1Card > player2Card ? state.player1Score + bounty : state.player1Score,
        player2Score: player2Card > player1Card ? state.player2Score + bounty : state.player2Score
    }
}

export function game() {

    let state = {
        bountyDeck: [1, 2, 3, 4, 5],
        player1Deck: [1, 2, 3, 4, 5],
        player2Deck: [1, 2, 3, 4, 5],
        player1Score: 0,
        player2Score: 0
    }

    while(state.bountyDeck.length > 0) {
        state = nextState(state)
        console.log(turnMessage(state))
    }

    console.log(endMessage(state.player1Score, state.player2Score))
}

game()