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
 * Reduces the values of the array using f.
 * Type: [A] => (B, [A]) => B
 */
let reduce = xs => f => null // TODO



/**
 * Sum an array arr with an imperative loop and a mutable variable.
 * Type: [Number] -> Number
 * 
 * 1. I can sum the values of an array using an imperative loop and a mutable variable
 */
const sumArrayImperativeLoop = (arr) => {
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
const sumArrayRecusion = (arr, sum = 0) => {
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
const sumArrayReduce = (arr) => arr.reduce((acc, v) => acc + v, 0);

export { reduce, sumArrayImperativeLoop, sumArrayRecusion, sumArrayReduce }