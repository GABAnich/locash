const { expect } = require("chai");
const formatStats = require("../../stats/format-stats");

describe("services", () => {
    describe("format-stats", () => {
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
        it("should ignore transactions without value", () => {
            const stats = [
                { value: -20, description: "coffee" },
                null,
                { value: false },
                { value: +24000, description: "salary" },
                { value: 8500, description: "freelance" }
            ];

            expect(formatStats(stats)).to.equal(
                "<b>-20</b> <i>coffee</i>\n<b>+24000</b> <i>salary</i>\n<b>+8500</b> <i>freelance</i>\n"
            );
        });
    });
});
