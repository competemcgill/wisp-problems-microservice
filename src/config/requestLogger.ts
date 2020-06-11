import * as winston from "winston";
import { logger } from "express-winston";

const requestLoggerConfig = logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    expressFormat: true,
    colorize: true,
    responseWhitelist: ["statusCode", "body"],
    requestWhitelist: ["body"]
});

export { requestLoggerConfig };
