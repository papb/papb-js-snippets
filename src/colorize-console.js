/**
 * Colorizes `console.warn` and `console.error` and adds the extra methods
 * `console.blue`, `console.green` and `console.gray`.
 * 
 * @requires npm:chalk
 */
const colorizeConsole = function() {
    const chalk = require("chalk");

    function colorize(args, color) {
        return args.map(arg => {
            if (typeof arg !== "string") return arg;
            return chalk[color](arg);
        });
    }

    const originalConsoleWarn = console.warn.bind(console);
    const originalConsoleError = console.error.bind(console);

    console.warn = (...args) => originalConsoleWarn(...colorize(args, "yellow"));
    console.error = (...args) => originalConsoleError(...colorize(args, "red"));
    console.blue = (...args) => console.log(...colorize(args, "blue"));
    console.green = (...args) => console.log(...colorize(args, "green"));
    console.gray = (...args) => console.log(...colorize(args, "gray"));
};

/* test */ module.exports = {
    snippet: colorizeConsole,
    snippetName: "colorizeConsole",
    snippetTest: t => {
        t.pass();
    }
};