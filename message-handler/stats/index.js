const statsDay = require("./stats-day");
const statsWeek = require("./stats-week");
const statsMonth = require("./stats-month");
const statsCategoriesMonth = require("./stats-categories-month");
const statsSpecificMonth = require("./stats-specific-month");
const statsPastSevenDay = require("./stats-past-seven-days");
const statsYear = require("./stats-year");
const statsAll = require("./stats-all");
const { commandNotFound } = require("../text");
const { sendToUser } = require("../services/telegram");
const logger = require("../logger")("stats");

module.exports = async ({ chat, text, labels }) => {
    logger.info('params', { params: { chat, text, labels } });
    
    if (text === "/stats_day") {
        return statsDay(chat, labels);
    } else if (text === "/stats_week") {
        return statsWeek(chat, labels);
    } else if (text === "/stats_categories_month") {
        return statsCategoriesMonth(chat, labels);
    } else if (text === "/stats_month") {
        return statsMonth(chat, labels);
    } else if (text.startsWith("/stats_month")) {
        return statsSpecificMonth({ chat, text, labels });
    } else if (text === "/stats_past_seven_day") {
        return statsPastSevenDay(chat, labels);
    } else if (text === "/stats_year") {
        return statsYear(chat, labels);
    } else if (text === "/stats_all") {
        return statsAll(chat, labels);
    } else {
        await sendToUser(chat.id, commandNotFound);
        return { statusCode: 200 };
    }
};
