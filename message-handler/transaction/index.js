const { createTransaction } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const parse = require("./parse");
const { pleaseTryAgain, done } = require("../text");

module.exports = async ({ chat, text, date }) => {
    const obj = parse(text);
    if (!obj) {
        await sendToUser(chat.id, pleaseTryAgain);
        return { statusCode: 200 };
    }

    await createTransaction({ chat_id: chat.id, date, original: text, ...obj });

    await sendToUser(chat.id, done);

    return { statusCode: 200 };
};
