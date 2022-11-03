import 'dotenv/config'

let productosDao
let carritosDao




switch (process.env.PERSISTENCIA) {
    case "json":
        const { default: fileDaoProducts } = await import('./products/productDaoFile.js')
        const { default: fileDaoCarts } = await import("./cart/cartDaoFile.js")

        productosDao = new fileDaoProducts()
        carritosDao = new fileDaoCarts()
        break

    case 'firebase':
        const { default: firebaseDaoProducts } = await import("./products/productDaoFirebase.js")
        const { default: firebaseDaoCarts } = await import("./cart/cartDaoFirebase.js")

        productosDao = new firebaseDaoProducts()
        carritosDao = new firebaseDaoCarts()
        break
    case 'mongodb':
        const { default: mongoDaoProducts } = await import("./products/productDaoMongo.js")
        const { default: mongoDaoCarts } = await import("./cart/cartDaoMongo.js")

        productosDao = new mongoDaoProducts()
        carritosDao = new mongoDaoCarts()
        break

    default:
        const { default: memoryDaoProducts } = await import("./products/productDaoMemory.js")
        const { default: memoryDaoCarts } = await import("./cart/cartDaoMemory.js")

        productosDao = new memoryDaoProducts()
        carritosDao = new memoryDaoCarts()
        break
}

export { productosDao, carritosDao }

