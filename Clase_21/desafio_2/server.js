import express from 'express';

import { faker } from '@faker-js/faker';
faker.locale = "es"
const { name, color } = faker

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/test", (req, res) => {

    let objet = []
    const cantidad = req.query.cant ? parseInt(req.query.cant) : 10;

    for (let i = 0; i < cantidad; i++) {
        objet.push({
            nombre: `${name.firstName()}`,
            apellido: `${name.lastName()}`,
            color: `${color.human()}`,
            id: i+1
        })
    }
    res.send(objet)
})



app.listen(8080, () => {
    console.log("Server listening on PORT 8080")
}).on('error', () => { console.log("Server error") })