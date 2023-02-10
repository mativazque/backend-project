const socket = io()

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
    socket.emit("new-msj", {
        author: {
            nombre: nombre,
            apellido: apellido,
            edad: Number(edad),
            alias: alias,
            avatar: avatar,
            id: id
        },
        text: text,
        fecha: fecha
    })
    formMsj.reset()
    return false
}

const generatorHtml = async (mensajes) => {
    const res = await fetch("./../views/mensajes.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ data: mensajes })
    return html
}

socket.on("mensajes", (mensajes) => {
    const desnormalizado = normalizr.denormalize(mensajes.result, mensajesNormalized, mensajes.entities)
    generatorHtml(desnormalizado)
        .then((html) => domEditor("mensajes", html))

    const compresion = parseInt(((JSON.stringify(mensajes).length / JSON.stringify(desnormalizado).length) - 1) * 100)
    document.getElementById("compresion").innerText = `Porcentaje de compresión: ${compresion}%`
})



