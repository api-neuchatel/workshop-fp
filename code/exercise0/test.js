import { add2Plus2} from './ex';

const chai = require('chai');
const should = chai.should();
  
describe('Test installation', function() {
  it('Should 2 + 2 = 4', function() {
    add2Plus2().should.equal(4)
  })
})
