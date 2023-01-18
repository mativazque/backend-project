import { Router } from "express"
import {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser
} from "../../controller/cart.js"
import { cart } from "./../../daos/index.js"
import { productos } from "./../../daos/index.js"
import { buys } from "./../../daos/index.js"
import { users } from "./../../daos/index.js"
import { logger } from "../../loggers/config.js"
import { sendEmailtoAdminNewBuy } from "../../configs/nodemailerGmail.js"
import { sendWsptoAdminNewBuy } from "../../configs/twilioWsp.js"
import { sendSmsToClientNewBuy } from "../../configs/twilioSms.js"


const router = Router()

router.get("/api/cart", getCartByUsername)

router.post("/api/cart", addProductToCart)

router.put("/api/cart", deleteProductCart)

router.delete("/api/cart", deleteCartByUser)

//confirmCart
router.post("/api/cartConfirm", async (req, res) => {
    try {
        const cartFound = await cart.getByUser(req.session.passport.user)
        const newBuy = {
            username: req.session.passport.user,
            productos: [cartFound.productos]
        }
        const pushBuy = await buys.save(newBuy)
        await cart.deleteByUser(req.session.passport.user)
        const totalCart = cartFound.productos.reduce((acum, buy) => acum + buy.price * buy.quantity, 0)
        await sendEmailtoAdminNewBuy({
            ...newBuy,
            total: totalCart,
            timestamp: new Date().toLocaleString(),
            id: pushBuy
        }
        )
        await sendWsptoAdminNewBuy({
            ...newBuy,
            total: totalCart,
            timestamp: new Date().toLocaleString(),
            id: pushBuy
        }
        )
        const getUser = await users.getByUsername(req.session.passport.user)

        await sendSmsToClientNewBuy({
            id: pushBuy,
            phone: getUser.phone
        }
        )

    } catch (error) {
        console.log(error)
    }
})

export default router