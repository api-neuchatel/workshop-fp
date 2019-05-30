import { infiniteStreamOf1, 
         infiniteStreamOfThatDoubleValues, 
         infiniteStreamOfPrimeNumbers,
         primeNumbersLessThan2000,
         sumArrayImperativeLoop,
         sumArrayRecusion,
         sumArrayReduce
}
from './ex1';
import Stream from './Stream';

const chai = require('chai');
const should = chai.should();

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
});