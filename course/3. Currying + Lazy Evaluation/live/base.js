/**
 * Partie 3: Currying + Lazy Evaluation
 * Template Live Coding
 */

// Currying
function greet(gender) {
    return function(firstname, lastname) { return gender + " " + firstname + " " + lastname }
}

// Lazy evaluation
var integers = []
for(let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    integers.push(i)
}

export { greet }
