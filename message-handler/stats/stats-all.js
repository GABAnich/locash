const formatMonths = require("./months");
const { getAllTransactions } = require("../services/dynamodb");
const { sendPhoto } = require("../services/telegram");
const { getEncodedUrl } = require("../services/quickchart/lineChart");

module.exports = async (chat, labels) => {
    const stats = await getAllTransactions(chat.id);
    // await sendToUser(chat.id, formatMonths(stats, labels));
    await sendPhoto({
        chat_id: chat.id,
        photo: getEncodedUrl({ stats, labels }),
        caption: formatMonths(stats, labels),
    });
    return { statusCode: 200 };
};
