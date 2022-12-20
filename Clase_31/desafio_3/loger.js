import winston from 'winston';

export const createLoggerDev = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({level: "info"})
        ]
    })
    return logger
}

export const createLoggerProd = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: "debug.log", level: "debug"}),
            new winston.transports.File({filename: "error.log", level: "error"})
        ]
    })
    return logger
}

