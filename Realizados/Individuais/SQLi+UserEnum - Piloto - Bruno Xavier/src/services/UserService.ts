import { IMessagin } from './../utils/interfaces/Imessaging';
import { IUserRepository } from 'src/repositories/interfaces/IUserRepository';
export class UserService {
    private user: any;
    constructor(private readonly message: IMessagin, private readonly Irepository: IUserRepository){}
    // I know there is some ways to put the type of variable, but how?
    async get_user(id: any, token: any){
        //My senior said to me, that I need to do some validations. I think I should go to the market check the products validations.
        try {
            if(isNaN(id)) throw this.message.sendMessage("invalid id send type in parameter",400);
            this.user = await this.Irepository.get_user(id);
            if(this.user){
                //validar se o id do user possui o mesmo token do user
                if(this.user.token != token) throw this.message.sendMessage("id or token is not invalid",406)
                return this.user;    
            }
            throw this.message.sendMessage("user not found",404);
        } catch (err) {
            return err;
        }
    }
}