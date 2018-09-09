/**
 * Get a string representation of the current moment.
 * 
 * The string follows the pattern of the following example: 2018-07-22_20h04min29s
 * 
 * @return {string}
 */
const getNowString = function() {
    const reg = /^(.+)T(.+):(.+):(.+)\.\d{3}Z$/;
    const str = new Date().toJSON();
    const res = reg.exec(str);
    return res[1] + "_" + res[2] + "h" + res[3] + "min" + res[4] + "s";
};

/* test */ module.exports = {
    snippet: getNowString,
    snippetName: "getNowString",
    snippetTest: t => {
        t.regex(getNowString(), /^\d{4}-\d{2}-\d{2}_\d{2}h\d{2}min\d{2}s$/);
    }
};