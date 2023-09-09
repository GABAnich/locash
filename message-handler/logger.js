const winston = require("winston");

const loggerHOF = ({ module: moduleName }) => {
    return winston.createLogger({
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({ handleExceptions: true }),
        ],
        defaultMeta: { module: moduleName },
    });
};

module.exports = loggerHOF;
