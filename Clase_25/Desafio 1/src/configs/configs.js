import "dotenv/config"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"


const advancedOptionsMongoDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const config = {
    PORT: process.env.PORT || 3000,
    mongoDB: {
        URL: process.env.urlMongoDB,
        other: advancedOptionsMongoDB
    },
    session: {
        store: MongoStore.create({
            mongoUrl: process.env.urlMongoDB,
            mongoOptions: advancedOptionsMongoDB,
            ttl: 60
        }),
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }
}

//Conection to MongoDB
try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.other)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}


export default config