module.exports = (stats) => {
    if (!stats.length) return 'no transactions';

    const expensesByCategories = stats
      .map((stat) => {
        if (!stat.description) {
          return { ...stat, description: 'no_category' };
        }
        return stat;
      })
      .reduce((acc, stat) => {
        if (!Object.keys(acc).includes(stat.description)) {
          return { ...acc, [stat.description]: stat.value };
        }
        return {
          ...acc,
          [stat.description]: acc[stat.description] + stat.value,
        };
      }, {});

    return Object.keys(expensesByCategories) .map((key) => `${key}: ${expensesByCategories[key]}\n`) .join('');
};
