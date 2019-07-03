function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function getRandomCard(deck) {
    shuffle(deck)
    return deck.pop()
}

function getCard(deck, card) {
    index = deck.indexOf(card)
    return deck.splice(index, 1)[0]
}

function player1Strategy(deck) {
    card = getRandomCard(deck)
    console.log("Player 1 drew " + card)
    return card
}

function player2Strategy(deck, card) {
    newCard = getCard(deck, card)
    console.log("Player 2 drew " + card)
    return newCard
}

function game() {
    gameDeck = [1, 2, 3, 4, 5]
    player1Deck = [1, 2, 3, 4, 5]
    player2Deck = [1, 2, 3, 4, 5]

    player1Score = 0
    player2Score = 0

    while(gameDeck.length > 0) {
        console.log("*** New turn! ***")
        gameCard = getRandomCard(gameDeck)
        console.log("Card is " + gameCard) 
        player1Card = player1Strategy(player1Deck)
        player2Card = player2Strategy(player2Deck, gameCard)
        if(player1Card > player2Card) { player1Score += gameCard }
        if(player2Card > player1Card) { player2Score += gameCard }
        console.log()
    }

    console.log("Score: " + player1Score + " - " + player2Score)
    if(player1Score > player2Score) { console.log("Player 1 wins!") }
    else if(player2Score > player1Score) { console.log("Player 2 wins!") }
    else { console.log("No winner.") }
}

game()