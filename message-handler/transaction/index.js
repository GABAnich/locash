const { createTransaction } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const parse = require("./parse");

module.exports = async ({ chat, text, date, labels }) => {
    const obj = parse(text);
    if (!obj) {
        await sendToUser(chat.id, labels.pleaseTryAgain);
        return { statusCode: 200 };
    } else if (Math.abs(obj.value) > 1000000000) {
        await sendToUser(chat.id, labels.valueTooBig);
        return { statusCode: 200 };
    }

    await createTransaction({ chat_id: chat.id, date, original: text, ...obj });

    await sendToUser(chat.id, labels.done);

    return { statusCode: 200 };
};
