import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{

    //Lets get this user and rock
async get_user(request: Request, response: Response){
    const id : { id: Number } = request.params;
    const { token } = request.headers["token"];

    //Calling the object
    const userService = new UserService();

    //Why do I use, await? I think when my Senior go on vacation, I'll take it off
    const user = await userService.get_user(id.id, token);

    // if (!user) {
    //     return response.status(401).send('Não Autorizado');
    // }

    //Should we really return 200 to everything?
    
    return response.status(200).json(user);
}


}




export {UserController}