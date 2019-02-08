const fs = require("fs");
const json = require("circular-json");
module.exports = {
    getCases: function () {
        const data = require("./../cases.json");

        return data;
    },

    addCase: function (obj) {
        const cases = require("./../cases.json");
        cases.lastId = ++obj.lastId;
        cases.cases.push(obj);
        const data = json.stringify(cases, null, 4);
        try {
            fs.writeFileSync("./cases.json", data);
            return true;
        } catch (e) {
            console.log("Error", e);
            return false;
        }

    }
}