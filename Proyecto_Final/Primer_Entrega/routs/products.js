const express = require('express')
const { Router } = express;
const routProducts = Router();
const routCarts = Router();
const login = require('../middleware/middleware.js')


const Container = require('../controllers/controller')
const productos = new Container("./data/products.json")


routProducts
    .get("/", async (req, res) => {
        try {
            const data = await productos.getAll()
            data.length > 0 ?
                res.status(200).json(data) :
                res.status(404).send("No existen productos");
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .get("/:id", async (req, res) => {
        const id = Number(req.params.id)
        const data = await productos.getById(id)
        try {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ error: `No existe un producto con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .post("/", login, async (req, res) => {
        const newProduct = req.body
        try {
            await productos.save(newProduct)
            res.status(200).send(await productos.getAll())
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .put("/:id", login, async (req, res) => {
        const id = Number(req.params.id)
        const newProduct = req.body
        try {
            if (await productos.getById(id)) {
                const beforeProduct = await productos.getById(id)
                const productUpdated = await productos.update(newProduct, id)
                res.status(200).json({ beforeProduct: beforeProduct, productUpdated: productUpdated })
            } else {
                res.status(404).json({ error: `No existe un producto con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .delete("/:id", login, async (req, res) => {
        const id = Number(req.params.id)
        try {
            if (await productos.getById(id)) {
                await productos.deleteById(id)
                res.status(200).json({ resultado: "Producto eliminado con exito" })
            } else {
                res.status(404).json({ error: `No existe un producto con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    })


module.exports = { routProducts, routCarts, productos }