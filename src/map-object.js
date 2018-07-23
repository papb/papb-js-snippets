/**
 * Create a new object with the same keys as the given object, whose values
 * on those keys are mapped by the mapFunction function. This should be analogous
 * to the usage of Array.prototype.map, but for objects.
 * 
 * @param {object} obj The source object
 * @param {function(value: *, key: string): *} mapFunction The map function
 * 
 * @return {object} The new object
 * 
 * @example
 * 
 * ```
 * let x = { a: "hello", b: "world" };
 * let y = mapObject(x, (value, key) => value + "-" + key);
 * console.log(y); // { a: "hello-a", b: "world-b" };
 * ```
 */
let mapObject = function(obj, mapFunction) {
    if (typeof obj !== "object") throw new TypeError("obj must be an object");
    if (typeof mapFunction !== "function") throw new TypeError("mapFunction must be a function");
    if (obj === null) return null;
    let result = {};
    Object.keys(obj).forEach(key => {
        result[key] = mapFunction(obj[key], key);
    });
    return result;
};

/* test */ module.exports = {
    snippet: mapObject,
    snippetName: "mapObject",
    snippetTest: t => {
        let x = { a: "hello", b: "world" };
        let y = mapObject(x, (value, key) => value + "-" + key);
        t.deepEqual(y, { a: "hello-a", b: "world-b" });
    }
};