import math from 'mathjs';

// Physics
const GRAVITY = [0, 9];
const SMALL_JUMP_VECTOR = [0, -17];
const JUMPING_LIMIT = 300;
const MONSTER_SPEED = 3;

// Sprite
const SPRITE_CHANGE_MS = 100;
const SPRITE_OFFSET = 16;
const MONSTER_SPRITE_LENGTH = 17;
const MONSTER_LIMIT_SPRITE = 17;

const FRAME_PER_SECOND = 1000/20;

/**
 * Returns a function that returns true if the player is moving in the given direction.
 * Type : ([Direction]) -> Direction -> Boolean 
 * Example : isMovingInDirections(['left','right'])('left') => true
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
 * Returns if the player collide with a monster
 */
const collide = (player, m) => {
    return  player.position[0] < m.position[0] + m.size[0] &&
            player.position[0] + player.size[0] > m.position[0] &&
            player.position[1] >= m.position[1];
}

/**
 * Returns a function that receives a state array and return the last state.
 * Type ([State]) => State
 */
const lastState = states => states[states.length-1];

/**
 * If `ifAdd` is true, calls the function `add` with the `position`
 * Type : (Position, Boolean, Position -> Position) -> Position
 * Example : ([0 0], true, math.add(pos, [10 0])) -> [10 0]
 */
const addIf = (position, ifAdd, add) => {
    if(ifAdd) {
        return add(position);
    }
    return position;
}

/**
 * Returns the new sprite according to the currentSprite and if the player is still
 * 
 * Type: (Sprite, Boolean) -> Sprite
 * Example : ({x: 0, y:0, time:0}, false) -> ({x: 0, y:0, time:50})
 */
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

/**
 * Returns the new player position according the moving directions and the jumping tine.
 * When the player is moving top (jumping), the SMALL_JUMP_VECTOR and the GRAVITIY should be added
 * 
 * Type : ((Direction -> Boolean), Number, Position) -> Position
 * Example : newPlayerPosition((direction) -> direction==='left', 0, [0,0]) => [0,0]
 */
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

/**
 * Returns the time since the player is jumping.
 * The player is jumping if the 'top' key is pressed and if he didn't reach the `isJumpReachedLimit`
 * 
 * Type : ((Direction -> Boolean), Number, Position) -> Number
 */
const newPlayerJumpingSince = (isMovingInDirections, jumpingSince, position) => {
    const isMovingTop = isMovingInDirections('top');
    if(isMovingTop && !isJumpReachedLimit(jumpingSince)) {
        return jumpingSince + FRAME_PER_SECOND;
    } else {
        const [_,y] = math.add(position, GRAVITY);
        if(y>=0) {
            return 0;
        } else {
            return jumpingSince;
        }
    }
}

/**
 * Returns the new position of the world according to a isMoving function and the current position.
 * 
 * Type: ((String -> Boolean), Position) => Position
 */
const newWorldPosition = (isMoving, position) => {
    const position2 = addIf(position, isMoving('left'), (pos) => math.add(pos,[-10,0]));
    const position3 = addIf(position2, isMoving('right'), (pos) => math.add(pos,[10,0]));
    return position3;
}

/**
 * Returns the new sprite state for a monster
 * 
 * Type : Sprite -> Sprite
 * Example : {x: 0, y:0, time: 0} -> {x: 0, y:0, time: 50}
 * 
 */
const newMonsterSprite = monsterSprite => {
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

/**
 * Returns if the current direction is the rewind key
 * direction is among values : 'left', 'right','top','rewind'
 * Type: Direction -> Boolean
 */
const isRewind = direction => {
    return direction === 'rewind';
}

/**
 * Adds 10 to the current score
 * Type : Number -> Number
 */
const addScore = score => {
    return score + 10;
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

/**
 * Returns an array of states 10 frames in the past.
 * There must be always one element in the array
 * Type: [State] -> [State]
 */
const rewind10Fames = states => {
    let offset = states.length-10 <= 0 ? 1 : states.length-10;
    return states.splice(0, offset);
}


/**
 * Move the monsters (sprite + position)
 * The monster is moving at 3 speed (MONSTER_SPEED)
 * If the new poosition is 0, then the monster is positioning at 400
 * You can call use the already defined `newMonsterSprite` function for the sprite
 * 
 * Type : [Monster] -> [Monster]
 * Example : [{position: [400,0], sprite : {x: 0, y: 0, time: 0}, size: [0,0]}] -> [{position: [397,0], sprite :{x: 0, y:0, time:50}, size: [0,0]}]
 * 
 */
const moveMonsters = monsters => {
    return monsters.map(m => {
        const [x,y] = m.position; 
        const newX = x-MONSTER_SPEED<0 ? 400 : x-MONSTER_SPEED;

        return {
            size: m.size,
            position: [newX,y],
            sprite: newMonsterSprite(m.sprite)
        }
    });
}

/**
 * Returns if the value of `jumpingSince` reached the `JUMPING_LIMIT`
 * Type : Number -> Boolean
 */
const isJumpReachedLimit = jumpingSince => jumpingSince >= JUMPING_LIMIT;


/**
 * Returns if the player collides with one of the monsters.
 * You have to call the function `collide` for every monster
 * .
 * Type: (Player, [Monster]) => Boolean
 * Exemple : collideWithMonsters({position: [100,0], size: [10,10]}, [{position: [100,0], size: [10,10]}]}) => true
 */
const collideWithMonsters = (player, monsters) => {
    return monsters.some(m => collide(player,m));
}


export {
    FRAME_PER_SECOND,
    addDirection,
    removeDirection,
    collideWithMonsters,
    moveMonsters,
    newWorldPosition,
    newSprite,
    newPlayerJumpingSince,
    newPlayerPosition,
    addScore,
    isMovingInDirections,
    lastState,
    isRewind,
    rewind10Fames,
    isStill,
    newMonsterSprite,
    addIf,
    isJumpReachedLimit
};