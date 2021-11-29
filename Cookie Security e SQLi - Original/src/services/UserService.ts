import { UserRepository}   from "../repositories/UserRepository";
import { IUser } from "../interfaces/UserInterface";

class UserService {


    // I know there is some ways to put the type of variable, but how?
    // Además, si descomenta esta parte de Promise, mi código deja de funcionar
    async get_user(id, token?): Promise<IUser>{   

        //My senior said to me, that I need to do some validations. I think I should go to the market check the products validations.
        
        const userRepository = new UserRepository()
        
        const user : IUser = await userRepository.get_user_by_id(id)

        return user

    }

    async validate_user(user, pass){
        const userRepository = new UserRepository();

        //Look for user by email
        const user_check : IUser = await userRepository.get_user_by_email(user)

        //My validation is the best!!
        if(user_check != undefined){
            return user_check
        }else{
            return undefined
        }
    }
}

export { UserService }