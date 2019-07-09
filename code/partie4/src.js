import { fromEvent, interval } from 'baconjs';
import math from 'mathjs';

let initialState = {
    player: {
        position: [0,100],
        size: [16,24],
        speed: 5,
        jumpingSince: 0,
        sprite: {
            x: 16,
            y: 10,
            time: 0
        } 
    },
    world : {
        position: [500, 215]
    },
    monsters: [{position: [50,100], size: [16,24]}]
};

const GRAVITY = [0, 9];
const SMALL_JUMP_VECTOR = [0, -17];

const lastState = (states) => states[states.length-1];
const clone = (o) => JSON.parse(JSON.stringify(o));

const mappingKeys = {37: 'left', 39: 'right', 38: 'top', 32: 'top', 82: 'rewind'};

let ctx;
let game;
let image;
let world;
const spriteChange = 100;
const fpms = 1000/30;

function computeStates(states, event) {
    const currentState = lastState(states);
    const newState = clone(currentState);

    const currentSprite = currentState.player.sprite;
    const timeInCurrentSprite = currentSprite.time;

    const position = newState.player.position;

    if(event.rewind) {
        let offset = states.length-10 < 0 ? 1 : states.length-10;
        let a = states.splice(0, offset);
        return a;
    }

    if(event.direction.includes('left')) {
        newState.player.position = math.add(position,[-5,0]);
        newState.world.position = math.add(newState.world.position, [-10,10]);
    } else if(event.direction.includes('right')) {
        newState.player.position = math.add(position,[5,0]);
        newState.world.position = math.add(newState.world.position, [10,10]);
    }

    if(event.direction.includes('top') && newState.player.jumpingSince<150) {
        const pos = newState.player.position;
        newState.player.position = math.add(math.add(pos, SMALL_JUMP_VECTOR), GRAVITY);
        newState.player.jumpingSince += 25; 
    } else {
        const pos = newState.player.position;
        const [x,y] = math.add(pos, GRAVITY);
        if(y>100) {
            newState.player.jumpingSince = 0;
        }
        if(y>100) {
            newState.player.position = [x,100];
        } else {
            newState.player.position = [x,y];
        }
    }

    if(collideWithMonsters(newState.player, newState.monsters)) {
        console.warn('game over');
    }

    if((timeInCurrentSprite+fpms)>spriteChange) {
      if(currentState.player.sprite.x+16>16) {
          newState.player.sprite.x = 0;
        } else {
          newState.player.sprite.x = currentState.player.sprite.x + 16;
        }
        newState.player.sprite.time = 0;
    } else {
      newState.player.sprite.time += fpms;
    }

    return states.concat(newState);
}

(() => {
    game = document.getElementById("game");
    ctx = game.getContext("2d");
    image = new Image();
    image.setAttribute('src','spritesheet.png');
    world = new Image();
    world.setAttribute('src', 'world.png');
    
  let $ = (selector) => document.querySelector(selector);
  
  var keyDownEventStream = fromEvent(document, "keydown").map((e) => ({dir : mappingKeys[e.keyCode]}));
  var keyUpEventStream = fromEvent(document, "keyup").map(e => ({rdir: mappingKeys[e.keyCode]}));

  var keysEventStream = keyDownEventStream.merge(keyUpEventStream);
  var val = keysEventStream.scan({direction: []}, (acc,v) => {

    if(v.dir && !acc.direction.includes(v.dir)) {
        acc.direction = acc.direction.concat(v.dir);
    }

    if(v.rdir) {
      acc.direction = acc.direction.filter(e => e!==v.rdir);
    }

    acc.rewind = v.dir == 'rewind'

    return acc;
  });

  var framerate = interval(fpms);
  var states = framerate.combine(val, (_,event) => event)
                        .throttle(fpms)
                        .scan([initialState],computeStates);

  states.onValue((states) => {
    const state = lastState(states);
    draw(state);
  });
})();

/**
 * Draw the current state to the screen
 * It's a side effect function
 * 
 * Type: State => Unit
 * <
 */
function draw(state) {

    const sprite = state.player.sprite;
    const position = state.player.position;
    const size = state.player.size;

    ctx.clearRect(0,0,game.width,game.height);
    ctx.drawImage(world,0,200,state.world.position[0],state.world.position[1],0,0,game.width,game.height);
    ctx.drawImage(image,sprite.x,10,size[0],size[1],position[0],position[1],16,24);

    state.monsters.forEach(m => {
        ctx.drawImage(image,sprite.x,10,m.size[0],m.size[1],m.position[0],m.position[1],16,24);
    });
}

function collideWithMonsters(player, monsters) {
   const collide = m => player.position[0] < m.position[0] + m.size[0] &&
                        player.position[0] + player.size[0] > m.position[0] &&
                        player.position[1] >= m.position[1];

    return monsters.some(collide);
}