const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../config/db');
const fs = require('fs');


exports.register = (req, res, next) => {
    req.body.userRegister.email = req.body.userRegister.email.toLowerCase();
    
    const firstName = req.body.userRegister.firstName
    const firstNameUpper = req.body.userRegister.firstName.charAt(0).toUpperCase() + firstName.slice(1);

    const lastName = req.body.userRegister.lastName
    const lastNameUpper = req.body.userRegister.lastName.charAt(0).toUpperCase() + lastName.slice(1);

    bcrypt.hash(req.body.userRegister.password, 15)
        .then(hash => {
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            db.query(
                `INSERT INTO user (nom, prenom, email, password, updateAt, createdAt, privilege) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [lastNameUpper, firstNameUpper, req.body.userRegister.email, hash, date, date, 0],
                function (err, result) {
                    if (err) {
                        return res.status(400).json({ message: "L'email est déjà enregistré" })
                    }
                    else {
                        return res.status(200).json({message: "Compte crée"})
                    }
                })


        })
        .catch((err) => res.status(400).json(err))

}

exports.login = (req, res, next) => {
    req.body.user.email = req.body.user.email.toLowerCase();

    db.query("SELECT * FROM user WHERE email = '" + req.body.user.email + "'",

        function (err, result) {
            if (err) {
                return res.status(400).json({ message: "Aucun email n'a été trouvé" })
            }

            else {
                const user = result[0];
                if (user == null) {
                    return res.status(400).json({ message: "Aucun email n'a été trouvé" })
                }
                else if (req.body.user.email == user.email) {
                    bcrypt.compare(req.body.user.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(400).json({ message: "Le mot de passe ne correspond pas." })
                            }
                            else {
                                const token = jwt.sign(
                                    {
                                        userId: user.id,
                                        privilege: user.privilege
                                    },
                                    process.env.SECRET_TOKEN,
                                    { expiresIn: '24h' }
                                )
                                userData = {
                                    "token": token,
                                    "id": user.id,
                                    "priv": user.privilege
                                }
                                res.status(200).json(userData);
                            }
                        })
                        .catch(err => {
                        })
                }

                else {
                    return res.status(500).json({ message: "un problème est survenu" })
                }

            }
        })
}

exports.getProfil = (req, res, next) => {

    const userId = res.locals.decodedToken.userId;

    db.query(`SELECT * FROM user WHERE id = ?`,
        [userId],
        function (err, result) {
            if (err) { throw err }
            else {
                res.status(200).json(result)
            }
        })

}

//MODIFICATION D'UN USER
exports.modifyProfil = (req, res, next) => {

    const userId = res.locals.decodedToken.userId;

    let { body, file } = req

    if (file == undefined) {
        db.query(`UPDATE user SET avatar_path = ? WHERE id = ?`, [imageDest, userId],
            function (err, result) {
                if (err) {

                }
                else {
                    res.status(200).json({ message: "Le profil à bien été modifier" })
                }
            })
    }
    else {

        const imageDest = `${req.protocol}://${req.get('host')}/images/picture-profil/${req.file.filename}`;
        db.query(`UPDATE user SET avatar_path = ? WHERE id = ?`, [imageDest, userId],
            function (err, result) {
                if (err) {
                    throw err
                }
                else {
                    res.status(200).json({ message: "Le profil à bien été modifier" })
                }
            })
    }

}

exports.deleteUser = (req, res, next) => {
    const userId = res.locals.decodedToken.userId;
    db.query('SELECT * FROM user WHERE id = ?', [userId],
        function (err, result) {
            if (result[0].avatar_path == null) {
                db.query(`DELETE FROM user WHERE id= ?`,
                    [userId],
                    function (err, result) {
                        if (err) {
                            throw err
                        }
                        else {
                            res.status(200).json({ message: "Le profil à bien été supprimé" })
                        }
                    }
                )
            }
            else {
                const filename = result[0].avatar_path.split('/picture-profil/')[1];
                fs.unlink(`images/picture-profil/${filename}`, (err) => {
                    if (err) {
                    }
                    else {
                        db.query(`DELETE user FROM user WHERE id= ?`,
                            [userId],
                            function (err, result) {
                                if (err) {
                                    throw err
                                }
                                else {
                                    res.status(200).json({ message: "Le profil à bien été supprimé" })
                                }
                            })
                    }
                })
            }
        }
    )
}