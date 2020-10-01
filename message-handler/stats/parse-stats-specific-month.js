const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

module.exports = (text) => {
    const args = text.split("_");
    const [first, second, month, year] = args;
    if (first !== "/stats") return null;
    if (second !== "month") return null;
    if (args.length !== 4) return null;
    if (!months.includes(month)) return null;
    if (year.length > 4 || year.length < 4) return null;
    if (!parseInt(year)) return null;
    return { month, year: parseInt(year) };
};
