const db = require('./../config/db');
const jwt = require('jsonwebtoken');

exports.addLike = (req, res, next) => {
    const userId = res.locals.decodedToken.userId
    console.log(userId)
    const post_id = req.params.id
    db.query('SELECT * FROM likes where userId = ? AND postId = ?', [userId, post_id], function (err, result, field) {
        if (result[0] == null) {
            db.query('INSERT INTO likes (likes, userId, postId) VALUES (?, ?, ?)', [1, userId, post_id],
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
            db.query('DELETE FROM likes WHERE userId = ? AND postId = ?', [userId, post_id],
                function (err, result) {
                    if (err) throw err
                    console.log("Le like a été retiré")
                }
            )
        }


        /**/
    })
}

