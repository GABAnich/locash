const axios = require("axios");

const TELEGRAM_TOKEN = process.env.TELEGRAM;

const errorHandler = (error) => {
  if (error.response) {
    console.log('response falls out of the range of 2xx');
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log('The request was made but no response was received');
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }

  console.log(error.config);
  console.log(error.toJSON());
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
