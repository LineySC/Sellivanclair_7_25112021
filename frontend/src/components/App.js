import './../styles/App.css';
import './../styles/Theme/Theme.css';

import Login from './form/Login';
import Feed from './feed/Feed';
import RoutesURL from './config/Routes';

import React from 'react';
import ReactDOM from 'react-dom';
import { keepTheme, setTheme } from './theme/Theme';
import { useEffect, useState } from 'react';
import 'boxicons';
import axios from 'axios';

function setToken(userToken) {
    localStorage.setItem('token', userToken);
}

function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
}

function App() {

    const token = getToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (

        <RoutesURL />,
        <Feed />

    )

    /*// THEME
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
    }, [theme])*/


    /*return (<h1>Hello</h1>)
            <main id="themeName">
                <div className="container-toggle">
                    {
                    //    togClass === "light" ?
    
                         //   <button id="toggle" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-moon"></i></button>
                        //    :
                      //      <button id="toggle" className='toggle-button' onClick={handleOnClick}><i className="icon-theme bx bxs-sun"></i></button>
                    //}
                    //<label htmlFor="toggle" className="toggle--label">
                      //  <span className="toggle--label-background"></span>
                    //</label>
                </div>
    
    
                <Login />
            </main>
    
        ); */
}

export default App
