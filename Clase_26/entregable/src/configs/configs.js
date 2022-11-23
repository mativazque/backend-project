import "dotenv/config"
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
    }
}

//Conection to MongoDB
try {
    mongoose.connect(config.mongoDB.URL, config.mongoDB.other)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}


export default config