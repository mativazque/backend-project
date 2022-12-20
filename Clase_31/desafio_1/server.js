import express from 'express';
import compression from 'compression';

const app = express();

const phrase = "Hola que tal?".repeat(1000)

app.get("/saludo", (req, res) => {
    res.send(phrase)
})

app.get("/saludozip", (req, res) => {
    res.send(phrase)
})

app.listen(8080, () => {
    console.log("Server listening on PORT 8080")
})
