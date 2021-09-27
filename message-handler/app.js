const moment = require("moment");

const { sendToUser } = require("./services/telegram");
const handleStats = require("./stats");
const handleTransaction = require("./transaction");
const getText = require("./text");
const exportCSV = require("./export_csv");

const TELEGRAM_TOKEN = process.env.TELEGRAM;

const handleMessage = async ({ chat, from, text, date }) => {
    moment.locale(from.language_code);
    const labels = getText(from.language_code);
    if (!text) {
        await sendToUser(chat.id, labels.pleaseTryAgain);
        return { statusCode: 200 };
    }
    if (text === "/start" || text === "/help") {
        await sendToUser(chat.id, labels.welcomeText);
        return { statusCode: 200 };
    } else if (text.startsWith("/stats_")) {
        return handleStats({ chat, text, labels });
    } else if (text === "/export_csv") {
        return exportCSV({ chat, text, labels });
    } else {
        return handleTransaction({ chat, text, date, labels });
    }
};

exports.lambdaHandler = async (event) => {
    return { statusCode: 200 };
    try {
        console.log(event);

        if (event.queryStringParameters.token !== TELEGRAM_TOKEN) {
            return { statusCode: 403 };
        }

        const body = JSON.parse(event.body);
        const { chat, from, text, date } = body.message || body.edited_message;

        return handleMessage({ chat, from, text, date });
    } catch (err) {
        console.log(err);
        console.log(err.response.data);
        return { statusCode: 200 };
    }
};
