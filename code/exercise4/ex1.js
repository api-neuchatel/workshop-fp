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

export { reduce }