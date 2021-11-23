import { app } from "../app";
import { UserService } from "../services/UserService"
import request from "supertest"

//The QA team don't know what they are doing. Somebody help them. - From: Devs

describe("Return User - Integration",()=>{

    it("Should be able to return only one user - Integration Test", async () => {

        const response = await request(app)
        .get("/user/1")
        .set({"token":"87645123"})

        const response2 = await request(app).get("/user/2").set({"token":"87645123"})

       const user = response.body
       expect(user).toHaveLength(1)
       expect(user).toEqual([{"CVV": 132, "CreditCard": "2929 1231 3123 3213", "age": 99, "id": 1, "name": "Roberto", "token": 87645123}])

       const user2 = response2.body
       expect(user2).toHaveLength(1)
       expect(user2).toEqual([{"CVV": 123, "CreditCard": "3213 1231 3123 3213", "age": 99, "id": 2, "name": "Chuck Norris", "token": 876431233}])
    });


    
});


describe("Return User - Unit",()=>{
    it("Should be able to return only one user - Unit Test", async ()=> {
        const userService = new UserService()

        const user = await userService.get_user(1,"87645123")
        const user2 = await userService.get_user(2,"876431233")

        expect(user).toHaveLength(1)
        expect(user).toEqual([{"CVV": 132, "CreditCard": "2929 1231 3123 3213", "age": 99, "id": 1, "name": "Roberto", "token": 87645123}])

        expect(user2).toHaveLength(1)
        expect(user2).toEqual([{"CVV": 123, "CreditCard": "3213 1231 3123 3213", "age": 99, "id": 2, "name": "Chuck Norris", "token": 876431233}])
    })

    it("Shouldn't be able to return a user diferent from the token", async () =>{
        const userService = new UserService()

        const user = await userService.get_user(2,"87645123")

        expect(user).toHaveLength(0)

    })

    it("Shouldn't be vulnerable to Sql Injection", async () =>{
        const userService = new UserService()

        const user = await userService.get_user("2 UNION SELECT NULL, NAME, NULL, NULL, NULL, NULL FROM sqlite_schema","87645123")

        expect(user).toHaveLength(0)
    })

    it("Shouldn't be able to use string as parameter", async () =>{
        const userService = new UserService()

        const user = await userService.get_user("alooooooo","87645123")

        expect(user).toHaveLength(0)
    })

    it("Shouldn't return the SQL message Error", async () =>{
        const userService = new UserService()

        const user = await userService.get_user("alooooooo","87645123")

        expect(user).not.toContain("SQLITE_ERROR")
    })


})
