import './../styles/Register.css';
import logoWithText from './../assets/icon-above-font.svg'

import { Link } from 'react-router-dom';

function Register(){
    return(
        <main className='register'>
            <div className='register-img'>
                <img className='img' src={logoWithText} alt="Le logo Groupomania"/>
            </div>
            <div className='register-form'>
                <form action="">
                    <label for="nom">Nom :</label>
                        <input type="text" id="nom" required/>

                    <label for="prenom">Prénom :</label>
                        <input type="text" id="prenom" required />

                    <label for="email">E-mail:</label>
                        <input type="email" id="email" required />

                    <label for="password">Mot de passe :</label>
                        <input type="password" id="password" required />

                    <input type="button" className='register-btn-submit' value='Envoyer' onClick={register}/>
                </form>
            </div>
            <Link to="/" className='register-link'>Retour</Link>

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