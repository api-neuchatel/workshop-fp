import { reduce } from './ex1';

const chai = require('chai');
const should = chai.should();
  

describe('Reduce', function() {
  it('1. Returns null on empty input', function() {
    should.equal(reduce([])(x => x), null);
  });
})

describe('Recursion', function() {
  it('1. I can sum the values of an array using an imperative loop and a mutable variable', function() {
    sumArrayImperativeLoop([1,2,3,4]).should.equal(10);
  });
  it('2. I can sum the values fo an array using recursion', function() {
    sumArrayRecusion([1,2,3,4]).should.equal(10);
  });
  it('3. I can sum the values fo an array using reduce', function() {
    sumArrayReduce([1,2,3,4]).should.equal(10);
  });
})