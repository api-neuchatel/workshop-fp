import { shuffle, getRandomCard, getCard, player1Strategy, player2Strategy, without, endMessage, turnMessage, nextState, game, __RewireAPI__ as RewireEx  } from './ex';

const chai = require('chai');
chai.should();
const sinon = require("sinon");
const sinonchai = require("chai-sinon");
chai.use(sinonchai);
  
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
    let afterShuffle = shuffle(array)
    afterShuffle.should.not.equal(array)
  })
})

describe('GetRandomCard', function() {
  it('Should preserve original array', function() {
    let array = [1, 2, 3, 4, 5]
    const randomCard = getRandomCard(array);
    array.length.should.equal(5);
  })
})

describe('GetCard', function() {
  it('Should preserve original array', function() {
    let array = [1, 2, 3, 4, 5]
    const randomCard = getCard(array, 2);
    array.length.should.equal(5);
    randomCard.should.equal(2);
  })
})

describe('Player1Strategy', function() {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });
  afterEach(function() {
    console.log.restore();
  });
  it('Should not do side effects', function() {
    let array = [1, 2, 3, 4, 5]
    player1Strategy(array);
    console.log.should.have.not.been.called;
  })
})

describe('Player2Strategy', function() {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });
  afterEach(function() {
    console.log.restore();
  });
  it('Should not do side effects', function() {
    let array = [1, 2, 3, 4, 5]
    player2Strategy(array);
    console.log.should.have.not.been.called;
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


describe('NextState', function() {
  let state = {
    bountyDeck: [1, 2, 3, 4, 5],
    player1Deck: [1, 2, 3, 4, 5],
    player2Deck: [1, 2, 3, 4, 5],
    player1Score: 2,
    player2Score: 4
  }

  it('Should remain consistent', function() {
    for(let i = 0; i < 10; i++) {
      let nextState_ = nextState(state)
      if(nextState_.player1Card > nextState_.player2Card) {
        nextState_.player1Score.should.equal(state.player1Score + nextState_.bounty)
        nextState_.player2Score.should.equal(state.player2Score)
      }
      if(nextState_.player1Card < nextState_.player2Card) {
        nextState_.player2Score.should.equal(state.player2Score + nextState_.bounty)
        nextState_.player1Score.should.equal(state.player1Score)
      }
      if(nextState_.player1Card === nextState_.player2Card) {
        nextState_.player1Score.should.equal(state.player1Score)
        nextState_.player2Score.should.equal(state.player2Score)
      }
    }
  })

  it('Should remove cards from all three decks', function() {
    let nextState_ = nextState(state)
    let arr = [1,2,3,4,5];
    arr.should.includes(nextState_.bounty)
    nextState_.bountyDeck.length.should.equal(4)
    nextState_.player1Deck.length.should.equal(4)
    nextState_.player2Deck.length.should.equal(4)
    nextState_.player1Deck.should.not.includes(nextState_.player1Card)
    nextState_.player2Deck.should.not.includes(nextState_.player2Card)
  })
})

describe('TurnMessage', function() {
  let state = {
    bountyDeck: [1, 2, 3, 4, 5],
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

  it('Should ouput correct value', function() {
    let result = turnMessage(state);
    result.should.equal("*** New Turn! ***\nPlayer 1 plays " + state.player1Card + "\nPlayer 2 plays " + state.player2Card + "\n")
  })
})

describe('Game', function() {
  let turnMessageSpy;
  let endMessageSpy;
  let nextStateSpy;
  beforeEach(function() {
    sinon.spy(console, 'log');
    
    turnMessageSpy = sinon.spy((s) => turnMessage(s));
    endMessageSpy = sinon.spy((s) => endMessage(s));
    nextStateSpy = sinon.spy((s) => nextState(s));

    RewireEx.__set__('turnMessage', turnMessageSpy);
    RewireEx.__set__('endMessage', endMessageSpy);
    RewireEx.__set__('nextState', nextStateSpy);
  });
  afterEach(function() {
    console.log.restore();
    RewireEx.__set__('turnMessage', turnMessage);
    RewireEx.__set__('endMessage', endMessage);
    RewireEx.__set__('nextState', nextState);
  });
  it('nextState should be called 5 times', function() {
    game()
    nextStateSpy.should.have.callCount(5);
  })
  it('turnMessage should be called 5 times', function() {
    game()
    turnMessageSpy.should.have.callCount(5);
  })
  it('endMessage should be called 1 time', function() {
    game()
    endMessageSpy.should.have.callCount(1);
  })
  it('console.log should be called 6 times', function() {
    game()
    console.log.should.have.callCount(6);
  })
})