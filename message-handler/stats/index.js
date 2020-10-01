const statsDay = require("./stats-day");
const statsWeek = require("./stats-week");
const statsMonth = require("./stats-month");
const statsSpecificMonth = require("./stats-specific-month");
const statsPastSevenDay = require("./stats-past-seven-days");
const statsYear = require("./stats-year");
const statsAll = require("./stats-all");
const { commandNotFound } = require("../text");
const { sendToUser } = require("../services/telegram");

module.exports = async ({ chat, text }) => {
    if (text === "/stats_day") {
        return statsDay(chat);
    } else if (text === "/stats_week") {
        return statsWeek(chat);
    } else if (text === "/stats_month") {
        return statsMonth(chat);
    } else if (text.startsWith("/stats_month")) {
        return statsSpecificMonth({ chat, text });
    } else if (text === "/stats_past_seven_day") {
        return statsPastSevenDay(chat);
    } else if (text === "/stats_year") {
        return statsYear(chat);
    } else if (text === "/stats_all") {
        return statsAll(chat);
    } else {
        await sendToUser(chat.id, commandNotFound);
        return { statusCode: 200 };
    }
};
