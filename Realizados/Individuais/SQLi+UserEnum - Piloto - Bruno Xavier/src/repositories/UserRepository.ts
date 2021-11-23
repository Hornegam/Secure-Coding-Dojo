import database from './database'
import {IUserRepository} from './interfaces/IUserRepository';
export class UserRepository implements IUserRepository{
    //returns only one user stored in the database
    async  get_user (id: Number): Promise<IUserRepository>{
        const sql = `SELECT * FROM user_table where id = ${id}`
        // We need to fix this ASAP. Some people are talking about a famous SQLi, but I dont know him. If anyone can help, please fix this, I can't hold this job anymore.
        return new Promise((resolve, reject)=>{
            database.get(sql, (_err, row) =>{
                if(_err){
                    reject(_err);
                }
                resolve(row);
            })
        })
    }
    
    // returns all users saved in the database
    // async  get_allusers (){
    //     const sql = `SELECT * FROM user_table`
    //     return new Promise((resolve, reject)=>{
    //         database.all(sql, (_err, row) =>{
    //             if(row){
    //                 resolve(row);
    //             }else{
    //                 reject(_err)
    //             }
    //         })
    //     })
    // }
}