import { 
    addScore, 
    isStill, 
    rewind10Fames, 
    isRewind, 
    lastState, 
    newMonsterSprite, 
    moveMonsters, 
    newWorldPosition, 
    addIf, 
    isJumpReachedLimit, 
    newPlayerJumpingSince, 
    isMovingInDirections,
    addDirection,
    removeDirection,
    collideWithMonsters,
    newSprite,
    newPlayerPosition
} from './src.js';

const chai = require('chai');
const should = chai.should();

describe('addScore', function() {
    it('Given 10 should be 20', function() {
        addScore(10).should.be.equal(20);
    });
  });
describe('isStill', function() {
    it('Given moving left should be false', function() {
        isStill((direction) => direction == 'left').should.be.equal(false);
    });
    it('Given moving right should be false', function() {
        isStill((direction) => direction == 'right').should.be.equal(false);
    });
    it('Given moving right should be true', function() {
        isStill((direction) => direction == 'top').should.be.equal(true);
    });
});
describe('isMovingInDirections', function() {
    it('Given directions [\'left\',\'right\'] should moving left' , function() {
        isMovingInDirections(['left','right'])('left').should.equal(true);
    });
    it('Given directions [\'left\'] should not moving right' , function() {
        isMovingInDirections(['left'])('right').should.equal(false);
    });
});
describe('rewind10Frames', function() {
    it('Given empty array should be empty array', function() {
        rewind10Fames([]).length.should.equal(0)
    });
    it('Given array with 9 elements should be first state', function() {
        rewind10Fames([{},{},{},{},{},{},{},{},{}]).length.should.equal(1)
    });
    it('Given array with 10 elements should be first state', function() {
        rewind10Fames([{},{},{},{},{},{},{},{},{},{}]).length.should.equal(1)
    });
    it('Given array with 12 elements should 2 elements', function() {
        rewind10Fames([{},{},{},{},{},{},{},{},{},{},{},{}]).length.should.equal(2)
    });
});
describe('isRewind', function() {
    it('Given left should be false', function() {
        isRewind('left').should.equal(false);
    });
    it('Given rewind should be true', function() {
        isRewind('rewind').should.equal(true);
    });
});
describe('lastState', function() {
    it('Given one state should be this state', function() {
        lastState(['firstState']).should.equal('firstState');
    });
    it('Given two states should be the last state', function() {
        lastState(['firstState','secondState']).should.equal('secondState');
    });
});
describe('newMonsterSprite', function() {
    it('Given sprite at time 0, should be sprite at time 50', function() {
        newMonsterSprite({x: 0, y: 0, time: 0}).should.deep.equal({x: 0, y:0, time:50});
    });
    it('Given sprite at time 100 at x 0, should be sprite at time 0 at position x 17', function() {
        newMonsterSprite({x: 0, y: 0, time: 100}).should.deep.equal({x: 17, y:0, time:0});
    });
    it('Given sprite at time 100 at x 17, should be sprite at time 0 at position x 0', function() {
        newMonsterSprite({x: 17, y: 0, time: 100}).should.deep.equal({x: 0, y:0, time:0});
    });
});
describe('moveMonsters', function() {
    it('Given monster at position 400, should be moved to position 397', function() {
        const monster = {position: [400,0], sprite : {x: 0, y: 0, time: 0}, size: [0,0]};
        moveMonsters([monster])[0].should.deep.equal({position: [397,0], sprite :{x: 0, y:0, time:50}, size: [0,0]});
    });
    it('Given monster at position 0, should be moved to position 400', function() {
        const monster = {position: [0,0], sprite : {x: 0, y: 0, time: 0}, size: [0,0]};
        moveMonsters([monster])[0].should.deep.equal({position: [400,0], sprite :{x: 0, y:0, time:50}, size: [0,0]});
    });
});

describe('newWorldPosition', function() {
    it('Given direction left and world position [0, 0] should be [-10, 0]', function() {
        newWorldPosition((direction) => direction=='left', [0,0]).should.deep.equal([-10,0]);
    });
    it('Given direction right and world position [0, 0] should be [10, 0]', function() {
        newWorldPosition((direction) => direction=='left', [0,0]).should.deep.equal([-10,0]);
    });
    it('Given direction right and left and world position [0, 0] should be [0, 0]', function() {
        newWorldPosition((direction) => ['left','right'].includes(direction), [0,0]).should.deep.equal([0,0]);
    });
});

describe('addIf', function() {
    it('Given position [0,0] if true and add [0,10] should be [0,10]', function() {
        const toAdd = [0,10];
        addIf([0,0],true,(pos) => [pos[0]+toAdd[0],pos[1]+toAdd[1]]).should.deep.equal([0,10]);
    });
    it('Given position [0,0] if false and add [0,10] should be [0,0]', function() {
        const toAdd = [0,10];
        addIf([0,0],false,(pos) => [pos[0]+toAdd[0],pos[1]+toAdd[1]]).should.deep.equal([0,0]);
    });
});

describe('isJumpReachedLimit', function() {
    it('Given 50 should be false', function() {
        isJumpReachedLimit(50).should.equal(false);
    });
    it('Given 300 should be true', function() {
        isJumpReachedLimit(300).should.equal(true);
    });
    it('Given 350 should be true', function() {
        isJumpReachedLimit(350).should.equal(true);
    });
});

describe('newPlayerJumpingSince', function() {
    it('Given is moving top and jumping since 100, should be jumping since 150', function() {
        newPlayerJumpingSince(direction => direction=='top',100, [0,-10]).should.deep.equal(150);
    });
    it('Given is moving top and jumping since 300, should be jumping since 0', function() {
        newPlayerJumpingSince(direction => direction=='top',300, [0,-20]).should.deep.equal(300);
    });
    it('Given is moving top and jumping since 300 and reached bottom, should be jumping since 0', function() {
        newPlayerJumpingSince(direction => direction=='top',300, [0,0]).should.deep.equal(0);
    });
    it('Given is not moving top and jumping since 300 and reached bottom, should be jumping since 0', function() {
        newPlayerJumpingSince(direction => false,300, [0,0]).should.deep.equal(0);
    });
});

describe('addDirection', function() {
    it('Given directions [] when adding \'left\' should be [\'left\']', function() {
        addDirection([], 'left').should.deep.equal(['left']);
    });
    it('Given directions [\'left\'] when adding \'left\' should be [\'left\']', function() {
        addDirection(['left'], 'left').should.deep.equal(['left']);
    });
});

describe('removeDirection', function() {
    it('Given directions [] when removing \'left\' should be []', function() {
        removeDirection([], 'left').should.deep.equal([]);
    });
    it('Given directions [\'left\',\'right\'] when removing \'left\' should be [\'right\']', function() {
        removeDirection(['left','right'], 'left').should.deep.equal(['right']);
    });
});

describe('collideWithMonsters', function() {
    it('Given collision between player and monster, should be true', function() {
        const player = {position: [0,100], size: [10,10]};
        const monster = {position: [0,95], size: [10,10]};
        collideWithMonsters(player, [monster]).should.equal(true);
    });
    it('Given no collision between player and monster, should be false', function() {
        const player = {position: [0,100], size: [10,10]};
        const monster = {position: [11,89], size: [10,10]};
        collideWithMonsters(player, [monster]).should.equal(false);
    });
});

describe('newSprite', function() {
    it('Given sprite {x:0,y:0,time:0} and not still should be {x:0,y:0,time:50}', function() {
        newSprite({x: 0,y: 0, time:0},false).should.deep.equal({x: 0, y:0, time:50});
    });
    it('Given sprite {x:0,y:0,time:150} and not still should be {x:16,y:0,time:0}', function() {
        newSprite({x: 0,y: 0, time:150},false).should.deep.equal({x: 16, y:0, time:0});
    });
    it('Given sprite {x:0,y:0,time:150} and still should be {x:16,y:0,time:0}', function() {
        newSprite({x: 0,y: 0, time:0},true).should.deep.equal({x: 16, y:0, time:0});
    });
});

describe('newPlayerPosition', function() {
    it('Given position [0,0] and moving left should be [-5,0]', function() {
        newPlayerPosition((direction) => direction=='left', 100, [0,0]).should.deep.equal([-5,0])
    });
    it('Given position [0,0] and moving left should be [5,0]', function() {
        newPlayerPosition((direction) => direction=='right', 100, [0,0]).should.deep.equal([5,0])
    });
    it('Given position [0,0] and moving left and right should be [0,0]', function() {
        newPlayerPosition((direction) => ['right','left'].includes(direction), 100, [0,0]).should.deep.equal([0,0])
    });
    it('Given position [0,0] and moving left and jumping (according to gravity) should be [-5,-8]', function() {
        newPlayerPosition((direction) => ['top','left'].includes(direction), 0, [0,0]).should.deep.equal([-5,-8]);
    });
    it('Given position [0,0] and moving left and jumping (according to gravity) should be [-10,0]', function() {
        newPlayerPosition((direction) => ['top','left'].includes(direction), 300, [-5,-8]).should.deep.equal([-10,0]);
    });
    it('Given position [0,0] and moving left and jumping (according to gravity) should be [0,0]', function() {
        newPlayerPosition((direction) => ['top','left'].includes(direction), 300, [0,0]).should.deep.equal([-5,0]);
    });
});
