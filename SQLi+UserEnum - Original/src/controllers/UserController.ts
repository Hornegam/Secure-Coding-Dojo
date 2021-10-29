import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController{

    //Lets get this user and rock
    async get_user(request: Request, response: Response) {
        const { id } = request.params;
        const { token } = request.headers;

        //Calling the object
        const userService = new UserService();

        //Why do I use, await? I think when my Senior go on vacation, I'll take it off
        const users = await userService.get_user(id, token);

        //Should we really return 200 to everything?
        return response.status(200).json(users)
    }
}

export {UserController};