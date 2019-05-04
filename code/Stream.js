let Helpers = {
    /**
     * Prepends x to xs.
     * Type: A => [A] => [A]
     */
    prepend: x => xs => [x].concat(xs)
}
  
let Stream = {
    /**
     * Constructs a stream out of an initial value (x) and a function (f) that computes the next value of the stream.
     * Type: A => (A => A) => Stream[A]
     */
    init: x => f => {
        return {
            value: x,
            next() { return Stream.init(f(x))(f) }
        }
    },
    
    /**
     * Applies a function (f) to each element of a stream (s).
     * Type: Stream[A] => (A => B) => Stream[B]
     */
    map: s => f => {
        return {
            value: f(s.value),
            next() { return Stream.map(s.next())(f) }
        }
    },
    
    /**
     * Filters the elements of a stream (s) to keep only those who match a predicate (p).
     * Type: Stream[A] => (A => Boolean) => Stream[A]
     */
    filter: s => p => {
        if(p(s.value)) {
            return {
                value: s.value,
                next() { return Stream.filter(s.next())(p) }
            }
        }
        return Stream.filter(s.next())(p)
    },
    
    /**
     * Evaluates the first n elements of the stream.
     * Type: Stream[A] => Int => [A]
     */
    take: s => n => n === 0 ? [] : Helpers.prepend(s.value)(Stream.take(s.next())(n-1)),
    
    /**
     * Evaluates the first elements of the stream (s) until a value matches the predicate (p).
     * Type: Stream[A] => (A => Boolean) => [A]
     */
    takeUntil: s => p => p(s.value) ? [] : Helpers.prepend(s.value)(Stream.takeUntil(s.next())(p))
  }
  
  // Examples
  let integers = Stream.init(1)(x => x+1)
  let even = Stream.map(integers)(x => 2*x)
  let mul3 = Stream.filter(integers)(x => x % 3 === 0)
  
  console.log(Stream.take(integers)(10))
  console.log(Stream.takeUntil(integers)(x => 2*x === 10))
  console.log(Stream.take(even)(10))
  console.log(Stream.takeUntil(even)(x => 3*x === 60))
  console.log(Stream.take(mul3)(10))
  