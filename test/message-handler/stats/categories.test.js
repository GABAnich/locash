/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
const { expect } = require("chai");

const categories = require("../../../message-handler/stats/categories");

describe("message-handler", () => {
    describe("stats", () => {
        describe("categories", () => {
            it("splits transactions by category", () => {
                expect(categories([])).to.be.equal('no transactions');
            });
            it("splits transactions by category", () => {
                const stats = [
                  { value: -1, description: 'food' },
                  { value: -20, description: 'food' },
                  { value: -40, description: 'food' },
                  { value: -2, description: 'food snacks' },
                  { value: -3, description: 'food snacks' },
                  { value: -5, description: 'food snacks' },
                  { value: -300, description: 'rent' },
                  { value: -400, description: '' },
                  { value: -100, description: undefined },
                  { value: -200, description: null },
                  { value: -40, description: 'health' },
                ];

                expect(categories(stats)).to.be.equal(
                  'no_category: -700\n' +
                  'rent: -300\n' +
                  'food: -61\n' +
                  'health: -40\n' +
                  'food snacks: -10\n'
                );
            });
        });
    });
});
