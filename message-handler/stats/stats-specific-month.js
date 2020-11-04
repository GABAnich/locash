const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser, sendPhoto } = require("../services/telegram");
const formatDays = require("./days");
const footer = require("./footer");
const parseStatsSpecificMonth = require("./parse-stats-specific-month");
const pieChartWithIncomeSpendingTotal = require("../services/quickchart/pieChartWithIncomeSpendingTotal");

const getStats = ({ chat_id, month, year }) =>
    getTransactions({
        chat_id,
        startDate: moment().month(month).year(year).startOf("month").unix(),
        endDate: moment().month(month).year(year).endOf("month").unix(),
    });

module.exports = async ({ chat, text, labels }) => {
    const res = parseStatsSpecificMonth(text);
    if (!res) {
        await sendToUser(chat.id, labels.commandNotFound);
        return { statusCode: 200 };
    }
    const { month, year } = res;
    const stats = await getStats({ chat_id: chat.id, month, year });
    const { income, spending, total } = footer(stats);
    await sendPhoto({
        chat_id: chat.id,
        photo: pieChartWithIncomeSpendingTotal(
            { income, spending, total },
            labels
        ),
        caption: formatDays(stats, labels),
    });

    return { statusCode: 200 };
};
