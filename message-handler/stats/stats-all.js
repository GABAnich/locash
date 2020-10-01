const formatMonths = require("./months");
const { getAllTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");

module.exports = async (chat) => {
    const stats = await getAllTransactions(chat.id);
    await sendToUser(chat.id, formatMonths(stats));
    return { statusCode: 200 };
};
