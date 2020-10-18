const moment = require("moment");
const format = require("./format-stats");
const footer = require("./footer");

const splitStatsByDay = (stats) => {
    const res = {};
    stats.forEach((transaction) => {
        const key = moment.unix(transaction.date).format("D MMMM YYYY");
        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(transaction);
    });
    return res;
};

module.exports = (stats, labels) => {
    if (!stats.length) return labels.noTransactions;
    let days = "";
    const statsByDay = splitStatsByDay(stats);
    for (const date in statsByDay) {
        days += `${date}\n`;
        days += format(statsByDay[date]);
        days += "\n";
    }
    const { income, spending, total } = footer(stats);
    return (
        `${days}` +
        `<b>${labels.income}</b>: ${income}\n` +
        `<b>${labels.spending}</b>: ${spending}\n` +
        `<b>${labels.total}</b>: ${total}\n`
    );
};
