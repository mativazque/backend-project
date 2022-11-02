import express from "express";
import login from "../middleware/middleware.js"
import { productosDao} from "../daos/index.js"
const { Router } = express;
export const routerProducts = Router();

const productos = productosDao


routerProducts.get("/", async (req, res) => {
    try {
        console.log(await productos.getAll())
       
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

