module.exports = (stats = []) =>
    stats.map(
        ((sum) => (transaction) => {
            sum += transaction.value;
            return { ...transaction, value: sum };
        })(0)
    );
