import { Router } from "express"
import {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser,
    confirmCart
} from "../../controller/cart.js"
import {auth} from "../../middleware/checkAuth.js"

const router = Router()

router.get("/api/cart", auth, getCartByUsername)

router.post("/api/cart", auth, addProductToCart)

router.put("/api/cart", auth, deleteProductCart)

router.delete("/api/cart", auth, deleteCartByUser)

router.post("/api/cartConfirm", auth, confirmCart)

export default router