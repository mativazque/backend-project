import express from "express";
import { Server as HttpServer } from "http"
import cookie from "cookie-parser"
import compression from "compression"

import routerSession from "./src/routs/web/auth.js"
import routerHome from "./src/routs/web/home.js"
import routerCart from "./src/routs/web/cart.js"
import routerInfoUser from "./src/routs/web/info.js"
import routerUndefined from "./src/routs/web/undefined.js"
import routerChat from "./src/routs/web/chat.js"

import routerApiProductos from "./src/routs/api/productos.js"
import routerApiCart from "./src/routs/api/cart.js"
import routerApiUser from "./src/routs/api/user.js"
import routerApiChat from "./src/routs/api/chat.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(compression())
app.use(cookie())

app.use("/", routerSession)
app.use("/", routerHome)
app.use("/", routerCart)
app.use("/", routerInfoUser)
app.use("/", routerChat) 
app.use("/", routerApiProductos)
app.use("/", routerApiUser)
app.use("/", routerApiCart)
app.use("/", routerApiChat)
app.use("/", routerUndefined)

const httpServer = new HttpServer(app)

export { httpServer }