import { divisibleBy2, triple } from './base';

const chai = require('chai');
const should = chai.should();
  
describe('DivisibleBy2', function() {
  it('Should return empty array on empty input', function() {
    divisibleBy2([]).should.deep.equal([])
  })
  it('Should return only even elements of random input', function() {
    let random = Array(40).fill().map(() => Math.round(Math.random() * 40))
    divisibleBy2(random).every(x => x % 2 === 0).should.equal(true)
  })
})

describe('Triple', function() {
  it('Should return empty array on empty input', function() {
    triple([]).should.deep.equal([])
  })
  it('Should triple every element of a random input', function() {
    let random = Array(40).fill().map(() => Math.round(Math.random() * 40))
    let tripled = triple(random)
    for(var i = 0; i < 40; i++) {
      tripled[i].should.equal(3*random[i])
    }
  })
})
