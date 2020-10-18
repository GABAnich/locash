const { sendToUser } = require("./services/telegram");
const { setLanguage } = require("./services/dynamodb");

module.exports = async ({ chat, text, labels }) => {
    if (text === "/lang_en") {
        await setLanguage({ chat_id: chat.id, language: "en" });
        await sendToUser(chat.id, labels.done);
        return { statusCode: 200 };
    } else if (text === "/lang_ua") {
        await setLanguage({ chat_id: chat.id, language: "ua" });
        await sendToUser(chat.id, labels.done);
        return { statusCode: 200 };
    } else {
        await sendToUser(chat.id, labels.commandNotFound);
        return { statusCode: 200 };
    }
};
