const moment = require("moment");
const { getUrl } = require("./utils");

const dayFormat = "YYYY-MM-DD";

const splitStatsByDay = (stats) => {
    const res = {};
    stats.forEach(({ date, value }) => {
        const key = moment.unix(date).format(dayFormat);
        if (!res[key]) {
            res[key] = value;
        } else {
            res[key] += value;
        }
    });
    return Object.keys(res).map((key) => ({ x: key, y: res[key] }));
};

// eslint-disable-next-line max-lines-per-function
const getData = ({ stats, labels, startDate, endDate }) => {
    const incomeStats = stats.filter(({ value }) => value > 0);
    const spendingStats = stats.filter(({ value }) => value < 0);

    const startObj = {
        x: moment.unix(startDate).subtract(1, "days").format(dayFormat),
        y: 0,
    };
    const endObj = {
        x: moment.unix(endDate).add(1, "days").format(dayFormat),
        y: 0,
    };

    return {
        type: "bar",
        data: {
            datasets: [
                {
                    label: labels.income,
                    data: [startObj, ...splitStatsByDay(incomeStats), endObj],
                    backgroundColor: "rgb(47, 168, 88)",
                },
                {
                    label: labels.spending,
                    data: [startObj, ...splitStatsByDay(spendingStats), endObj],
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
    };
};

const getEncodedUrl = (args) => getUrl(getData(args));

module.exports = { getData, getEncodedUrl };
