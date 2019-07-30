import { 
  double, 
  doubleArray,
  add5 }
from './ex1';

import { 
  findPersonById,
  peopleAcronyms, 
  peopleAcronymsUppercaseStartWithD,
  peopleYoungerThan30,
  commentsByMovie, 
  map,
  filter} 
from './ex2';

const chai = require('chai');
const should = chai.should();

describe('First-class functions', function() {
  it('1. I can store a function in a variable', function() {
    should.not.equal(double, null, "Et si on stockait la fonction _add dans add?");
    double(2).should.equal(4);
  });
  it('2. I can pass a function to another function as parameter', function() {
    doubleArray([1,2,4], (x) => x * 2).should.deep.equal([2,4,8]);
  });
})

describe('Higher-order functions', function() {
  it('1. I can create a function from a function', function() {
    should.not.equal(add5, null, "add5 doit être une fonction qui retourne une fonction appelant _add en ajoutant 5");
    add5(2).should.equal(7);
  });
});
 
describe('Movies et peoples', function() {
  it('1. I can pass an array and a function to apply a transformation via the map() function', function() {
    map([1,2,3,4], e => e * 2).should.deep.equal([2,4,6,8]);
  });
  it('2. I can pass an array and a predicate to filter out items via the filter() function', function() {
    filter([1,2,3,4], e => e % 2 == 0).should.deep.equal([2,4]); 
  });
  it('3. I can create a function that close over a variable in its environnement, that\' called a closure!', function() {
    should.not.equal(findPersonById(1), null, "Not implemented");
    findPersonById(1).name.should.equal("Arnaud");
  });
  it('4. I can get people younger than 30', function() {
    peopleYoungerThan30().length.should.equal(2);
  });
  it('5. I can get two letters acronyms', function() {
    peopleAcronyms().length.should.equal(6);
    peopleAcronyms().every(e => {
      e.length.should.equal(2)
    });
  })
  it('6. I can get two letters acronyms in uppercase that starts with D', function() {
    peopleAcronymsUppercaseStartWithD().length.should.equal(2);
    peopleAcronymsUppercaseStartWithD().every(e => {
      e.should.match(/^D[A-Z]$/)
    });
  })
  it('7. I can get all comments for each movie and people', function() {
    commentsByMovie().forEach(c => c.should.have.all.keys('name','grade','movie'));
    commentsByMovie().length.should.equal(8);
  });
}); 