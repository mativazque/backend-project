const express = require('express')
const { Router } = express

const app = express()
const router = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))


app.listen(8080, () => {
    console.log("Listening on PORT 8080")
}).on("Error", error => console.log(error))

const pets = [{ nombre: "manchita", raza: "ovejera", edad: 2 }, { nombre: "luna", raza: "calle", edad: 8 }, { nombre: "lil", raza: "labrador", edad: 9 }]
const personas = [{ nombre: "Lucia", apellido: "Ludueña", edad: 44 }, { nombre: "Mati", apellido: "Slerna", edad: 12 }, { nombre: "Álvaro", apellido: "Suiva", edad: 4 }]


//////Ruteo//////
// router.get("/mascotas", (req, res) => {
//     res.send(pets)
// })

router.post("/mascotas", (req, res) => {
    const newPet = req.body
    pets.push(newPet)
    console.log(pets)
    res.send("Pet posted")
})

router.get("/data", (req, res) => {
    console.log(req)
    console.log("get people OK!")
})

router.get("/personas", (req, res) => {
    res.json(personas)
    console.log("get people OK!")
})

router.post("/personas", (req, res) => {
    const newPers = req.body
    personas.push(newPers)
    console.log(personas)
    res.send("People posted")
})

app.use("/api", router)

