/**
 * Creates an ES6 Map object from an array, where each object's key is defined
 * by the keyMaker function.
 * 
 * @param {Array} array The source array.
 * @param {function} keyMaker The function that takes an element of the array and
 * returns a key to be used in the map for that element. If this function returns
 * a repeated key for two different objects, the former will be overwritten and
 * only the latter value will remain in the map.
 * 
 * @returns {Map} A map whose keys are the results of calling keyMaker on the array
 * elements and whose values are the array elements.
 * 
 * @example
 * 
 * ```
 * let array = [{ a: 3 }, { a: 1, d: 2 }, { a: 5, b: 3 }];
 * let map = arrayToMap(array, x => x.a);
 * map.get(3); // { a: 3 }
 * map.get(1); // { a: 1, d: 2 }
 * map.get(5); // { a: 5, b: 3 }
 * ```
 */
let arrayToMap = function(array, keyMaker) {
    return new Map(array.map(x => [keyMaker(x), x]));
};

/* test */ module.exports = {
    snippet: arrayToMap,
    snippetName: "arrayToMap",
    snippetTest: t => {
        let array = [{ a: 3 }, { a: 1, d: 2 }, { a: 5, b: 3 }];
        let map = arrayToMap(array, x => x.a);
        t.deepEqual(map.get(3), { a: 3 });
        t.deepEqual(map.get(1), { a: 1, d: 2 });
        t.deepEqual(map.get(5), { a: 5, b: 3 });
    }
};