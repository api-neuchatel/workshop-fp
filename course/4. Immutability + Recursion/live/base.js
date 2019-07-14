/**
 * Partie 4: Immutability and Recursion
 * Template Live Coding
 */

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Type: ([A], A => B) => [B]
let map = (array, f) => {
    var tmp = []
    for(i = 0; i < array.length; i++) {
        tmp.push(f(numbers[i]))
    }
    return tmp
}

// Type: ([A], A => Boolean) => [A]
let filter = (array, p) => {
    var tmp = []
    for(i = 0; i < array.length; i++) {
        if(p(numbers[i])) {
            tmp.push(numbers[i])
        }
    }
    return tmp
}

console.log(map(numbers, x => 2*x))
console.log(filter(numbers, x => x % 3 === 0))