import express from "express";
import { Server as HttpServer } from "http"

import session from "express-session"

import routerSession from "./src/routs/web/auth.js"
import routerHome from "./src/routs/web/home.js"
import routerCart from "./src/routs/web/cart.js"
import routerInfoUser from "./src/routs/web/info.js"
import routerUndefined from "./src/routs/web/undefined.js"
import routerMensajes from "./src/routs/web/mensajes.js"

import routerApiProductos from "./src/routs/api/productos.js"
import routerApiCart from "./src/routs/api/cart.js"
import routerApiUser from "./src/routs/api/user.js"

import config from "./src/configs/index.js"
import compression from "compression"

import passport from "passport"

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(compression())


app.use(session(config.session))
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")
app.use("/", routerSession)
app.use("/", routerHome)
app.use("/", routerCart)
app.use("/", routerInfoUser)
app.use("/", routerApiProductos)
app.use("/", routerApiUser)
app.use("/", routerApiCart)
app.use("/", routerMensajes)
app.use("/", routerUndefined)

const httpServer = new HttpServer(app)

export { httpServer }