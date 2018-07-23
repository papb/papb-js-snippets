const test = require('ava');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

fs.readdirAsync("src").then(files => {
    files = files.map(file => ({
        filename: file,
        content: require(path.join(__dirname, "src", file))
    }));

    global.snippets = {};
    files.forEach(file => {
        global.snippets[file.content.snippetName] = file.content.snippet;
    });

    files.forEach(file => {
        const name = `${file.content.snippetName} (${file.filename})`;
        test(name, file.content.snippetTest);
    });
});
