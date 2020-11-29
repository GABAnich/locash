/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
const { expect } = require("chai");
const moment = require("moment");
const {
    getData,
} = require("../../../../message-handler/services/quickchart/barCharDays");
const labels = require("../../../../message-handler/text/index");

describe("message-handler", () => {
    describe("services", () => {
        describe("barCharDays", () => {
            it("should split transactions by days and return query to quickchart", () => {
                const stats = [
                    { date: moment().unix(), value: -1 },
                    {
                        date: moment().subtract(1, "days").unix(),
                        value: -2,
                    },
                    {
                        date: moment()
                            .subtract(1, "days")
                            .subtract(1, "hour")
                            .unix(),
                        value: -2,
                    },
                    {
                        date: moment().add(2, "hour").unix(),
                        value: 22,
                    },
                ];
                const startDate = moment().subtract(7, "days").unix();
                const endDate = moment().add(1, "days").unix();

                const res = getData({ stats, labels, startDate, endDate });

                expect(res).to.deep.equal({
                    type: "bar",
                    data: {
                        datasets: [
                            {
                                label: labels.income,
                                data: [
                                    {
                                        x: moment()
                                            .subtract(8, "days")
                                            .format("YYYY-MM-DD"),
                                        y: 0,
                                    },
                                    {
                                        x: moment()
                                            .add(0, "days")
                                            .add(1, "hours")
                                            .format("YYYY-MM-DD"),
                                        y: 22,
                                    },
                                    {
                                        x: moment()
                                            .add(2, "days")
                                            .format("YYYY-MM-DD"),
                                        y: 0,
                                    },
                                ],
                                backgroundColor: "rgb(47, 168, 88)",
                            },
                            {
                                label: labels.spending,
                                data: [
                                    {
                                        x: moment()
                                            .subtract(8, "days")
                                            .format("YYYY-MM-DD"),
                                        y: 0,
                                    },
                                    { x: moment().format("YYYY-MM-DD"), y: -1 },
                                    {
                                        x: moment()
                                            .subtract(1, "days")
                                            .format("YYYY-MM-DD"),
                                        y: -4,
                                    },
                                    {
                                        x: moment()
                                            .add(2, "days")
                                            .format("YYYY-MM-DD"),
                                        y: 0,
                                    },
                                ],
                                backgroundColor: "rgb(213, 19, 58)",
                            },
                        ],
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    type: "time",
                                    time: {
                                        unit: "day",
                                        round: "day",
                                        displayFormats: {
                                            day: "MMM D",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                });
            });
        });
    });
});
