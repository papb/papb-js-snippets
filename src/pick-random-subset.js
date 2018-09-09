/**
 * Pick a random subset array of the given array.
 * 
 * @requires snippet:random-int
 * 
 * @param {Array} array The source array.
 * 
 * @param {object} [options] An object specifying options.
 * @param {int} [options.length] If specified, defines the length of the subset to be taken.
 * If omitted (undefined), the length of the subset will be defined randomly between
 * options.minLength and array.length (inclusive)
 * @param {int} [options.minLength=0] This option is only relevant if options.length is
 * undefined. This option defines the minimum length of the picked subset. A common use case
 * is to set this option to 1 instead of the default 0 to disallow the empty subset to be
 * taken.
 * 
 * @returns {Array} An array whose elements consist of a random subset of the given array.
 * 
 * @throws {Error} If options.length or options.minLength is greater than array.length.
 */
const pickRandomSubset = function(array, options = undefined) {
    // Edited from https://github.com/Jam3/random-array-subset

    let length = options && options.length !== undefined ? options.length : undefined;
    const minLength = options && options.minLength !== undefined ? options.minLength : 0;

    if (length === undefined) {
        if (minLength > array.length) {
            throw new Error("The specified minLength can't be greater than the array length.");
        }
        length = snippets.randomInt(minLength, array.length + 1);
    } else if (length > array.length) {
        throw new Error("The specified length can't be greater than the array length.");
    }
    array = array.slice();
    const result = [];
    while (result.length < length) {
        const index = snippets.randomInt(0, array.length);
        result.push(array[index]);
        array.splice(index, 1);
    }
    return result;
};

/* test */ module.exports = {
    snippet: pickRandomSubset,
    snippetName: "pickRandomSubset",
    snippetTest: t => {
        const array = [{}, {}, {}, {}];
        for (let i = 0; i < 20; i++) {
            t.true(snippets.arrayHas(array, ...pickRandomSubset(array)));
            t.is(pickRandomSubset(array, { length: 3 }).length, 3);
            t.is(pickRandomSubset(array, { length: 0 }).length, 0);
            t.true(pickRandomSubset(array, { minLength: 1 }).length > 0);
        }
    }
};