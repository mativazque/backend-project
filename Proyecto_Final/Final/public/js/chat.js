const socket = io()

let usuario;

fetch("./api/cart")
    .then(response => response.json())
    .then(resp => {
        document.getElementById("counterCart").innerText = `${resp.totalQuantity}`
    })
    .catch(err => console.log(err))

fetch("./api/user")
    .then(respuesta => respuesta.json())
    .then(resp => {
        usuario = resp.user
        document.getElementById("userName").innerText = `${resp.user.name}`
        document.getElementById("avatar").innerHTML = `<img src=${resp.user.avatar} alt=${resp.user.name} width="40">`
    })
    .catch(err => console.log(err))

const captureMsj = (e) => {
    socket.emit("new-msj", {
        username: usuario.username,
        avatar: usuario.avatar,
        tipo: usuario.tipo,
        text: document.getElementById("texto").value,
        fecha: new Date().toLocaleString()
    })
    formMsj.reset()
    return false
}

const generatorHtml = async (mensajes) => {
    const res = await fetch("./../views/mensajes.ejs")
    const view = await res.text()
    const template = ejs.compile(view)
    const html = template({ mensajes: mensajes })
    document.getElementById("mensajes").innerHTML = html
}

socket.on("mensajes", (mensajes) => {
    generatorHtml(mensajes)
})



