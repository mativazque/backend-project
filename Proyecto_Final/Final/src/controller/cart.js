import { CartService } from "../service/carts.js"
import { sendEmailtoAdminNewBuy } from "../configs/nodemailerGmail.js"
import {sendSmsToClientNewBuy} from "../configs/twilioSms.js"
import { logger, viewUrl } from "../configs/loggers.js"

async function getCartByUsername(req, res) {

    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)

    let respuest = {
        productos: [],
        totalValue: 0,
        totalQuantity: 0
    }

    const cart = await CartService.getByUser(req.user.username)
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

    if (! await CartService.getByUser(req.user.username)) {
        await CartService.create(
            req.user.username,
            req.body.IdProduct,
            req.body.quantity
        )
    }
    else if (! await CartService.findProductCart(req.user.username, req.body.IdProduct)) {
        await CartService.addProduct(
            req.body.IdProduct,
            req.user.username,
            req.body.quantity
        )
    }
    else {
        await CartService.updateQuantityProductCart(
            req.user.username,
            req.body.IdProduct,
            req.body.quantity
        )
    }
}

async function deleteProductCart(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    await CartService.deleteProduct(req.user.username, req.body.IdProduct)
}

async function deleteCartByUser(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    await CartService.deleteCart(req.user.username)
}

async function confirmCart(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const newBuy = await CartService.createBuy(req.user.username)
    await CartService.deleteCart(req.user.username)
    await sendEmailtoAdminNewBuy(await CartService.getBuyById(newBuy))
    await sendSmsToClientNewBuy({
        id: newBuy,
        phone: req.user.phone
    }
    )
}

export {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser,
    confirmCart
}

