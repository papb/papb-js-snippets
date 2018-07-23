/**
 * Convert the given value to string, adding zeros to the left of it
 * so that the resulting string has length equal to the given length
 * (or, if the number representation is longer than the given length,
 * simply return the number converted to string).
 * 
 * @param {*} value The value to be converted (usually a number)
 * @param {int} length The desired length
 * 
 * @return {string} A string representation of the value with
 * length greater than or equal to the given length.
 * 
 * @example
 * 
 * ```
 * zeroPadLeft(1234, 7); // "0001234"
 * zeroPadLeft(1234, 3); // "1234"
 * zeroPadLeft("Hello", 9); // "0000Hello"
 * ```
 */
let zeroPadLeft = function(value, length) {
    var str = "" + value;
    while (str.length < length) str = "0" + str;
    return str;
};

/* test */ module.exports = {
    snippet: zeroPadLeft,
    snippetName: "zeroPadLeft",
    snippetTest: t => {
        t.is(zeroPadLeft(1234, 7), "0001234");
        t.is(zeroPadLeft(1234, 3), "1234");
        t.is(zeroPadLeft("Hello", 9), "0000Hello");
    }
};