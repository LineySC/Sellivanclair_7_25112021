import {useState } from 'react'
import DefaultAvatar from './../../../assets/avatar.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function ProfilForm ({prenom, nom, avatar_path, email}) {

    const [isModify, setIsModify] = useState(true)
    const userAuth = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate();

    const HandleModifyProfil = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set("profil_image", document.getElementById('avatar_img').files[0])
        formData.append("emailModified", document.getElementById('email').value)
        formData.append("passwordModified", document.getElementById('password').value)

        axios.put(process.env.REACT_APP_URL_API + `:3000/api/auth/profil/${userAuth.id}`,
            formData,
            { headers: { "Authorization": `Bearer ${userAuth.token}` } })
            .then((res) => {
                console.log("Reussi" + res)
                setIsModify(true)
            })
            .catch((err) => {
                //console.log(err.response.data)
                setIsModify(false)
            })

    }

    const HandleDelete = async () => {

        axios.delete(process.env.REACT_APP_URL_API + ':3000/api/auth/profil/' + userAuth.id, { headers: { "Authorization": `Bearer ${userAuth.token}` } })
            .then(() => {
                navigate("/auth")
            })
            .catch(e => {
                console.log(e)
            })
    }

    return(
        <div>
            Hello
            {
                isModify ?
                    <main className="layout-profil">
                        <img
                            src={avatar_path == null ? DefaultAvatar : avatar_path}
                            alt={avatar_path == null ? "Photo de profil par default" : "Photo de profil de" + prenom + "" + nom}
                        />
                        <div>
                            <div className="info-profil">
                                <p>{prenom}</p>
                                <p>{nom}</p>
                                <p>{email}</p>
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
                                src={avatar_path == null ? DefaultAvatar : avatar_path}
                                alt={avatar_path == null ? "Photo de profil par default" : "Photo de profil de" + prenom + nom}
                            />
                            <div className="form-input">
                                <input aria-label="Téléchargé une image" type="file" id="avatar_img" />
                                <input aria-label="Prenom" type="text" placeholder={prenom} disabled />
                                <input aria-label="Nom" type="text" placeholder={nom} disabled />
                                <input aria-label="Email" type="email" autoComplete='off' placeholder={email} id="email" />
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

export default ProfilForm