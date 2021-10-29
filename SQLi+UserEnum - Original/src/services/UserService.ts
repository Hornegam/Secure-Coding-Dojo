import { UserRepository}   from "../repositories/UserRepository";

class UserService {

    // I know there is some ways to put the type of variable, but how?
    async get_user(id, token?: string){
        
        if(isNaN(id)) {
            return [];
        }

        //My senior said to me, that I need to do some validations. I think I should go to the market check the products validations.
        const userRepository = new UserRepository();

        const user:any = await userRepository.get_user(id);

        if(user[0].token === Number(token)) {
            return user;
        }
        
        return [];
    }
}

export { UserService }