module.exports = (stats) => {
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

    return { income, spending, total };
};
