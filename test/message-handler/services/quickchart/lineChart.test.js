/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
const { expect } = require("chai");
const moment = require("moment");
const {
    getData,
} = require("../../../../message-handler/services/quickchart/lineChart");

describe("message-handler", () => {
    describe("services", () => {
        describe("lineChart", () => {
            it("should return line chart", () => {
                const stats = [
                    {
                        date: moment()
                            .subtract(1, "days")
                            .subtract(1, "hour")
                            .unix(),
                        value: -2,
                    },
                    {
                        date: moment().subtract(1, "days").unix(),
                        value: 2,
                    },
                    {
                        date: moment().add(1, "hour").unix(),
                        value: 12,
                    },
                    {
                        date: moment().add(2, "days").add(2, "hour").unix(),
                        value: 15,
                    },
                ];

                const res = getData({ stats });

                console.log(JSON.stringify(res, null, 2));
                expect(res).to.deep.equal({
                    type: "line",
                    data: {
                        datasets: [
                            {
                                label: "Money",
                                data: [
                                    {
                                        x: new Date(stats[0].date * 1000),
                                        y: -2,
                                    },
                                    { x: new Date(stats[1].date * 1000), y: 2 },
                                    {
                                        x: new Date(stats[2].date * 1000),
                                        y: 12,
                                    },
                                    {
                                        x: new Date(stats[3].date * 1000),
                                        y: 15,
                                    },
                                ],
                            },
                        ],
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    type: "time",
                                    time: {
                                        unit: "year",
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
