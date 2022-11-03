import ControllerFirebase from "../../controllers/controllerFirebase.js"


class firebaseDaoCarts extends ControllerFirebase {
    constructor() {
        super("cart")
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                productos: doc.data().productos
            }))
            return response

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const newProducts = cartFound.productos.filter(prod => prod.id != idProd)
            cartFound.productos = newProducts
            await this.update(cartFound, idCart)
        } catch (error) {
            console.log(error)
        }
    }

    async findProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const productFound = cartFound.productos.find(prod => prod.id == idProd)
            return productFound
        } catch (error) {
            console.log(error)
        }
    }
}


export default firebaseDaoCarts;

