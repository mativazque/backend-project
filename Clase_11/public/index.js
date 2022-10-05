const socket = io() //conecta al user al server socket
let mensajes =[]

socket.on("data", (data) => {
    mensajes = data.map(item => `<li>${item.id}: ${item.mensaje}}</li>`).join(" ")
    document.getElementById("contenedorMsj").innerHTML = mensajes
})

let input = document.getElementById("menssages")
let button = document.getElementById("enviar")

button.addEventListener("click", () => {
    socket.emit("mensaje", input.value)
})

socket.on("mensajes", (data) => {
    console.log(data)

    mensajes = data.map(item => `<li>${item.id}: ${item.mensaje}}</li>`).join(" ")
    document.getElementById("contenedorMsj").innerHTML = mensajes
})

