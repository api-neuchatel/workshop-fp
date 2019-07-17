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
 * Sum an array arr with an imperative loop and a mutable variable.
 * Type: [Number] -> Number
 * 
 * 1. I can sum the values of an array using an imperative loop and a mutable variable
 */
const sumArrayImperativeLoop = (arr) => {
    null
}

/**
 * Sum an array arr with a recursion using an accumulator sum which starts with 0.
 * Type: ([Number], Number) -> Number
 * 
 * 2. I can sum the values fo an array using recursion
 */
const sumArrayRecusion = (arr, sum = 0) => {
    return null
}

/**
 * Sum an array arr with a the reduce function.
 * Type: [Number] -> Number
 * 
 * 3. I can sum the values fo an array using reduce
 */
const sumArrayReduce = null

/**
 * Reduces the values of an array as explained in the problem statement.
 * Example: reduce([1, 2, 3, 4, 5], (x, y) => x + y)) is 15
 * 
 * Type: [A] => (B => A) => B
 */
const reduce = arr => f => {
    const iter = arr => acc => null
    return iter(null)(null)
}

export { sumArrayImperativeLoop, sumArrayRecusion, sumArrayReduce, reduce }