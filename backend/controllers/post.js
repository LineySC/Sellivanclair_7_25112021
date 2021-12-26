const mysql = require('mysql');
const db = require('./../config/db');
const jwt = require('jsonwebtoken');
const fs = require('fs')


/**
*      EXPORTATION
**/

//Tous les posts
exports.getAllPosts = (req, res, next) => {
    db.query(`SELECT * FROM user INNER JOIN post ON user.id = post.userId LEFT JOIN likes ON post.post_id = likes.postId `, function (err, result) {
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
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (file == undefined) {
        db.query(`INSERT INTO post (message, userId, date) VALUES ( ?, ? , ?)`,
            [body.postMessage, userId, date],
            function (err, result) {
                if (err) throw err;
            })
    }
    else {
        const imageDest = `${req.protocol}://${req.get('host')}/images/feed/${req.file.filename}`;
        db.query(`INSERT INTO post (message, userId, date, image_path) VALUES (?, ?, ?, ?)`,
            [body.postMessage, userId, date, imageDest],
            function (err, result) {
                if (err) throw err;
            })
    }

}

//Delete Post
exports.deletePost = (req, res, next) => {

    const userPriv = res.locals.decodedToken.privilege
    const userId = res.locals.decodedToken.userId

    db.query('SELECT * FROM post WHERE post_id = ?', [req.body.params.postId],
        function(err, result){
            if(err) throw err;
            else{
                const filename = result[0].image_path.split('/feed/')[1];
                fs.unlink(`images/feed/${filename}`, (err) => {
                    if(err) throw err
                    else{
                        if(userPriv === 1){
                            db.query(`DELETE FROM post WHERE post_id = ?`,
                            [req.body.params.postId],
                            function (err, result) {
                                if (err) throw err;
                                else {
                                    return res.status(200)
                                }
                            })
                    
                        }
                        else if(req.body.params.user == userId){
                            db.query(`DELETE FROM post WHERE post_id = ?`,
                            [req.body.params.postId],
                            function (err, result) {
                                if (err) throw err;
                                else {
                                    return res.status(200)
                                }
                            })
                        }
                        else{
                            res.status(401).json({message: "Vous n'est pas autorisé a faire ceci"})
                        }
                    }
                })
            }
        }
    )
}