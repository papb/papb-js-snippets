/**
 * Counts how many times each element of the array occurs in it.
 * 
 * @param {Array} array
 * 
 * @return {Map} A map that maps elements to the amount of occurrences.
 * 
 * @example
 * 
 * ```
 * let array = ["a", 1, null, "b", null, "b", "a", "a"];
 * let countMap = countOccurrences(array);
 * countMap.get("a"); // 3
 * countMap.get(1); // 1
 * countMap.get(null); // 2
 * countMap.get("b"); // 2
 * ```
 */
const countOccurrences = function(array) {
    const result = new Map();
    for (const element of array) {
        if (result.has(element)) {
            result.set(element, result.get(element) + 1);
        } else {
            result.set(element, 1);
        }
    }
    return result;
};

/* test */ module.exports = {
    snippet: countOccurrences,
    snippetName: "countOccurrences",
    snippetTest: t => {
        const array = ["a", 1, null, "b", null, "b", "a", "a"];
        const countMap = countOccurrences(array);
        t.is(countMap.get("a"), 3);
        t.is(countMap.get(1), 1);
        t.is(countMap.get(null), 2);
        t.is(countMap.get("b"), 2);
    }
};