// Int -> Int
export function _double(x) {
    return x * x;
}

export function _add(x,y,z) {
    return x + y + z;
}

// ([Int], (Int -> Int)) -> [Int]
export function doubleArray(arr, f) {
    let arr2 = [];
    for(let a of arr) {
        arr2.push(f(a));
    }
    return arr2;
}

export function addCurry(x) {
    return y => z => x + y + z;
}

// Int -> (Int -> Int)
export function add5(y) {
    return add(5,y);
}

var double = _double;

export {double};