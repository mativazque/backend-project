const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(8080, () => {
    console.log(`Server listening on PORT 8080`)
}).on("Error", error => console.log(error))

let frase = `Frase inicial me parece una barbaridad`
const arrayFrase = frase.split(" ")

app.get("/api/frase", (req, res) => {
    res.json({ frase: frase })
})

app.get("/api/palabras/:pos", (req, res) => {
    const {pos} = req.params
    const i = parseInt(pos)
    res.json({palabra: arrayFrase[i-1]})
})

app.post("/api/palabras", (req, res) => {
    const { palabra } = req.body
    const newFrase = [...arrayFrase, palabra]
    res.json({
        agregada: palabra,
        pos: newFrase.indexOf(palabra),
        frase_final: newFrase.join(" ") 
    })
})

app.put("/api/palabras/:pos", (req, res) => {
    const {palabra} = req.body
    const {pos} = req.params
    if(arrayFrase[parseInt(pos) - 1]) {
        const anterior = arrayFrase[parseInt(pos) - 1]
        arrayFrase[parseInt(pos) - 1] = palabra
        res.json({
            actualizada: palabra,
            anterior: anterior,
            frase_final: arrayFrase.join(" ")
        })
    }
})

app.delete("/api/palabras/:pos", (req, res) => {
    const {pos} = req.params
    if(arrayFrase[parseInt(pos) - 1]) {
        arrayFrase.splice(parseInt(pos) - 1, 1)
        res.json({newFrase: arrayFrase.join(" ")})
    }
})
