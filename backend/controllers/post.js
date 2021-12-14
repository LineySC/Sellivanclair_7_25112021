const mysql = require('mysql');
const db = require('./../config/db');
const jwt = require('jsonwebtoken');
const fs = require('fs')


/**
*      EXPORTATION
**/

//Tous les posts
exports.getAllPosts = (req, res, next) => {
    db.query(`SELECT * FROM user INNER JOIN post ON user.id = post.auteur;`, function (err, result) {
        if (err) throw err;
        else {
            res.status(200).json(result)
        }
    })
}

//Creation de post
exports.createPost = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    let { body, file } = req;

    const imageDest = `${ req.protocol }://${req.get('host')}/images/feed/${req.file.filename}`
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    db.query(`INSERT INTO post (message, auteur, date, image_path) VALUES ('${body.postMessage}', '${userId}', '${date}', '${imageDest}' )`, function (err, result) {
        if (err) throw err;
    })
}

//Delete Post
exports.deletePost = (req, res, next) => {
    db.query(`DELETE INTO post WHERE id = ${req.body.postId}`, function (err, result) {
        if (err) throw err;
    })
}