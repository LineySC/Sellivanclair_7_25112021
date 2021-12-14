import './../styles/App.css';


import Auth from './auth/Auth';
import RoutesURL from './config/Routes';

import React from 'react';

import 'boxicons';

function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken
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
