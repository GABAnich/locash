const { expect } = require("chai");
const statsAccumulator = require("../../../message-handler/stats/stats-accumulator");

const stats = [
    { value: 1, rest: "rest" },
    { value: 2, rest: "rest2" },
    { value: 3, rest: "rest3" },
    { value: 4, rest: "rest4" },
];

describe("message-handler", () => {
    describe("stats", () => {
        describe("stats-accumulator", () => {
            it("should return accumulated stats", () => {
                expect(statsAccumulator(stats)).to.be.deep.equal([
                    { value: 1, rest: "rest" },
                    { value: 3, rest: "rest2" },
                    { value: 6, rest: "rest3" },
                    { value: 10, rest: "rest4" },
                ]);
            });
            it("shoult return [] if no stats", () => {
                expect(statsAccumulator()).to.be.deep.equal([]);
            });
        });
    });
});
