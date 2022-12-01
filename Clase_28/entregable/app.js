import express from "express";
import { Server as HttpServer } from "http"
import { Server as IoServer } from "socket.io"
import session from "express-session"
import {initSocket} from "./src/utils/initSocket.io.js"
import mongoose from "mongoose"
import { initMongoDB } from "./src/utils/initMongoDB.js";
import routerProducts from "./src/routs/web/productRandom.js"
import routerSession from "./src/routs/web/auth.js"
import routerWeb from "./src/routs/web/home.js"
import routerUser from "./src/routs/api/user.js"
import routerInfo from "./src/routs/web/info.js"
import routerCounter from "./src/routs/web/count.js"
import config from "./src/configs/index.js" 

import passport from "passport"
import initPassport from "./src/middleware/passport.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


initMongoDB(mongoose.connect)


initPassport()
app.use(session(config.session))
app.use(passport.initialize())
app.use(passport.session())


app.set("view engine", "ejs")
app.use("/api/productos-test", routerProducts)
app.use("/", routerSession)
app.use("/", routerWeb)
app.use("/", routerUser)
app.use("/", routerInfo)
app.use("/", routerCounter)



const httpServer = new HttpServer(app)

const io = new IoServer(httpServer)
initSocket(io)


httpServer.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`)
}).on('error', (err) => console.log(err))

