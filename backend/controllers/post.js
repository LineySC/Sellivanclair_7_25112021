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


    const userId = res.locals.decodedToken.userId;

    let { body, file } = req;
    console.log(req.body.postMessage)
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (file == undefined) {
        db.query(`INSERT INTO post (message, auteur, date) VALUES ( ?, ? , ?)`,
            [body.postMessage, userId, date],
            function (err, result) {
                if (err) throw err;
            })
    }
    else {
        const imageDest = `${req.protocol}://${req.get('host')}/images/feed/${req.file.filename}`;
        db.query(`INSERT INTO post (message, auteur, date, image_path) VALUES (?, ?, ?, ?)`,
            [body.postMessage, userId, date, imageDest],
            function (err, result) {
                if (err) throw err;
            })
    }

}

//Delete Post
exports.deletePost = (req, res, next) => {
    db.query(`DELETE FROM post WHERE post_id = ?`,
        [req.params.id],
        function (err, result) {
            if (err) throw err;
            else {
                return res.status(200)
            }
        })
}