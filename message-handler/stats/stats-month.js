const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser, sendPhoto } = require("../services/telegram");
const { pieChartWithIncomeSpendingTotal } = require("../services/quickchart");
const formatDays = require("./days");
const footer = require("./footer");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("month").unix(),
        endDate: moment().endOf("month").unix(),
    });
    const { income, spending, total } = footer(stats);
    await sendPhoto({
        chat_id: chat.id,
        photo: pieChartWithIncomeSpendingTotal(
            { income, spending, total },
            labels
        ),
    });
    await sendToUser(chat.id, formatDays(stats, labels));

    return { statusCode: 200 };
};
