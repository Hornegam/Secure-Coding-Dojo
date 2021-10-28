import { Request, Response } from "express";


class UserController{

async get_user(request: Request, response: Response){
    const id: {id} = request.params;

    const user = users_informations()

    return response.status(200).json(user); 
}



}



function users_informations(){

    var user_list = [
        {
            "id":1,
            "name":"Roberto",
            "age":"31",
            "Credit-Card":"2131 1231 3123 3213",
            "CVV":"132",
            "token":"12345678"
        },
        { 
            "id":2,
            "name":"Chuck Norris",
            "age":"65",
            "Credit-Card":"1919 1231 3123 3213",
            "CVV":"132",
            "token":"87612365"
        },
        { 
            "id":3,
            "name":"Silvio Santos",
            "age":"+99",
            "Credit-Card":"2929 1231 3123 3213",
            "CVV":"132",
            "token":"87645123"
        },
        { 
            "id":4,
            "name":"Gustavo",
            "age":"18",
            "Credit-Card":"3939 1231 3123 3213",
            "CVV":"132",
            "token":"87612345"
        },
        { 
            "id":5,
            "name":"Josué",
            "age":"22",
            "Credit-Card":"3939 1231 3123 3213",
            "CVV":"132",
            "token":"12387645"
        },
        { 
            "id":6,
            "name":"Almirando",
            "age":"35",
            "Credit-Card":"0493 1231 3123 3213",
            "CVV":"132",
            "token":"87654321"
        }
    ]

    return user_list;
}


export {UserController}