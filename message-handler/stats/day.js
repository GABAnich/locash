const format = require("./format-stats");
const footer = require("./footer");

module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    const { income, spending, total } = footer(stats);
    return `${format(stats)}\n<b>Income</b>: ${income}\n<b>Spending</b>: ${spending}\n<b>Total</b>: ${total}\n`;   
}
