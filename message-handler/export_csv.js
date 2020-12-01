const { sendToUser } = require("./services/telegram");

module.exports = async ({ chat, labels }) => {
    await sendToUser(chat.id, labels.comingSoon);
    return { statusCode: 200 };
};
