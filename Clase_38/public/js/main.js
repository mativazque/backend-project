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

fetch("./api/productos")
    .then(response => response.json())
    .then(resp => generatorHtmlTable(resp.productos))
    .then(html => domEditor("productos", html))
    .catch(err => console.log(err))



const captureProducto = (id) => {
    setTimeout(() => {
        counterCart()
    }, 1200)

    const idCounter = id + "counter"
    const quantity = document.getElementById(idCounter).textContent
    const newItem = {
        IdProduct: id,
        quantity: Number(quantity)
    }
    axios({
        method: 'post',
        url: '/api/cart',
        data: newItem
    })
}

const onAdd = (id) => {
    const idCounter = id + "counter"
    let quantity = parseInt(document.getElementById(idCounter).textContent)
    ++quantity
    document.getElementById(idCounter).innerText = quantity
    console.log(quantity)
}

const onRest = (id) => {
    const idCounter = id + "counter"
    let quantity = parseInt(document.getElementById(idCounter).textContent)
    quantity = quantity !== 1 ? quantity - 1 : 1
    document.getElementById(idCounter).innerText = quantity
    console.log(quantity)
}



const generatorHtmlTable = async (productos) => {
    const render = productos.length > 0 ? true : false;
    const res = await fetch("./../views/productos.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ productos: productos, render: render })
    return html
}


const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}






