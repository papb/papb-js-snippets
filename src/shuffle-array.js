/**
 * Shuffles the given array in-place, using the Fisher-Yates algorithm (also known
 * as Knuth algorithm).
 * 
 * Recall that if you want a new array instead of changing the existing array, just
 * call .slice() before.
 * 
 * @param {Array} array The array to be shuffled.
 * @return {Array} The same array (for chaining convenience).
 * 
 * @example
 * 
 * ```
 * let fruits = ["Apple", "Orange", "Mango"];
 * fruits.shuffle();
 * console.log(fruits); // ["Orange", "Mango", "Apple"];
 * ```
 * 
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Credits to http://sedition.com/perl/javascript-fy.html
 * Thanks also to CoolAJ86
 */
const shuffleArray = function(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Parameter must be an array.");
    }

    let currentIndex = array.length;
    let randomIndex;
    let temp;

    // While there remain elements to shuffle...
    while (currentIndex > 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;
};

/* test */ module.exports = {
    snippet: shuffleArray,
    snippetName: "shuffleArray",
    snippetTest: t => {
        const fruits = ["Apple", "Orange", "Mango"];
        const result = shuffleArray(fruits);
        t.is(fruits, result);
        t.true(snippets.arrayHas(result, "Apple", "Orange", "Mango"));

        t.throws(() => shuffleArray({}));
        t.throws(() => shuffleArray(null));
        t.throws(() => shuffleArray(5));
        t.throws(() => shuffleArray("test"));
    }
};