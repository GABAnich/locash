const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const formatMonths = require("./months");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("year").unix(),
        endDate: moment().endOf("year").unix(),
    });
    await sendToUser(chat.id, formatMonths(stats, labels));
    return { statusCode: 200 };
};
