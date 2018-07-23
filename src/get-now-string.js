/**
 * Get a string representation of the current moment.
 * 
 * The string follows the pattern of the following example: 2018-07-22_20h04min29s
 * 
 * @return {string}
 */
let getNowString = function() {
    var reg = /^(.+)T(.+):(.+):(.+)\.\d{3}Z$/;
    var str = new Date().toJSON();
    var res = reg.exec(str);
    return res[1] + "_" + res[2] + "h" + res[3] + "min" + res[4] + "s";
};

/* test */ module.exports = {
    snippet: getNowString,
    snippetName: "getNowString",
    snippetTest: t => {
        t.regex(getNowString(), /^\d{4}-\d{2}-\d{2}_\d{2}h\d{2}min\d{2}s$/);
    }
};