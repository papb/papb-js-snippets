/**
 * Returns a shallow clone of the given object.
 * 
 * @param {object} obj The object to be shallow-cloned
 * @return {object} The shallow-cloned object
 */
const shallowClone = function(obj) {
    return Object.assign({}, obj);
};

/* test */ module.exports = {
    snippet: shallowClone,
    snippetName: "shallowClone",
    snippetTest: t => {
        const x = { a: 1, b: 2 };
        t.not(x, { a: 1, b: 2 });
        t.deepEqual(shallowClone(x), { a: 1, b: 2 });
    }
};