import { Link } from 'react-router-dom';
import './nav.css';
import { useState } from 'react'

function Nav() {

    const user = JSON.parse(localStorage.getItem('user'))

    const disconnect = (e) => {
        localStorage.setItem('user', 1);
    }

    const [nav, setNav] = useState(false)



    return (
        <div className="nav">
            <div className='isResponsive'>
                <nav className='nav-menu'>
                    <ul>

                        <li>
                            <Link to={`/profil/${user.id}`} state={{ from: "the-page-id" }}>Profil</Link>
                        </li >
                    </ul>
                    <ul>
                        <li>
                            <Link to='/auth' onClick={disconnect}>Deconnexion</Link>
                        </li >
                    </ul>
                </nav>
            </div>


            <div className='isNotResponsive'>
                {
                    nav ? (
                        <div className="wrap-nav-hidden">
                            <nav>
                                <div id="icon-nav-hidden">
                                    <i className='bx bx-menu' onClick={() => setNav(false)}></i>
                                </div>
                                <ul>

                                    <li>
                                        <i className='bx bxs-user' ></i><Link to={`/profil/${user.id}`} state={{ from: "the-page-id" }}>Profil</Link>
                                    </li > { /*Mettre nom et photo de profile */}
                                </ul>
                                <ul>
                                    <li>
                                        <i className='bx bx-log-out' ></i><Link to='/auth' onClick={disconnect}>Deconnexion</Link>
                                    </li >
                                </ul>
                            </nav>
                        </div>
                    ) : (
                        <div className="wrap-nav">
                            <div id="icon-nav">
                                <i className='bx bx-menu' onClick={() => setNav(true)}></i>
                            </div>

                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default Nav