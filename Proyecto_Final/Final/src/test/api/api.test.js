import supertest from "supertest";
import { expect } from "chai"
import initServer from "../../../server.js" // To init Server automatic


const request = supertest("http://127.0.0.1:8080")

const newProduct = {
    title: "Regla XXX",
    price: 30,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    category: "escolares"
}

describe("test api rest full", () => {
    describe("GET", () => {
        it("GetAll: The collection has elements, should return a status 200", async () => {
            let response = await request.get("/api/productos")
            expect(response.status).to.eql(200)
        })
        it("GetById: using an existing id, should get an element", async () => {
            let response = await request.get("/api/productos/63b495ac4207eabd4a000fcc")
            expect(response.status).to.eql(200)
            expect(response._body).to.include.keys("title", "price", "_id", "thumbnail", "timestamp")
        })
    })
    describe("POST", () => {
        it("Post a right product, shuld return a status 200", (done) => {
            request.post("/api/productos").send(newProduct)
                .then(res => {
                    expect(res.status).to.eql(200)
                    done()
                }).catch(done)
        })
    })
    describe("DELETE", () => {
        it("should delete a product that existing", (done) => {
            request.delete("/api/productos/63deee4116c6b06ce40b1ceb")
                .then((res) => {
                    expect(res.status).to.eql(200)
                    done()
                }).catch(done)
        })
    })
    describe("UPDATE", () => {
        it("should update a product that existing", (done) => {
            request.put("/api/productos/63def1e94977c983487866ee").send(newProduct)
                .then((res) => {
                    expect(res.status).to.eql(200)
                    done()
                }).catch(done)
        })
    })
})