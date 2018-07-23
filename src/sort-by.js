/**
 * Sort the given array in-place using the values returned by the valuePicker.
 * 
 * @requires snippet:map-in-place
 * 
 * @param {Array} array The array to be sorted.
 * @param {function} valuePicker A function that when applied to each value of
 * the array returns another value to be used for the sorting. This function is
 * called only once per value.
 * @param {boolean} [reverse=false] Whether or not to reverse the sorting.
 * 
 * @return {Array} The given array (for chaining convenience).
 * 
 * @example
 * 
 * ```
 * let list = [{id:7},{id:3}];
 * sortBy(list, x => x.id);
 * console.log(x); // [{id:3},{id:7}];
 * ```
 */
let sortBy = function(array, valuePicker, reverse = false) {
    let n = reverse ? -1 : 1;
    snippets.mapInPlace(array, x => ({ value: x, picked: valuePicker(x) }));
    array.sort((a, b) => a.picked < b.picked ? -n : a.picked === b.picked ? 0 : n);
    snippets.mapInPlace(array, x => x.value);
    return array;
};

/* test */ module.exports = {
    snippet: sortBy,
    snippetName: "sortBy",
    snippetTest: t => {
        let list = [{id:7},{id:3}];
        sortBy(list, x => x.id);
        t.deepEqual(list, [{id:3},{id:7}]);
    }
};