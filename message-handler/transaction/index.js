const AWS = require("aws-sdk");
const { sendToUser } = require("../services/telegram");
const parse = require("../services/parse");

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
        await sendToUser(chat.id, "Please try again...");
        return { statusCode: 200 };
    }

    await createTransaction({ chat_id: chat.id, date, ...obj });

    const msg = "Done.\n/help - list of commands";
    await sendToUser(chat.id, msg);

    return { statusCode: 200 };
};
