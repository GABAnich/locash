const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const formatDays = require("./days");
const parseStatsSpecificMonth = require("./parse-stats-specific-month");

module.exports = async ({ chat, text, labels }) => {
    const res = parseStatsSpecificMonth(text);
    if (!res) {
        await sendToUser(chat.id, labels.commandNotFound);
        return { statusCode: 200 };
    }
    const { month, year } = res;
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().month(month).year(year).startOf("month").unix(),
        endDate: moment().month(month).year(year).endOf("month").unix(),
    });
    await sendToUser(chat.id, formatDays(stats, labels));
    return { statusCode: 200 };
};
