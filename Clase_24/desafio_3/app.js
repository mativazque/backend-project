import express from 'express';
import session from "express-session";
import routerSession from "./src/routs/routhCookies.js"
import MongoStore from "connect-mongo"


const app = express();

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: "mongodb+srv://matiasvazquez:Fuster334@cluster0.ybvrimz.mongodb.net/pruebaSessions",
        mongoOptions: advancedOptions
    }), 
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use("/", routerSession)

export default app;