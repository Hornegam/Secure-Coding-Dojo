import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{

    //Lets get this user and rock
async get_user(request: Request, response: Response){
    const id = request.params;

    //调用对象
    const userService = new UserService();

    //Why do I use, await? I think when my Senior go on vacation, I'll take it off
    const users = await userService.get_user(id,"")

    //Enconding to Base64 because it's safer
    const cookieEncoded = Buffer.from(JSON.stringify(users), 'utf-8').toString('base64');

    //Should we really return 200 to everything?
    return response
    .cookie("CookieSession",cookieEncoded)
    .status(200)
    .json(users)
}

async validate_user(request: Request, response: Response){
    
    const cookie = request.cookies.CookieSession

    const user = JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8'))
    
    return response.status(200).json(user)
}

async log_user(request: Request, response: Response){
    const credentials: {user, pass} = request.body

    // necessário implementar testes
    // Fluxo -> Login -> Get User (Validate só pra dar apoio)
    // Login colocar credenciais ficticias


}


}




export {UserController}