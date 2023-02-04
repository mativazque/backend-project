export const createNewProduct = (product) => {
    const newProduct = {
        ...product,
        timestamp: new Date().toLocaleString()
    }
    return newProduct
}

