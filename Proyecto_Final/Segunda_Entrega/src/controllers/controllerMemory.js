console.log("Working in memory")

class ControllerMemory {
    constructor() {
        this.elements = []
    }

    async save(data) {
        const date = new Date().toLocaleString()
        let id = this.elements.length > 0 ? this.elements[this.elements.length - 1].id + 1 : 1;
        try {
            this.elements.push({ ...data, id: id, date: date })
            console.log(this.elements)
            return this.elements;
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            return this.elements.find(e => e.id === Number(id))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            console.log(this.elements)
            return this.elements
        } catch (error) {
            console.log(error)
        }

    }

    async deleteById(id) {
        let i = 1;
        try {
            const newArray = this.elements.filter(item => item.id !== Number(id))
            this.elements = newArray;
            this.elements.map(e => e.id = i++)
        } catch (error) {
            console.log(error)
        }
    }

    async update(element, id) {
        const newElement = {...element, id: Number(id)}
        try {
            this.elements[Number(id) - 1] = newElement
            console.log(this.elements[Number(id) - 1])
        } catch (error) {
            console.log(error)
        }
    }

}

export default ControllerMemory