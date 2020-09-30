const axios = require("axios");
const AWS = require("aws-sdk");
const parse = require("./services/parse");
const handleStats = require("./stats");
const { TELEGRAM_TOKEN } = require("./credentials.json");
const config = require("./config");

AWS.config.update(config);

const db = new AWS.DynamoDB.DocumentClient();
const TableName = "Transactions";

const sendToUser = async (chat_id, text) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id,
        text,
        parse_mode: "HTML"
    });

const welcomeText = `
<b>Hi</b>,
You can track your expenses and incomes here.

<b>Usage</b>:
<code>+15000 salary</code>
<code>-20 coffee</code>

/stats_day - your daily transactions.
/stats_week - your weekly transactions.
/stats_month - your monthly transactions.
/stats_past_seven_day - your transactions in last 7 days.
/help - more information.
`;

const createTransaction = ({ chat_id, date, value, description }) =>
    db
        .put({
            TableName,
            Item: { chat_id, date, value, description }
        })
        .promise();

const getStats = async ({ chat_id, startDate, endDate }) =>
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

exports.lambdaHandler = async (event) => {
    try {
        console.log(event);

        if (event.queryStringParameters.token !== TELEGRAM_TOKEN) {
            return { statusCode: 403 };
        }

        const body = JSON.parse(event.body);
        const { chat, text, date } = body.message;

        if (text === "/start" || text === "/help") {
            await sendToUser(chat.id, welcomeText);
            return { statusCode: 200 };
        } else if (text.startsWith("/stats_")) {
            return handleStats({ chat, text })
        }

        const obj = parse(text);
        if (!obj) {
            await sendToUser(chat.id, "Please try again...");
            return { statusCode: 200 };
        }

        await createTransaction({ chat_id: chat.id, date, ...obj });

        const msg = "Done.\n/help - list of commands";
        await sendToUser(chat.id, msg);

        return { statusCode: 200 };
    } catch (err) {
        console.log(err);
        return err;
    }
};
