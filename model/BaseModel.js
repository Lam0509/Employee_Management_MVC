const DBConnection = require('../database/DBConnect')

class BaseModel {
    querySQL(sql){
        return new Promise((resolve, reject) => {
            DBConnection.query(sql, (err, result) =>{
                if (err){
                    reject(err);
                }
                resolve(result);
            })
        })
    }
}

module.exports = BaseModel;