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
        // The code below could be used to test the equivalent implementation for Node
        // for (let i = 0; i < 1000; i++) {
        //     const r = browserSecureRandom();
        //     t.true(0 <= r && r < 1);
        // }
    }
};