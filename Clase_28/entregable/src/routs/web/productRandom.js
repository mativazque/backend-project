import {Router} from "express"
import {productosFaker} from "../../api/productosFaker.js"
import checkAtuhentication from "./../../middleware/checkAuthenticaton.js"

const router = Router()

router.get("/", checkAtuhentication , (req, res) => {
    const products = productosFaker.randomProducts()
    res.render("productosTest", {productos: products, render: true})
})


export default router

