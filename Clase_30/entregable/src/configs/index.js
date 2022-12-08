import "dotenv/config"
import processArgs from "./parameters.js"

// console.log(processArgs)

const advancedOptionsMongoDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const config = {
    PORT: parseInt(processArgs.port) || 8080,
    MODE: processArgs.mode || "fork",
    mongoDB: {
        URL: process.env.urlMongoDB,
        other: advancedOptionsMongoDB
    },
    session: {
        secret: 'secreto',
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 10
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
    }
}


export default config