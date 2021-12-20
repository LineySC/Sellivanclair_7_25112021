const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../config/db');
const { fs } = require('fs');


exports.register = (req, res, next) => {

    req.body.userRegister.email = req.body.userRegister.email.toLowerCase();

    bcrypt.hash(req.body.userRegister.password, 15)
        .then(hash => {
            imageDest = `${req.protocol}://${req.get('host')}/images/picture-profil/avatar.png`;
            db.query(
                `INSERT INTO user (nom, prenom, email, password, avatar_path) VALUES ('${req.body.userRegister.lastName}', '${req.body.userRegister.firstName}', '${req.body.userRegister.email}', '${hash}', '${imageDest}')`, function (err, result){
                    if(err) {res.status(400).json({message: "L'adresse e-mail est déjà enrégistrée"})}
                })
            
        })
        .catch((err) => res.status(400).json(err))

}

exports.login = (req, res, next) => {
    req.body.user.email = req.body.user.email.toLowerCase();

    db.query(`SELECT * FROM user WHERE email = '${req.body.user.email}'`, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Aucun e-mail n'a été trouvé" })
        }
        else if (req.body.user.email == undefined){
            return res.status(400).json({ message: "Aucun e-mail n'a été trouvé" })
        }
        else {
            console.log(req.body.user.email)
            const user = result[0];
            if(req.body.user.email == user.email){
                bcrypt.compare(req.body.user.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(400).json({ message: "Le mots de passe ne correspond pas" })
                        }
                        else {
                            const maxAge = 60 * 60 * 24;
                            const token = jwt.sign(
                                { userId: user.id },
                                process.env.SECRET_TOKEN,
                                { expiresIn: '24h' }
                            )
                            userData = {
                                "token": token,
                                "id": user.id,
                                "priv":user.privilege
                            }
                            res.status(200).json(userData);
                        }
                    })
                    .catch(err => {
                        return res.status(400).json({ message: "Aucun e-mail n'a été trouvé" })
                    })
            }

            else {
                return res.status(400).json({ message: "Aucun e-mail n'a été trouvé" })
            }

        }
    })
}

exports.getProfil = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    db.query(`SELECT * FROM user WHERE id = ${userId}`, function (err, result) {
        if (err) { throw err }
        else {
            console.log(result)
            res.status(200).json(result)
        }
    })

}

//MODIFICATION D'UN USER
exports.modifyProfil = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const { file } = req;
    console.log(req.file.filename)
    const imageDest = `${req.protocol}://${req.get('host')}/images/picture-profil/${req.file.filename}`;
    db.query(`UPDATE user SET avatar_path = '${imageDest}' WHERE id = ${userId}`, function (err, result) {
        if (err) { throw err }
        else {
            res.status(200).json({ message: "Le profil à bien été modifier" })
        }
    })
}

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    console.log(userId)
    db.query(`DELETE user FROM user LEFT JOIN post ON auteur = '${userId}' WHERE id='${userId}'`, function (err, result) {
        if (err) {
            throw err
        }
        else {
            res.status(200).json({ message: "Le profil à bien été supprimé" })
        }
    })
}