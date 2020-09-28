module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    return stats
        .filter((transaction) => transaction && transaction.value)
        .map(
            ({ value, description }) =>
                `<b>${value > 0 ? "+" : ""}${value}</b> <i>${description}</i>\n`
        )
        .join("");
};
