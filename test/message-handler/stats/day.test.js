/* eslint-disable max-lines-per-function */
const { expect } = require("chai");
const formatDay = require("../../../message-handler/stats/day");
const text = require("../../../message-handler/text/text");
const labels = require("../../../message-handler/text/get-text")(text, "en");

describe("message-handler", () => {
    describe("stats", () => {
        describe("day", () => {
            it("should return line about there no stats", () => {
                expect(formatDay([], labels)).to.be.a("string");
                expect(formatDay([], labels)).to.equal(
                    "There no transactions in this time range."
                );
            });
            it("should return formated message", () => {
                const stats = [
                    { value: -20, description: "coffee" },
                    { value: +24000, description: "salary" },
                    { value: 8500, description: "freelance" },
                ];
                expect(formatDay(stats, labels)).to.equal(
                    "<b>-20</b> <i>coffee</i>\n<b>+24000</b> <i>salary</i>\n<b>+8500</b> <i>freelance</i>\n\n<b>Income</b>: +32500\n<b>Spending</b>: -20\n<b>Total</b>: +32480\n"
                );
            });
            it("should return formated message only spent", () => {
                const stats = [
                    { value: -20, description: "coffee" },
                    { value: -20, description: "coffee" },
                ];
                expect(formatDay(stats, labels)).to.equal(
                    "<b>-20</b> <i>coffee</i>\n<b>-20</b> <i>coffee</i>\n\n<b>Income</b>: 0\n<b>Spending</b>: -40\n<b>Total</b>: -40\n"
                );
            });
            it("should return formated message only income", () => {
                const stats = [
                    { value: 20, description: "project" },
                    { value: 20, description: "project" },
                ];
                expect(formatDay(stats, labels)).to.equal(
                    "<b>+20</b> <i>project</i>\n<b>+20</b> <i>project</i>\n\n<b>Income</b>: +40\n<b>Spending</b>: 0\n<b>Total</b>: +40\n"
                );
            });
        });
    });
});
