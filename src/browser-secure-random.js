/**
 * Cryptographycally secure equivalent to Math.random() in browsers.
 * 
 * @return {number} A number between 0 (inclusive) and 1 (exclusive)
 */
const browserSecureRandom = function() {
    /* global window */
    const temp = new Uint32Array(1);
    window.crypto.getRandomValues(temp);
    return temp / 0x100000000;
};

/* test */ module.exports = {
    snippet: browserSecureRandom,
    snippetName: "browserSecureRandom",
    snippetTest: t => {
        t.pass();
    }
};