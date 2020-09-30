const AWS = require("aws-sdk");
const { sendToUser } = require("../services/telegram");
const parse = require("./parse");
const { pleaseTryAgain, done } = require("../text")

const db = new AWS.DynamoDB.DocumentClient();
const TableName = "Transactions";

const createTransaction = ({ chat_id, date, value, description }) =>
    db
        .put({
            TableName,
            Item: { chat_id, date, value, description }
        })
        .promise();

module.exports = async ({ chat, text, date }) => {
    const obj = parse(text);
    if (!obj) {
        await sendToUser(chat.id, pleaseTryAgain);
        return { statusCode: 200 };
    }

    await createTransaction({ chat_id: chat.id, date, ...obj });

    await sendToUser(chat.id, done);

    return { statusCode: 200 };
};
