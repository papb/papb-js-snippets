"use strict";

const cheerio = require("cheerio");
const esdocConfig = require("./../esdoc-config.js");

function handleHTML(html, fileName) {
    const $ = cheerio.load(html);

    const $title = $("head title");
    if ($title.text().indexOf(esdocConfig.title) === -1) {
        $title.text($title.text() + " | " + esdocConfig.title);
    }

    $("header").prepend(`
        <a href="index.html" style="font-weight: bold; padding-right: 30px;">${esdocConfig.title}</a>
    `);

    $("header").find("a[data-ice='repoURL']").attr("target", "_blank");

    $("header a[href='identifiers.html']").text("API Reference");

    $("nav").remove();

    $("div[data-ice='content']").css("margin-left", "0");

    return $.html();
}

module.exports.onHandleHTML = function(ev) {
    // ev.data.fileName is the path relative to the docs_output folder
    // For some strange reason, onHandleHTML is also called for the file script/search_index.js,
    // so we need to add a check guard here.
    if (!ev.data.fileName.endsWith(".html")) return;
    ev.data.html = handleHTML(ev.data.html, ev.data.fileName);
};