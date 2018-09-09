/**
 * Generate a random string of words, lorem-ipsum style.
 * 
 * @requires npm:lorem-ipsum^1.0.0
 * 
 * @param {int} wordCount The amount of words to generate.
 * 
 * @param {boolean} [fullstop=false] Whether or not to add a
 * full stop (".") in the end of the string.
 * 
 * @param {boolean} [ucfirst=true] Whether or not the first
 * character is uppercase.
 * 
 * @return {string} The generated string.
 */
const loremIpsum = (() => {
    const loremIpsum = require('lorem-ipsum');
    return function(wordCount, fullstop = false, ucfirst = true) {
        let str = loremIpsum({ count: wordCount, units: 'words', format: 'plain' });
        if (ucfirst) str = str[0].toUpperCase() + str.substr(1);
        if (fullstop) str += ".";
        return str;
    };
})();

/* test */ module.exports = {
    snippet: loremIpsum,
    snippetName: "loremIpsum",
    snippetTest: t => {
        t.pass();
    }
};