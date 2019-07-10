import { helloCurry,
         infiniteStreamOf1, 
         infiniteStreamOfThatDoubleValues, 
         infiniteStreamOfPrimeNumbers,
         primeNumbersLessThan2000,
         sumArrayImperativeLoop,
         sumArrayRecusion,
         sumArrayReduce,
         multiplyBy20,
         multiplyCurry,
         multiplyBy4
}
from './ex1';
import Stream from './Stream';

const chai = require('chai');
const should = chai.should();

describe('Currying', function() {
  it('1. I can create a function that receives a firstName and returns a function that needs a lastName to produce "Hello firstName lastName"', function() {
    helloCurry("Arnaud")("Geiser").should.equal("Hello Arnaud Geiser");
  });
  it('2. I can create a currified version that multiply 2 values"', function() {
    multiplyCurry(4)(5).should.equal(20);
  });
  it('3. Then I can a function multiplyBy4 using multiplyCurry"', function() {
    multiplyBy4(5).should.equal(20);
  });
  it('4. Or even multiplyBy20 from the multiplyCurry"', function() {
    multiplyBy20(5).should.equal(100);
  });
});

describe('Lazy evaluation - Stream', function() {
  it('1. I can produce an infinite stream that produces 1', function() {
    Stream.take(infiniteStreamOf1)(100)[99].should.equal(1);
    Stream.take(infiniteStreamOf1)(1000)[999].should.equal(1);
  });
  it('2. I can produce an infinite stream that double all values', function() {
    Stream.take(infiniteStreamOfThatDoubleValues)(100)[99].should.equal(198);
    Stream.take(infiniteStreamOfThatDoubleValues)(1000)[999].should.equal(1998);
  });
  it('3. I can produce an infinite stream that produces prime numbers', function() {
    Stream.take(infiniteStreamOfPrimeNumbers)(100)[99].should.equal(541);
    Stream.take(infiniteStreamOfPrimeNumbers)(1000)[999].should.equal(7919);
  });
  it('4. I can get all the prime numbers from a stream that are less than 2000', function() {
    primeNumbersLessThan2000.length.should.equal(303);
    primeNumbersLessThan2000[200].should.equal(1229);
    primeNumbersLessThan2000[302].should.equal(1999);
  });
});