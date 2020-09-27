const { expect } = require("chai");
const formatStats = require("../../services/format-stats");

describe("services", () => {
    describe("format-stats", () => {
        it("should return line about there no stats", () => {
            expect(formatStats([])).to.be.a("string");
            expect(formatStats([])).to.equal(
                "There no transactions in this time range."
            );
        });
        it("should return formated message", () => {
            const stats = [
                { value: -20, description: "coffee" },
                { value: +24000, description: "salary" },
                { value: 8500, description: "freelance" }
            ];

            expect(formatStats(stats)).to.equal(
                "<b>-20</b> <i>coffee</i>\n<b>+24000</b> <i>salary</i>\n<b>+8500</b> <i>freelance</i>\n"
            );
        });
    });
});
