import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{

    //Lets get this user and rock
async get_user(request: Request, response: Response){
    let id = request.params;
    const cookies = request.cookies.CookieSession

    //Validate if user is logged
    if(cookies == undefined) return response.status(200).json("Você não tem permissão")

    //Get information from user if it has permission
    const infos = await get_user_information(id.id);

    return response
        .status(200)
        .json(infos.Usuario)
}

async log_user(request: Request, response: Response){
    const credentials: {user: string, pass: number} = request.body
    const userService = new UserService();

    //Validate if user exists and return the user
    const validated = await userService.validate_user(credentials.user, credentials.pass)

    //User not founded
    if(validated == undefined){
        return response.status(200).json("Não foi possível fazer login...")
    }else{
        //Get user information again? - Why do we need this?  
        const infos = await get_user_information(validated.id);

        //My internship left this code behind, i'll call him later to see if he's usign for something
        var dateExpiration = calculateDate()

        return response
        .cookie("CookieSession",infos.Cookie)
        .status(200)
        .json(infos.Usuario)
    }

}

//Rota auxiliar
async validate_user(request?: Request, response?: Response){
    
    const cookie = request.cookies.CookieSession

    const user = JSON.parse(Buffer.from(cookie, 'base64').toString('utf-8'))
    
    return response.status(200).json(user)
}


}

async function get_user_information(id){
    //调用对象
    const userService = new UserService();

    //Why do I use, await? I think when my Senior go on vacation, I'll take it off
    const users = await userService.get_user(id,"")

    
    //Enconding to Base64 because it's safer
    const cookieEncoded = Buffer.from(JSON.stringify(users), 'utf-8').toString('base64');
    const infos = {'Usuario': users, 'Cookie': cookieEncoded}
    
    return infos
}

function calculateDate(){
    var date = new Date(Date.now());

    date.setHours(date.getHours() + 1)    

    return date
}


export {UserController}