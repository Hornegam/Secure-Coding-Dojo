import { app } from "../app";
import { UserService } from "../services/UserService"
import request from "supertest"
import { Parser } from "../utils/Parser"

//The QA team don't know what they are doing. Somebody help them. - From: Devs

describe("Broken Authentication Tests - Integration",()=>{
	

    it("Broken Authentication - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body

        expect(user).toStrictEqual({
            "id": 1,
            "name":"Roberto",
            "email":"roberto@industria.com",
            "token": 87645123
        })

    });

    it("Broken Authentication - Test 2", async () => {

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"12345"})
        
        const user = response.body
        const status = response.status

        expect(user).toBe("Não foi possível fazer login...")
        expect(status).toBeGreaterThanOrEqual(400);

    });

    
});


describe("IDOR and SQLi Tests- Integration",()=>{
    it("IDOR - Test 1", async () => {

        const response = await request(app)
        .get("/user/3")
        
        const user = response.body
        const status = response.status

        expect(user).toBe("Você não tem permissão")
        expect(status).toBeGreaterThanOrEqual(400);

    });

    it("IDOR - Test 2", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParser(cookies)

        const response2 = await request(app)
        .get("/user/3")
        .set('Cookie',[cookies])

        expect(response2.body).toBe("Você não tem permissão")
        expect(response2.status).toBeGreaterThan(400)

    });

    it("SQL Injection - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParser(cookies)

        const response2 = await request(app)
        .get("/user/2 UNION SELECT NULL, NAME, NULL, NULL, NULL, NULL, NULL, NULL FROM sqlite_schema")
        .set('Cookie',[cookies])
       
        expect(response2.body).toBe("Erro de Servidor")
        expect(response2.status).toBeGreaterThan(400)

    });

    it("SQL Injection - Test 2", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParser(cookies)

        const response2 = await request(app)
        .get("/user/2 OR 1=1#")
        .set('Cookie',[cookies])
       
        expect(response2.body).toBe("Erro de Servidor")
        expect(response2.status).toBeGreaterThan(400)
    });

    it("SQL Injection - Test 3", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com2' OR id=2 --", "pass":"1234"})
        
        const user = response.body

        expect(user).toBe("Não foi possível fazer login...")
        expect(response.status).toBeGreaterThanOrEqual(400);
    });


});

describe("Cookies Security Tests - Integration",()=>{
    it("Cookie Security - Test 1", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.httpOnly).toBe(true)
       
    });

    it("Cookie Security - Test 2", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.secure).toBe(true)
       
    });

    it("Cookie Security - Test 3", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.sameSite).toBe("Strict" || "Lax")
       
    });

    it("Cookie Security - Test 4", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        expect(cookieParsed.CookieSession.path).toBe("localhost/")
       
    });

    it("Cookie Security - Test 5", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        var date = new Date(Date.now());

        date.setHours(date.getHours() + 1)  

        expect(cookieParsed.CookieSession.expires).toBe(date)
       
    });

    it("Cookie Security - Test 6", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        const userDecoded = JSON.parse(Buffer.from(cookieParsed.CookieSession.value, 'base64').toString('utf-8'))
    
        expect(userDecoded).toStrictEqual({
            "id": 1,
            "name":"Roberto",
            "email":"roberto@industria.com",
            "token": 87645123
        })
    });

    it("Cookie Security - Test 7", async () => {

        const parser = new Parser()

        const response = await request(app)
        .post("/user/login")
        .send({"user":"roberto@industria.com", "pass":"1234"})
        
        const user = response.body
        const cookies = response.headers['set-cookie']

        const cookieParsed = await parser.CookieHeaderParserObject(cookies)

        const userDecoded = JSON.parse(Buffer.from(cookieParsed.CookieSession.value, 'base64').toString('utf-8'))
    
        expect(userDecoded).toBe(undefined)
    });


})
