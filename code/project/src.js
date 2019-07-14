import { fromEvent } from 'baconjs';
import math from 'mathjs';

// Physics
const GRAVITY = [0, 9];
const SMALL_JUMP_VECTOR = [0, -17];
const JUMPING_LIMIT = 150;
const MONSTER_SPEED = 3;

// Sprite
const SPRITE_CHANGE_MS = 100;
const SPRITE_OFFSET = 16;
const MONSTER_SPRITE_LENGTH = 17;
const MONSTER_LIMIT_SPRITE = 17;

// Application constants
const Y_POSITION = 106;
const FRAME_PER_SECOND = 1000/20;
const WORLD_INITIAL_X = 500;

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
    monsters: [{position: [300,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]},
               {position: [500,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]},
               {position: [550,0], sprite: {x: 0, y:0, time: 0}, size: [19,17]}],
    gameOver : false,
    score: 0
};

const mappingKeys = {37: 'left', 39: 'right', 38: 'top', 32: 'top', 82: 'rewind'};

const game = document.getElementById("game");
const ctx = game.getContext("2d");
const image = new Image();
image.setAttribute('src','spritesheet2.png');
const world = new Image();
world.setAttribute('src', 'world.png');
const monster = new Image();
monster.setAttribute('src', 'monster.png');

/**
 * Returns a function that returns true if the player is moving in the given direction.
 * Type : ([Direction]) -> Direction -> Boolean 
 */
const isMovingInDirections = directions => direction => {
    return directions.includes(direction);
} 


/**
 * Adds the newDirection (if not already exists) into the currentDirections
 * Type: ([String], String) => [String]
 */
const addDirection = (currentDirections, newDirection) => {
    if(!currentDirections.includes(newDirection)) {
        return currentDirections.concat(newDirection);
    } else {
        return currentDirections;
    }
}

/**
 * Removes the removedDirection from the currentDirections
 * Type: ([String], String) => [String]
 */
const removeDirection = (currentDirections, removedDirection) => {
    return currentDirections.filter(e => e!==removedDirection);
}

/**
 * Draw the current state to the screen
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
    ctx.drawImage(image,sprite.x,0,size[0],size[1],position[0],position[1]+Y_POSITION,16,24);
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
 * Returns if the player collides with one of the monsters
 * Type: (Player, Monsters) => Boolean
 */
const collideWithMonsters = (player, monsters) => {
   const collide = m => player.position[0] < m.position[0] + m.size[0] &&
                        player.position[0] + player.size[0] > m.position[0] &&
                        player.position[1] >= m.position[1];

    return monsters.some(collide);
}

/**
 * Returns a function that receives a state array and return the last state.
 * Type ([State]) => State
 */
const lastState = states => states[states.length-1];

const addIf = (position, ifAdd, add) => {
    if(ifAdd) {
        return add(position);
    }
    return position;
}

/**
 * Returns if the value of `jumpingSince` reached the `JUMPING_LIMIT`
 * Type : Number -> Boolean
 */
const isJumpReachedLimit = jumpingSince => jumpingSince >= JUMPING_LIMIT;

const newSprite = (currentSprite, still) => {
    const timeInCurrentSprite = currentSprite.time;
    const newTimeInCurrentSprite = timeInCurrentSprite+FRAME_PER_SECOND;
    const currentX = currentSprite.x;

    if(still) {
        return {time: 0, x: 16, y: currentSprite.y};
    }

    if(newTimeInCurrentSprite>SPRITE_CHANGE_MS) {
        if(currentX+SPRITE_OFFSET>SPRITE_OFFSET) {
            return {time : 0, x : 0, y: currentSprite.y}
          } else {
            return {time : 0, x:  currentX + SPRITE_OFFSET, y: currentSprite.y}
          }
      } else {
          return {time: newTimeInCurrentSprite, x: currentX, y: currentSprite.y};
      }
}

const newPlayerPosition = (isMoving, jumpingSince, currentPosition) => {
    const isMovingLeft = isMoving('left');
    const isMovingRight = isMoving('right')
    const isMovingTop = isMoving('top');
    const reachedLimitJump = isJumpReachedLimit(jumpingSince);

    const position1 = addIf(currentPosition, isMovingLeft, (pos) => math.add(pos,[-5,0]));
    const position2 = addIf(position1, isMovingRight, (pos) => math.add(pos,[5,0]));
    const position3 = addIf(position2, isMovingTop && !reachedLimitJump, (pos) => math.add(math.add(pos, SMALL_JUMP_VECTOR), GRAVITY));
    const position4 = addIf(position3, !isMovingTop || reachedLimitJump, (pos) => {
        const [x,y] = math.add(pos, GRAVITY);
        if(y>0) {
            return [x,0];
        } else {
            return [x,y];
        }
    });

    return position4;
};

const newPlayerJumpingSince = (isMovingInDirections, jumpingSince, position) => {
    const isMovingTop = isMovingInDirections('top');
    if(isMovingTop && !isJumpReachedLimit(jumpingSince)) {
        return jumpingSince + 25;
    } else {
        const [_,y] = math.add(position, GRAVITY);
        if(y>=0) {
            return 0;
        } else {
            return jumpingSince;
        }
    }
}

const newWorldPosition = (isMoving, position) => {
    const position2 = addIf(position, isMoving, (pos) => math.add(pos,[-10,0]));
    const position3 = addIf(position2, isMoving, (pos) => math.add(pos,[10,0]));
    return position3;
}

/**
 * Returns the new sprite state
 * Sprite -> Sprite
 */
const moveSprite = monsterSprite => {
    const {x,y,time} = monsterSprite;
    const nextTime = time + FRAME_PER_SECOND;
    const spriteMustBeChanged = nextTime > SPRITE_CHANGE_MS;

    if(spriteMustBeChanged) {
        if(x+MONSTER_SPRITE_LENGTH>MONSTER_LIMIT_SPRITE) {
            return {x: 0, y, time: 0};
        } else {
            return {x: x+MONSTER_SPRITE_LENGTH, y, time: 0};
        }
    } else {
        return {x, y, time: nextTime};
    }
};

const moveMonsters = monsters => {
    return monsters.map(m => {
        const [x,y] = m.position;
        

        const nextPosition = (x-MONSTER_SPEED)<0 ? [400,y] : [x-MONSTER_SPEED,y];
        const nextMonsterSprite = moveSprite(m.sprite);
 
        return {
            size: m.size,
            position: nextPosition,
            sprite: nextMonsterSprite
        };
    });
}

/**
 * Adds 10 to the current score
 * Type : Number -> Number
 */
const addScore = score => {
    return score + 10;
}

/**
 * Returns if the current direction is the rewind key
 * Type: Direction -> Boolean
 */
const isRewind = direction => {
    return direction == 'rewind';
}

/**
 * Returns an array of state 10 frames in the past
 * Type: [State] -> [State]
 */
const rewind10Fames = states => {
    let offset = states.length-10 < 0 ? 1 : states.length-10;
    return states.splice(0, offset);
}

/**
 * Returns if the character is still.
 * The character is still if he's not moving left or right
 * 
 * Type : (Direction -> Boolean)
 * Usage : isMoving('top'), isMoving('right'), isMoving('left')
 */
const isStill = isMoving => {
    return !isMoving('left') && !isMoving('right');
}

function computeStates(states, input) {
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
    const isMoving = isMovingInDirections(input.direction);

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

    // Appends the newState all the statess 
    return states.concat(newState);
}

// "main function", application bootstraping
(() => {
    // Creates an event stream from pressed keys
    const keyDownEventStream = fromEvent(document, "keydown").map((e) => ({keyDown : mappingKeys[e.keyCode]}));
    // Creates an event stream from the released keys
    const keyUpEventStream = fromEvent(document, "keyup").map(e => ({keyUp: mappingKeys[e.keyCode]}));
    // Merges two streams in one
    const keysEventStream = keyDownEventStream.merge(keyUpEventStream);
    // Create the input state accoridng to the keysEventStream
    // scan() is a kind of reduce() that provides intermediate result (event streams are infinite)
    const input = keysEventStream.scan({direction: [], rewind: false}, (acc,v) => {

        const keysPressed = v.keyDown ? addDirection(acc.direction, v.keyDown) : acc.direction;
        const keysRemoved = v.keyUp ? removeDirection(keysPressed, v.keyUp) : keysPressed;
        const rewind = isRewind(v.keyDown);

    return {
        direction: keysRemoved,
        rewind: rewind
    };
  });

  // Sample every FPS and compute the state according to the current state and the input
  // When a value change, draw() the resultat is stream
  // The magic appears here
  input.sample(FRAME_PER_SECOND)
     .scan([INITIAL_STATE],computeStates)
     .onValue((states) => {
        const state = lastState(states);
        draw(state);
    });
})();