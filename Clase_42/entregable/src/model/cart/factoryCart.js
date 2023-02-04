import 'dotenv/config'

let cart


switch (process.env.PERSISTENCIA_CART) {

    case 'MONGODB':
        const { default: daoMongoCarts } = await import("./daoMongoCart.js")
        cart = daoMongoCarts.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { cart }

