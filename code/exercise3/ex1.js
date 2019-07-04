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

/**
 * Sum an array arr with an imperative loop and a mutable variable.
 * Type: [Number] -> Number
 * 
 * 1. I can sum the values of an array using an imperative loop and a mutable variable
 */
export function sumArrayImperativeLoop(arr) {
    let sum = 0;
    for(const v of arr) {
        sum += v;
    }
    return sum;
}

/**
 * Sum an array arr with a recursion using an accumulator sum which starts with 0.
 * Type: ([Number], Number) -> Number
 * 
 * 2. I can sum the values fo an array using recursion
 */
export function sumArrayRecusion(arr, sum = 0) {
    if(arr.length === 0) {
        return sum;
    }
    return sumArrayRecusion(arr.slice(1),sum + arr[0]);
}

/**
 * Sum an array arr with a the reduce function.
 * Type: [Number] -> Number
 * 
 * 3. I can sum the values fo an array using reduce
 */
export function sumArrayReduce(arr) {
    return arr.reduce((acc, v) => acc + v, 0);
}

export {
    infiniteStreamOf1,
    infiniteStreamOfThatDoubleValues,
    infiniteStreamOfPrimeNumbers,
    primeNumbersLessThan2000
}
