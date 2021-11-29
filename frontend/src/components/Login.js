import './../styles/Login.css';
import logoWithText from './../assets/icon-above-font.svg'

import { Link } from 'react-router-dom';

function Login () {

    function Submit(e) {
        e.prenventDefault();
    }

    return(
        <main className='login'>
            <div className='login-img'>
                <img className='img' src={logoWithText} alt="Le logo Groupomania"/>
            </div>

            <div className='login-form'>
                <form action="">
                    <input type="text" placeholder='Identifiant' />
                    <input type="password" placeholder='Mot de passe' />
                    <input className='login-btn-submit' type="submit" onClick={Submit}/>
                </form>
            </div>

            <Link to='/register' className='login-link'>S'inscrire</Link>
        </main>
    )

}



export default Login