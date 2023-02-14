import { Router } from "express"
import {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser,
    confirmCart
} from "../../controller/cart.js"
import {checkAuth} from "../../middleware/checkAuth.js"

const router = Router()

router.get("/api/cart", checkAuth, getCartByUsername)

router.post("/api/cart", checkAuth, addProductToCart)

router.put("/api/cart", checkAuth, deleteProductCart)

router.delete("/api/cart", checkAuth, deleteCartByUser)

router.post("/api/cartConfirm", checkAuth, confirmCart)

export default router