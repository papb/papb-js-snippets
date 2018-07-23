/**
 * Map an array in-place.
 * 
 * @requires snippet:replace-array
 * 
 * @param {function} mapFunction The map function.
 * 
 * @return {Array} Returns the same array.
 * 
 * @example
 * 
 * ```
 * let x = [1, -1, -2, 3];
 * mapInPlace(x, v => v + 2);
 * console.log(x); // [3, 1, 0, 5]
 * ```
 */
let mapInPlace = function(array, mapFunction) {
    return snippets.replaceArray(array, array.map(mapFunction));
};

/* test */ module.exports = {
    snippet: mapInPlace,
    snippetName: "mapInPlace",
    snippetTest: t => {
        let x = [1, -1, -2, 3];
        mapInPlace(x, v => v + 2);
        t.deepEqual(x, [3, 1, 0, 5]);
    }
};