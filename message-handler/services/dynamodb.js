const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();

module.exports.createTransaction = ({ chat_id, date, value, description }) =>
    db
        .put({
            TableName: "Transactions",
            Item: { chat_id, date, value, description },
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
