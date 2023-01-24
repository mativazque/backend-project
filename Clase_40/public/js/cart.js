const dataCartUser = () => {
    fetch("./api/cart")
        .then(response => response.json())
        .then(resp => {
            document.getElementById("counterCart").innerText = `${resp.totalQuantity}`
            return generatorHtmlTable(resp.productos, resp.totalValue)
        })
        .then(html => domEditor("cartContainer", html))
        .catch(err => console.log(err))
}


dataCartUser()


fetch("./api/user")
    .then(respuesta => respuesta.json())
    .then(resp => {
        document.getElementById("userName").innerText = `${resp.user.name}`
        document.getElementById("avatar").innerHTML = `<img src=${resp.user.avatar} alt=${resp.user.name} width="40">`
    })
    .catch(err => console.log(err))




const generatorHtmlTable = async (cart, total) => {
    const res = await fetch("./../views/cart.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ cart: cart, totalPrice: total })
    return html
}

const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}

const deleteItem = (id) => {
    setTimeout(() => {
        dataCartUser()
    }, 1000)
    axios({
        method: 'put',
        url: '/api/cart',
        data: { IdProduct: id }
    })
}

const confirmBuy = () => {
    setTimeout(() => {
        dataCartUser()
    }, 2000)

    alert("Muchas gracias por su compra")

    axios({
        method: 'post',
        url: '/api/cartConfirm',
        data: {}
    })
}

const deleteAll = () => {
    setTimeout(() => {
        dataCartUser()
    }, 2000)

    alert("Los items fueron eliminados")

    axios({
        method: 'delete',
        url: '/api/cart',
        data: {}
    })

}