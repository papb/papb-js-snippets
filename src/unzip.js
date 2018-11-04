/**
 * Unzips a given zip file into the destination folder.
 * 
 * @requires npm:extract-zip^1.6.7
 * @requires npm:fs-jetpack^2.2.0
 * 
 * @param {string} zipFilePath The path to the zip file, as an
 * absolute path or a relative path to the given cwd (current
 * working directory).
 * @param {string} [destFolter="."] The destination folder, into
 * which the unzipped files will be put, as an absolute path or
 * a relative path to the given cwd (current working directory).
 * Will be created if it does not exist.
 * @param {string} [cwd="."] The reference path to be used for
 * internally computing the absolute paths of the first two
 * parameters. This parameter itself can be given as an absolute
 * path or a relative path to `process.cwd()`.
 * 
 * @return {Promise} A promise that resolves when the unzipping is
 * complete as rejects if any error happens in the process.
 */
const unzip = function(zipFilePath, destFolder = ".", cwd = ".") {
    const jetpack = require("fs-jetpack");
    const extract = require("extract-zip");

    const localJetpack = jetpack.cwd(cwd);
    return localJetpack.dirAsync(destFolder).then(() => new Promise((resolve, reject) => {
        extract(localJetpack.path(zipFilePath), { dir: localJetpack.path(destFolder) }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }));
};

/* test */ module.exports = {
    snippet: unzip,
    snippetName: "unzip",
    snippetTest: t => {
        t.pass();
    }
};