//Import
import config from './../configs/configs.js'
import admin from "firebase-admin"


try {
    admin.initializeApp({
        credential: admin.credential.cert(config.firebase.serviceAccount)
    })
    console.log("Conected to firebase")
} catch (error) {
    console.log(error)
}

const db = admin.firestore();

class ControllerFirebase {
    constructor(collectionName) {
        this.query = db.collection(collectionName)
    }

    async save(data) {
        try {
            const date = new Date().toLocaleString()
            const newData = { ...data, timestamp: date}
            let doc = this.query.doc()
            await doc.create(newData)
            console.log("Saved")
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = this.query.doc(id)
            const item = await doc.get()
            const response = item.data()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(id)
            const item = await doc.delete()
        } catch (error) {
            console.log(error)
        }
    }

    async update(element, id) {
        try {
            const doc = this.query.doc(id)
            let item = await doc.update(element)
            console.log("Updated")
        } catch (error) {
            console.log(error)
        }
    }
}

export default ControllerFirebase





