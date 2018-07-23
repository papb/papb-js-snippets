/**
 * Pick a random element from the given array (using a uniform distribution
 * produced by `Math.random()`).
 * 
 * @param {Array} array The array.
 * 
 * @returns {*} A random element from the given array.
 *
 */
let pickRandom = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

/* test */ module.exports = {
    snippet: pickRandom,
    snippetName: "pickRandom",
    snippetTest: t => {
        let array = [{}, {}, {}, {}];
        for (let i = 0; i < 10; i++) {
            t.true(snippets.arrayHas(array, pickRandom(array)));
        }
    }
};