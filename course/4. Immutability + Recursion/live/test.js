import { map, filter } from './base';

const chai = require('chai');
const should = chai.should();
  
describe('Map', function() {
  it('Should return empty array on empty input', function() {
    map([], _ => _).should.deep.equal([])
  })

  it('Should apply a function to every element of the input', function() {
    let random = Array(40).fill().map(() => Math.round(Math.random() * 40))
    let f = x => -3*x+6
    let mapped = map(random, f)
    for(let i = 0; i < 40; i++){
      mapped[i].should.equal(f(random[i]))
    }
  })
})

describe('Filter', function() {
  it('Should return empty array on empty input', function() {
    filter([], _ => true).should.deep.equal([])
  })

  it('Should filter the input according to a function', function() {
    let random = Array(40).fill().map(() => Math.round(Math.random() * 40))
    let p = x => x > 10 && x % 3 === 0
    filter(random, p).every(p).should.equal(true)
  })
})
