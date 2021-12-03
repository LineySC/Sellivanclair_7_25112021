const mysql = require('mysql');
const db = require('./../config/db');

/**
*      EXPORTATION
**/

//Tous les posts
exports.getAllPosts = (req, res, next) => {
    db.query(`SELECT * FROM post`, function(err, result) {
        if(err) throw err;
        else{
            res.status(200).json(result)
            console.log(req.body.userId)
        }
    })

    console.log(req.headers.cookie)
}

exports.createPost = (req, res, next) => {
    db.query(`INSERT INTO post (message, auteur, date) VALUES ('${req.body.message}', '${req.body._id}', '${Date.now}')`, function(err, result) {
        if(err) throw err;
        else{
            console.log(result)
        }
    })
}