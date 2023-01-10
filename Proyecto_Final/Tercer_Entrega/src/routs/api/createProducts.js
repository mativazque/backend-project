import {Router} from "express"
import {productos} from "./../../api/productos.js"

const router = Router()

router.get("/api/createProduct", async (req, res) => {
    try {
        // const newProduct = {
        //     title: "Globo terraqueo",
        //     price: 500,
        //     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-1024.png",
        // }
        // await productos.save(newProduct)
        res.redirect("/home")
    } catch (error) {
        console.log(error)
    }
})

export default router