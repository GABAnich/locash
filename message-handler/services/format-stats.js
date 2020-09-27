module.exports = (stats) => {
    if (!stats.length) return "There no transactions in this time range.";
    return stats.map(({ value, description }) => `${value > 0 ? "+" : ""}${value} ${description}\n`).join("");
}
