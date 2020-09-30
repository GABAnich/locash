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
}

module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    let days= "";
    const statsByDay = splitStatsByDay(stats);
    for (const date in statsByDay) {
        days += `${date}\n`;
        days += format(statsByDay[date]);
        days += "\n";
    }
    const { income, spending, total } = footer(stats);
    return `${days}` +
        `<b>Income</b>: ${income}\n` +
        `<b>Spending</b>: ${spending}\n` +
        `<b>Total</b>: ${total}\n`;
}
