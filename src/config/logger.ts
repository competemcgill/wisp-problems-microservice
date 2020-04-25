import * as winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
});

export { logger };