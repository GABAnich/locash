const AWS = require("aws-sdk");

const db = new AWS.DynamoDB.DocumentClient();
const TableName = "Transactions";

module.exports = ({ chat_id, startDate, endDate }) =>
    db
        .query({
            TableName,
            KeyConditionExpression:
                "#chat_id = :chat_id And #date BETWEEN :start_date AND :end_date",
            ExpressionAttributeValues: {
                ":chat_id": chat_id,
                ":start_date": startDate,
                ":end_date": endDate
            },
            ExpressionAttributeNames: {
                "#chat_id": "chat_id",
                "#date": "date"
            }
        })
        .promise()
        .then(({ Items }) => Items);
