/**
 * Partie 4: Immutability and Recursion
 * Template Live Coding
 */

// Type: ([A], A => B) => [B]
let map = (array, f) => {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        tmp.push(f(array[i]))
    }
    return tmp
}

// Type: ([A], A => Boolean) => [A]
let filter = (array, p) => {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        if(p(array[i])) {
            tmp.push(array[i])
        }
    }
    return tmp
}

export { map, filter }