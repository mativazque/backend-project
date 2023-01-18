import { CartService } from "../service/carts.js"
import { logger, viewUrl } from "../loggers/config.js"


async function getCartByUsername(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    let respuest = {
        productos: [],
        totalValue: 0,
        totalQuantity: 0
    }
    const cart = await CartService.getByUser(req.session.passport.user)
    if (cart) {
        respuest.productos = cart.productos
        respuest.totalValue = cart.productos.reduce((acum, buy) => acum + buy.price * buy.quantity, 0)
        respuest.totalQuantity = cart.productos.reduce((acum, buy) => acum + buy.quantity, 0)
        res.json(respuest)
    } else {
        res.json(respuest)
    }
}


async function addProductToCart(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)

    if (! await CartService.getByUser(req.session.passport.user)) {
        await CartService.create(
            req.session.passport.user,
            req.body.IdProduct,
            req.body.quantity
        )
    }
    else if (! await CartService.findProductCart(req.session.passport.user, req.body.IdProduct)) {
        await CartService.addProduct(
            req.body.IdProduct,
            req.session.passport.user,
            req.body.quantity
        )
    }
    else {
        await CartService.updateQuantityProductCart(
            req.session.passport.user,
            req.body.IdProduct,
            req.body.quantity
        )
    }
}

//deleteProducto
async function deleteProductCart(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    await CartService.deleteProduct(req.session.passport.user, req.body.IdProduct)
}

async function deleteCartByUser(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    await CartService.deleteCart(req.session.passport.user)
}
//deleteCart


//confirmCart

export {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser
}

