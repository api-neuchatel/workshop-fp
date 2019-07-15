/**
 * Partie 2: Functions as First-Class Citizen, Higher Order Functions and Closures.
 * Template Live Coding
 */

// Type: [Int] => [Int]
function divisibleBy2(numbers) {
    var tmp = []
    for(var i = 0; i < numbers.length; i++) {
        if(numbers[i] % 2 === 0) {
            tmp.push(numbers[i])
        }
    }
    return tmp
}

// Type: [Int] => [Int]
function triple(numbers) {
    var tmp = []
    for(var i = 0; i < numbers.length; i++) {
        tmp.push(3*numbers[i])
    }
    return tmp
}

export { divisibleBy2, triple }