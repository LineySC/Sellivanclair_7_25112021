const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const log = mysql.createConnection({
    host: process.env.BDD_HOST,
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_DATABASE
});

log.connect(function(err){
    if(err) {
        throw err
    }
    else{
        console.log("MySQL connected")
    }
});

exports.register = (req, res, next) => {
    req.body.email = req.body.email.toLowerCase();

    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            const user = log.query(
                `INSERT INTO user (nom, prenom, email, password) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.email}', '${hash}')`
            )
            user.save()
            .then(() => res.status(200).json({message: 'Utilisateur créer !'}))
            .catch((err) => res.status(400).json(err))
        })
        .catch((err) => res.status(400).json(err))
        
}

exports.login = (req, res, next) => {
    req.body.email = req.body.email.toLowerCase();

        log.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, function(err, result, fields) {
            if (err) throw err
            else{
            
                const user = result[0];

                if(req.body.email == user.email){
                    bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            return res.status(400).json({message: "Le mots de passe ne correspond pas"})
                        }
                        res.status(200).json({
                            userId: user.id,
                            token: jwt.sign(
                                {userId: user.id},
                                process.env.SECRET_TOKEN,
                                {expiresIn: '24h'}
                            )
                        })
                    })
                    .catch(err => console.log(err))
                }
                else{
                   
                }

            }
        })
}

