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

const FRAME_PER_SECOND = 1000/20;

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

/**
 * Returns the time since the player is jumping.
 */
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

/**
 * Returns the new world positions
 */
const newWorldPosition = (isMoving, position) => {
    const position2 = addIf(position, isMoving('left'), (pos) => math.add(pos,[-10,0]));
    const position3 = addIf(position2, isMoving('right'), (pos) => math.add(pos,[10,0]));
    return position3;
}

/**
 * Returns the new sprite state for a monster
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
 * Returns an array of states 10 frames in the past
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
    isStill
};