import { Router } from "express"
import { cart } from "./../../api/cart.js"
import { productos } from "./../../api/productos.js"
import { logger } from "../../api/logger.js"

const router = Router()

router.get("/api/cart", async (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    try {
        const cartFound = await cart.getByUser(req.session.passport.user)
        if(cartFound) {
            const totalCart = cartFound.productos.reduce((acum, buy) => acum + buy.price * buy.quantity, 0)
            const totalQuantity = cartFound.productos.reduce((acum, buy) => acum + buy.quantity, 0)
            res.json({ cart: cartFound.productos, totalPrice: totalCart, totalQuantity: totalQuantity})
        } else {
            res.json({ cart: [], totalPrice: 0})
        }
    } catch (error) {
        logger.error(`Error: ${error}`)
    }
})

router.post("/api/cart", async (req, res) => {
    const cartFound = await cart.getByUser(req.session.passport.user)
    const productFound = await productos.getById(req.body.IdProduct)
    const newProductCart = {
        ...productFound._doc
    }
    const quantitySavedProd = await cart.findQuantityProduct(
        req.session.passport.user,
        req.body.IdProduct
    )
    //Si no existe un cart para el user
    if (!cartFound) {
        await cart.save({
            username: req.session.passport.user,
            productos: [{ ...newProductCart, quantity: Number(req.body.quantity) }]
        })
    }
    //Existe cart pero no el producto seleccionado
    else if (!quantitySavedProd) {
        await cart.addProduct(
            req.session.passport.user,
            { ...newProductCart, quantity: Number(req.body.quantity) }
        )
    } 
    //Tiene cart y producto, se lo sumo al producto guardado
    else {
        await cart.updateProduct(
            req.session.passport.user,
            req.body.IdProduct,
            req.body.quantity
        )
    }
})

router.put("/api/cart", async (req, res) => {
    try {
        const cartFound = await cart.getByUser(req.session.passport.user)
        const newProductsCart = cartFound.productos.filter(item => item._id != req.body.idProd)
        await cart.updateProductos(req.session.passport.user, newProductsCart)
    } catch (error) {
        console.log(error)
    }
})


export default router