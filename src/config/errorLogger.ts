import * as winston from "winston";
import { errorLogger } from "express-winston";

const errorLoggerConfig = errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
});

export { errorLoggerConfig };
