import express from 'express';
import cookieParser from "cookie-parser"
import {routhCookies} from "./src/routs/routhCookies.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser());
app.use("/cookies", routhCookies)

export default app;