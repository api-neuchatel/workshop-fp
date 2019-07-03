// Type: [A] => [A]
let shuffle = array => array.slice().sort(() => Math.random() - 0.5)

// Type: [A] => A
let getRandomCard = deck => shuffle(deck)[0]

// Type: [A] => A
let player1Strategy = getRandomCard

// Type: A => A
let player2Strategy = card => card

// Type: ([A], A) => [A]
let without = (array, element) => [...array.slice(0, array.indexOf(element)), ...array.slice(array.indexOf(element) + 1)]

// Type: (Int, Int) => String
let endMessage = (player1Score, player2Score) => {

    let winner = () => {
        if(player1Score > player2Score) { return "Player 1 wins!" }
        else if(player2Score > player1Score) { return "Player 2 wins!" }
        return "No winner."
    }
    let score = "Score: " + player1Score + " - " + player2Score

    return score + "\n" + winner()
}

// Type: State => String
let turnMessage = state =>  "*** New turn! ***\n" +
                            "Card is " + state.bounty + "\n" + 
                            "Player 1 drew " + state.player1Card + "\n" +
                            "Player 2 drew " + state.player2Card + "\n"

// Type: State => State
let nextState = state => {
    let bounty = getRandomCard(state.gameDeck)
    let player1Card = player1Strategy(state.player1Deck)
    let player2Card = player2Strategy(bounty)

    return {
        gameDeck: without(state.gameDeck, bounty),
        player1Deck: without(state.player1Deck, player1Card),
        player2Deck: without(state.player2Deck, player2Card),
        bounty: bounty,
        player1Card: player1Card,
        player2Card: player2Card,
        player1Score: player1Card > player2Card ? state.player1Score + bounty : state.player1Score,
        player2Score: player2Card > player1Card ? state.player2Score + bounty : state.player2Score
    }
}

function game() {

    let state = {
        gameDeck: [1, 2, 3, 4, 5],
        player1Deck: [1, 2, 3, 4, 5],
        player2Deck: [1, 2, 3, 4, 5],
        player1Score: 0,
        player2Score: 0
    }

    while(state.gameDeck.length > 0) {
        state = nextState(state)
        console.log(turnMessage(state))
    }

    console.log(endMessage(state.player1Score, state.player2Score))
}

game()

export { shuffle, without, endMessage, turnMessage, nextState }