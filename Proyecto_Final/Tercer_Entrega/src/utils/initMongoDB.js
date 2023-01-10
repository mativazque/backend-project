import config from "../configs/index.js"

export const initMongoDB = (conect) => {
    try {
        conect(config.mongoDB.URL, config.mongoDB.other)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}



