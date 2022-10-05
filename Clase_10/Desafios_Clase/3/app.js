const express = require('express')
const app = express()

const {Router} = express

const routerUser = Router()

const Class = require('./class')
const users = new Class("./data/users.txt")



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

routerUser.get("/", async (req, res) => {
    const usuarios = await users.Get()
    const render = usuarios.length > 0 ? true : false
    res.render("pages/home", {usuarios, render})
})

routerUser.post("/", async (req, res) => {
    try {
        await users.Save(req.body)
        res.redirect("./home")
    } catch (error) {
        console.log(error)
    }
})

app.use("/home", routerUser)

app.listen(8080, () => {
    console.log("Server listening on port 8080")
}).on("error", (err) => console.log(err))