/**
 * Checks whether the given array contains the given value(s) or not. The value(s) is/are
 * searched in O(n*k) using javascript strict equality operator (`===`), where n is the
 * array length and k is the amount of passed values.
 * 
 * This function returs true if and only if all given values are present in the array.
 * 
 * @param {Array} array The array to be checked
 * @param {...*} values The value(s) to be searched in the array
 * 
 * @returns {boolean} A boolean that indicates whether the array contains the value.
 * 
 * @example
 * 
 * ```
 * arrayHas([1, 2, 3], 1); // true
 * arrayHas([1, 2, 3], 2, 1, 1); // true
 * arrayHas([1, 2, 3], 2, 4, 1); // false
 * arrayHas([1, 2, 3], [1, 2, 3]); // false
 * ```
 */
let arrayHas = function(array, ...values) {
    return values.every(value => array.some(obj => obj === value));
};

/* test */ module.exports = {
    snippet: arrayHas,
    snippetName: "arrayHas",
    snippetTest: t => {
        t.is(arrayHas([1, 2, 3], 1), true);
        t.is(arrayHas([1, 2, 3], 2, 1, 1), true);
        t.is(arrayHas([1, 2, 3], 2, 4, 1), false);
        t.is(arrayHas([1, 2, 3], [1, 2, 3]), false);
    }
};