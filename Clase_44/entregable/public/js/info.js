const counterCart = () => {
    fetch("./api/cart")
        .then(response => response.json())
        .then(resp => {
            document.getElementById("counterCart").innerText = `${resp.totalQuantity}`
        })
        .catch(err => console.log(err))
}

counterCart()

fetch("./api/user")
    .then(respuesta => respuesta.json())
    .then(resp => {
        document.getElementById("userName").innerText = `${resp.user.name}`
        document.getElementById("avatar").innerHTML = `<img src=${resp.user.avatar} alt=${resp.user.name} width="40">`
    })
    .catch(err => console.log(err))

fetch("./api/user/info")
    .then(response => response.json())
    .then(resp => generatorHtmlTable(resp.data))
    .then(html => domEditor("containerInfo", html))
    .catch(err => console.log(err))



const generatorHtmlTable = async (data) => {
    const res = await fetch("./../views/info.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ data: data })
    return html
}


const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}






