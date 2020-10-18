const { commandNotFound } = require("./text");
const { sendToUser } = require("./services/telegram");

module.exports = async ({ chat, text }) => {
    if (text === "/lang_en") {
        // TODO set english
        await sendToUser(chat.id, "english");
        return { statusCode: 200 };
    } else if (text === "/lang_ua") {
        // TODO set ukranian
        await sendToUser(chat.id, "ukranian");
        return { statusCode: 200 };
    } else {
        await sendToUser(chat.id, commandNotFound);
        return { statusCode: 200 };
    }
};
