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
                <Link to='/'><img src={logoHeader} alt="Logo de Groupomania" /></Link>
            </div>
            <div className="layout-nav">
                <div id="themeName">
                    <div className="container-toggle">
                        {
                            togClass === "light" ?

                                <button id="toggle" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-moon"></i></button>
                                :
                                <button id="toggle" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-sun"></i></button>
                        }
                        <label htmlFor="toggle" className="toggle--label">
                            <span className="toggle--label-background"></span>
                        </label>
                    </div>
                </div>


                <Nav />
            </div>

        </header>
    )
}

export default Header