import { double, doubleArray, addCurry } from './partie2';

const chai = require('chai');
const should = chai.should();

describe('First-class functions', function() {
  it('1. You can store a function in a variable', function() {
    should.not.equal(double, null, "double ne doit pas être null");
    double(2).should.equal(4);
  });
  it('2. You can pass a function to another function', function() {
    doubleArray([1,2,4], (x) => x * 2).should.deep.equal([2,4,8]);
  });
})

describe('Higher-order functions', function() {
  it('1. You can create a function from a function', function() {
    should.not.equal(double, null, "double ne doit pas être null");
    double(2).should.equal(4);
  });
  it('2. You can create a function from a function', function() {
    addCurry(5)(2)(7).should.equal(14);
  });
});