import fs from 'fs'

class ControllerArchivo {
    constructor(routh) {
        this.routh = routh
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.routh, "utf-8"))
        } catch (err) {
            return err
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.routh, JSON.stringify(data), "utf-8")
        } catch (err) {
            return err
        }
    }


    async save(data) {
        try {
            //Leo el archivo, lo convierto en objeto y lo guardo
            const readData = await this.getAll()
            //Tiene productos?
            if (readData.length > 0) {
                //En caso que si, lo agrego al array de readDate, le asigno id +1 y reestribo el archivo
                const newData = [...readData, {
                    ...data, id: readData[readData.length - 1].id + 1,
                    timestamp: new Date().toLocaleString()
                }]
                await this.writeFile(newData)
                return newData[newData.length - 1].id
            } else {
                //En caso que no, lo guardo y le asigno id:1
                const newElement = [{ ...data, id: 1, timestamp: new Date().toLocaleString() }]
                await this.writeFile(newElement)
                return newElement.id
            }
        } catch (err) {
            return err
        }
    }

    async getById(id) {
        try {
            const readData = await this.getAll()
            const itemFound = readData.find(item => item.id === id) ?
                readData.find(item => item.id === id) :
                NaN;
            return itemFound;

        } catch (err) {
            return err
        }
    }


    async deleteById(id) {
        const itemFound = await this.getById(id);
        try {
            if (itemFound.id) {
                const readData = await this.getAll()
                const newData = readData.filter(item => item.id != id)
                let i = 1
                newData.map(item => item.id = i++)
                await this.writeFile(newData)
                return true
            } else {
                return false
            }
        }
        catch (err) {
            return err
        }
    }

    async deleteAll() {
        try {
            await this.writeFile([])
            const readData = await this.getAll()
            return readData
        }
        catch (err) {
            return err
        }
    }

    async elementRandom() {
        try {
            const readData = await this.getAll()

            if (readData.length > 0) {
                const elemRandom = readData[Math.floor(Math.random() * readData.length)]
                return elemRandom
            } else {
                console.log("No hay elementos en la base de datos")
            }
        }
        catch (err) {
            return err
        }
    }

    async update(element, id) {
        try {
            const readData = await this.getAll()
            if (readData[id - 1]) {
                readData[id - 1] = { ...element, id: id }
                await this.writeFile(readData)
                return readData[id - 1]
            } else {
                return NaN
            }
        } catch (error) {
            return err
        }
    }

}


export default ControllerArchivo


