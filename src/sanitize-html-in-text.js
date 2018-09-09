/**
 * Replaces all occurrences of '&', '<', '>', '"' and "'" in text
 * with their 'safe' counterparts (such as '&amp;').
 * 
 * @param {string} text The text to be sanitized
 * 
 * @return {string} The sanitized text
 */
const sanitizeHTMLInText = function(text) {
    const map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": '#039' };
    return text.replace(/[&<>"']/g, m => `&${map[m]};`);
};

/* test */ module.exports = {
    snippet: sanitizeHTMLInText,
    snippetName: "sanitizeHTMLInText",
    snippetTest: t => {
        t.is(sanitizeHTMLInText(`&<>"'`), "&amp;&lt;&gt;&quot;&#039;");
    }
};