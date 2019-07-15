/**
 * Partie 2: Functions as First-Class Citizen, Higher Order Functions and Closures.
 * Completed Live Coding
 */

// Type: Int => Int => Boolean
let isDivisibleBy = n => x => x % n === 0

// Type: Int => Int => Int
let multiplyBy = n => x => x*n

// Type: Int => Boolean
let isEven = isDivisibleBy(2)

// Type: ([A], A => Boolean, A => B) => [B]
let iter = (array, p, f) => {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        if(p(array[i])) {
            tmp.push(f(array[i]))
        }
    }
    return tmp
}

// Type: ([A], A => B) => [B]
let map = (array, f) => iter(array, _ => true, f)
// Type: ([A], A => Boolean) => [A]
let filter = (array, p) => iter(array, p, x => x)

let divisibleBy2 = array => filter(array, isEven)
let triple = array => map(array, multiplyBy(3))

export { divisibleBy2, triple }