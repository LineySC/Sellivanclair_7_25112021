import './../../styles/Register.css';
import logoWithText from './../../assets/icon-left-font-monochrome-white.svg';

import { Link } from 'react-router-dom';

function Register(){
    return(
        <main className='register themeName'>
            <div className='register-layout'>
                <div className='register-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania"/>
                </div>
                <p>Inscription</p>
                <div className='register-form'>
                    <form action="">
                        <label for="nom"></label>
                            <input type="text" id="nom" placeholder="Nom"required/>

                        <label for="prenom"></label>
                            <input type="text" id="prenom" placeholder="Prénom" required />

                        <label for="email"></label>
                            <input type="email" id="email" placeholder="E-mail" required />

                        <label for="password"></label>
                            <input type="password" id="password" placeholder="Mot de passe" required />

                        <input type="button" className='register-btn-submit' value='Envoyer' onClick={register}/>
                    </form>
                </div>
                <Link to="/" className='register-link'>Retour</Link>
            </div>
        </main>
    )
}

function register() {

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const registerReq = {
        nom : nom.value,
        prenom: prenom.value,
        email: email.value,
        password: password.value
    }

    const registerURL = `http://localhost:3000/api/register`;

    const registerPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerReq)
    }

    fetch(registerURL, registerPost)
    .then(() => <Link to="/"></Link>)
    .catch(() => console.log('Inscription non réussi => Back end'))


}

export default Register;