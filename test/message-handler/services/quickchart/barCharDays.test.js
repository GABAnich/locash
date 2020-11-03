/* eslint-disable max-lines-per-function */
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
                        date: moment().add(1, "hour").unix(),
                        value: 12,
                    },
                    {
                        date: moment().add(2, "hour").unix(),
                        value: 10,
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
                                    { x: "2020-10-25", y: 0 },
                                    { x: "2020-11-02", y: 22 },
                                    { x: "2020-11-04", y: 0 },
                                ],
                                backgroundColor: "rgb(47, 168, 88)",
                            },
                            {
                                label: labels.spending,
                                data: [
                                    { x: "2020-10-25", y: 0 },
                                    { x: "2020-11-02", y: -1 },
                                    { x: "2020-11-01", y: -4 },
                                    { x: "2020-11-04", y: 0 },
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