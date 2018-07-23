/**
 * Produces an array which contains a subset of the given array, deduplicating
 * elements by the values each yield when passed to the valuePicker function.
 * In other words, produces a subset of the array by keeping only one element
 * per value yielded when passed to the valuePicker function.
 * 
 * @requires snippet:replace-array
 * 
 * @param {Array} array The array to the deduplicated
 * 
 * @param {function} valuePicker A function that when applied to each value of
 * the array returns another value to be used for the deduplication. This function
 * is called only once per value.
 * 
 * @param {boolean} [inPlace=false] If true, alters the given array instead of
 * creating a new one.
 * 
 * @returns {Array} The resulting array (if inPlace is true, this is the same as
 * the passed array, otherwise it is a new array).
 * 
 * @example
 * 
 * ```
 * let array = [{ a: 1, b: 2 }, { a: 3, b: 2 }];
 * deduplicateBy(array, x => x.b, true);
 * console.log(array); // [{ a: 1, b: 2 }]
 * ```
 */
let deduplicateBy = function(array, valuePicker, inPlace = false) {
    let result = [];
    let helperArray = array.map(x => ({ value: x, picked: valuePicker(x) }));
    helperArray.forEach(x => {
        if (!result.find(r => r.picked === x.picked)) result.push(x);
    });
    result = result.map(x => x.value);
    if (inPlace) return snippets.replaceArray(array, result);
    return result;
};

/* test */ module.exports = {
    snippet: deduplicateBy,
    snippetName: "deduplicateBy",
    snippetTest: t => {
        let array = [{ a: 1, b: 2 }, { a: 3, b: 2 }];
        deduplicateBy(array, x => x.a, true);
        t.deepEqual(array, [{ a: 1, b: 2 }, { a: 3, b: 2 }]);
        deduplicateBy(array, x => x.b, true);
        t.deepEqual(array, [{ a: 1, b: 2 }]);
    }
};