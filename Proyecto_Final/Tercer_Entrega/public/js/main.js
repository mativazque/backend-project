const counterCart = (q) => {

    const quantity = q == undefined ? 0 : Number(q);

    fetch("./api/cart")
        .then(response => response.json())
        .then(resp => document.getElementById("counterCart").innerText = `${resp.totalQuantity + quantity}`)
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

fetch("./api/productos")
    .then(response => response.json())
    .then(resp => generatorHtmlTable(resp.productos))
    .then(html => domEditor("productos", html))
    .catch(err => console.log(err))



const captureProducto = (id) => {
    const idCounter = id + "counter"
    const quantity = document.getElementById(idCounter).textContent
    const newItem = {
        IdProduct: id,
        quantity: quantity
    }
    counterCart(Number(quantity)) //para considerar aquellos aún no pusheados
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

const captureProduct = (e) => {
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    // socket.emit("new-product", { title: title, price: price, thumbnail: thumbnail })
    // formProduct.reset()
    return false
}

// socket.on("productos", (productos) => {
//     generatorHtmlTable(productos)
//         .then((html) => domEditor("productos", html))
// })

const author = new normalizr.schema.Entity("users")
const mensaje = new normalizr.schema.Entity("mensajes", {
    author: author
}, { idAttribute: '_id' })

const mensajesNormalized = new normalizr.schema.Entity("posts", {
    mensajes: [mensaje]
})

const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}

const captureMsj = (e) => {
    const id = document.getElementById("mail").value
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const edad = document.getElementById("edad").value
    const alias = document.getElementById("alias").value
    const avatar = document.getElementById("avatar").value
    const fecha = new Date().toLocaleString()
    const text = document.getElementById("texto").value
    // socket.emit("new-msj", {
    //     author: {
    //         nombre: nombre,
    //         apellido: apellido,
    //         edad: Number(edad),
    //         alias: alias,
    //         avatar: avatar,
    //         id: id
    //     },
    //     text: text,
    //     fecha: fecha
    // })
    formMsj.reset()
    return false
}

const renderMsj = (data) => {
    const html = data.mensajes.map(msj => {
        return (`<div class="d-flex flex-wrap my-1 px-2 align-items-center">
        <p class="fw-bold text-primary m-0">${msj.author.id}</p>
        <p class="text-danger m-0">${msj.fecha}: </p>
        <p class="text-success fst-italic fw-semibold m-0">${msj.text}</p>
        <img src=${msj.author.avatar} alt="avatar" class="imgAvatar">
    </div>`)
    }).join(" ")
    domEditor("mensajes", html)
}

// socket.on("mensajes", (mensajes) => {
//     const desnormalizado = normalizr.denormalize(mensajes.result, mensajesNormalized, mensajes.entities)
//     renderMsj(desnormalizado)

//     const compresion = parseInt(((JSON.stringify(mensajes).length/JSON.stringify(desnormalizado).length)-1) * 100)
//     document.getElementById("compresion").innerText = `Porcentaje de compresión: ${compresion}%`
// })



