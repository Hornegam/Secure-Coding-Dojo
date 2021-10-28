import { UserRepository}   from "../repositories/UserRepository";

class UserService {


    // I know there is some ways to put the type of variable, but how?
    async get_user(id, token?){   

        //My senior said to me, that I need to do some validations. I think I should go to the market check the products validations.

        const userRepository = new UserRepository()

        const user = await userRepository.get_user(id)
        //validar se o id do user possui o mesmo token do user
        if(user[0].id === id && user[0].token === token) {
            return user;
        }   

        return false;
    }
}

export { UserService }