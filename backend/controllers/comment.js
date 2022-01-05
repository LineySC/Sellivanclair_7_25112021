const db = require('./../config/db');
const moment = require('moment');

exports.postCommment = (req, res, next) => {
    const userId = res.locals.decodedToken.userId

    let { body } = req
    const date = moment().locale('fr').format('D MMMM YYYY HH:mm', "Europs/Paris");
    db.query('INSERT INTO comment (commentMessage, user_id, post_id, commentCreateAt) VALUE (?, ?, ?, ?)',
        [body.comment.commentMessage, userId, body.comment.postId, date],
        function (err, result) {
            if (err) throw err;
        }
    )
}

exports.getComment = (req, res, next) => {

    const postId = req.params.id
    db.query('SELECT * FROM comment JOIN user ON user.id = comment.user_id WHERE comment.post_id = ?  ',
        [postId],
        function (err, result) {
            if (err) throw err
            else {
                res.status(200).json(result)
            }
        })
}

exports.deleteComment = (req, res, next) => {
    const user_id = res.locals.decodedToken.userId;
    const priv = res.locals.decodedToken.privilege
    const { params } = req.body

    db.query('SELECT * FROM comment WHERE user_id = ? AND commentId = ?',
        [user_id, params.commentId],
        (err, result) => {
            const data = result[0]
            if (err) throw err
            else if (priv == 1) {
                db.query('DELETE FROM comment WHERE commentId = ? AND post_id = ?',
                    [params.commentId, params.post_id], (err) => {
                        if (err) throw err
                    })
            }
            else if (data.user_id == user_id) {
                db.query('DELETE FROM comment WHERE commentId = ? AND post_id = ?',
                    [params.commentId, params.post_id], (err) => {
                        if (err) throw err
                    })
            }
            else {
                res.status(401).json({ message: "Vous n'est pas autorisé à faire ceci" })
            }
        })

}