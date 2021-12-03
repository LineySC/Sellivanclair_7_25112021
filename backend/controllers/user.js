const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./../config/db');


exports.register = (req, res, next) => {
    
    req.body.email = req.body.email.toLowerCase();

    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            const user = db.query(
                `INSERT INTO user (nom, prenom, email, password) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.email}', '${hash}')`
            )
            user.save()
            .then(() => res.status(200).json({message: 'Utilisateur créer !'}))
            .catch((err) => res.status(400).json(err))
        })
        .catch((err) => res.status(400).json(err))
        
}

exports.login = (req, res, next) => {
    
    req.body.user.email = req.body.user.email.toLowerCase();

       db.query(`SELECT * FROM user WHERE email = '${req.body.user.email}'`, function(err, result) {
            if (err) throw err
            else{
                
                const user = result[0];
                console.log(req.body.user.email)
                if(req.body.user.email == user.email){
                    bcrypt.compare(req.body.user.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(400).json({message: "Le mots de passe ne correspond pas"})
                        }
                        else{
                            const maxAge = 24 * 60 * 60;
                            const token = jwt.sign(
                                    {userId: user.id},
                                    process.env.SECRET_TOKEN,
                                    {expiresIn: maxAge});
                            res.cookie('token', token, {maxAge: maxAge, httpOnly: true})
                            res.status(200).json(token);

                        }
                    })
                    .catch(err => console.log(err))
                }
                else{
                   
                }

            }
        })
}

