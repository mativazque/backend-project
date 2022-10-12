const express = require('express')
const { Router } = express;
const routCarts = Router();


const Container = require('../controllers/controller')
const { productos } = require("./products")
const cart = new Container("./data/carts.json")


routCarts
    .post("/", async (req, res) => {
        const newCart = {productos: []}
        try {
            const cartSave = await cart.save(newCart)
            res.status(200).send(`Id New Cart: ${cartSave}`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .post("/:id/productos", async (req, res) => {
        const idCart = Number(req.params.id)
        const idProduct = Number(req.body.id)
        const carrito = await cart.getById(idCart)
        const producto = await productos.getById(idProduct)

        try {
            if (carrito) {
                if (producto) {
                    carrito.productos.push(producto)
                    await cart.update(carrito, idCart)
                    res.status(200).send(await cart.getById(idCart))
                } else {
                    res.status(404).send({ error: `No existe un producto con id ${idProduct}` })
                }
            } else {
                res.status(404).send({ error: `No existe un carrito con id ${idCart}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .get("/:id/productos", async (req, res) => {
        const cartFound = await cart.getById(Number(req.params.id))
        try {
            if (cartFound) {
                res.status(200).send(cartFound.productos)
            } else {
                res.status(404).send({ error: `No existe un cart con id ${req.params.id}` })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    })
    .delete("/:id", async (req, res) => {
        const id = Number(req.params.id)
        const cartFound = await cart.getById(id)
        try {
            if (cartFound) {
                await cart.deleteById(id)
                res.status(200).send(await cart.getAll())
            } else {
                res.status(200).res.send({error: `No existe un cart con Id ${id}`})
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .delete("/:id_cart/productos/:id_prod", async (req, res) => {
        console.log(req.params)
        const idCart = Number(req.params.id_cart)
        const idProduct = Number(req.params.id_prod)
        const cartFound = await cart.getById(idCart)
        if(cartFound) {
            const itemFound = cartFound.productos.find(item => item.id === idProduct)
            if (itemFound) {
                const newCartProducts = cartFound.productos.filter(item => item.id != idProduct)
                cartFound.productos = newCartProducts
                await cart.update(cartFound, idCart)
                res.status(200).send(await cart.getById(idCart))
            } else {
                res.status(404).send({error: `No existe producto con id ${idProduct}`})}
        } else {
            res.status(404).send({error: `No existe cart con id ${idCart}`})
        }
    })


module.exports = { routCarts }