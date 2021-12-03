import './../styles/Header.css';
import logoHeader from './../assets/icon-left-font-monochrome-white.svg'
import { Link } from 'react-router-dom';

function Header () {
    return (
        <header>
            <div>
                <Link to='/home'><img src={logoHeader}  alt="Logo de Groupomania"/></Link>
            </div>
            <div >
                <nav>
                    <ul>
                        <li><Link to='/profile'>Profil</Link></li> {/*Mettre nom et photo de profile */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header