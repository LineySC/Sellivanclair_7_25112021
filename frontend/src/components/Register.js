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
                    <input type="text" placeholder='Nom'/>
                    <input type="text" placeholder='Prénom' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder="Mot de passe" />
                    <input type="submit" className='register-btn-submit' placeholder='Envoyer' />
                </form>
            </div>
            <Link to="/" className='register-link'>Retour</Link>

        </main>
    )
}

export default Register;