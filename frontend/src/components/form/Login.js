import './../../styles/Login.css';
import logoWithText from './../../assets/icon-left-font-monochrome-white.svg';
import Loader from './Loader';
import "boxicons";

import { Link, useNavigate } from 'react-router-dom';
import React, {  useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types'

function Login({setToken}) {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [status, setStatue] = useState("")

    //CONNECTION 
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginConnectionUrl = `http://127.0.0.1:3000/api/auth/login`;

    const connexion = async () => {
        try {
            const data = await axios
                .post(loginConnectionUrl, {
                    mode: 'same-origin',
                    withCredentials: true,
                    credentials: 'include',
                    user,
                })
                .then(res => {
                    setLoading(true)
                    const token = res.data;
                    console.log(token)
                    setToken(token)
                    navigate("/feed");

                })
                .catch(e => console.log(e))
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        connexion();
        

    }

    return (
        <div className='login'>

            <div className='login-layout'>

                <div className='login-img'>
                    <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                </div>
                <p>Connexion</p>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="identifiant"></label>
                        <input type="email" id="identifiant" placeholder='E-mail' value={connexion.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        <label htmlFor="password"></label>
                        <input type="password" id="password" placeholder='Mot de passe' value={connexion.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <input className='login-btn-submit' type="submit" value="Envoyer" />

                    </form>
                </div>
                <Link to='/register' className='login-link'>S'inscrire</Link>
            </div>
            {loading ? (status) : (<Loader />)}
        </div>
    )

}

//Connection



Login.propTypes = {
    setToken: PropTypes.func.isRequired
}



export default Login