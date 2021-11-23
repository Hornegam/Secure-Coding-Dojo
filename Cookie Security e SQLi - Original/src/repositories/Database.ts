import  sqlite3 from 'sqlite3';

//I copied from somewhere over the internet, I dont know what I am doing. I hope my Senior never see or code review this code.

const DBSOURCE = 'db.sqlite'

const SQL_USER = `CREATE TABLE user_table(
                    id          INTEGER  NOT NULL PRIMARY KEY 
                    ,name        VARCHAR(13) NOT NULL
                    ,age         INTEGER  NOT NULL
                    ,CreditCard  VARCHAR(19) NOT NULL
                    ,CVV         INTEGER  NOT NULL
                    ,token       INTEGER  NOT NULL
                );
                `
const SQL_PASS = ` CREATE TABLE admin_user_table(
                        id INTEGER NOT NULL,
                        password VARCHAR(8) NOT NULL,
                        tip VARCHAR(64)
                    );
                `

                const database = new sqlite3.Database(DBSOURCE, (err) => {
                    if (err) {
                        console.error(err.message)
                        throw err
                    } else {
                        
                        database.run(SQL_USER, (err) => {
                            if (err) {
                                // Possivelmente a tabela já foi criada
                            } else {
                                
                            }
                        })

                        database.run(SQL_PASS, (err) => {
                            if (err) {
                                // Possivelmente a tabela já foi criada
                            } else {
                                
                            }
                        })
                    }
                })

export default database