import ControllerFirebase from "../../controllers/controllerFirebase.js"


class firebaseDaoProducts extends ControllerFirebase {
    constructor() {
        super("productos")
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            let docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                nombre: doc.data().nombre,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                stock: doc.data().stock,
                description: doc.data().description,
                timestamp: doc.data().timestamp
            }))
            return response

        } catch (error) {
            console.log(error)
        }
    }
}


export default firebaseDaoProducts;

