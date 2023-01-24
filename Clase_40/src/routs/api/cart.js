import { Router } from "express"
import {
    getCartByUsername,
    addProductToCart,
    deleteProductCart,
    deleteCartByUser,
    confirmCart
} from "../../controller/cart.js"

const router = Router()

router.get("/api/cart", getCartByUsername)

router.post("/api/cart", addProductToCart)

router.put("/api/cart", deleteProductCart)

router.delete("/api/cart", deleteCartByUser)

router.post("/api/cartConfirm", confirmCart)

export default router