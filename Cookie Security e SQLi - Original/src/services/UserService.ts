import { UserRepository}   from "../repositories/UserRepository";
import { IUser } from "../interfaces/UserInterface";

class UserService {


    // I know there is some ways to put the type of variable, but how?
    // Además, si descomenta esta parte de Promise, mi código deja de funcionar
    async get_user(id, token?): Promise<IUser>{   

        //My senior said to me, that I need to do some validations. I think I should go to the market check the products validations.
        
        const userRepository = new UserRepository()
        
        const user = await userRepository.get_user(id)
        
        const User : IUser = {
            id: user.id,
            name: user.name,
            age: user.age,
            creditCard: user.CreditCard,
            cvv: user.CVV,
            token: user.token,
        }

        return User

    }
}

export { UserService }