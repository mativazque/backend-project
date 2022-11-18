import {Router} from "express"
import {productosFaker} from "../../api/productosFaker.js"

const router = Router()

router.get("/", (req, res) => {
    const products = productosFaker.randomProducts()
    res.render("productosTest", {productos: products, render: true})
})


export default router

