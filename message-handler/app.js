const { sendToUser } = require("./services/telegram");
const handleStats = require("./stats");
const handleTransaction = require("./transaction");
const { welcomeText, pleaseTryAgain } = require("./text");
const { TELEGRAM_TOKEN } = require("./credentials.json");

const handleMessage = async ({ chat, text, date }) => {
    if (!text) {
        sendToUser(chat.id, pleaseTryAgain);
        return { statusCode: 200 };
    }
    if (text === "/start" || text === "/help") {
        await sendToUser(chat.id, welcomeText);
        return { statusCode: 200 };
    } else if (text.startsWith("/stats_")) {
        return handleStats({ chat, text });
    } else {
        return handleTransaction({ chat, text, date });
    }
};

exports.lambdaHandler = async (event) => {
    try {
        console.log(event);

        if (event.queryStringParameters.token !== TELEGRAM_TOKEN) {
            return { statusCode: 403 };
        }

        const body = JSON.parse(event.body);
        const { chat, text, date } = body.message;

        return handleMessage({ chat, text, date });
    } catch (err) {
        console.log(err);
        return err;
    }
};
