import 'dotenv/config'

let cart
let buys
let mensajes
let productos
let users

switch (process.env.PERSISTENCIA) {

    case 'MONGODB':
        const {default: daoMongoBuys} = await import("../daos/mongoDb/daoMongoBuys.js")
        const {default: daoMongoCart} = await import("../daos/mongoDb/daoMongoCart.js")
        const {default: daoMongoProducts} = await import("../daos/mongoDb/daoMongoProducts.js")
        const {default: daoMongoUser} = await import("../daos/mongoDb/daoMongoUser.js")
        const {default: controllerMsg} = await import("../controllers/mongoDb/controllerMsgMongo.js")

        buys = new daoMongoBuys()
        cart = new daoMongoCart()
        productos = new daoMongoProducts()
        users = new daoMongoUser()
        mensajes = new controllerMsg()
        
}

export { cart, buys, mensajes, productos, users}

