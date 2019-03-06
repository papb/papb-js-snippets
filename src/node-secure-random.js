/**
 * Cryptographycally secure equivalent to Math.random() in Node.
 * 
 * @return {number} A number between 0 (inclusive) and 1 (exclusive)
 */
const nodeSecureRandom = function() {
    const crypto = require("crypto");
    return crypto.randomBytes(4).readUInt32BE(0) / 0x100000000;
};

/* test */ module.exports = {
    snippet: nodeSecureRandom,
    snippetName: "nodeSecureRandom",
    snippetTest: t => {
        for (let i = 0; i < 1000; i++) {
            const r = nodeSecureRandom();
            t.true(0 <= r && r < 1);
        }
    }
};