const express = require('express');
const app = express();

const hbs = require("express-handlebars")

app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        defaultLayout: "layout1.hbs",
        layoutsDir: __dirname + "/view/layouts",
        partialsDir: __dirname + "/view/partials"
    }))

app.set("view engine", "hbs")
app.set("views", "./view")




const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('error', (err) => console.log(err))

app.get("/", (req, res) => {
    res.render("index",
        {
            title: "hello word",
            name: "Matias",
            surname: "Vazquez",
            age: 33,
            email: "matias@gmail.com",
            phone: 324234,
            copy: "Copyright MV",
            layout: false,
        })
})

