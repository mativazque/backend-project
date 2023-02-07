import config from "../configs/index.js"
import mongoose from "mongoose"
import {logger} from "../configs/loggers.js"

export const initMongoDB = (conect) => {
    try {
        mongoose.connect(config.mongoDB.URL, config.mongoDB.other)
        logger.info(`Connected to MongoDB`)

    } catch (error) {
        throw new Error("Couldn't connect to MongoDB'")
    }
}



