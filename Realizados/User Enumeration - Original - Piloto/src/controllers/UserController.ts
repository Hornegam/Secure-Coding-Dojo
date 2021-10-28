import { Request, Response } from "express";


class UserController {

    async get_user(request: Request, response: Response) {
        const { id } = request.params;
        const token = request.headers["token"];

        const users = users_informations()
        const user = users.filter(user => user.id == Number(id))
        if (user.length == 0){
            return response.status(401).json({ error: "An error appears" })
        }
        if (user[0].token != token) {
            return response.status(401).json({ error: "An error appears" })
        }

        return response.status(200).json({
            id: user[0].id,
            name: user[0].name,
            age: user[0].age,
            "Credit-Card": "**** **** **** "+ String(user[0]["Credit-Card"]).substr(15,4)

        });
    }

}


function users_informations() {

    var user_list = [
        {
            "id": 11,
            "name": "Roberto",
            "age": "31",
            "Credit-Card": "2131 1231 3123 3213",
            "CVV": "132",
            "token": "12345678"
        },
        {
            "id": 2,
            "name": "Chuck Norris",
            "age": "65",
            "Credit-Card": "1919 1231 3123 3213",
            "CVV": "132",
            "token": "87612365"
        },
        {
            "id": 3,
            "name": "Silvio Santos",
            "age": "+99",
            "Credit-Card": "2929 1231 3123 3213",
            "CVV": "132",
            "token": "87645123"
        },
        {
            "id": 4,
            "name": "Gustavo",
            "age": "18",
            "Credit-Card": "3939 1231 3123 3213",
            "CVV": "132",
            "token": "87612345"
        },
        {
            "id": 5,
            "name": "Josué",
            "age": "22",
            "Credit-Card": "3939 1231 3123 3213",
            "CVV": "132",
            "token": "12387645"
        },
        {
            "id": 6,
            "name": "Almirando",
            "age": "35",
            "Credit-Card": "0493 1231 3123 3213",
            "CVV": "132",
            "token": "87654321"
        },
        {
            "id": 11,
            "name": "Roberto",
            "age": "31",
            "Credit-Card": "2131 1231 3123 3213",
            "CVV": "132",
            "token": "12345678"
        }
    ]

    return user_list;
}


export { UserController }