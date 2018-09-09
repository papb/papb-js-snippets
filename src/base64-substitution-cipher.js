/**
 * Perform a substitution cipher on any string by first converting the string to Base64. Note: this is a very weak
 * encryption algorithm that shouldn't be used for security purposes.
 * 
 * The plaintext alphabet used is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" (after the
 * string is converted to Base64).
 * 
 * To decrypt, set the `reverse` option to true.
 * 
 * @requires snippet:simple-substitution-cipher
 * @requires npm:js-base64 by dankogai
 *
 * @param {string} str The string to be encrypted / decrypted.
 * 
 * @param {Object} [options] An object to provide options.
 * 
 * @param {string} [options.ciphertextAlphabet="hrVtM=TYziLNIemw39dBXDj18lykGUPosR20+fEK6buFCcJpZgqWH/xQ57S4nvaAO"]
 * The ciphertext alphabet to be used. Must be an anagram of the plaintext alphabet.
 * 
 * @param {boolean} [options.reverse=false] Whether or not to reverse the encryption, i.e., to decrypt. Setting this
 * to true will cause the cipher to be undone followed by the Base64 decode of the result.
 * 
 * @throws {Error} If the `reverse` option is set to true and the passed string is not a valid Base64 string.
 * 
 * @see https://en.wikipedia.org/wiki/Substitution_cipher
 * @see https://en.wikipedia.org/wiki/Base64
 * 
 * @example
 * 
 * ```
 * base64SubstitutionCipher("hello! ^^"); // "yTDCkTnRz=7P"
 * base64SubstitutionCipher("yTDCkTnRz=7P", { reverse: true }); // "hello! ^^"
 * base64SubstitutionCipher("hello! ^^", {
 *     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR"
 * }); // "lf1HPfXTQthD"
 * base64SubstitutionCipher("lf1HPfXTQthD", {
 *     ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR",
 *     reverse: true
 * }); // "hello! ^^"
 * ```
 */
const base64SubstitutionCipher = (function() {

    const Base64 = require('js-base64').Base64;

    function areAnagrams(str1, str2) {
        return str1.split("").sort().join("") === str2.split("").sort().join("");
    }

    return function base64SubstitutionCipher(str, options = {}) {
        const plaintextAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let ciphertextAlphabet = options.ciphertextAlphabet;
        let reverse = options.reverse;

        if (ciphertextAlphabet === undefined) ciphertextAlphabet = "hrVtM=TYziLNIemw39dBXDj18lykGUPosR20+fEK6buFCcJpZgqWH/xQ57S4nvaAO";
        if (reverse === undefined) reverse = false;
        if (typeof ciphertextAlphabet !== "string") throw new Error("Ciphertext alphabet must be a string.");
        if (!areAnagrams(plaintextAlphabet, ciphertextAlphabet)) {
            throw new Error("Ciphertext alphabet and plaintext alphabet must be anagrams.");
        }

        if (!reverse) str = Base64.encode(str);
        const result = snippets.simpleSubstitutionCipher(str, { plaintextAlphabet, ciphertextAlphabet, reverse });
        if (reverse && result.indexOf("?") !== -1) throw new Error("The passed string is not a valid Base64 string.");
        return reverse ? Base64.decode(result) : result;
    };

})();

/* test */ module.exports = {
    snippet: base64SubstitutionCipher,
    snippetName: "base64SubstitutionCipher",
    snippetTest: t => {
        t.is(base64SubstitutionCipher("hello! ^^"), "yTDCkTnRz=7P");
        t.is(base64SubstitutionCipher("yTDCkTnRz=7P", { reverse: true }), "hello! ^^");
        t.is(base64SubstitutionCipher("hello! ^^", {
            ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR"
        }), "lf1HPfXTQthD");
        t.is(base64SubstitutionCipher("lf1HPfXTQthD", {
            ciphertextAlphabet: "cq/r8tfWQ306yFAEVK24O1jGIolPMnD7gTUZdpCm=+kxHzSNLs59iuBbahevXJwYR",
            reverse: true
        }), "hello! ^^");
        t.throws(() => base64SubstitutionCipher("hello! ^^", { reverse: true }));
    }
};