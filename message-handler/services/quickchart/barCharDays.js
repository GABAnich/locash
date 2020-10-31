const moment = require("moment");
const { getUrl } = require("./utils");

// eslint-disable-next-line max-lines-per-function
module.exports = ({ stats, labels, startDate, endDate }) => {
    const dataMap = ({ value, date }) => ({
        x: moment.unix(date).format("YYYY-MM-DD"),
        y: value,
    });
    const incomeStats = stats.filter(({ value }) => value > 0).map(dataMap);
    incomeStats.unshift({
        x: moment.unix(startDate).subtract(1, "days").format("YYYY-MM-DD"),
        y: 0,
    });
    incomeStats.push({
        x: moment.unix(endDate).add(1, "days").format("YYYY-MM-DD"),
        y: 0,
    });
    const spendingStats = stats.filter(({ value }) => value < 0).map(dataMap);
    spendingStats.unshift({
        x: moment.unix(startDate).subtract(1, "days").format("YYYY-MM-DD"),
        y: 0,
    });
    spendingStats.push({
        x: moment.unix(endDate).add(1, "days").format("YYYY-MM-DD"),
        y: 0,
    });

    return getUrl({
        type: "bar",
        data: {
            datasets: [
                {
                    label: labels.income,
                    data: incomeStats,
                    backgroundColor: "rgb(47, 168, 88)",
                },
                {
                    label: labels.spending,
                    data: spendingStats,
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
};
