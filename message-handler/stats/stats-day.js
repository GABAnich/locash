const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const formatDay = require("./day");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("day").unix(),
        endDate: moment().endOf("day").unix(),
    });
    await sendToUser(chat.id, formatDay(stats, labels));
    return { statusCode: 200 };
};
