import './../styles/Login.css';
import logoWithText from './../assets/icon-above-font.svg'

import { Link } from 'react-router-dom';

function Login () {

    return(
        <main className='login'>
            <div className='login-img'>
                <img className='img' src={logoWithText} alt="Le logo Groupomania"/>
            </div>

            <div className='login-form'>
                <form action="">
                    <label for="identifiant">Identifiant :</label>
                    <input type="email" id="identifiant" />
                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" />
                    <input className='login-btn-submit' type="button" value="Envoyer" onClick={connection} />
                </form>
            </div>

            <Link to='/register' className='login-link'>S'inscrire</Link>
        </main>
    )

}

//Connection

function connection(){

    const email = document.getElementById('identifiant');
    const password = document.getElementById('password');   

    const loginReq = {
        email: email.value,
        password: password.value
    }
    
    const loginConnectionUrl = `http://localhost:3000/api/login`;
    
    const loginPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginReq)
    }

    fetch(loginConnectionUrl, loginPost)
    .then(() => console.log("Recu"))
    .catch(() => console.log("Not Good"))
}
export default Login