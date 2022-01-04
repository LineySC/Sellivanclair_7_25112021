const moment = require('moment');
const db = require('./../config/db');

const fs = require('fs')


/**
*      EXPORTATION
**/

//Tous les posts
exports.getAllPosts = (req, res, next) => {
    db.query(/*`SELECT * FROM user INNER JOIN post ON user.id = post.userId LEFT JOIN likes ON post.post_id = likes.postId `*/
        'SELECT * FROM user INNER JOIN post ON user.id = post.user_id', function (err, result) {
            if (err) {
                return res.status(400).json({ message: 'Impossible de récupéré les données' })
            }
            else {
                res.status(200).json(result)
            }
        })
}

//Creation de post
exports.createPost = (req, res, next) => {
    console.log(moment().locale('fr').format('D MMMM YYYY HH:mm:ss', "Europs/Paris"))
    const userId = res.locals.decodedToken.userId;
    let { body, file } = req;
    const date = moment().locale('fr').format('D MMMM YYYY HH:mm', "Europs/Paris");
    if (file == undefined) {
        db.query(`INSERT INTO post (message, user_id, postCreatedAt) VALUES ( ?, ?, ? )`,
            [body.postMessage, userId, date],
            function (err, result, fields) {
                if (err) {
                    console.error("error")
                    res.status(500).json({ message: "Un problème est servenu" })
                    throw err
                }
                else {
                    res.status(200)
                }
            }
        )
    }
    else {
        const imageDest = `${req.protocol}://${req.get('host')}/images/feed/${req.file.filename}`;
        db.query(`INSERT INTO post (message, user_id, postCreatedAt, image_path) VALUES (?, ?, ?, ?)`,
            [body.postMessage, userId, date, imageDest],
            function (err, result) {
                if (err) throw err;
                else {
                    res.status(200)
                }
            })
    }

}

//Delete Post
exports.deletePost = (req, res, next) => {

    const userPriv = res.locals.decodedToken.privilege
    const userId = res.locals.decodedToken.userId
    db.query('SELECT * FROM post WHERE id = ?', [req.body.params.postId],
        function (err, result) {
            if (err) {
                res.status(500).json({ message: "Un probleme est survenue" }) // PROBLEME SUPPRESSION 
                console.log(result)
            }

            else if (result[0].image_path == null) { // Pas d'image
                if (err) {
                    res.status(500).json({ message: "Un probleme est survenue" } + console.log("erreur"))
                }
                else if (userPriv === 1) {
                    const postId = req.body.params.postId
                    db.query(`DELETE FROM post where id = ?`,
                        [postId],
                        function (err, result) {
                            if (err) {
                                return res.status(500).json({ message: "Une erreur est survenu" })

                            }
                            else {
                                return res.status(200)
                            }
                        })

                }
                else if (req.body.params.user == userId) {
                    const postId = req.body.params.postId
                    db.query(`DELETE FROM post where id = ?`,
                        [postId],
                        function (err, result, fields) {
                            if (err) {
                                return res.status(500).json({ message: "Une erreur est survenu" })
                            }
                            else {
                                return res.status(200)
                            }
                        })
                }
                else {
                    res.status(401).json({ message: "Vous n'est pas autorisé a faire ceci" })
                }
            }
            else { // Image
                const filename = result[0].image_path.split('/feed/')[1];
                fs.unlink(`images/feed/${filename}`, (err) => {
                    if (err) {
                        return res.status(500).json({ message: "Une erreur est survenu" } + console.log("pas de fichier"))
                    }

                    else {
                        if (userPriv === 1) {
                            const postId = req.body.params.postId
                            db.query(`DELETE FROM post where id = ?`,
                                [postId],
                                function (err, result) {
                                    if (err) {
                                        return res.status(500).json({ message: "Une erreur est survenu" })
                                    }
                                    else {
                                        return res.status(200)
                                    }
                                })

                        }
                        else if (req.body.params.user == userId) {
                            const postId = req.body.params.postId
                            db.query(`DELETE FROM post where id = ?`,
                                [postId],
                                function (err, result) {
                                    if (err) {
                                        return res.status(500).json({ message: "Une erreur est survenu" })
                                    }
                                    else {
                                        return res.status(200)
                                    }
                                })
                        }
                        else {
                            res.status(401).json({ message: "Vous n'est pas autorisé a faire ceci" })
                        }
                    }
                })
            }
        }
    )
}