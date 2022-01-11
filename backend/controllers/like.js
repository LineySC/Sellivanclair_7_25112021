const db = require('./../config/db');
const jwt = require('jsonwebtoken');

exports.addLike = (req, res, next) => {
    const userId = res.locals.decodedToken.userId
    const post_id = req.params.id
    db.query('SELECT * FROM likes where userPostId = ? AND postId = ?',
        [userId, post_id],
        function (err, result, field) {
            if(err){
                res.status(500).json({error: "Un problème est survenue "})
            }
            else if (result[0] == null) {
                db.query('INSERT INTO likes (likes, userPostId, postId) VALUES (?, ?, ?)', [1, userId, post_id],
                    function (err, result) {
                        if (err) {
                            res.status(400).json({ error: "Impossible de liker " })
                        }
                        else {
                            res.status(200)
                        }
                    }
                )
            }
            else {
                db.query('DELETE FROM likes WHERE userPostId = ? AND postId = ?', [userId, post_id],
                    function (err, result) {
                        if (err) {
                            res.status(400).json({ error: "Impossible de supprimé le like " })
                        }
                    }
                )
            }
        })
}

exports.getLike = (req, res, next) => {
    db.query('SELECT * FROM likes', function (err, result) {
        if (err) {
            res.status(400).json({ error: "Impossible de récupéré les likes " })
        }
        else {
            res.status(200).json(result)
        }
    })
}

