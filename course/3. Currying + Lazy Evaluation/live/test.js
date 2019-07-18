import { greet, Stream } from './base';

const chai = require('chai');
const should = chai.should();
  
describe('Greet', function() {
  it('Should produce correct output', function() {
    greet("Mr")("Jean")("Dupond").should.equal("Mr Jean Dupond")
  })
})

describe('Streams', function() {
  
})
