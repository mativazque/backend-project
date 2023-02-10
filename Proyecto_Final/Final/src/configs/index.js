import "dotenv/config"

const config = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    mongoDB: {
        URL: process.env.urlMongoDB,
        other: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}


export default config