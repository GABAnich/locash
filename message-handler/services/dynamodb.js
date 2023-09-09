const AWS = require("aws-sdk");
const config = require("../config");
const logger = require("../logger")({ module: "dynamodb" });

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();

const errorHandler = (method, ...args) => (error) => {
  logger.error('error', { error, method, args });
  throw error;
};

module.exports.createTransaction = function ({
    chat_id,
    date,
    value,
    description,
    original,
}) { return db
        .put({
            TableName: "Transactions",
            Item: { chat_id, date, value, description, original },
        })
        .promise()
        .catch(errorHandler('createTransaction', arguments)) };

module.exports.getTransactions = function ({ chat_id, startDate, endDate }) {
    return db
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
        .then(({ Items }) => Items)
        .catch(errorHandler('getTransactions', arguments)) };

module.exports.getAllTransactions = function (chat_id) {
    return db
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
        .then(({ Items }) => Items)
        .catch(errorHandler('getAllTransactions', arguments));
}
