import 'dotenv/config'

let productos


switch (process.env.PERSISTENCIA_PROD) {

    case 'MONGODB':
        const { default: daoMongoProducts } = await import("./daoMongoProducts.js")
        productos = daoMongoProducts.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { productos }

