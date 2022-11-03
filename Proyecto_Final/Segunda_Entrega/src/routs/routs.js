import express from "express";
import login from "../middleware/middleware.js"
import { productosDao as productos, carritosDao as cart } from "../daos/index.js"
const { Router } = express;
export const routerProducts = Router();
export const routerCart = Router();


routerProducts.get("/", async (req, res) => {
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
        const data = await productos.getById(req.params.id)
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
        try {
            await productos.save(req.body)
            res.status(200).send(`Producto guardado con exito`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .put("/:id", login, async (req, res) => {
        try {
            if (await productos.getById(req.params.id)) {
                await productos.update(req.body, req.params.id)
                res.status(200).json({ resultado: "Producto actualizado con éxito" })
            } else {
                res.status(404).json({ error: `No existe un producto con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .delete("/:id", login, async (req, res) => {
        try {
            if (await productos.getById(req.params.id)) {
                await productos.deleteById(req.params.id)
                res.status(200).json({ resultado: "Producto eliminado con exito" })
            } else {
                res.status(404).json({ error: `No existe un producto con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

//Cart
routerCart
    .post("/", async (req, res) => {
        const newCart = { productos: [] }
        try {
            await cart.save(newCart)
            res.status(200).send(`Cart guardado con exito`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .post("/:id/productos", async (req, res) => {
        try {
            const carrito = await cart.getById(req.params.id)
            if (carrito) {
                let producto = await productos.getById(req.body.id)
                if (producto) {
                    if ((producto._id === undefined) && (producto.id === undefined)) {
                        producto = { ...producto, id: req.body.id }
                    }
                    carrito.productos.push(producto)
                    await cart.update(carrito, req.params.id)
                    res.status(200).send(await cart.getById(req.params.id))
                } else {
                    res.status(404).send({ error: `No existe un producto con id ${req.body.id}` })
                }
            } else {
                res.status(404).send({ error: `No existe un carrito con id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .get("/:id/productos", async (req, res) => {
        const cartFound = await cart.getById(req.params.id)
        try {
            if (cartFound) {
                cartFound.productos.length > 0 ? 
                res.status(200).send(cartFound.productos) :
                res.status(200).send(`El cart id ${req.params.id} no tiene productos`)
            } else {
                res.status(404).send({ error: `No existe un cart con id ${req.params.id}` })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)

        }
    })
    .delete("/:id", async (req, res) => {
        const cartFound = await cart.getById(req.params.id)
        try {
            if (cartFound) {
                await cart.deleteById(req.params.id)
                res.status(200).send(`Cart Id ${req.params.id} eliminado con exito`)
            } else {
                res.status(200).res.send({ error: `No existe un cart con Id ${req.params.id}` })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })
    .delete("/:id_cart/productos/:id_prod", async (req, res) => {
        const cartFound = await cart.getById(req.params.id_cart)
        if (cartFound) {
            if (await cart.findProduct(req.params.id_cart, req.params.id_prod)) {
                await cart.deleteProduct(req.params.id_cart, req.params.id_prod)
                res.status(200).send(`Producto eliminado con exito del carrito`)
            } else {
                res.status(404).send({ error: `En el cart id ${req.params.id_cart} no existe producto con id ${req.params.id_prod}` })
            }
        } else {
            res.status(404).send({ error: `No existe cart con id ${req.params.id_cart}` })
        }
    })
    .get("/", async (req, res) => {
        try {
            const data = await cart.getAll()
            data.length > 0 ?
                res.status(200).json(data) :
                res.status(404).send("No existen productos");
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })


