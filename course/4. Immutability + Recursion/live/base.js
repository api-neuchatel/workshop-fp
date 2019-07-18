/**
 * Partie 4: Immutability and Recursion
 * Template Live Coding
 */

//////////////////
// Immutability //
//////////////////
let birthDate = new Date(1985, 11, 26)
const alice = { name: "Alice", birthDate: birthDate }

birthDate.setFullYear(2000)
const bob = { name: "Bob", birthDate: birthDate }

///////////////
// Récursion //
///////////////
// Type: ([A], A => B) => [B]
const map = (array, f) => {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        tmp.push(f(array[i]))
    }
    return tmp
}

// Type: ([A], A => Boolean) => [A]
const filter = (array, p) => {
    var tmp = []
    for(let i = 0; i < array.length; i++) {
        if(p(array[i])) {
            tmp.push(array[i])
        }
    }
    return tmp
}

export { alice, bob, map, filter }