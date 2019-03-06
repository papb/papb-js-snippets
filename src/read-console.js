/**
 * Reads user input from the console, optionally typing a message first.
 * 
 * @param {string} [message] An optional message to prompt the user
 * 
 * @return {Promise<string>} A promise with the typed answer
 */
const readConsole = function(message) {
    message = message ? "" + message : "";
    const readline = require("readline");
    return new Promise(resolve => {
        const readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readlineInterface.question(message, answer => {
            readlineInterface.close();
            resolve(answer);
        });
    });
};

/* test */ module.exports = {
    snippet: readConsole,
    snippetName: "readConsole",
    snippetTest: t => {
        t.pass();
    }
};