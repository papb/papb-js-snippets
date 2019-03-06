/**
 * Generates an accessor function to get/set pseudo-private fields on objects. This function,
 * when passed an object, returns another object which is its pseudo-private field keeper. This
 * is better understood with an example.
 * 
 * @returns {function}
 * 
 * @example
 * 
 * ```
 * const myObj = { publicField1: 1, publicField2: 2 };
 * const $ = makePrivateAccessor(); // Make a private accessor
 * $(myObj).privateField1 = 3;
 * console.log(myObj.privateField1); // undefined
 * console.log($(myObj).privateField1); // 3
 * const $2 = makePrivateAccessor(); // Another accessor
 * console.log($2(myObj).privateField1); // undefined
 * // Each accessor has their own 'private access' to the object
 * $2(myObj).privateField1 = 4;
 * console.log($2(myObj).privateField1); // 4
 * console.log($(myObj).privateField1); // 3
 * // If you lose access to the accessor function, you lose all
 * // the private properties set by it.
 * ```
 */
const makePrivateAccessor = function() {
    const accessorWeakMap = new WeakMap();
    return function accessor(obj) {
        if (obj === null) throw new Error("Expected a non-null object, received null");
        if (typeof obj !== "object") throw new Error(`Expect a non-null object, received ${typeof obj}`);
        if (!accessorWeakMap.has(obj)) {
            const accessed = {};
            accessorWeakMap.set(obj, accessed);
            return accessed;
        }
        return accessorWeakMap.get(obj);
    };
};

/* test */ module.exports = {
    snippet: makePrivateAccessor,
    snippetName: "makePrivateAccessor",
    snippetTest: t => {
        const myObj = { publicField1: 1, publicField2: 2 };
        const $ = makePrivateAccessor();
        $(myObj).privateField1 = 3;
        t.is(myObj.privateField1, undefined);
        t.is($(myObj).privateField1, 3);
        const $2 = makePrivateAccessor();
        t.is($2(myObj).privateField1, undefined);
        $2(myObj).privateField1 = 4;
        t.is($2(myObj).privateField1, 4);
        t.is($(myObj).privateField1, 3);
    }
};