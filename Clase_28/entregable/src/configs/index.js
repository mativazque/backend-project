import "dotenv/config"
import processArgs from "./port.js"

const advancedOptionsMongoDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const config = {
    PORT: processArgs.puerto || 8080,
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