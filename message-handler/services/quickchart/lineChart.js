const { getUrl } = require("./utils");

const generateData = (stats) => {
    return stats.map(({ date, value }) => ({
        x: new Date(date * 1000),
        y: value,
    }));
};

// eslint-disable-next-line max-lines-per-function
const getData = ({ stats }) => {
    return {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Money",
                    data: generateData(stats),
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
    };
};

const getEncodedUrl = (args) => getUrl(getData(args));

module.exports = { getData, getEncodedUrl };
