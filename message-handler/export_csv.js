// const { parse } = require("json2csv");
// const { getAllTransactions } = require("./services/dynamodb");
// const { sendToUser } = require("./services/telegram");

// module.exports = async ({ chat }) => {
module.exports = async () => {
    // const stats = await getAllTransactions(chat.id);
    // const csv = parse(stats, ["date", "description", "value", "chat_id"]);
    // await sendToUser(chat.id, csv);
    return { statusCode: 200 };
};
