const socket = io()

const render = (data) => {
    const html = data.map(item => {
        return (`<li>${item.nombre}: ${item.texto}</li>`)
    }).join(" ");
    document.getElementById("mjsContenedor").innerHTML = html
}



const sendMsj = (e) => {
    const user = document.getElementById("nombre").value
    const text = document.getElementById("texto").value

    socket.emit("nuevo-msj", {nombre: user, texto: text})

    return false
}

socket.on("mensajes", (data) => {
    render(data)
})