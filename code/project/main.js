import { fromEvent } from 'baconjs';
import { 
    FRAME_PER_SECOND,
    addDirection,
    removeDirection,
    addScore,
    moveMonsters,
    newWorldPosition,
    collideWithMonsters,
    newPlayerJumpingSince,
    newPlayerPosition,
    isMovingInDirections,
    lastState,
    isRewind,
    rewind10Fames,
    newSprite,
    isStill } 
from './src.js';


// Application constants
const Y_POSITION = 106;
const WORLD_INITIAL_X = 500;

const mappingKeys = {37: 'left', 39: 'right', 38: 'top', 32: 'top', 82: 'rewind'};

// Assets
const game = document.getElementById("game");
const ctx = game.getContext("2d");
const mario = new Image();
mario.setAttribute('src','mario.png');
const world = new Image();
world.setAttribute('src', 'world.png');
const monster = new Image();
monster.setAttribute('src', 'monster.png');

// Initial state
const INITIAL_STATE = {
    player: {
        position: [0,0],
        size: [16,24],
        jumpingSince: 0,
        sprite: {
            x: 0,
            y: 0,
            time: 0
        }
    },
    world : {
        position: [WORLD_INITIAL_X, 215]
    },
    monsters: [{position: [200,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]},
               {position: [300,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]},
               {position: [350,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]}],
    gameOver : false,
    score: 0
};

/**
 * Draws the current state to the screen
 * It's a side effect function
 *
 * Type: State => Void
 */
const draw = (state) => {

    const sprite = state.player.sprite;
    const position = state.player.position;
    const size = state.player.size;

    // Clear the whole image
    ctx.clearRect(0,0,game.width,game.height);

    // Draws the world
    ctx.drawImage(world,0+state.world.position[0]-WORLD_INITIAL_X,200,500,215,0,0,game.width,game.height);
    // Draws the character
    ctx.drawImage(mario,sprite.x,0,size[0],size[1],position[0],position[1]+Y_POSITION,16,24);
    // Draws the score
    ctx.font = '10px serif';
    ctx.fillText("Score :" + state.score, 230, 15);
    // Draws the rewind key
    ctx.font = '10px serif';
    ctx.fillText("Rewind key : R", 10, 15);

    // If game over, then draw "GAME OVER"
    if(state.gameOver) {
        ctx.font = '32px serif';
        ctx.fillText("GAME OVER", 45, 70);
    }

    // Draws the monsters
    state.monsters.forEach(m => {
        ctx.drawImage(monster,m.sprite.x,m.sprite.y,19,17,m.position[0],m.position[1]+114,m.size[0],m.size[1]);
    });
}

/**
 * Compute a new state according to the input and the previous state.
 * 
 * Type : [State] -> [State]
 */
const computeStates = (states, input) => {
    // Get the last state
    const state = lastState(states);

    // If rewind's key, returns the state 10 frames behind
    if(input.rewind) {
        return rewind10Fames(states);
    }

    // If it's game over, don't compute new state, stop the game until the rewind key is pressed
    if(state.gameOver) {
        return states;
    }

    // Creates a function isMoving according to the current directions
    const isMoving = isMovingInDirections(input.directions);

    // Computes the next player state
    const nextPlayerState = {
        position: newPlayerPosition(isMoving, state.player.jumpingSince, state.player.position),
        jumpingSince: newPlayerJumpingSince(isMoving, state.player.jumpingSince, state.player.position),
        size: state.player.size,
        sprite: newSprite(state.player.sprite, isStill(isMoving))
    };

    // Moves the monsters
    const monsters = moveMonsters(state.monsters);

    // Creates the new application state
    const newState = {
        player : nextPlayerState,
        world : {
            position: newWorldPosition(isMoving, state.world.position)
        },
        monsters : monsters,
        gameOver : collideWithMonsters(nextPlayerState, monsters),
        score : addScore(state.score)
    }

    // Appends the newState to the states
    return states.concat(newState);
}

// "main function", application bootstrap
(() => {
    // Creates an event stream from pressed keys
    const keyDownEventStream = fromEvent(document, "keydown").map((e) => ({keyDown : mappingKeys[e.keyCode]}));
    // Creates an event stream from the released keys
    const keyUpEventStream = fromEvent(document, "keyup").map(e => ({keyUp: mappingKeys[e.keyCode]}));
    // Merges two streams in one
    const keysEventStream = keyDownEventStream.merge(keyUpEventStream);
    // Creates the input state accoridng to the keysEventStream
    // scan() is a kind of reduce() that provides intermediate result (event streams are infinite)
    const inputProperty = keysEventStream.scan({directions: [], rewind: false}, (acc,v) => {

        const keysPressed = v.keyDown ? addDirection(acc.directions, v.keyDown) : acc.directions;
        const keysRemoved = v.keyUp ? removeDirection(keysPressed, v.keyUp) : keysPressed;
        const rewind = isRewind(v.keyDown);

    return {
        directions: keysRemoved,
        rewind: rewind
    };
  });

  // Sample every FPS and compute the state according to the current state and the input
  // When an event occurs, draw() is called
  // The magic happens here
  inputProperty.sample(FRAME_PER_SECOND)
     .scan([INITIAL_STATE],computeStates)
     .onValue((states) => {
        const state = lastState(states);
        draw(state);
    });
})();