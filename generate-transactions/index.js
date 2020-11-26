const faker = require("faker");

const [date, chat_id, count] = process.argv.slice(2);

const generateTransaction = (index) => ({
    PutRequest: {
        Item: {
            chat_id: { N: `${chat_id}` },
            date: { N: `${parseInt(date, 10) + index}` },
            value: {
                N: `${faker.finance.amount() * (Math.random() > 0.5 ? 1 : -1)}`,
            },
            description: { S: faker.finance.transactionDescription() },
        },
    },
});

const generateTransactions = (count = 0) => {
    const res = [];
    for (let i = 0; i < count; i += 1) {
        res.push(generateTransaction(i));
    }
    return res;
};

const data = { Transactions: generateTransactions(parseInt(count, 10)) };

console.log(JSON.stringify(data, null, 4));
