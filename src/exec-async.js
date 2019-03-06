/**
 * Executes a system command and returns a promise for its stdout output.
 * Output to stderr is ignored.
 * 
 * @param {string} command The command to execute
 * 
 * @return {Promise<string>} A promise for the output. Rejects if the command
 * exits with nonzero code.
 */
const execAsync = function(command) {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => { // eslint-disable-line no-unused-vars
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
};

/* test */ module.exports = {
    snippet: execAsync,
    snippetName: "execAsync",
    snippetTest: t => {
        t.plan(2);
        return Promise.all([
            execAsync("node -v").then(result => {
                t.true(/\d+\.\d+\.\d+/.test(result));
            }),
            execAsync("node --non-existent-option").catch(() => {
                t.pass();
            }),
        ]);
    }
};