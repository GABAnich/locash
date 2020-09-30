const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();

module.exports.createTransaction = ({ chat_id, date, value, description }) =>
    db
        .put({
            TableName: "Transactions",
            Item: { chat_id, date, value, description }
        })
        .promise();

