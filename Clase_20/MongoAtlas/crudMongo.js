class Container {
    constructor(model) {
        this.model = model;
    }

    async save(data) {
        try {
            const newDocument = new this.model(data)
            await newDocument.save()
            console.log("User saved successfully")
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await this.model.find({})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const data = await this.model.find({ _id: id })
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, value) {
        try {
            const update = await this.model.updateOne({_id: id}, {$set: {nombre: value}})
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            await this.model.deleteOne({_id: id})
        } catch (error) {
            console.log(error)
        }


    }




}



module.exports = Container
