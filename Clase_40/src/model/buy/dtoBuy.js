export const createNewBay = (username, productos, valueTotal) => {
    const newBuy = {
        username: username,
        productos: productos,
        total: valueTotal,
        timestamp: new Date().toLocaleString()
    }
    return newBuy
}
