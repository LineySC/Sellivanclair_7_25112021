import Header from "../Header"
import './Profil.css';

import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Profil() {
    const [userInfo, setUserInfo] = useState({ user: '' })
    const [isModify, setIsModify] = useState(true)

    const userAuth = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate();


    const handleInfoProfil = async () => {
        axios
            .get(`http://localhost:3000/api/auth/profil/${userAuth.id}`, { headers: { "Authorization": `Bearer ${userAuth.token}` } })
            .then((res) => {

                setUserInfo({ user: res.data[0] })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        handleInfoProfil()
    }, [])


    const HandleModifyProfil = async () => {

        const formData = new FormData();
        formData.set("profil_image", document.getElementById('avatar_img').files[0])

        axios.put(`http://localhost:3000/api/auth/profil/${userAuth.id}`, formData, { headers: { "Authorization": `Bearer ${userAuth.token}` } })

    }

    const HandleDelete = async () => {

        axios.delete(`http://localhost:3000/api/auth/profil/${userAuth.id}`, { headers: { "Authorization": `Bearer ${userAuth.token}` } })
            .then(() => {
                localStorage.setItem('user', JSON.stringify("1"))
                navigate("/auth")
            })
            .catch(e => {
                console.log(e)
            })
    }

    if (userInfo) {

        return (

            <div>
                <Header />


                {
                    isModify ?
                        <div className="layout-profil">
                            <img src={userInfo.user.avatar_path} />
                            <div className="infoProfil">
                                <p>{userInfo.user.prenom}</p>
                                <p>{userInfo.user.nom}</p>
                                <p>{userInfo.user.email}</p>
                            </div>
                            <div className="delete-profil">
                                <button onClick={() => setIsModify(false)}>Modifier le profil</button>
                            </div>
                        </div>
                        :
                        <div className="layout-profil">
                            <img src={userInfo.user.avatar_path} />
                            <form onSubmit={HandleModifyProfil}>

                                <input type="file" id="avatar_img" />
                                <input type="text" placeholder={userInfo.user.prenom} />
                                <input type="text" placeholder={userInfo.user.nom} />
                                <input type="email" placeholder={userInfo.user.email} />
                                <button type="submit">Envoyer</button>
                            </form>
                            <div className="delete-profil">
                                <button onClick={HandleDelete}>Supprimé le profil</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
    else {
        return
        (
            <div>
                <Header />
                <h1>NO Data Available</h1>
            </div>
        )
    }
}

export default Profil
