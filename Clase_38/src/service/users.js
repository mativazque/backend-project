import { users } from "../daos/index.js"

const captureData = (user) => {

    const data = [
        {
            name: "Id User",
            value: user._id
        },
        {
            name: "Username",
            value: user.username
        },
        {
            name: "Name",
            value: user.name
        },
        {
            name: "Address",
            value: user.address
        },
        {
            name: "Age",
            value: user.age
        },
        {
            name: "Phone",
            value: user.phone
        },
        {
            name: "Avatar",
            value: user.avatar
        }]

    return data
}

export class UsersService {

    static async getUser(username) {
        try {
            return await users.getByUser(username)
        } catch (error) {
            console.log(error)
        }
    }

    static async getUserInfo(username) {
        try {
            const user = await users.getByUser(username)
            return captureData(user)
        } catch (error) {
            console.log(error)
        }
    }
}
