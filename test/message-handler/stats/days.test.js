const { expect } = require("chai");
const moment = require("moment");
const format = require("../../../message-handler/stats/days");

describe("message-handler", () => {
    describe("stats", () => {
        describe("days", () => {
            it("should return line about there no stats", () => {
                expect(format([])).to.be.a("string");
                expect(format([])).to.equal(
                    "There no transactions in this time range."
                );
            });
            it("should return formated message", () => {
                const stats = [
                    { value: -6, description: "bus", date: moment().day(0).date(1).month(1).year(2020).unix() },
                    { value: -11, description: "icecream", date: moment().day(1).date(2).month(1).year(2020).unix() },
                    { value: -20, description: "food", date: moment().day(2).date(3).month(1).year(2020).unix() },
                    { value: -150, description: "internet", date: moment().day(2).date(3).month(1).year(2020).unix() },
                    { value: -120, description: "mobile", date: moment().day(3).date(4).month(1).year(2020).unix() },
                    { value: -20, description: "coffee", date: moment().day(4).date(5).month(1).year(2020).unix() },
                    { value: +24000, description: "salary", date: moment().day(5).date(6).month(1).year(2020).unix() },
                    { value: 8500, description: "freelance", date: moment().day(6).date(7).month(1).year(2020).unix() }
                ];

                expect(format(stats)).to.equal(
                    "1 February 2020\n" +
                    "<b>-6</b> <i>bus</i>\n" +
                    "\n" +
                    "2 February 2020\n" +
                    "<b>-11</b> <i>icecream</i>\n" +
                    "\n" +
                    "3 February 2020\n" +
                    "<b>-20</b> <i>food</i>\n" +
                    "<b>-150</b> <i>internet</i>\n" +
                    "\n" +
                    "4 February 2020\n" +
                    "<b>-120</b> <i>mobile</i>\n" +
                    "\n" +
                    "5 February 2020\n" +
                    "<b>-20</b> <i>coffee</i>\n" + 
                    "\n" +
                    "6 February 2020\n" +
                    "<b>+24000</b> <i>salary</i>\n" +
                    "\n" +
                    "7 February 2020\n" +
                    "<b>+8500</b> <i>freelance</i>\n" +
                    "\n" + 
                    "<b>Income</b>: +32500\n" +
                    "<b>Spending</b>: -327\n" +
                    "<b>Total</b>: +32173\n"
                );
            });
        });
    });
});
