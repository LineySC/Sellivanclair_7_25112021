import logoHeader from './../../assets/icon-left-font-monochrome-white.svg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Nav from './nav/Nav';
import { setTheme, keepTheme } from './../theme/Theme'

import './Header.css';
import './../theme/Theme.css'

function Header() {

    useEffect(() => {
        keepTheme();
    })

    const [togClass, setTogClass] = useState('dark');
    let theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light')
        }
    }, [theme])


    return (
        <header>

            <div>
                <Link to='/'><img src={logoHeader} alt="Logo de Groupomania" className="logo" /></Link>
            </div>
            <div className="layout-nav">
                <div id="themeName">
                    <div className="container-toggle">
                        {
                            togClass === "light" ?
                                <button aria-label="Theme sombre" type="button" id="toggle" value="Theme sombre" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-moon"></i></button>
                                :
                                <button aria-label="Theme clair" id="toggle" value="Theme clair" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-sun"></i></button>
                        }
                    </div>
                </div>
                <Nav />
            </div>

        </header>
    )
}

export default Header