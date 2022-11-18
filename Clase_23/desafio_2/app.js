import express from 'express';
import session from "express-session";
import routerSession from "./src/routs/routhCookies.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use("/", routerSession)

export default app;