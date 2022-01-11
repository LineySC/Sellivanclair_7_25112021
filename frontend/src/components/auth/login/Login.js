import axios from "./../../config/Axios"
import React from "react";
import logoWithText from './../../../assets/icon-left-font-monochrome-white.svg';
import Loader from "../../loader/Loader";
import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

            error: '',
            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

     handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ isLoading: true })

        axios.post('/api/auth/login', 
        { user })
            .then(res => {

                let user = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                console.log("REDIRECT")
                //navigate("/"); //Fonctione pas tous le temps 
                window.location.replace("/")

            })
            .catch(error => {
                if (error.response === undefined) {
                    this.setState({ error: "Un problème est survenu, merci de réessayer ultérieurement." })
                }
                else {

                    this.setState({

                        error: error.response.data.message,
                        isLoading: false
                    })
                }
            })
    }

    onTrigger = (e) => {
        this.props.hidden(true);
        e.preventDefault();
    };

    render() {
        return (
            <main className='login' id="login">
                <div className='login-layout'>

                    <div className='login-img'>
                        <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                    </div>
                    <h1>Connexion</h1>
                    {this.state.error === undefined ?
                        null
                        :
                        <p>{this.state.error}</p>
                    }
                    {this.state.isLoading ?
                        <Loader />
                        :
                        <div className='login-form'>
                            <form onSubmit={this.handleSubmit}>
                                <input autoComplete="email" aria-label="email" name="email" type="email" placeholder="E-mail" value={this.state.email} onChange={this.handleChange} />
                                <input autoComplete="current-password" aria-label="mot de passe" name="password" type="password" placeholder='Mot de passe' value={this.state.password} onChange={this.handleChange} />
                                <input aria-label="Se connecter" className='register-btn-submit' type="submit" value="Envoyer" />
                            </form>
                        </div>}
                    <p>Vous n'avez pas de compte ?<br />Inscrivez-vous maintenant !</p>
                    <button aria-label="S'incrire" className='login-link' onClick={this.onTrigger}>S'inscrire</button>
                </div>
            </main>
        )
    }
}

export default Login