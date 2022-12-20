import express from "express";
import 'dotenv/config'
import pino from "pino"

const app = express();

let logger = null;

if(process.env.NODE_ENV == "PROD") {
    logger = pino("debug.log")
    logger.level = "debug"
} else {
    logger = pino()
    logger.level = 'info'
}


app.get("/sumar", (req, res) => {
    const {num1, num2} = req.query

    if(!num1 || !num2) {
        logger.error("Must add two numbers for queryparams, num1 and num2")
    } else {
        const suma = Number(num1) + Number(num2)
        res.send(`The sum's result is ${suma}`)
        logger.info(`Response successfull at URL ${req.url}`)
    }
})

app.get("*", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.send(`Error 404, not found URL: ${fullUrl}`);
    logger.warn(`not found URL: ${fullUrl}`)
})


app.listen(8080, (err, res) => {
    console.log(`Server listening on port 8080`)
}).on('error', err => logger.error(`Server Error: ${err}`))