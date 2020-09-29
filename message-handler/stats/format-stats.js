module.exports = (stats) => stats
        .filter((transaction) => transaction && transaction.value)
        .map(
            ({ value, description }) =>
                `<b>${value > 0 ? "+" : ""}${value}</b> <i>${description}</i>\n`
        )
        .join("");
