module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    return stats
        .map(
            ({ value, description }) =>
                `<b>${value > 0 ? "+" : ""}${value}</b> <i>${description}</i>\n`
        )
        .join("");
};
