/**
 * Double the value of x
 * Type: Number => Number
 */
function _double(x) {
    return x * 2;
}

/**
 * Add x to y
 * Type: (Number, Number) => Number
 */
function _add(x,y) {
    return x + y;
}


/**
 * Double the value of x
 * Type: Number => Number
 * 
 * TODO : First class functions
 * 1. You can store a function in a variable
 */
var double = _double;

/**
 * Double the values of arr according to function f
 * Type: ([A], A => A) => [A]
 * 
 * TODO : First-class fucntions
 * 2. You can pass a function to another function as parameter
 */
export function doubleArray(arr, f) {
    let tmp = [];
    for(let c of arr) {
        tmp.push(f(c));
    }
    return tmp;
}


/**
 * Returns a function that adds 5 to a given number
 * Type: Number => (Number => Number) 
 * 
 * TODO: Higher-order functions 
 * 1. You can create a function from a function
 * 
 */ 
var add5 = y => _add(5,y);

export {double, add5};