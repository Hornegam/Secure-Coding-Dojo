import  sqlite3 from 'sqlite3';

//I copied from somewhere over the internet, I dont know what I am doing. I hope my Senior never see or code review this code.

const DBSOURCE = 'db.sqlite'

                const database = new sqlite3.Database(DBSOURCE, (err) => {
                    if (err) {
                        console.error(err.message)
                        throw err
                    }
                })

export default database