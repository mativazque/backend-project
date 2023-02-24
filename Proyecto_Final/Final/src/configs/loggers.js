import { createLogger, format, transports } from "winston"


const myFormat = format.printf(({ level, message }) => {
    return `${new Date().toLocaleString()} | ${level}: ${message}`;
})

const createLoger = () => {
    const logger = createLogger({
        format:
            format.combine(
                format.colorize(),
                format.json(),
                myFormat
            ),
        transports: [
            new transports.Console({ level: "info" }),
            new transports.File({ filename: "./src/loggers/warn.log", level: "warn" }),
            new transports.File({ filename: "./src/loggers/error.log", level: "error" })
        ]
    })
    return logger
}
export const logger = createLoger()


export const viewUrl = (req) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    return fullUrl
}
