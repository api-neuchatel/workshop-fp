ex1 = require("./ex1.js")
const chai = require('chai');
const should = chai.should();
  
describe('Reduce', function() {
  it('1. Returns null on empty input', function() {
    should.equal(ex1.reduce([])(x => x), null);
  });
})