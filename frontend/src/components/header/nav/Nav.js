import { Link } from 'react-router-dom';
import './nav.css';


function Nav() {

    const disconnect = (e) => {
        localStorage.removeItem('token');
    }

    return (

        <div>
            <nav>
                <ul>
                    
                    <li>
                        <Link to='/profil'>Profil</Link>
                    </li > { /*Mettre nom et photo de profile */}
                </ul>
                <ul>
                    <li>
                        <Link to='/auth' onClick={disconnect}>Deconnexion</Link>
                    </li >
                </ul>
            </nav>
        </div>

    )
}

export default Nav