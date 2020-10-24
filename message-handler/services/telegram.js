const axios = require("axios");

const TELEGRAM_TOKEN = process.env.TELEGRAM;

const sendToUser = async (chat_id, text) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id,
        text,
        parse_mode: "HTML",
    });

const sendPhoto = async ({ chat_id, photo, caption }) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
        chat_id,
        photo,
        caption,
        parse_mode: "HTML",
    });

module.exports = { sendToUser, sendPhoto };
