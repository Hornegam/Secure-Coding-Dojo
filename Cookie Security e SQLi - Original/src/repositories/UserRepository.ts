import database from './database'
import { IUser } from "../interfaces/UserInterface"

class UserRepository{

   async  get_user_by_id (id){
        // We need to fix this ASAP. Some people are talking about a famous SQLi, but I dont know him. If anyone can help, please fix this, I can't hold this job anymore.
        const sql = 'SELECT * FROM user_table WHERE id = ' + id.id 
        
        return new Promise<IUser>((resolve, reject)=>{
                database.get(sql, (_err, row) =>{
                    if(_err){
                        reject(_err)
                    }else{
                        resolve(row)
                    }
            })
        })
    }

    async  get_user_by_email (email){
        // We need to fix this ASAP. Some people are talking about a famous SQLi, but I dont know him. If anyone can help, please fix this, I can't hold this job anymore.
        const sql = 'SELECT * FROM user_table WHERE email = "' + email + '"'

        return new Promise<IUser>((resolve, reject)=>{
                database.get(sql, (_err, row) =>{
                    if(_err){
                        reject(_err)
                    }else{
                        resolve(row)
                    }
            })
        })
    }


}
    




export { UserRepository }