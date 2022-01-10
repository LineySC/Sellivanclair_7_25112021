import Header from "../Header"
import './Profil.css';
import DefaultAvatar from './../../../assets/avatar.png'
import Loader from './../../loader/Loader'
import React, { useState, useEffect } from 'react'
import axios from "./../../config/Axios"
import { useNavigate } from 'react-router-dom';


function Profil() {

    const [userInfo, setUserInfo] = useState({ user: '' })
    const [isModify, setIsModify] = useState(true)
    const [isLoading, setIsloading] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate();


    const handleInfoProfil = async () => {
        axios
            .get(`/api/auth/profil/${user.id}`)
            .then((res) => {

                setUserInfo({ user: res.data[0] })
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        handleInfoProfil()
    }, []) // eslint-disable-line


    const HandleModifyProfil = async (e) => {

        const formData = new FormData();
        formData.set("profil_image", document.getElementById('avatar_img').files[0])
        formData.append("emailModified", document.getElementById('email').value)
        formData.append("passwordModified", document.getElementById('password').value)

        axios.put(`/api/auth/profil/${user.id}`, formData)
            .then((res) => {
                console.log("Reussi" + res)
                setIsloading(false)
                setIsModify(true)

            })
            .catch((err) => {
                //console.log(err.response.data)
                setIsloading(true)
                setIsModify(false)

            })

    }

    const HandleDelete = async () => {

        axios.delete('/api/auth/profil/' + user.id)
            .then(() => {
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
                        <main className="layout-profil">
                            <img
                                src={userInfo.user.avatar_path == null ? DefaultAvatar : userInfo.user.avatar_path}
                                alt={userInfo.user.avatar_path == null ? "Photo de profil par default" : "Photo de profil de" + userInfo.user.prenom + userInfo.user.nom}
                            />
                            <div>
                                <div className="info-profil">
                                    <p>{userInfo.user.prenom}</p>
                                    <p>{userInfo.user.nom}</p>
                                    <p>{userInfo.user.email}</p>
                                </div>
                                <div className="delete-profil">
                                    <button onClick={() => setIsModify(false)}>Modifier le profil</button>
                                </div>
                            </div>
                        </main>
                        :
                        <main className="layout-profil">

                            <form onSubmit={HandleModifyProfil} autoComplete="off">
                                <img
                                    src={userInfo.user.avatar_path == null ? DefaultAvatar : userInfo.user.avatar_path}
                                    alt={userInfo.user.avatar_path == null ? "Photo de profil par default" : "Photo de profil de" + userInfo.user.prenom + userInfo.user.nom}
                                />
                                <div className="form-input">
                                    <input aria-label="Téléchargé une image" type="file" id="avatar_img" />
                                    <input aria-label="Prenom" type="text" placeholder={userInfo.user.prenom} disabled />
                                    <input aria-label="Nom" type="text" placeholder={userInfo.user.nom} disabled />
                                    <input aria-label="Email" type="email" autoComplete='off' placeholder={userInfo.user.email} id="email" />
                                    <input aria-label="mot de passe" type="password" autoComplete='new-password' id='password' placeholder="***********" />
                                    <input aria-label="vérification du mot de passe" type="password" placeholder="***********" />

                                    <button aria-label="Sauvegarder les modifications" className="modify-profil" type="submit">Envoyer</button>
                                </div>
                            </form>
                            <div className="delete-profil">
                                <button aria-label="Supprimé le profil" className="btn-delete" onClick={HandleDelete}>Supprimé le profil</button>
                            </div>

                        </main>
                }
            </div>
        )
    }
    else {
        return (
            <h1>No Data</h1>
        )
    }
}

export default Profil
