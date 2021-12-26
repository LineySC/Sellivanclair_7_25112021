import './../../styles/auth/Auth.css';
import logoWithText from './../../assets/icon-left-font-monochrome-white.svg';
import "boxicons";

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Auth() {

    let navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);
    const [error, setError] = useState('');

    //CONNECTION 
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const connexion = async () => {
        try {
            await axios
                .post(process.env.REACT_APP_URL_API + ':3000/api/auth/login', {
                    user,
                })
                .then(res => {

                    let user = res.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/');
                })

                .catch(function (error) {
                    setError(error.response.data.message)
                })

        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        connexion();
    }

    /////////////////////////// INSCRIPTION

    const [userRegister, setUserRegister] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        checkPassword: "",
    })

    //REGEX

    const regexEmail = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/ // eslint-disable-line
    const regexSimple = /^[a-zA-Z 'éçàëäïî-]+$/g; // eslint-disable-line
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g // eslint-disable-line

    //CHECK INPUT

    const checkLastName = () => {
        if (userRegister.lastName.match(regexSimple)) {
            return true
        }
        else {
            document.getElementById('nom').classList.add("erreur")
            return false
        }
    }

    const checkFirstName = () => {
        if (userRegister.firstName.match(regexSimple)) {
            return true
        }
        else {
            document.getElementById('prenom').classList.add("erreur")
            return false
        }
    }

    const checkEmail = () => {
        if (userRegister.email.match(regexEmail)) {
            return true
        }
        else {
            document.getElementById('email').classList.add("erreur")
            return false
        }
    }

    const checkPassword = () => {
        if (userRegister.password === userRegister.checkPassword) {
            if (userRegister.password.match(regexPassword)) {
                return true
            }
            else {
                document.getElementById('password').classList.add("erreur")
                return false
            }
        }
        else {
            document.getElementById('password').classList.add("erreur")
            return false
            //Mots de passe ne correcpondent pas 
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (checkLastName() && checkFirstName() && checkEmail() && checkPassword() === true) {
            register();
        }
        else {
            console.log("Il y a des vérification a faire")
        }
    }

    const register = async () => {
        try {
            await axios.post(process.env.REACT_APP_URL_API + ':3000/api/auth/register',
                { userRegister })
                .then((res) => {
                    if (res.ok) {
                        setIsHidden(false)
                    }
                })
                .catch(err => setError(err.response.data.message))

        } catch (error) {
            console.log(error)
        }
    }

    ///////////////// RETURN

    return isHidden ? (
        <main className='auth themeName'>
            <div className='auth-layout'>
                <div className='auth-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                </div>
                <h1>Inscription</h1>
                <p>{error}</p>
                <div className='auth-form'>
                    <form onSubmit={handleRegister}>
                        
                        <input aria-label="Nom" type="text" id="nom" placeholder="Nom" required onChange={(e) => setUserRegister({ ...userRegister, lastName: e.target.value })} />
                        
                        <input aria-label="Prénom" type="text" id="prenom" placeholder="Prénom" required onChange={(e) => setUserRegister({ ...userRegister, firstName: e.target.value })} />
                        
                        <input aria-label="email" type="email" id="email" placeholder="E-mail" required onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })} />
                        
                        <input aria-label="Mot de passe" type="password" id="password" placeholder="Mot de passe" required onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })} />
                        
                        <input aria-label="Vérifié le mot de passe" type="password" id="checkPassword" placeholder="Confirmation du mot de passe" required onChange={(e) => setUserRegister({ ...userRegister, checkPassword: e.target.value })} />

                        <input aria-label="Validé" type="submit" className='auth-btn-submit' value='Envoyer' />
                    </form>
                </div>
                <button aria-label="Se connecté" className='auth-link' onClick={() => setIsHidden(false)}>Connexion</button>
            </div>
        </main>
    ) : (
        <main className='auth' id="login">
            <div className='auth-layout'>

                <div className='auth-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                </div>
                <h1>Connexion</h1>
                <p>{error}</p>
                <div className='auth-form'>
                    <form onSubmit={handleSubmit}>
                        <input aria-label="email" type="email" id="identifiant" placeholder='E-mail' value={connexion.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <input aria-label="mot de passe" type="password" id="password" placeholder='Mot de passe' value={connexion.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <input aria-label="Se connecter" className='auth-btn-submit' type="submit" value="Envoyer" />
                    </form>
                </div>
                <p>Vous n'avez pas de compte ? <br />Inscrivez-vous maintenant ! </p>
                <button aria-label="S'incrire" className='auth-link' onClick={() => setIsHidden(true)}>S'inscrire</button>
            </div>
        </main>
    )
}

export default Auth