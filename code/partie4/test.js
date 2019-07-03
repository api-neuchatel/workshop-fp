import { reduce } from './ex1';

const chai = require('chai');
const should = chai.should();
  
describe('Reduce', function() {
  it('1. Returns null on empty input', function() {
    should.equal(reduce([])(x => x), null);
  });
})