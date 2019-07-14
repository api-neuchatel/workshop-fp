import { fromEvent, interval } from 'baconjs';
import math from 'mathjs';

const initialPosition = 500;

const GRAVITY = [0, 9];
const SMALL_JUMP_VECTOR = [0, -17];
const JUMPING_LIMIT = 150;
const SPRITE_CHANGE_MS = 100;
const SPRITE_OFFSET = 16;
const MONSTER_SPEED = 5;
const Y_POSITION = 106;
const FRAME_PER_SECOND = 1000/20;

let initialState = {
    player: {
        position: [0,Y_POSITION],
        size: [16,24],
        jumpingSince: 0,
        sprite: {
            x: 0,
            y: 0,
            time: 0
        }
    },
    world : {
        position: [initialPosition, 215]
    },
    monsters: [{position: [300,113], size: [19,17]},
               {position: [500,113], size: [19,17]},
               {position: [550,113], size: [19,17]}],
    gameOver : false,
    score: 0
};

const mappingKeys = {37: 'left', 39: 'right', 38: 'top', 32: 'top', 82: 'rewind'};

let ctx;
let game;
let image;
let world;
let monster;

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

    ctx.clearRect(0,0,game.width,game.height);
    ctx.drawImage(world,0+state.world.position[0]-initialPosition,200,500,215,0,0,game.width,game.height);
    ctx.drawImage(image,sprite.x,0,size[0],size[1],position[0],position[1],16,24);
    ctx.fillText("Score :" + state.score, 230, 15);

    state.monsters.forEach(m => {
        ctx.drawImage(monster,0,0,19,17,m.position[0],m.position[1],m.size[0],m.size[1]);
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
        if(y>Y_POSITION) {
            return [x,Y_POSITION];
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
        if(y>=Y_POSITION) {
            return 0;
        } else {
            return jumpingSince;
        }
    }
}

const newWorldPosition = (isMovingInDirections, position) => {
    const position2 = addIf(position, isMovingInDirections('left'), (pos) => math.add(position,[-20,0]));
    const position3 = addIf(position2, isMovingInDirections('right'), (pos) => math.add(position,[20,0]));
    return position3;
}

const moveMonsters = monsters => {
    return monsters.map(m => {
        const [x,y] = m.position;


        
        if((x-MONSTER_SPEED)<0) {
            return {
                size: m.size,
                position: [400,y],
                time: 0,

            };
        } else {
            return {
                size: m.size,
                position: [x-MONSTER_SPEED,y],
                offet: 0,
            };
        }
    });
}

const addScore = (score) => {
    return score + 10;
}

function computeStates(states, event) {
    const state = lastState(states);

    const playerPosition = state.player.position;
    const jumpingSince = state.player.jumpingSince;

    const isMoving = isMovingInDirections(event.direction);

    if(state.gameOver) {
        return [states[0]];
    }

    if(event.rewind) {
        let offset = states.length-10 < 0 ? 1 : states.length-10;
        let a = states.splice(0, offset);
        return a;
    }

    const still = !isMoving('left') && !isMoving('right');

    const nextPlayerState = {
        position: newPlayerPosition(isMoving, jumpingSince, playerPosition),
        jumpingSince: newPlayerJumpingSince(isMoving, jumpingSince, playerPosition),
        size: state.player.size,
        sprite: newSprite(state.player.sprite, still)
    };

    const monsters = moveMonsters(state.monsters);

    const newState = {
        player : nextPlayerState,
        world : {
            position: newWorldPosition(isMoving, state.world.position)
        },
        monsters : monsters,
        gameOver : collideWithMonsters(nextPlayerState, monsters),
        score : addScore(state.score)
    }

    return states.concat(newState);
}

(() => {
    game = document.getElementById("game");
    ctx = game.getContext("2d");
    image = new Image();
    image.setAttribute('src','spritesheet2.png');
    world = new Image();
    world.setAttribute('src', 'world.png');
    monster = new Image();
    monster.setAttribute('src', 'monster.png');

    var keyDownEventStream = fromEvent(document, "keydown").map((e) => ({keyDown : mappingKeys[e.keyCode]}));
    var keyUpEventStream = fromEvent(document, "keyup").map(e => ({keyUp: mappingKeys[e.keyCode]}));
    var keysEventStream = keyDownEventStream.merge(keyUpEventStream);
    var input = keysEventStream.scan({direction: []}, (acc,v) => {

    const keysPressed = v.keyDown ? addDirection(acc.direction, v.keyDown) : acc.direction;
    const keysRemoved = v.keyUp ? removeDirection(keysPressed, v.keyUp) : keysPressed;
    const rewind = isRewind(v.keyDown);

    return {
        direction: keysRemoved,
        rewind: rewind
    };
  });

  input.sample(FRAME_PER_SECOND)
     .scan([initialState],computeStates)
     .onValue((states) => {
        const state = lastState(states);
        draw(state);
    });
})();

function isRewind(direction) {
    return direction == 'rewind';
}