/**
 * Partie 4: Immutability and Recursion
 * Completed Live Coding
 */

/**
 * Returns the head of an array (ie the first element).
 * Type: [A] => A
 */
let head = xs => xs[0]

/**
 * Returns the tail of an array (ie the array without the first element).
 * Type: [A] => [A]
 */
let tail = xs => xs.slice(1)

/**
 * Prepends x to xs.
 * Type: A => [A] => [A]
 */
let prepend = x => xs => x === null ? xs : [x].concat(xs)

/**
 * Applies a function (f) to each element of an array (xs).
 * Type: [A] => (A => B) => [B]
 */
let map = xs => f => xs.length === 0 ? [] : prepend(f(head(xs)))(map(tail(xs))(f))

/**
 * Filters the elements of an array (xs) keeping only those who match a given predicate (p).
 * Type: [A] => (A => Boolean) => [A]
 */
let filter = xs => p => {
  if(xs.length === 0) { return [] }
  let queue = filter(tail(xs))(p)
  return p(head(xs)) ? prepend(head(xs))(queue) : queue
}

/**
 * Reduces an array (xs) using a given combiner (c).
 * Type: [A] => (A => A => A) => A
 */
let reduce = xs => c => xs.length === 1 ? head(xs) : c(head(xs))(reduce(tail(xs))(c))

// Examples
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let double = xs => map(xs)(x => 2*x)
let even = xs => filter(xs)(x => x % 2 === 0)
console.log(double(numbers))
console.log(even(numbers))
console.log(reduce(even(numbers))(x => y => x + y))
console.log(reduce(numbers)(x => y => x + y))