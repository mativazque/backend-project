import 'dotenv/config'

let cart
let buys
let mensajes
let productos
let users

switch (process.env.PERSISTENCIA) {

    case 'MONGODB':
        const {default: daoMongoBuys} = await import("./mongoDb/daoMongoBuys.js")
        const {default: daoMongoCarts} = await import("./mongoDb/daoMongoCart.js")
        const {default: daoMongoProducts} = await import("./mongoDb/daoMongoProducts.js")
        const {default: daoMongoUsers} = await import("./mongoDb/daoMongoUser.js")

        buys = daoMongoBuys.getInstance()
        cart = daoMongoCarts.getInstance()
        productos = daoMongoProducts.getInstance()
        users = daoMongoUsers.getInstance()
}

export { cart, buys, mensajes, productos, users}

