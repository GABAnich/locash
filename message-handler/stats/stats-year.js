const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendPhoto } = require("../services/telegram");
const formatMonths = require("./months");
const { getEncodedUrl } = require("../services/quickchart/lineChart");
const statsAccumulator = require("./stats-accumulator");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("year").unix(),
        endDate: moment().endOf("year").unix(),
    });
    await sendPhoto({
        chat_id: chat.id,
        photo: getEncodedUrl({ stats: statsAccumulator(stats), labels }),
        caption: formatMonths(stats, labels),
    });
    return { statusCode: 200 };
};
