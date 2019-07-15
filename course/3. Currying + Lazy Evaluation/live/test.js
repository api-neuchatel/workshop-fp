import { greet, Stream } from './final';

const chai = require('chai');
const should = chai.should();
  
describe('Greet', function() {
  it('Should produce correct output', function() {
    greet("Mr")("Jean")("Dupond").should.equal("Mr Jean Dupond")
  })
})

describe('Streams', function() {
  let stream = Stream.init(0)(x => x + 1)

  it('take(0) should return empty array', function() {
    Stream.take(stream)(0).should.deep.equal([])
  })

  it('take should take the first n elements of the stream', function() {
    Stream.take(stream)(5).should.deep.equal([0, 1, 2, 3, 4])
  })

  it('map should apply function to every element of a stream', function() {
    let mapped = Stream.map(stream)(x => 2*x)
    Stream.take(mapped)(5).should.deep.equal([0, 2, 4, 6, 8])
  })
})
