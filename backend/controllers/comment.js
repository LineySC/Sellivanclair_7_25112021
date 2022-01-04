const db = require('./../config/db');

exports.postCommment = (req, res, next) => {
    const userId = res.locals.decodedToken.userId

    let {body} = req
    console.log(body.comment.commentMessage)
    
    db.query('INSERT INTO comment (commentMessage, userId, postId) VALUE (?, ?, ?)',
        [body.comment.commentMessage, userId, body.comment.postId], 
        function(err, result) {
            if(err) throw err;
            else(console.log("good"))
        }
    )
}

exports.getComment = (req, res, next) => {
    
}

exports.deleteComment = (req, res, next) => {
    
}