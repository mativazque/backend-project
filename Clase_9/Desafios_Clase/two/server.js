const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('error', (err) => console.log(err))

app.engine("fjs", (filePath, options, cb) => {
    fs.readFile(filePath, (err, data) => {
        if (err) throw new Error(err)
        const contenido = data
            .toString()
            .replace("{{name}}", options.name)
            .replace("{{surname}}", options.surname)
            .replace("{{age}}", options.age)
        return cb(null, contenido)
    })
})

app.set("views", "./views")
app.set("view engine", "fjs")

app.get("/", (req, res) => {
    res.render("index", {name: "Matias", surname: "Vaz", age: 22})
})
