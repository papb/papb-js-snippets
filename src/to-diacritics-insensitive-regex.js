/**
 * Converts a given string to a regex that matches it in a diacritic-insensitive way.
 * 
 * @param {string} string The string to be matched
 * 
 * @return {RegExp} The regexp that matches the string in a diacritic-insensitive way
 * 
 * @example
 * 
 * ```
 * toDiacriticsInsensitiveRegex("resume") === /r[EeÈèÉéÊêËë]s[UuÙùÚúÛûÜü]m[EeÈèÉéÊêËë]/i
 * ```
 */
const toDiacriticsInsensitiveRegex = (() => {
    // Adapted from https://github.com/pocesar/js-diacritic-regex (thank you very much!)
    const charsToEscape = "-[]{}()*+!<=:?./\\^$|#,";
    const mappings = {
        "a": "AaÀàÁáÂâÃãÄä", // "a": String.fromCharCode(65, 97, 192, 224, 193, 225, 194, 226, 195, 227, 196, 228),
        "c": "CcÇç", // "e": String.fromCharCode(69, 101, 200, 232, 201, 233, 202, 234, 203, 235),
        "e": "EeÈèÉéÊêËë", // "i": String.fromCharCode(73, 105, 204, 236, 205, 237, 206, 238, 207, 239),
        "i": "IiÌìÍíÎîÏï", // "o": String.fromCharCode(79, 111, 210, 242, 211, 243, 212, 244, 213, 245, 214, 246),
        "n": "NnÑñ", // "n": String.fromCharCode(78, 110, 209, 241),
        "o": "OoÒòÓóÔôÕõÖö", // "u": String.fromCharCode(85, 117, 217, 249, 218, 250, 219, 251, 220, 252),
        "u": "UuÙùÚúÛûÜü", // "c": String.fromCharCode(67, 99, 199, 231),
        "y": "YyÝýÿ" // "y": String.fromCharCode(89, 121, 221, 253, 159, 255)
    };
    return string => {
        const regexString = string.split("").map(char => {
            if (charsToEscape.indexOf(char) !== -1) return `\\${char}`;
            for (const key in mappings) {
                if (key === char || mappings[key].indexOf(char) !== -1) {
                    return `[${mappings[key]}]`;
                }
            }
            return char;
        }).join("");
        return new RegExp(regexString, "i");
    };
})();

/* test */ module.exports = {
    snippet: toDiacriticsInsensitiveRegex,
    snippetName: "toDiacriticsInsensitiveRegex",
    snippetTest: t => {
        t.is(toDiacriticsInsensitiveRegex("resume").toString(), `/r[EeÈèÉéÊêËë]s[UuÙùÚúÛûÜü]m[EeÈèÉéÊêËë]/i`);
        t.is(toDiacriticsInsensitiveRegex("a+b?").toString(), `/[AaÀàÁáÂâÃãÄä]\\+b\\?/i`);
        t.is(toDiacriticsInsensitiveRegex("match.me(\\'\\')").toString(), `/m[AaÀàÁáÂâÃãÄä]t[CcÇç]h\\.m[EeÈèÉéÊêËë]\\(\\\\'\\\\'\\)/i`);
    }
};