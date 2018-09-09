/**
 * Deep clone an object without circular references. Everything whose typeof is
 * not "object" will be copied by reference (without cloning).
 * 
 * @requires npm:is-circular^1.0.0
 * @requires snippet:map-object
 * 
 * @param {object} object The object to be cloned
 * 
 * @return {object} The cloned object
 * 
 * @throws {Error} If the object has circular references
 */
let deepClone = (() => {
    const isCircular = require('is-circular');
    return function(obj) {
        if (obj === null) return null;
        if (typeof obj !== "object") return obj;
        if (isCircular(obj)) throw new Error("Unable to deep clone with circular references.");
        if (Array.isArray(obj)) return obj.map(deepClone);
        return snippets.mapObject(obj, deepClone);
    };
})();

/* test */ module.exports = {
    snippet: deepClone,
    snippetName: "deepClone",
    snippetTest: t => {
        let obj = { a: 1, b: 2, c: [{ d: 3, e: 4 }] };
        let clone = deepClone(obj);
        t.not(clone, obj);
        t.not(clone.c, obj.c);
        t.not(clone.c[0], obj.c[0]);
        t.deepEqual(clone, obj);
        obj.f = obj;
        t.throws(() => {
            deepClone(obj);
        });
    }
};