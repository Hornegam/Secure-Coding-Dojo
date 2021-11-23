import { UserRepository } from './../repositories/UserRepository';
import { app } from "../app";
import { UserService } from "../services/UserService";
import { Messaging } from "../utils/messaging";
import request from "supertest";
const message = new Messaging();
const repository = new UserRepository();
const userService = new UserService(message,repository);



//The QA team don't know what they are doing. Somebody help them. - From: Devs

describe("Return User - Integration",()=>{
    afterEach(() => jest.clearAllMocks());
    it("Should be able to return only one user - Integration Test", async () => {

        const response = await request(app)
        .get("/user/1")
        .set({"token":"87645123"})
        const user = response.body;
        // expect(user).toEqual({"CVV": 132, "CreditCard": "2929 1231 3123 3213", "age": 99, "id": 1, "name": "Roberto", "token": 87645123});
        expect(user).toEqual({name: 'Roberto',creditCard: 3213, age: 99,});
        expect(response.status).toEqual(200);
    });

    it("Shouldn't be able to use string as parameter - Integration Test", async () => {
        const response = await request(app)
        .get("/user/aaaa")
        .set({"token":"87645123"})
        expect(response.text).toEqual('invalid id send type in parameter');
        expect(response.status).toEqual(400);
    });
    it("Should not be able to if token is from another user - Integration Test", async () => {
        const response = await request(app)
        .get("/user/1")
        .set({"token":"876451233"})
        expect(response.text).toEqual('id or token is not invalid');
        expect(response.status).toEqual(406);
    });

    it("Should be able to return user not found  - Integration Test", async () => {
        const response = await request(app)
        .get("/user/12")
        .set({"token":"87645123"})
        const user = response.body;
        // expect(user).toEqual({"CVV": 132, "CreditCard": "2929 1231 3123 3213", "age": 99, "id": 1, "name": "Roberto", "token": 87645123});
        expect(response.text).toEqual('user not found');
        expect(response.status).toEqual(404);
    });

});

describe("Return User - Unit",()=>{
    afterEach(() => jest.clearAllMocks());
    it("Should be able to return only one user - Unit Test", async ()=> {
        const user = await userService.get_user(1,87645123);
        expect(user).toEqual({"CVV": 132, "CreditCard": "2929 1231 3123 3213", "age": 99, "id": 1, "name": "Roberto", "token": 87645123})
    })

    it("Shouldn't be able to return a user diferent from the token", async () =>{
        const user = await userService.get_user(2,"87645123")
        expect(user.msg).toBe("id or token is not invalid");
        expect(user.status).toBe(406);

    })

    it("Shouldn't be vulnerable to Sql Injection", async () =>{
        const id = '2 UNION SELECT NULL, NAME, NULL, NULL, NULL, NULL FROM sqlite_schema';
        const token = 87645123;
        const user = await userService.get_user(id,token);

        expect(user.msg).toBe("invalid id send type in parameter")
    })

    it("Shouldn't be able to use string as parameter", async () =>{
        const user = await userService.get_user("alooooooo","87645123")
        expect(user.status).toBe(400)
    })

    it("Should be able to return user not found", async () =>{
        const user = await userService.get_user(12,"87645123")
        expect(user.status).toBe(404)
    })

    it("Shouldn't return the SQL message Error", async () =>{
        const user = await userService.get_user("alooooooo","87645123")

        expect(user).not.toContain("SQLITE_ERROR")
    })


})
