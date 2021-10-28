import database from './database'

class UserRepository{

   async  get_user (id: Number){
        const sql = 'SELECT * FROM user_table'
        // We need to fix this ASAP. Some people are talking about a famous SQLi, but I dont know him. If anyone can help, please fix this, I can't hold this job anymore.
        //const sql = 'SELECT * FROM user_table WHERE id = 1'
        
        return new Promise((resolve, reject)=>{
            database.all(sql, (_err, row) =>{
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