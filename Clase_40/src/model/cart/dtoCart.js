export const createNewCart = (username, producto) => {
    const newCart = {
        username: username,
        productos: [producto],
        timestamp: new Date().toLocaleString()
    }
    return newCart
}

