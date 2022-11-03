import fs from 'fs'

const config = {
    fileSystem: {
        pathProductos: "./DB/product.json",
        pathCart: "./DB/cart.json"
    },
    mongoDB: {
        URL: "mongodb+srv://matiasvazquez:Fuster334@cluster0.ybvrimz.mongodb.net/backend-project",
        other: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: {
        serviceAccount: JSON.parse(await fs.promises.readFile("./src/configs/desafio-backend-1837d-firebase-adminsdk-mn3x7-568f9c073e.json", "utf-8"))
    }
}


// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });





export default config