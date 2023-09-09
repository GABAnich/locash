const winston = require("winston");

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console({ handleExceptions: true })],
});

module.exports = logger;
