/**
 * Partie 3: Currying + Lazy Evaluation
 * Completed Live Coding
 */

// Currying
const greet = gender => firstname => lastname => gender + " " + firstname + " " + lastname

// Lazy Evaluation
let Stream = {
    init: x => f => {
      return {
          value: x,
          next() { return Stream.init(f(x))(f) }
        }
    },

    take: stream => n => {
        var tmp = []
        let nextStream = stream
        for(let i = 0; i < n; i++) {
          tmp[i] = nextStream.value
          nextStream = nextStream.next()
        }
        return tmp
    },

    map: s => f => {
        return {
          value: f(s.value),
          next() { return Stream.map(s.next())(f) }
        }
    }
}
export { greet, Stream }