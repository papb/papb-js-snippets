"use strict";
module.exports = {
    "title": "papb-js-snippets",
    "source": "./src",
    "destination": "./docs_output",
    "access": ["public"],
    "builtinExternal": false,
    "unexportIdentifier": true,
    "undocumentIdentifier": false,
    "includeSource": true,
    "coverage": false,
    "lint": false,
    "plugins": [
        { "name": "./docs/plugins/custom-esdoc-plugin.js" }
    ],
    "styles": [
        "./docs/css/style.css"
    ],
    "index": "./README.md",
    "manual": {
        "globalIndex": true,
        "index": "./README.md",
        "badge": false
    }
};