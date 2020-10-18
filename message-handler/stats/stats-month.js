const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const formatDays = require("./days");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("month").unix(),
        endDate: moment().endOf("month").unix(),
    });
    await sendToUser(chat.id, formatDays(stats, labels));
    return { statusCode: 200 };
};
