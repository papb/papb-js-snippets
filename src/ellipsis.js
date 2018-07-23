/**
 * Shorten a string to a certain length (truncating it and adding "...").
 * 
 * @param {string} str The string to be shortened
 * @param {int} length The desired length (including the "...")
 * @return {string} A string whose length is at most the given length.
 * 
 * @example
 * 
 * ```
 * ellipsis("Hello World!", 11); // "Hello Wo..."
 * ellipsis("Hello", 8); // "Hello"
 * ellipsis("Hello World", 11); // "Hello World"
 * ```
 */
let ellipsis = function(str, maxlength) {
    return str.length > maxlength ? str.substring(0, maxlength - 3) + "..." : str;
};

/* test */ module.exports = {
    snippet: ellipsis,
    snippetName: "ellipsis",
    snippetTest: t => {
        t.is(ellipsis("Hello World!", 11), "Hello Wo...");
        t.is(ellipsis("Hello", 8), "Hello");
        t.is(ellipsis("Hello World", 11), "Hello World");
    }
};