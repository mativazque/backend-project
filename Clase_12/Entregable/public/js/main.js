const socket = io()

const generatorHtmlTable = async (productos) => {
    const render = productos.length > 0 ? true : false;
    const res = await fetch("./views/productos.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ productos: productos, render: render })
    return html
}

const domEditor = (id, html) => {
    document.getElementById(id).innerHTML = html
}

const captureProduct = (e) => {
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    socket.emit("new-product", { title: title, price: price, thumbnail: thumbnail })
    formProduct.reset()
    return false
}

const captureMsj = (e) => {
    const mail = document.getElementById("mail").value
    const fecha = new Date().toLocaleString()
    const text = document.getElementById("texto").value
    socket.emit("new-msj", { mail: mail, fecha: fecha, text: text })
    formMsj.reset()
    return false
}

socket.on("productos", (productos) => {
    generatorHtmlTable(productos)
        .then((html) => domEditor("productos", html))
})

const renderMsj = (mensajes) => {
    const html = mensajes.map(msj => {
        return (`<div class="d-flex flex-wrap my-1 px-2 rounded">
        <p class="fw-bold text-primary m-0">${msj.mail}</p>
        <p class="text-danger m-0">${msj.fecha}: </p>
        <p class="text-success fst-italic fw-semibold m-0">${msj.text}</p>
    </div>`)
    }).join(" ")
    domEditor("mensajes", html)
}

socket.on("mensajes", (mensajes) => {
    renderMsj(mensajes)
})



