const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser, sendPhoto } = require("../services/telegram");
const {
    barCharDays: { getEncodedUrl },
} = require("../services/quickchart");
const formatDays = require("./days");

module.exports = async (chat, labels) => {
    const startDate = moment().subtract(7, "d").startOf("day").unix();
    const endDate = moment().endOf("day").unix();
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate,
        endDate,
    });
    await sendPhoto({
        chat_id: chat.id,
        photo: getEncodedUrl({ stats, labels, startDate, endDate }),
    });
    await sendToUser(chat.id, formatDays(stats, labels));
    return { statusCode: 200 };
};
