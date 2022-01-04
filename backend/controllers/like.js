const db = require('./../config/db');
const jwt = require('jsonwebtoken');

exports.addLike = (req, res, next) => {
    const userId = res.locals.decodedToken.userId
    const post_id = req.params.id
    db.query('SELECT * FROM likes where userPostId = ? AND postId = ?',
        [userId, post_id],
        function (err, result, field) {
            console.log(result)
            if (result[0] == null) {
                db.query('INSERT INTO likes (likes, userPostId, postId) VALUES (?, ?, ?)', [1, userId, post_id],
                    function (err, result) {
                        if (err) throw err
                        else {
                            console.log("Le like à été ajouté")
                            res.status(200)
                        }
                    }
                )
            }
            else {
                db.query('DELETE FROM likes WHERE userPostId = ? AND postId = ?', [userId, post_id],
                    function (err, result) {
                        if (err) throw err
                        console.log("Le like a été retiré")
                    }
                )
            }
        })
}

exports.getLike = (req, res, next) => {
    db.query('SELECT * FROM likes', function (err, result) {
        if(err) throw err
        else{
            res.status(200).json(result)
            console.log(result)
        }
    })
}

