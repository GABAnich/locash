const moment = require("moment");
const { getTransactions } = require("../services/dynamodb");
const { sendToUser } = require("../services/telegram");
const { commandNotFound } = require("../text");
const formatDay = require("./day");
const formatDays = require("./days");

const statsDay = async (chat) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("day").unix(),
        endDate: moment().endOf("day").unix(),
    });
    await sendToUser(chat.id, formatDay(stats));
    return { statusCode: 200 };
};

const statsWeek = async (chat) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("week").unix(),
        endDate: moment().endOf("week").unix(),
    });
    await sendToUser(chat.id, formatDays(stats));
    return { statusCode: 200 };
};

const statsMonth = async (chat) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().startOf("month").unix(),
        endDate: moment().endOf("month").unix(),
    });
    await sendToUser(chat.id, formatDays(stats));
    return { statusCode: 200 };
};

const statsPastSevenDay = async (chat) => {
    const stats = await getTransactions({
        chat_id: chat.id,
        startDate: moment().subtract(7, "d").startOf("day").unix(),
        endDate: moment().endOf("day").unix(),
    });
    await sendToUser(chat.id, formatDays(stats));
    return { statusCode: 200 };
};

module.exports = async ({ chat, text }) => {
    if (text === "/stats_day") {
        return statsDay(chat);
    } else if (text === "/stats_week") {
        return statsWeek(chat);
    } else if (text === "/stats_month") {
        return statsMonth(chat);
    } else if (text === "/stats_past_seven_day") {
        return statsPastSevenDay(chat);
    } else {
        await sendToUser(chat.id, commandNotFound);
        return { statusCode: 200 };
    }
};
