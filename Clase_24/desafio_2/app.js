import express from 'express';
import session from "express-session";
import routerSession from "./src/routs/routhCookies.js"
import redis from "redis"
import redisStore from "connect-redis"

const app = express();

const client = redis.createClient()
const RedisStore = redisStore(session)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
    store: new RedisStore({
        host: "localhost",
        port: 6379,
        client: client,
        ttl: 100
    }), 
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use("/", routerSession)

export default app;