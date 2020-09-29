const format = require("./format-stats");

module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    let income = 0;
    let spending = 0;
    let total = 0;
    stats.forEach(({ value }) => {
        if (value > 0) income += value;
        if (value < 0) spending += value;
        total += value;
    });
    income = income > 0 ? `+${income}` : income;
    total = total > 0 ? `+${total}` : total;
    return `${format(stats)}\n<b>Income</b>: ${income}\n<b>Spending</b>: ${spending}\n<b>Total</b>: ${total}\n`;   
}
