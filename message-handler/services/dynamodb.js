const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();

module.exports.createTransaction = ({
    chat_id,
    date,
    value,
    description,
    original,
}) =>
    db
        .put({
            TableName: "Transactions",
            Item: { chat_id, date, value, description, original },
        })
        .promise();

module.exports.getTransactions = ({ chat_id, startDate, endDate }) =>
    db
        .query({
            TableName: "Transactions",
            KeyConditionExpression:
                "#chat_id = :chat_id And #date BETWEEN :start_date AND :end_date",
            ExpressionAttributeValues: {
                ":chat_id": chat_id,
                ":start_date": startDate,
                ":end_date": endDate,
            },
            ExpressionAttributeNames: {
                "#chat_id": "chat_id",
                "#date": "date",
            },
        })
        .promise()
        .then(({ Items }) => Items);

module.exports.getAllTransactions = (chat_id) =>
    db
        .query({
            TableName: "Transactions",
            KeyConditionExpression: "#chat_id = :chat_id",
            ExpressionAttributeValues: {
                ":chat_id": chat_id,
            },
            ExpressionAttributeNames: {
                "#chat_id": "chat_id",
            },
        })
        .promise()
        .then(({ Items }) => Items);

module.exports.setLanguage = ({ chat_id, language }) =>
    db
        .put({ TableName: "UsersLanguage", Item: { chat_id, language } })
        .promise();

module.exprots.getLangugae = (chat_id) =>
    db.get({ TableName: "UsersLanguage", Key: { chat_id } }).promise();
