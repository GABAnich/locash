const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const formatCategories = require("./categories");

module.exports = async (chat, labels) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("month").unix(),
        endDate: moment().endOf("month").unix(),
    });
    try {
      await sendToUser(chat.id, formatCategories(stats, labels));
    } catch (err) {
      console.log(err);
      throw err;
    }

    return { statusCode: 200 };
};
