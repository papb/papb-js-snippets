"use strict";

/**
 * Adds an script from the given src to the page.
 * 
 * WARNING: This is incredibly dangerous. Only use this if you are sure
 * you can trust the given src.
 * 
 * @param {DOCUMENT} document The document object.
 * @param {string} src The src of the script to be added.
 * 
 * @return {Promise} A promise that resolves when the script finishes loading.
 */
let addScript = function(document, src) {
    if (typeof src !== "string") throw new Error("Invalid src argument: must be a string.");
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.setAttribute('src', src);
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

/**
 * Adds an script with the given content to the page.
 * 
 * WARNING: This is incredibly dangerous. Only use this if you know
 * exactly what you're doing, and if the content is a hardcoded string,
 * and definitely nothing that comes from user input.
 * 
 * The given content starts executing immediately. This function returns
 * immediately unless the given content code hangs or throws (in which
 * case this function will also hang/throw respectively).
 * 
 * @param {DOCUMENT} document The document object.
 * @param {string} content The content to be put in the script.
 */
addScript.inline = function(document, content) {
    if (typeof content !== "string") throw new Error("Invalid content argument: must be a string.");
    return new Promise(resolve => {
        const script = document.createElement('script');
        try {
            script.appendChild(document.createTextNode(content));
        } catch (e) {
            script.text = content;
        }
        document.body.appendChild(script);
        resolve();
    });
};

/* test */ module.exports = {
    snippet: addScript,
    snippetName: "addScript",
    snippetTest: t => {
        t.is(typeof addScript, "function");
        t.is(typeof addScript.inline, "function");
    }
};