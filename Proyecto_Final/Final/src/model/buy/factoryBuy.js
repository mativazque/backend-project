import 'dotenv/config'

let buys


switch (process.env.PERSISTENCIA_BUY) {

    case 'MONGODB':
        const { default: daoMongoBuys } = await import("./daoMongoBuys.js")
        buys = daoMongoBuys.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { buys }

