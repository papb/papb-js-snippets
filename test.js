"use strict";

const test = require('ava');
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync("src").map(file => ({
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
