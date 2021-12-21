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
    const loginConnectionUrl = `http://192.168.1.64:3000/api/auth/login`;

    const connexion = async () => {
        try {
            await axios
                .post(loginConnectionUrl, {
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

    const handleRegister = (e) => {
        e.preventDefault();
        register();
    }

    const [userRegister, setUserRegister] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        checkPassord: "",
    })

    

    const checkLastName = () => {
        
    }

    const checkFirstName = () =>{

    }

    const checkEmail = () => {

    }

    const checkPassword = () => {

    }

    const register = async () => {
        try {
            await axios.post(`http://192.168.1.64:3000/api/auth/register`,
                { userRegister })
                .then((res) => {
                    if(res.ok){
                        setIsHidden(true)
                    }
                })
                .catch(err => setError(err.response.data.message))

        } catch (error) {
            
            
        }
    }

    ///////////////// RETURN

    return isHidden ? (
        <main className='auth themeName'>
            <div className='auth-layout'>
                <div className='auth-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                </div>
                <h4>Inscription</h4>
                <p>{error}</p>
                <div className='auth-form'>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="nom"></label>
                        <input type="text" id="nom" placeholder="Nom" required onChange={(e) => setUserRegister({ ...userRegister, lastName: e.target.value })} />

                        <label htmlFor="prenom"></label>
                        <input type="text" id="prenom" placeholder="Prénom" required onChange={(e) => setUserRegister({ ...userRegister, firstName: e.target.value })} />

                        <label htmlFor="email"></label>
                        <input type="email" id="email" placeholder="E-mail" required onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })} />

                        <label htmlFor="password"></label>
                        <input type="password" id="password" placeholder="Mot de passe" required onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })} />

                        <label htmlFor="checkPassword"></label>
                        <input type="password" id="checkPassword" placeholder="Confirmation du mot de passe" required onChange={(e) => setUserRegister({ ...userRegister, checkPassword: e.target.value })} />

                        <input type="submit" className='auth-btn-submit' value='Envoyer' />
                    </form>
                </div>
                <button className='auth-link' onClick={() => setIsHidden(false)}>S'inscrire</button>
            </div>
        </main>
    ) : (
        <main className='auth' id="login">
            <div className='auth-layout'>

                <div className='auth-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                </div>
                <h2>Connexion</h2>
                <p>{error}</p>
                <div className='auth-form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="identifiant"></label>
                        <input type="email" id="identifiant" placeholder='E-mail' value={connexion.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <label htmlFor="password"></label>
                        <input type="password" id="password" placeholder='Mot de passe' value={connexion.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <input className='auth-btn-submit' type="submit" value="Envoyer" />
                    </form>
                </div>
                <p>Vous n'avez pas de compte ? <br />Inscrivez-vous maintenant ! </p>
                <button className='auth-link' onClick={() => setIsHidden(true)}>S'inscrire</button>
            </div>
        </main>
    )
}

export default Auth