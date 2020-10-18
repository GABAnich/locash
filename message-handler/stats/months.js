const moment = require("moment");
const footer = require("./footer");

const splitStatsByMonths = (stats) => {
    const res = {};
    stats.forEach((transaction) => {
        const key = moment.unix(transaction.date).format("M YYYY");
        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(transaction);
    });
    return res;
};

const getMonths = (stats) => {
    const statsByMonths = splitStatsByMonths(stats);
    let months = "";
    for (const key in statsByMonths) {
        const date = moment
            .unix(statsByMonths[key][0].date)
            .format("MMMM, YYYY");
        const { income, spending, total } = footer(statsByMonths[key]);
        months += `${date} (${income}/${spending}/${total})\n`;
        const commandTime = moment
            .unix(statsByMonths[key][0].date)
            .format("MMMM_YYYY");
        months += `/stats_month_${commandTime}\n`;
        months += "\n";
    }
    return months;
};

module.exports = (stats, labels) => {
    if (!stats.length) return labels.noTransactions;

    const months = getMonths(stats);
    const { income, spending, total } = footer(stats);

    return (
        `${months}` +
        `<b>${labels.income}</b>: ${income}\n` +
        `<b>${labels.spending}</b>: ${spending}\n` +
        `<b>${labels.total}</b>: ${total}\n`
    );
};
