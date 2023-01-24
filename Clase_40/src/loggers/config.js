import winston from "winston"

const createLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({level: "info"}),
            new winston.transports.File({filename: "./src/loggers/warn.log", level: "warn"}),
            new winston.transports.File({filename: "./src/loggers/error.log", level: "error"})
        ]
    })
    return logger
}

export const viewUrl = (req) => {
    const fullUrl = req.protocol + '://' + req.get('host')
    return fullUrl
}

export const logger = createLogger()