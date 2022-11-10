const mongoose = require("mongoose")


const connectionDB = async () => {
    const URL = "mongodb+srv://matiasvazquez:Fuster334@cluster0.ybvrimz.mongodb.net/backend"
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