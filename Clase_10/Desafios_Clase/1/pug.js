const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views engine", "pug")
app.set("views", "./views")

app.get("/datos", (req, res) => {
    const {title, min, max, value} = req.query
    res.render("meter.pug", {title, min, max, value})
    console.log("OK")
})


app.listen(8080, () => {
    console.log("Server listening on port 8080")
}).on("error", (err) => console.log(err))

