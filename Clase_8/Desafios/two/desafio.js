const express = require('express');
const { Router } = express;


const app = express()
const routerPersonas = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.listen(8080, () => {
    console.log("Listening on PORT 8080")
}).on("Error", (err) => console.log(err))

const personas = []

routerPersonas.post("/", (req, res) => {
    const { nombre, apellido, edad } = req.body
    const newPersona = {
        nombre: nombre,
        apellido: apellido,
        edad: parseInt(edad)
    }
    personas.push(newPersona)
    res.send(newPersona)
})

routerPersonas.get("/", (req, res) => {
    res.json({ personas })
})

app.use("/personas", routerPersonas)
