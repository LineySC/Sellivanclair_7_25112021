const mySQL = require('mysql');
const bcrypt= require('bcrypt');

const mysql = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "LmKES8612aZ*",
    database: "p7"
});

mysql.connect(function(err){
    if(err) {
        throw err
    }
    else{
        console.log("Connected as id " + log.threadId)
    }
    const sql = "INSERT INTO user (nom, prenom, email) VALUES ('Moreau', 'Morgane', 'tahwiza331@gmail.com');";
        mysql.query(sql, function(err, result) {
            if(err){
                throw err
            }
            console.log('Add succefully')
        })
});

module.exports = User;
