const mongoose = require("mongoose")


const connectionDB = async () => {
    const URL = "mongodb://localhost:27017/colegio"
    try {
        const connection = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("conectado a db")
    } catch (error) {
        console.log(error)
    }
}


module.exports = {connectionDB}