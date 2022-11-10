import express from 'express';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

const data = {
    nombres: nombres,
    apellidos: apellidos,
    colores: colores
}


const randomObjet = (data) => {
    const nombre = data.nombres[Math.floor(Math.random() * data.nombres.length)]
    const apellido = data.apellidos[Math.floor(Math.random() * data.apellidos.length)]
    const color = data.colores[Math.floor(Math.random() * data.colores.length)]
    return { nombre, apellido, color }
}


app.get("/test", (req, res) => {

    let arrayReturn = []

    for (let index = 0; index < 10; index++) {
        const newElement = randomObjet(data)
        arrayReturn.push(newElement)
    }

    res.send(arrayReturn)
})


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on("Not Found", () => { console.log("Error en el server") })

