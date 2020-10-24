const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendPhoto } = require("../services/telegram");
const { pieChartWithIncomeSpendingTotal } = require("../services/quickchart");
const formatDay = require("./day");
const footer = require("./footer");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("day").unix(),
        endDate: moment().endOf("day").unix(),
    });
    const { income, spending, total } = footer(stats);
    await sendPhoto({
        chat_id: chat.id,
        photo: pieChartWithIncomeSpendingTotal(
            { income, spending, total },
            labels
        ),
        caption: formatDay(stats, labels),
    });
    return { statusCode: 200 };
};
