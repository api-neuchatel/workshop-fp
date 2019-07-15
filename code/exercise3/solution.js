import Stream from './Stream';

/**
 * Returns if a number is a prime number
 * Type: Number -> Boolean
 **/
function isPrime(number)
 { 
   if (number <= 1)
   return false;

   // The check for the number 2 and 3
   if (number <= 3)
   return true;

   if (number%2 == 0 || number%3 == 0)
   return false;

   for (var i=5; i*i<=number; i=i+6)
   {
      if (number%i == 0 || number%(i+2) == 0)
      return false;
   }

   return true;
 }

 /**
  * Create a currified function that says "Hello firstName lastName"
  * 
  * Type: String -> String -> String
  * 
  * TODO: 1. I can create a function that receives a firstName and returns a function that needs a
  * lastName to produce "Hello firstName lastName"
  */
 const helloCurry = firstName => lastName => "Hello " + firstName + " " + lastName  

 /**
  * Create a currified function that multiply two values
  * 
  * Type : Number => Number => Number
  * 
  * TODO: 2. I can create a currified version that multiply 2 values
  */
 const multiplyCurry = a => b => a * b;

 /**
  * Create a function that returns a value multiply by 4
  * 
  * Type : Number => Number
  * 
  * TODO: 3. Then I can a function multiplyBy4 using multiplyCurry
  */
 const multiplyBy4 = multiplyCurry(4);

 /**
  * Create a function that returns a value multiply by 4
  * 
  * Type : Number => Number
  * 
  * TODO: 4. Or even multiplyBy20 from the multiplyCurry function
  */
 const multiplyBy20 = multiplyCurry(20);

 /**
  * Create an inifinite stream of 1.
  * The stream must start with 0
  * 
  * TODO: 1. I can produce an infinite stream that produces 1
  */
const infiniteStreamOf1 = Stream.init(0)(x => 1);

/**
  * Create an inifinite stream that increments the value by 1.
  * The stream must start with 0
  * 
  * TODO: 2. I can produce an infinite stream that double all values
  */
const infiniteStreamOfThatDoubleValues = Stream.map(Stream.init(0)(x => x + 1))(x => x * 2);

/**
  * Create an inifinite stream that increments the value by 1 an filters out each value which is not a prime number
  * The stream must start with 0
  * 
  * TODO: 3. I can produce an infinite stream that produces prime numbers
  */
const infiniteStreamOfPrimeNumbers = Stream.filter(Stream.init(0)(x => x + 1))(isPrime);

/**
  * Create an inifinite stream that increments the value by 1 an filters out each value which is not a prime number
  * until 2000.
  * The stream must start with 0
  * 
  * TODO: 4. I can get all the prime numbers from a stream that are less than 2000
  */
const primeNumbersLessThan2000 = Stream.takeUntil(Stream.filter(Stream.init(0)(x => x + 1))(isPrime))(x => x > 2000);

export {
    helloCurry,
    multiplyCurry,
    multiplyBy4,
    multiplyBy20,
    infiniteStreamOf1,
    infiniteStreamOfThatDoubleValues,
    infiniteStreamOfPrimeNumbers,
    primeNumbersLessThan2000
}
