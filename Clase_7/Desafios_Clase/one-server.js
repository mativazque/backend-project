const express = require('express');

const app = express()

const server = app.listen(8080, () => {
    console.log(`Server listening on PORT 8080`)
}).on("Error", error => console.log(error))

app.get("/api/frase", (req, res) => {
    const frase = `Hola mundo como están`
    res.json({ frase: frase })
})

app.get("/api/letras/:num", (req, res) => {
    const frase = "Matias"

    if (isNaN(parseInt(req.params.num))) {
        res.send(`<h1> Error: debe ingresar un valor numerico </h1>`)
    }  else if (parseInt(req.params.num) > frase.length) {
        res.send(`<h1> Error: debe ingresar un valor numerico entre 1 - 6 </h1>`)
    } else {
        res.json({ letra: frase[parseInt(req.params.num) - 1] })
    }
})

app.get("/api/palabras/:num", (req, res) => {
    const frase = "Hola como estas"
    const arrayFrase = frase.split(" ")

    if (isNaN(parseInt(req.params.num))) {
        res.send(`<h1> Error: debe ingresar un valor numerico </h1>`)
    } else if (parseInt(req.params.num) > arrayFrase.length) {
        res.send(`<h1> Error: debe ingresar un valor numerico entre 1 - 3 </h1>`)
    }else {
        res.json({ palabra: arrayFrase[parseInt(req.params.num) - 1] })
    }

})

