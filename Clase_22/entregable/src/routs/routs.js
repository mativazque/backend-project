import controllerProduct from "../controllers/controllerProductos.js"
import express from 'express';
const { Router } = express

export const routerProducts = Router()
export const routerHome = Router()

const prod = new controllerProduct()

routerProducts.get("/", (req, res) => {
    const productos = prod.randomProducts()
    res.render("productos", {productos: productos, render: true})

})




