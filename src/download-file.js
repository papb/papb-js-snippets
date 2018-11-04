/**
 * Downloads a file from a given URL and saves it.
 * 
 * @requires fs-jetpack^2.2.0
 * @requires request^2.88.0
 * 
 * @param {string} sourceURL The URL containing the file to be downloaded.
 * @param {string} [destinationFilePath] The path (including filename) for
 * the file to be saved. If omitted, defaults to the same filename given in
 * the sourceURL.
 * 
 * @return {Promise} A promise that resolves when everything is done or reject
 * with any error that happens in the process.
 */
const downloadFile = function(sourceURL, destinationFilePath = null) {
    const jetpack = require("fs-jetpack");
    const request = require("request");

    return Promise.resolve().then(() => {
        // Ensure destinationFilePath is valid
        if (!destinationFilePath) {
            destinationFilePath = /[^\\/]*$/.exec(sourceURL);
            if (destinationFilePath) destinationFilePath = destinationFilePath[0];
        }
        if (!destinationFilePath) throw new Error("Unable to parse default destination file name.");
        if (typeof destinationFilePath !== "string") throw new TypeError("Invalid destinationFilePath: must be a string.");
    }).then(() => {
        // Ensure the path to the file exists and that the file does not
        // (i.e. that it gets overwritten if exists).
        return jetpack.writeAsync(destinationFilePath, "");
    }).then(() => {
        return jetpack.removeAsync(destinationFilePath);
    }).then(() => {
        return new Promise((resolve, reject) => {
            request.get(sourceURL)
                .on("error", reject)
                .pipe(jetpack.createWriteStream(destinationFilePath))
                .on("error", reject)
                .on("finish", resolve);
        });
    });
};

/* test */ module.exports = {
    snippet: downloadFile,
    snippetName: "downloadFile",
    snippetTest: t => {
        const jetpack = require("fs-jetpack");
        t.plan(3);

        const URL = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.slim.min.js";
        return downloadFile(URL).then(() => {
            t.true(jetpack.exists("jquery.slim.min.js") === "file");
            const hash = snippets.sha256(jetpack.read("jquery.slim.min.js"));
            t.is(hash, "45fe0169d7f20adb2f1e63bcf4151971b62f34dbd9bce4f4f002df133bc2b03d");
            jetpack.remove("jquery.slim.min.js");
            t.pass();
        });
    }
};