const config = {};

if (process.env.AWS_SAM_LOCAL) {
    config.endpoint = "http://172.17.0.2:8000";
}

module.exports = config;
