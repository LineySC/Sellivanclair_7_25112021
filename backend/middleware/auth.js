const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (!token) {
        return res.status(403).send("Un token est requis pour l'authentification")
    }

    try {
        if (req.body.userId && req.body.userId !== userId) { // On indique si l'id est le même => false = Id non valide
            console.log("Pas bon")
            return res.send("Id est pas la meme")
        }

        else {
            res.locals.decodedToken = decodedToken;
            next();
        }
    }

    catch (err) { (err) => res.status(400).json(err) }
}