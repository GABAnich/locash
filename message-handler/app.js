const axios = require("axios");
const parse = require("./services/parse");
const { TELEGRAM_TOKEN }= require("./credentials.json");

const sendToUser = async (chat_id, text) =>
    axios.get(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        params: { chat_id, text }
    });

exports.lambdaHandler = async (event, context) => {
    try {
        console.log(event);
    
        if (event.queryStringParameters.token !== TELEGRAM_TOKEN) {
            return { statusCode: 403 }
        }

        const body = JSON.parse(event.body);
        const { chat, text } = body.message;

        const msg = JSON.stringify(parse(text));
        await sendToUser(chat.id, msg);

        return { statusCode: 200 };
    } catch (err) {
        console.log(err);
        return err;
    }
};
