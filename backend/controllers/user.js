const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../config/db');
const fs = require('fs');

// Inscription
exports.register = (req, res, next) => {
    req.body.userRegister.email = req.body.userRegister.email.toLowerCase();

    //First Lettre upperCase
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
                function (err) {
                    if (err) {
                        return res.status(400).json({ message: "L'email est déjà enregistré" })
                    }
                    else {
                        return res.status(200).json({ message: "Compte crée" })
                    }
                })
        })
        .catch((err) => res.status(400).json(err))

}

//Connexion

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
                            res.status(500).json({ message: "Un problème est survenu" })
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
            if (err) {
                res.status(400).json({ message: "Impossible de récupéré les utilisateur " })
            }
            else {
                res.status(200).json(result)
            }
        })

}

//MODIFICATION D'UN USER
exports.modifyProfil = (req, res, next) => {

    const userId = res.locals.decodedToken.userId;

    let { body, file } = req
    body.emailModified = body.emailModified.toLowerCase();

    if (file == undefined) {
        if (body.passwordModified !== '' && body.emailModified !== '') {
            bcrypt.hash(body.passwordModified, 15)
                .then((hash) => {
                    db.query('UPDATE user SET email = ?, password = ? WHERE id = ?',
                        [body.emailModified, hash, userId],
                        (err) => {
                            if (err) {
                                res.status(400).json({ error: "Impossible de modifier le profil " })
                            }
                            else {
                                res.status(200).json({ message: 'Le profil à bien été mise à jour' })
                            }
                        })
                })
        }
        else if (body.emailModified !== '') {
            db.query('UPDATE user set email = ? WHERE id = ?',
                [body.emailModified, userId],
                (err) => {
                    if (err) {
                        res.status(400).json({ error: "Impossible de modifier le profil " })
                    }
                    else {
                        res.status(200).json({ message: 'Le profil a bien été modifier' })

                    }
                })
        }
        else if (body.passwordModified !== '') {
            bcrypt.hash(body.passwordModified, 15)
                .then((hash) => {
                    db.query('UPDATE user SET password = ? WHERE id = ?',
                        [hash, userId],
                        (err) => {
                            if (err) {
                                res.status(400).json({ error: "Impossible de modifier le profil " })
                            }
                        })
                })
                .catch((err) => {
                    res.status(400).json({ error: "Impossible de modifier le profil " })
                })
        }
    }
    else if (file !== undefined) {
        db.query('SELECT * FROM user WHERE id = ? ',
            [userId],
            (err, result) => {
                if (err) {
                    res.status(400).json({ error: "Impossible de modifier le profil " })
                }
                else if (result[0].avatar_path !== null) {
                    const filename = result[0].avatar_path.split('/picture-profil/')[1];
                    fs.unlink(`images/picture-profil/${filename}`, (err) => {
                        if (err) {
                            res.status(400).json({ error: "Impossible de modifier le profil " })
                        }
                        else {
                            const imageDest = `${req.protocol}://${req.get('host')}/images/picture-profil/${req.file.filename}`;
                            db.query('UPDATE user SET avatar_path = ? WHERE id = ?',
                                [imageDest, userId],
                                (err) => {
                                    if (err) {
                                        res.status(400).json({ error: "Impossible de modifier le profil " })
                                    }
                                });

                            if (body.passwordModified !== '' && body.emailModified !== '') {
                                bcrypt.hash(body.passwordModified, 15)
                                    .then((hash) => {
                                        db.query('UPDATE user SET email = ?, password = ? WHERE id = ?',
                                            [body.emailModified, hash, userId],
                                            (err) => {
                                                if (err) {
                                                    res.status(400).json({ error: "Impossible de modifier le profil " })
                                                }
                                                else {
                                                    res.status(200).json({ message: 'Le profil à bien été mise à jour' })
                                                }
                                            })
                                    })
                            }
                            else if (body.emailModified !== '') {
                                db.query('UPDATE user set email = ? WHERE id = ?',
                                    [body.emailModified, userId],
                                    (err) => {
                                        if (err) {
                                            res.status(400).json({ error: "Impossible de modifier le profil " })
                                        }
                                        else {
                                            res.status(200).json({ message: 'Le profil a bien été modifier' })
                                        }
                                    })
                            }
                            else if (body.passwordModified !== '') {
                                bcrypt.hash(body.passwordModified, 15)
                                    .then((hash) => {
                                        db.query('UPDATE user SET password = ? WHERE id = ?',
                                            [hash, userId],
                                            (err, result) => {
                                                if (err) {
                                                    res.status(400).json({ error: "Impossible de modifier le profil " })
                                                }
                                                else {
                                                    res.status(200)
                                                }
                                            })
                                    })
                                    .catch((err) => {
                                        res.status(400).json({ error: "Impossible de modifier le profil " })
                                    })
                            }
                        }
                    })
                }
            })
    }
    else {
        return res.status(400).json({ message: "une erreur est survenu, merci de réessayer ultérieurement" })
    }

}

exports.deleteUser = (req, res, next) => {
    const userId = res.locals.decodedToken.userId;
    db.query('SELECT * FROM user WHERE id = ?', [userId],
        function (err, result) {
            console.log(result)
            if (err) {
                res.status(400).json({ error: "Impossible de supprimé le profil " })
            }
            else if (result[0].avatar_path == null) {
                db.query(`DELETE FROM user WHERE id= ?`,
                    [userId],
                    function (err) {
                        if (err) {
                            res.status(400).json({ error: "Impossible de supprimé le profil " })
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
                        res.status(400).json({ error: "Impossible de supprimé le profil " })
                    }
                    else {
                        db.query(`DELETE user FROM user WHERE id= ?`,
                            [userId],
                            function (err) {
                                if (err) {
                                    res.status(400).json({ error: "Impossible de supprimé le profil " })
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