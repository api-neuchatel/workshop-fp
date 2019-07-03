import { shuffle, without, endMessage, turnMessage, nextState } from './ex';

const chai = require('chai');
const should = chai.should();
  
describe('Shuffle', function() {
  it('Should preserve array size', function() {
    let array = [1, 2, 3, 4, 5]
    shuffle(array).length.should.equal(5)
  })

  it('Should preserve all elements in the original array', function() {
    let array = [1, 2, 3, 4, 5]
    shuffle(array).includes(1).should.equal(true)
    shuffle(array).includes(2).should.equal(true)
    shuffle(array).includes(3).should.equal(true)
    shuffle(array).includes(4).should.equal(true)
    shuffle(array).includes(5).should.equal(true)
  })
  
  it('Should not alter original array', function() {
    let array = [1, 2, 3, 4, 5]
    shuffle(array)
    array.should.deep.equal(array)
  })
})

describe('Without', function() {
  it('Should correctly remove element in array', function() {
    without([1, 2, 3, 4], 2).should.deep.equal([1, 3, 4]);
  })

  it('Should not alter original array', function() {
    let array = [1, 2, 3, 4, 5]
    shuffle(array)
    array.should.deep.equal(array)
  })
})

describe('EndMessage', function() {
  it('Should correctly print result if player 1 wins', function() {
    endMessage(1, 0).should.equal("Score: 1 - 0\nPlayer 1 wins!")
  })

  it('Should correctly print result if player 2 wins', function() {
    endMessage(0, 1).should.equal("Score: 0 - 1\nPlayer 2 wins!")
  })

  it('Should correctly print result if nobody wins', function() {
    endMessage(0, 0).should.equal("Score: 0 - 0\nNo winner.")
  })
})

describe('TurnMessage', function() {
  let state = {
    gameDeck: [1, 2, 3, 4, 5],
    player1Deck: [1, 2, 3, 4, 5],
    player2Deck: [1, 2, 3, 4, 5],
    bounty: 0,
    player1Card: 0,
    player2Card: 0,
    player1Score: 0,
    player2Score: 0
}
  it('Should be defined and return a string', function() {
    (typeof turnMessage(state)).should.equal('string')
  })
})

describe('NextState', function() {
  let state = {
    gameDeck: [1, 2, 3, 4, 5],
    player1Deck: [1, 2, 3, 4, 5],
    player2Deck: [1, 2, 3, 4, 5],
    player1Score: 2,
    player2Score: 4
  }

  it('Should correctly update scores', function() {
    for(let i = 0; i < 10; i++) {
      let nextState_ = nextState(state)
      if(nextState_.player1Card > nextState.player2Card) {
        nextState_.player1Score.should.equal(state.player1Score + nextState_.bounty)
        nextState_.player2Score.should.equal(state.player2Score)
      }
      if(nextState_.player1Card < nextState.player2Card) {
        nextState_.player2Score.should.equal(state.player2Score + nextState_.bounty)
        nextState_.player1Score.should.equal(state.player1Score)
      }
      if(nextState_.player1Card === nextState.player2Card) {
        nextState_.player1Score.should.equal(state.player1Score)
        nextState_.player2Score.should.equal(state.player2Score)
      }
    }
  })
})