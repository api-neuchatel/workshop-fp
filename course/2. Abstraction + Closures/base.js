/**
 * Partie 2: Functions as First-Class Citizen, Higher Order Functions and Closures.
 * Template Live Coding
 */

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Type: [Int] => [Int]
function divisibleBy2(numbers) {
    var tmp = []
    for(i = 0; i < numbers.length; i++) {
        if(numbers[i] % 2 === 0) {
            tmp.push(numbers[i])
        }
    }
    return tmp
}

// Type: [Int] => [Int]
function triple(numbers) {
    var tmp = []
    for(i = 0; i < numbers.length; i++) {
        tmp.push(3*numbers[i])
    }
    return tmp
}

console.log("Even numbers: " + divisibleBy2(numbers))
console.log("Triple of numbers: " + triple(numbers))