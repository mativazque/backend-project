import winston from "winston"

export const createLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({level: "info"}),
            new winston.transports.File({filename: "./src/loggers/warn.log", level: "warn"}),
            new winston.transports.File({filename: "./src/loggers/error.log", level: "error"})
        ]
    })
    return logger
}
