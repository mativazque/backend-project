const dataCartUser = () => {
    fetch("./api/cart")
        .then(response => response.json())
        .then(resp => {
            const quantity = resp.totalQuantity ? resp.totalQuantity : 0
            document.getElementById("counterCart").innerText = `${quantity}`
            return generatorHtmlTable(resp.cart, resp.totalPrice)
        })
        .then(html => domEditor("cartContainer", html))
        .catch(err => console.log(err))
}


dataCartUser()


fetch("./api/user")
    .then(respuesta => respuesta.json())
    .then(resp => {
        document.getElementById("userName").innerText = `${resp.user}`
        document.getElementById("avatar").innerHTML = `<img src=${resp.avatar} alt=${resp.user} width="40">`
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
        data: { idProd: id }
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