import { reduce, sumArrayImperativeLoop, sumArrayRecusion, sumArrayReduce } from './ex1';

const chai = require('chai');
const should = chai.should();

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

describe('Reduce', function() {
  it('1. It should return correct reduced value for addition', function() {
    reduce([1, 2, 3, 4, 5, 6])((x, y) => x + y).should.equal(21);
  });
  it('2. It should return correct reduced value for multiplication', function() {
    reduce([1, 2, 3, 4, 5, 6])((x, y) => x * y).should.equal(720);
  });
  it('3. It should return correct reduced value for string concatenation', function() {
    reduce(["Hello", "world!", "Welcome", "in", "functional", "programming!"])((x, y) => x + " " + y).should.equal("Hello world! Welcome in functional programming!");
  });
})