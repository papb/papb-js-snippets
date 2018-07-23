/**
 * Replaces an array with another array (in-place).
 * 
 * @param {array} baseArray The array that will be replaced by the other array.
 * @param {array} otherArray The array whose values will be put into the base array.
 * This array is not modified by calling this function.
 * 
 * @return {array} Returns the base array (for chaining convenience).
 * 
 * @example
 * 
 * ```
 * let x = [1, -1, -2, 3];
 * replaceArray(x, ["a", "b"]);
 * console.log(x); // ["a", "b"]
 * ```
 */
let replaceArray = function(baseArray, otherArray) {
    baseArray.splice(0, baseArray.length, ...otherArray);
    return baseArray;
};

/* test */ module.exports = {
    snippet: replaceArray,
    snippetName: "replaceArray",
    snippetTest: t => {
        let x = [1, -1, -2, 3];
        replaceArray(x, ["a", "b"]);
        t.deepEqual(x, ["a", "b"]);
    }
};