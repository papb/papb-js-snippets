/**
 * Filter an array in-place.
 * 
 * @requires snippet:replace-array
 * 
 * @param {function} filterFunction The filter function.
 * 
 * @return {Array} Returns the same array.
 * 
 * @example
 * 
 * ```
 * let x = [1, -1, -2, 3];
 * filterInPlace(x, v => v > 0);
 * console.log(x); // [1, 3]
 * ```
 */
const filterInPlace = function(array, filterFunction) {
    return snippets.replaceArray(array, array.filter(filterFunction));
};

/* test */ module.exports = {
    snippet: filterInPlace,
    snippetName: "filterInPlace",
    snippetTest: t => {
        const x = [1, -1, -2, 3];
        filterInPlace(x, v => v > 0);
        t.deepEqual(x, [1, 3]);
    }
};