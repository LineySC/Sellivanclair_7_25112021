import './../styles/App.css';

import Auth from './auth/Auth';
import RoutesURL from './config/Routes';

import React from 'react';

import 'boxicons';

function getToken() {

    if(localStorage.getItem('user') == null) {
        return false
    }
    else{
        const local = JSON.parse(localStorage.getItem('user'))
        const userToken = local.token
        return userToken
    }
    
}

function App() {


    // THEME
    
    const token = getToken();

    if (!token) {
        return <Auth />
    }

    return (
        
            <div>
                <RoutesURL />
            </div>

    );

}

export default App
