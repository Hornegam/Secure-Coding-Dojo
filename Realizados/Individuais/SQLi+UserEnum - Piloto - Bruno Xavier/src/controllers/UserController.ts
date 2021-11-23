import { UserRepository } from './../repositories/UserRepository';
import { Parser } from './../utils/parser';
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from './../dtos/user.dto';
import { Messaging } from './../utils/messaging';
const message = new Messaging();
const repository = new UserRepository;
class UserController{

    //Lets get this user and rock
    async get_user(request: Request, response: Response){
        try {
            const id = parseInt(request.params.id);
            const token  = request.headers["token"];

            //Calling the object
            const userService = new UserService(message,repository);

            //Why do I use, await? I think when my Senior go on vacation, I'll take it off
            const user = await userService.get_user(id, token);
            if(!user.id || !user.token)
                throw {msg: user.msg, status: user.status}
            let result = new User();
            let Isvalid = new Parser();
            console.log(user);
            result.name = user.name;
            result.age = user.age;
            result.creditCard = parseInt(Isvalid.IsvalidCredit(user.CreditCard));

            //Should we really return 200 to everything?
            return response.status(200).json(result);   
        } catch (err) {
            return response.status(err.status).send(err.msg || '');
        }
    }

    // async get_alluser(request: Request, response: Response){
    //     try {
    //         const userService = new UserService(message,repository);
    //         const user = await userService.get_alluser();
    //         return response.status(200).json(user);   
    //     } catch (err) {
    //         return response.status(err.status).send(err.msg || '');
    //     }
    // }
}




export {UserController}