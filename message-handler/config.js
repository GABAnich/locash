const { LOCAL_ENDPOINT } = require("./credentials.json");

const config = {};

if (process.env.AWS_SAM_LOCAL) {
    config.endpoint = LOCAL_ENDPOINT;
}

module.exports = config;
