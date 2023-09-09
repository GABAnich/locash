const axios = require("axios");

const logger = require("../logger")({ module: "telegram" });

const TELEGRAM_TOKEN = process.env.TELEGRAM;

const errorHandler = (error) => {
  if (error.response) {
    logger.error('response falls out of the range of 2xx', {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    });
  } else if (error.request) {
    logger.error('The request was made but no response was received', {
      request: error.request,
    });
  } else {
    logger.error('error', { message: error.message });
  }

  logger.error('config', error.config);
  logger.error('json', error.toJSON());
};

const sendToUser = async (chat_id, text) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id,
        text,
        parse_mode: "HTML",
        disable_notification: true,
    }).catch(errorHandler);

const sendPhoto = async ({ chat_id, photo, caption }) =>
    axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
        chat_id,
        photo,
        caption,
        parse_mode: "HTML",
    }).catch(errorHandler);

module.exports = { sendToUser, sendPhoto };
