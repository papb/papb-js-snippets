/**
 * Takes an array of functions and calls them sequentially. If any of these
 * functions return a promise, the promise is waited for, before calling the next
 * functions.
 * 
 * @param {function[]} functions The array of functions to be called sequentially
 * 
 * @return {Promise} A promise that resolves when the last call is done and
 * rejects with an error if any of the functions throw an error (in which case
 * the sequence is terminated immediately).
 */
const callSequentially = function(functions) {
    let promiseChain = Promise.resolve();
    functions.forEach(f => {
        promiseChain = promiseChain.then(f);
    });
    return promiseChain;
};

/* test */ module.exports = {
    snippet: callSequentially,
    snippetName: "callSequentially",
    snippetTest: t => {
        let temp = 100;
        return callSequentially([
            () => { temp += 5; },
            () => { temp *= 2; },
            () => snippets.wait(50).then(() => { temp *= 3; }),
            () => { temp += 11; }
        ]).then(() => {
            t.is(temp, 641);
        });
    }
};