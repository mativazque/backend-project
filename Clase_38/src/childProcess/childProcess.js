const object = {}

const contador = (rep) => {

    for (let i = 0; i < rep + 1; i++) {
        const random = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        if (!object.hasOwnProperty(random)) {
            object[random] = 1;
        } else {
            object[random]++;
        }
    }

    return object
}


process.on('message', msg => {
    const counter = contador(msg)
    process.send(counter)
})

process.send('listo')