const axios = require("axios");
const moment = require("moment");
const formatDay = require("./day");
const formatDays = require("./days");
const getStats = require("./get-stats");
const { TELEGRAM_TOKEN } = require("../credentials.json");

const sendToUser = async (chat_id, text) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id,
        text,
        parse_mode: "HTML"
    });

module.exports = async ({ chat, text }) => {
    if (text === "/stats_day") {
        const stats = await getStats({
            chat_id: chat.id,
            startDate: moment()
                .startOf("day")
                .unix(),
            endDate: moment()
                .endOf("day")
                .unix()
        });
        await sendToUser(chat.id, formatDay(stats));
        return { statusCode: 200 };
    } else if (text === "/stats_week") {
        const stats = await getStats({
            chat_id: chat.id,
            startDate: moment()
                .startOf("week")
                .unix(),
            endDate: moment()
                .endOf("week")
                .unix()
        });
        await sendToUser(chat.id, formatDays(stats));
        return { statusCode: 200 };
    } else if (text === "/stats_month") {
        const stats = await getStats({
            chat_id: chat.id,
            startDate: moment()
                .startOf("month")
                .unix(),
            endDate: moment()
                .endOf("month")
                .unix()
        });
        await sendToUser(chat.id, formatDays(stats));
        return { statusCode: 200 };
    } else if (text === "/stats_past_seven_day") {
        const stats = await getStats({
            chat_id: chat.id,
            startDate: moment()
                .subtract(7, "d")
                .startOf("day")
                .unix(),
            endDate: moment()
                .endOf("day")
                .unix()
        });
        await sendToUser(chat.id, formatDays(stats));
        return { statusCode: 200 };
    } else {
        await sendToUser(chat.id, "Command not found");
        return { statusCode: 200 }
    }
};
