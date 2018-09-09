/**
 * Generates an int between begin (inclusive) and end (exclusive).
 * 
 * @param {int} begin The begin of the range (inclusive)
 * @param {int} end The end of the range (exclusive)
 * @return {int} An int whose value is between begin (inclusive) and
 * end (exclusive).
 * 
 * @throws {Error} If end <= begin.
 * 
 * @example
 * 
 * ```
 * randomInt(0, 5); // A value between 0 and 4 (inclusive)
 * randomInt(-3, 1); // A value between -3 and 0 (inclusive)
 * ```
 */
const randomInt = function(begin, end) {
    if (end <= begin) throw new Error("end must be greater than begin");
    return Math.floor(Math.random() * (end - begin)) + begin;
};

/* test */ module.exports = {
    snippet: randomInt,
    snippetName: "randomInt",
    snippetTest: t => {
        for (let i = 0; i < 100; i++) {
            const random = randomInt(-3, 1);
            t.true(-3 <= random);
            t.true(random < 1);
        }
    }
};