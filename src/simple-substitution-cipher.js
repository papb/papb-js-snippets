/**
 * Perform a simple substitution cipher on a string. Note: this is a very weak encryption algorithm that shouldn't
 * be used for security purposes.
 * 
 * It is common to associate this function with Base64 encode/decode methods so that any string can be encrypted,
 * instead of only working with strings whose chars are in the plaintext alphabet. The default plaintext and
 * ciphertext alphabets are compatible with Base64. See, for example. js-base64 by dankogai on npm.
 *
 * @param {string} str The string to be encrypted.
 * 
 * @param {Object} [options] An object to provide options.
 * 
 * @param {string} [options.plaintextAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="]
 * The plaintext alphabet to be used. Must have the same length as options.ciphertextAlphabet.
 * 
 * @param {string} [options.ciphertextAlphabet="hrVtM=TYziLNIemw39dBXDj18lykGUPosR20+fEK6buFCcJpZgqWH/xQ57S4nvaAO"]
 * The ciphertext alphabet to be used. Must have the same length as options.plaintextAlphabet.
 * 
 * @param {boolean} [options.reverse=false] Whether or not to reverse the encryption. Setting this to true is exactly
 * equivalent as switching options.plaintextAlphabet and options.ciphertextAlphabet.
 * 
 * @param {char | null} [options.unknownChar="?"] The character to be used in place of a character in the input string that
 * is not present in the plaintext alphabet. If null, the character will be left untouched.
 * 
 * @see https://en.wikipedia.org/wiki/Substitution_cipher
 * 
 * @example
 * 
 * ```
 * simpleSubstitutionCipher("Hello"); //"YPff6"
 * simpleSubstitutionCipher("YPff6", { reverse: true }); // "Hello"
 * simpleSubstitutionCipher("Hello", {
 *     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR"
 * }); // "WDpp="
 * simpleSubstitutionCipher("WDpp=", {
 *     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR",
 *     reverse: true
 * }); // "Hello"
 * ```
 */
let simpleSubstitutionCipher = function(str, options = {}) {
    let plaintextAlphabet = options.plaintextAlphabet;
    let ciphertextAlphabet = options.ciphertextAlphabet;
    let reverse = options.reverse;
    let unknownChar = options.unknownChar;

    if (plaintextAlphabet === undefined) plaintextAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if (ciphertextAlphabet === undefined) ciphertextAlphabet = "hrVtM=TYziLNIemw39dBXDj18lykGUPosR20+fEK6buFCcJpZgqWH/xQ57S4nvaAO";
    if (reverse === undefined) reverse = false;
    if (unknownChar === undefined) unknownChar = "?";

    if (typeof plaintextAlphabet !== "string") throw new Error("Plaintext alphabet must be a string.");
    if (typeof ciphertextAlphabet !== "string") throw new Error("Ciphertext alphabet must be a string.");

    if (plaintextAlphabet.length !== ciphertextAlphabet.length) {
        throw new Error("Plaintext alphabet and ciphertext alphabet must have the same length.");
    }

    if (reverse) {
        let temp = plaintextAlphabet;
        plaintextAlphabet = ciphertextAlphabet;
        ciphertextAlphabet = temp;
    }

    let lookupMap = new Map();
    for (let i = 0; i < plaintextAlphabet.length; i++) {
        lookupMap.set(plaintextAlphabet.charAt(i), ciphertextAlphabet.charAt(i));
    }

    let result = [];
    for (let i = 0; i < str.length; i++) {
        let char = lookupMap.get(str.charAt(i));
        if (char === undefined) char = unknownChar === null ? char : unknownChar;
        result.push(char);
    }

    return result.join("");
};

/* test */ module.exports = {
    snippet: simpleSubstitutionCipher,
    snippetName: "simpleSubstitutionCipher",
    snippetTest: t => {
        t.is(simpleSubstitutionCipher("Hello"), "YPff6");
        t.is(simpleSubstitutionCipher("YPff6", { reverse: true }), "Hello");
        t.is(simpleSubstitutionCipher("Hello", {
            ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR"
        }), "WDpp=");
        t.is(simpleSubstitutionCipher("WDpp=", {
            ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR",
            reverse: true
        }), "Hello");
    }
};





// t.is(simpleSubstitutionCipher("hello! ^^"), "yTDCkTnRz=7P");
// t.is(simpleSubstitutionCipher("yTDCkTnRz=7P", { reverse: true }), "hello! ^^");
// t.is(simpleSubstitutionCipher("hello! ^^", {
//     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR"
// }), "lf1HPfXTQthD");
// t.is(simpleSubstitutionCipher("lf1HPfXTQthD", {
//     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR",
//     reverse: true
// }), "hello! ^^");