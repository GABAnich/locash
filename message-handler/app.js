const axios = require("axios");
const AWS  = require("aws-sdk");
const parse = require("./services/parse");
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

/stats - your transactions statistic.
/help - more information.
`;

const createTransaction = ({ chat_id, date, value, description }) =>
    db
        .put({
            TableName,
            Item: { chat_id, date, value, description }
        })
        .promise();

exports.lambdaHandler = async (event, context) => {
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
        }

        const obj = parse(text);
        await createTransaction({ chat_id: chat.id, date, ...obj });

        const msg = JSON.stringify(obj);
        await sendToUser(chat.id, msg);

        return { statusCode: 200 };
    } catch (err) {
        console.log(err);
        return err;
    }
};
