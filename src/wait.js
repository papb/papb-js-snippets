/**
 * Get a promise that resolves after a given amount of milliseconds.
 * 
 * @param {int} millis The amount of milliseconds to wait before resolving the promise.
 * @param {*} [value] A value to fulfill the promise with.
 * 
 * @return {Promise} A promise that resolves after the given amount of milliseconds with
 * the given value (if given) or undefined (if not given).
 */
let wait = function(millis, value = undefined) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, millis);
    });
};

/* test */ module.exports = {
    snippet: wait,
    snippetName: "wait",
    snippetTest: t => {
        t.pass();
    }
};