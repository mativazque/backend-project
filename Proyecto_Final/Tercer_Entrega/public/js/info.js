const counterCart = () => {
    fetch("./api/cart")
        .then(response => response.json())
        .then(resp => {
            const quantity = resp.totalQuantity ? resp.totalQuantity : 0
            document.getElementById("counterCart").innerText = `${quantity}`
        })
        .catch(err => console.log(err))
}

counterCart()

fetch("./api/user")
    .then(respuesta => respuesta.json())
    .then(resp => {
        document.getElementById("userName").innerText = `${resp.user}`
        document.getElementById("avatar").innerHTML = `<img src=${resp.avatar} alt=${resp.user} width="40">`
    })
    .catch(err => console.log(err))

fetch("./api/info")
    .then(response => response.json())
    .then(resp => generatorHtmlTable(resp.data))
    .then(html => domEditor("containerInfo", html))
    .catch(err => console.log(err))



const generatorHtmlTable = async (data) => {
    const res = await fetch("./../views/info.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ data: data})
    return html
}


const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}






