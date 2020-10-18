const format = require("./format-stats");
const footer = require("./footer");

module.exports = (stats, labels) => {
    if (!stats.length) return labels.noTransactions;
    const { income, spending, total } = footer(stats);
    return `${format(stats)}\n<b>${labels.income}</b>: ${income}\n<b>${
        labels.spending
    }</b>: ${spending}\n<b>${labels.total}</b>: ${total}\n`;
};
