const text = require("./text");
const getText = require("./get-text");
const { getLanguage } = require("../services/dynamodb");

module.exports = async (chat_id) => {
    const { language } = await getLanguage(chat_id);
    return getText(text, language);
};
