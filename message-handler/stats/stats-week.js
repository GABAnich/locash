const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const formatDays = require("./days");
const { sendToUser } = require("../services/telegram");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("week").unix(),
        endDate: moment().endOf("week").unix(),
    });
    await sendToUser(chat.id, formatDays(stats, labels));
    return { statusCode: 200 };
};
