const { expect } = require("chai");
const statsAccumulator = require("../../../message-handler/stats/stats-accumulator");

const stats = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

describe("message-handler", () => {
    describe("stats", () => {
        describe("stats-accumulator", () => {
            it("should return accumulated stats", () => {
                expect(statsAccumulator(stats)).to.be.deep.equal([
                    { value: 1 },
                    { value: 3 },
                    { value: 6 },
                    { value: 10 },
                ]);
            });
            it("shoult return [] if no stats", () => {
                expect(statsAccumulator()).to.be.deep.equal([]);
            });
        });
    });
});
