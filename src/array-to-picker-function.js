/**
 * Creates a function that yields the elements of the given array in order when called with
 * different arguments (and is idempotent). If the end of the array is reached, picking will
 * restart from the beginning. The behaviour of this function is better understood by example
 * (which can be found below).
 * 
 * @param {Array} array The source array
 * @return {function} The picker function
 * 
 * @example
 * 
 * ```
 * let f = arrayToPickerFunction([1, 2, 3]);
 * let w = 55;
 * let x = {};
 * let y = {};
 * let z = "something";
 * f(w); // 1
 * f(x); // 2
 * f(w); // 1
 * f(y); // 3
 * f(z); // 1
 * f(y); // 3
 * f(y); // 3
 * f(x); // 2
 * f(z); // 1
 * ```
 */
const arrayToPickerFunction = function(array) {
    if (!Array.isArray(array)) throw new TypeError("Parameter must be an array.");
    const localArray = array.slice(); // If the given array changes, this won't change.
    const indexMap = new Map();
    let nextIndex = 0;
    return function(obj) {
        if (!indexMap.has(obj)) {
            indexMap.set(obj, nextIndex);
            nextIndex = (nextIndex + 1) % localArray.length;
        }
        return localArray[indexMap.get(obj)];
    };
};

/* test */ module.exports = {
    snippet: arrayToPickerFunction,
    snippetName: "arrayToPickerFunction",
    snippetTest: t => {
        const f = arrayToPickerFunction([1, 2, 3]);
        const w = 55;
        const x = {};
        const y = {};
        const z = "something";
        t.is(f(w), 1);
        t.is(f(x), 2);
        t.is(f(w), 1);
        t.is(f(y), 3);
        t.is(f(z), 1);
        t.is(f(y), 3);
        t.is(f(y), 3);
        t.is(f(x), 2);
        t.is(f(z), 1);
    }
};