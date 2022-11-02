let productosDao
let carritosDao

switch (process.env.PERSISTENCIA) {
    case "json":
        const { default: fileDaoProducts } = await import('./../daos/products/productDaoArchivo.js')

        productosDao = new fileDaoProducts()
        break

    case 'firebase':

        break
    case 'mongodb':

        break
    case 'mariadb':

        break
    case 'sqlite3':

        break
    default:

        break
}


console.log(productosDao)

export { productosDao, carritosDao }

