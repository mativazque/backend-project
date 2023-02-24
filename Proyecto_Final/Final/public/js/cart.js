let cart;

fetch("./api/cart")
    .then(response => response.json())
    .then(resp => {
        cart = resp
        document.getElementById("counterCart").innerText = `${resp.totalQuantity}`
        generatorHtmlTable(resp.productos, resp.totalValue)
    })
    .catch(err => console.log(err))


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
    document.getElementById("cartContainer").innerHTML = html
}

const deleteItem = (id) => {
    if (cart.productos.length > 1) {
        axios({
            method: 'put',
            url: '/api/cart',
            data: { IdProduct: id }
        })
        const productos = cart.productos.filter(item => item._id != id)
        const totalQuantity = productos.reduce((acum, item) => acum + item.quantity, 0)
        const totalValue = productos.reduce((acum, item) => acum + item.price * item.quantity, 0)
        cart = { productos, totalQuantity, totalValue }
        document.getElementById("counterCart").innerText = cart.totalQuantity
        generatorHtmlTable(cart.productos, cart.totalValue)
    } else {
        axios({
            method: 'put',
            url: '/api/cart',
            data: { IdProduct: id }
        })
        cart = { productos: [], totalQuantity: 0, totalValue: 0 }
        document.getElementById("counterCart").innerText = cart.totalQuantity
        generatorHtmlTable(cart.productos, cart.totalValue)
    }
}

const confirmBuy = () => {
    alert("Muchas gracias por su compra")
    generatorHtmlTable([], 0)
    axios({
        method: 'post',
        url: '/api/cartConfirm',
        data: {}
    })
    document.getElementById("counterCart").innerText = 0

}

const deleteAll = () => {
    alert("Los items fueron eliminados")
    generatorHtmlTable([], 0)
    axios({
        method: 'delete',
        url: '/api/cart',
        data: {}
    })
    document.getElementById("counterCart").innerText = 0
}