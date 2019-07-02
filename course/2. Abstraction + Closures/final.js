/**
 * Partie 2: Functions as First-Class Citizen, Higher Order Functions and Closures.
 * Completed Live Coding
 */

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Type: Int => Int => Boolean
let isDivisibleBy = n => x => x % n === 0

// Type: Int => Int => Int
let multiplyBy = n => x => x*n

// Type: Int => Boolean
let isEven = isDivisibleBy(2)

// Type: Int => Int
let triple = multiplyBy(3)

// Type: ([A], A => Boolean, A => B) => [B]
let iter = (array, p, f) => {
    var tmp = []
    for(i = 0; i < array.length; i++) {
        if(p(numbers[i])) {
            tmp.push(f(numbers[i]))
        }
    }
    return tmp
}

// Type: ([A], A => B) => [B]
let map = (array, f) => iter(array, _ => true, f)
// Type: ([A], A => Boolean) => [A]
let filter = (array, p) => iter(array, p, x => x)

console.log("Even numbers: " + filter(numbers, isEven))
console.log("Triple of numbers: " + map(numbers, triple))