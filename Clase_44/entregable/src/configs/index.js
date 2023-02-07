import "dotenv/config"

// console.log(processArgs)

const advancedOptionsMongoDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const config = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
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