/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
const { expect } = require("chai");
const moment = require("moment");
const format = require("../../../message-handler/stats/months");

describe("message-handler", () => {
    describe("stats", () => {
        describe("months", () => {
            it("should return line about there no stats", () => {
                expect(format([])).to.be.a("string");
                expect(format([])).to.equal(
                    "There no transactions in this time range."
                );
            });
            it("should return formated message all month in year", () => {
                const stats = [
                    {
                        value: -6,
                        date: moment().date(1).month(0).year(2020).unix(),
                    },
                    {
                        value: 9,
                        date: moment().date(1).month(0).year(2020).unix(),
                    },
                    {
                        value: -6,
                        date: moment().date(1).month(1).year(2020).unix(),
                    },
                    {
                        value: -11,
                        date: moment().date(2).month(2).year(2020).unix(),
                    },
                    {
                        value: -20,
                        date: moment().date(3).month(3).year(2020).unix(),
                    },
                    {
                        value: -150,
                        date: moment().date(4).month(4).year(2020).unix(),
                    },
                    {
                        value: -120,
                        date: moment().date(5).month(5).year(2020).unix(),
                    },
                    {
                        value: -20,
                        date: moment().date(6).month(6).year(2020).unix(),
                    },
                    {
                        value: +24000,
                        date: moment().date(7).month(7).year(2020).unix(),
                    },
                    {
                        value: 8500,
                        date: moment().date(8).month(8).year(2020).unix(),
                    },
                    {
                        value: -20,
                        date: moment().date(9).month(9).year(2020).unix(),
                    },
                    {
                        value: -20,
                        date: moment().date(10).month(10).year(2020).unix(),
                    },
                    {
                        value: -20,
                        date: moment().date(11).month(11).year(2020).unix(),
                    },
                ];
                expect(format(stats)).to.equal(
                    "January, 2020 (+9/-6/+3)\n" +
                        "/stats_month_January_2020\n" +
                        "\n" +
                        "February, 2020 (0/-6/-6)\n" +
                        "/stats_month_February_2020\n" +
                        "\n" +
                        "March, 2020 (0/-11/-11)\n" +
                        "/stats_month_March_2020\n" +
                        "\n" +
                        "April, 2020 (0/-20/-20)\n" +
                        "/stats_month_April_2020\n" +
                        "\n" +
                        "May, 2020 (0/-150/-150)\n" +
                        "/stats_month_May_2020\n" +
                        "\n" +
                        "June, 2020 (0/-120/-120)\n" +
                        "/stats_month_June_2020\n" +
                        "\n" +
                        "July, 2020 (0/-20/-20)\n" +
                        "/stats_month_July_2020\n" +
                        "\n" +
                        "August, 2020 (+24000/0/+24000)\n" +
                        "/stats_month_August_2020\n" +
                        "\n" +
                        "September, 2020 (+8500/0/+8500)\n" +
                        "/stats_month_September_2020\n" +
                        "\n" +
                        "October, 2020 (0/-20/-20)\n" +
                        "/stats_month_October_2020\n" +
                        "\n" +
                        "November, 2020 (0/-20/-20)\n" +
                        "/stats_month_November_2020\n" +
                        "\n" +
                        "December, 2020 (0/-20/-20)\n" +
                        "/stats_month_December_2020\n" +
                        "\n" +
                        "<b>Income</b>: +32509\n" +
                        "<b>Spending</b>: -393\n" +
                        "<b>Total</b>: +32116\n"
                );
            });
            it("should return formated message some month in two years", () => {
                const stats = [
                    {
                        value: -6,
                        date: moment().date(1).month(10).year(2019).unix(),
                    },
                    {
                        value: 9,
                        date: moment().date(11).month(11).year(2019).unix(),
                    },
                    {
                        value: -6,
                        date: moment().date(1).month(1).year(2020).unix(),
                    },
                    {
                        value: -11,
                        date: moment().date(2).month(2).year(2020).unix(),
                    },
                ];
                expect(format(stats)).to.equal(
                    "November, 2019 (0/-6/-6)\n" +
                        "/stats_month_November_2019\n" +
                        "\n" +
                        "December, 2019 (+9/0/+9)\n" +
                        "/stats_month_December_2019\n" +
                        "\n" +
                        "February, 2020 (0/-6/-6)\n" +
                        "/stats_month_February_2020\n" +
                        "\n" +
                        "March, 2020 (0/-11/-11)\n" +
                        "/stats_month_March_2020\n" +
                        "\n" +
                        "<b>Income</b>: +9\n" +
                        "<b>Spending</b>: -23\n" +
                        "<b>Total</b>: -14\n"
                );
            });
        });
    });
});
