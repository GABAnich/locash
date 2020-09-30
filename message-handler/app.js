const AWS = require("aws-sdk");
const { sendToUser } = require("./services/telegram");
const handleStats = require("./stats");
const handleTransaction = require("./transaction");
const { TELEGRAM_TOKEN } = require("./credentials.json");
const config = require("./config");

AWS.config.update(config);

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
        } else {
            return handleTransaction({ chat, text, date });
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
