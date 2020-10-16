const {
    noTransactions,
    incomeText,
    spendingText,
    totalText,
} = require("../text");
const format = require("./format-stats");
const footer = require("./footer");

module.exports = (stats) => {
    if (!stats.length) return noTransactions;
    const { income, spending, total } = footer(stats);
    return `${format(
        stats
    )}\n<b>${incomeText}</b>: ${income}\n<b>${spendingText}</b>: ${spending}\n<b>${totalText}</b>: ${total}\n`;
};
