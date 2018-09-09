/**
 * Generates the SHA-256 hash of the given string.
 * 
 * (c) Chris Veness 2002-2014 / MIT License
 * Modified by Pedro Augusto de Paula Barbosa (2018) - MIT
 * 
 * See http://csrc.nist.gov/groups/ST/toolkit/secure_hashing.html
 * and http://csrc.nist.gov/groups/ST/toolkit/examples.html
 * 
 * @requires npm:utf8
 * 
 * @param {string} str The string to be hashed
 * @return {string} The hash of the string, which is a string of
 * length 64 and made of only hexadecimal symbols (0-9 and a-f).
 * 
 * @example
 * 
 * ```
 * sha256("test"); // "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
 * ```
 */
const sha256 = (function() {

    const utf8 = require('utf8');

    const priv = {};

    /**
     * Rotates right (circular right shift) value x by n positions [§3.2.4].
     */
    priv.ROTR = function(n, x) {
        return (x >>> n) | (x << (32-n));
    };

    /**
     * Logical functions [§4.1.2].
     */
    priv.Sigma0 = function(x) { return priv.ROTR(2,  x) ^ priv.ROTR(13, x) ^ priv.ROTR(22, x); };
    priv.Sigma1 = function(x) { return priv.ROTR(6,  x) ^ priv.ROTR(11, x) ^ priv.ROTR(25, x); };
    priv.sigma0 = function(x) { return priv.ROTR(7,  x) ^ priv.ROTR(18, x) ^ (x>>>3); };
    priv.sigma1 = function(x) { return priv.ROTR(17, x) ^ priv.ROTR(19, x) ^ (x>>>10); };
    priv.Ch = function(x, y, z) { return (x & y) ^ (~x & z); };
    priv.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); };

    /**
     * Hexadecimal representation of a number.
     */
    priv.toHexStr = function(n) {
        // Note that we can't use toString(16) as it is implementation-dependant,
        // and in IE it returns signed numbers when used on full words.
        let s = "", v;
        for (let i = 7; i >= 0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
        return s;
    };

    return function sha256(str) {
        if (typeof str !== "string") {
            throw new TypeError("sha256: Parameter must be a string.");
        }

        // convert string to UTF-8, as SHA only deals with byte-streams
        let msg = utf8.encode(str);
        
        // constants [§4.2.2]
        const K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        // initial hash value [§5.3.1]
        const H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];

        // PREPROCESSING
    
        msg += String.fromCharCode(0x80); // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

        // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
        const l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
        const N = Math.ceil(l/16); // number of 16-integer-blocks required to hold 'l' ints
        const M = new Array(N);

        for (let i=0; i<N; i++) {
            M[i] = new Array(16);
            for (let j=0; j<16; j++) { // encode 4 chars per integer, big-endian encoding
                M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                          (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
            } // note running off the end of msg is ok since bitwise ops on NaN return 0
        }
        // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
        // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

        // HASH COMPUTATION [§6.1.2]

        const W = new Array(64); let a, b, c, d, e, f, g, h;
        for (let i=0; i<N; i++) {

            // 1 - prepare message schedule 'W'
            for (let t=0;  t<16; t++) W[t] = M[i][t];
            for (let t=16; t<64; t++) W[t] = (priv.sigma1(W[t-2]) + W[t-7] + priv.sigma0(W[t-15]) + W[t-16]) & 0xffffffff;

            // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
            a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];

            // 3 - main loop (note 'addition modulo 2^32')
            for (let t=0; t<64; t++) {
                const T1 = h + priv.Sigma1(e) + priv.Ch(e, f, g) + K[t] + W[t];
                const T2 = priv.Sigma0(a) + priv.Maj(a, b, c);
                h = g;
                g = f;
                f = e;
                e = (d + T1) & 0xffffffff;
                d = c;
                c = b;
                b = a;
                a = (T1 + T2) & 0xffffffff;
            }

            // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
            H[0] = (H[0]+a) & 0xffffffff;
            H[1] = (H[1]+b) & 0xffffffff;
            H[2] = (H[2]+c) & 0xffffffff;
            H[3] = (H[3]+d) & 0xffffffff;
            H[4] = (H[4]+e) & 0xffffffff;
            H[5] = (H[5]+f) & 0xffffffff;
            H[6] = (H[6]+g) & 0xffffffff;
            H[7] = (H[7]+h) & 0xffffffff;
        }

        return priv.toHexStr(H[0]) + priv.toHexStr(H[1]) + priv.toHexStr(H[2]) + priv.toHexStr(H[3]) +
               priv.toHexStr(H[4]) + priv.toHexStr(H[5]) + priv.toHexStr(H[6]) + priv.toHexStr(H[7]);
    };

})();

/* test */ module.exports = {
    snippet: sha256,
    snippetName: "sha256",
    snippetTest: t => {
        t.is(sha256("test"), "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
        t.is(sha256("中文"), "72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21");
    }
};