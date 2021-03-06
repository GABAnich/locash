const { getUrl } = require("./utils");

// eslint-disable-next-line max-lines-per-function
module.exports = ({ income, spending, total }, labels) =>
    getUrl({
        type: "doughnut",
        data: {
            labels: [labels.income, labels.spending],
            datasets: [
                {
                    data: [income, spending],
                    backgroundColor: ["rgb(47, 168, 88)", "rgb(213, 19, 58)"],
                },
            ],
        },
        options: {
            plugins: {
                datalabels: {
                    display: true,
                    backgroundColor: "#ccc",
                    borderRadius: 3,
                    font: {
                        color: "red",
                        weight: "bold",
                    },
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: total,
                            font: {
                                size: 20,
                                weight: "bold",
                            },
                        },
                        {
                            text: labels.total,
                        },
                    ],
                },
            },
        },
    });
