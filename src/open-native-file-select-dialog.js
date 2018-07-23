/**
 * Open the native file select dialog, exaclty as
 * when a user clicks on a <input type='file' />.
 * 
 * @return {Promise} A promise that resolves with the
 * selected file(s).
 */
let openNativeFileSelectDialog = function() {
    return new Promise(resolve => {
        const input = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.onchange = function(e) {
            resolve(e.target.files);
        };
        input.click();
        input.remove();
    });
};

/* test */ module.exports = {
    snippet: openNativeFileSelectDialog,
    snippetName: "openNativeFileSelectDialog",
    snippetTest: t => {
        t.pass();
    }
};