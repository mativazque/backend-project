import express from 'express';
import session from "express-session";
import routerSession from "./src/routs/routhCookies.js"
import filestore from "session-file-store"

const app = express();

const FileStore = filestore(session)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
    store: new FileStore({ path: "./sesiones",ttl: 5 ,retries: 0}), 
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use("/", routerSession)

export default app;