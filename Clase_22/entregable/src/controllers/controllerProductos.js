
import { faker } from "@faker-js/faker"
faker.locale = "es"

const { commerce, image } = faker


export default class controllerProduct {
    constructor() {
        this.commerce = commerce
        this.image = image
    }
    randomProducts() {
        let productosRandom = []
        for (let i = 0; i < 5; i++) {
            productosRandom.push({
                nombre: commerce.product(),
                price: commerce.price(),
                img: image.image()
            })
        }
        return productosRandom
    }
}





