import axios from 'axios';
import React from 'react';
import logoWithText from './../../../assets/icon-left-font-monochrome-white.svg';
import Loader from './../../loader/Loader'
import "./Register.css"

const regexEmail = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/ // eslint-disable-line
const regexSimple = /^[a-zA-Z 'éçàëäïî-]+$/g; // eslint-disable-line
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g // eslint-disable-line 

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            checkPassword: "",

            errorLastName: "",
            errorFirstName: "",
            errorEmail: "",
            errorPassWord: "",
            errorCheckPassWord: "",

            error: "", // Response erreur => Axios
            hasError: false,

            isLoading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegex = this.handleRegex.bind(this);
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegex(e) {
        e.preventDefault();
        const regexEmail = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/ // eslint-disable-line
        const regexSimple = /^[a-zA-Z 'éçàëäïî-]+$/g; // eslint-disable-line
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g // eslint-disable-line 

        const checkLastName = () => {
            if (this.state.lastName.match(regexSimple)) {
                return true
            }
            else {
                document.getElementById('nom').classList.add('register-error')
                this.setState({errorLastName: "Le nom est dans un mauvais format"})
                return false
            }
        }
        const checkFirstName = () => {
            if (this.state.firstName.match(regexSimple)) {
                return true
            }
            else {
                document.getElementById('prenom').classList.add('register-error')
                this.setState({ errorFirstName: "Le prénom est dans un mauvais format" })
                return false
            }
        }
        const checkEmail = () => {
            if (this.state.email.match(regexEmail)) {
                return true
            }
            else {
                document.getElementById('email').classList.add('register-error')
                this.setState({ errorEmail: "L'email est dans un mauvais format" })
                return false
            }
        }
        const checkPassword = () => {
            if (this.state.password.match(regexPassword)) {
                return true
            }
            else {
                document.getElementById('password').classList.add('register-error')
                this.setState({ errorPassWord: "Le mots de passe doit contenir au moins : Une Majuscule, un chiffre et un caractère" })
                return false
            }
        }
        const checkPasswordAgain = () => {
            if (this.state.password === this.state.checkPassword) {
                return true
            }
            else {
                document.getElementById('password').classList.add('register-error')
                document.getElementById('checkPassword').classList.add('register-error')
                this.setState({ errorCheckPassWord: "Les mots de passe ne correspondent pas" })
                return false
            }
        }

        if (checkLastName() && checkFirstName() && checkEmail() && checkPassword() && checkPasswordAgain() === true) {
            this.handleSubmit()
        }
        else {
            this.setState({ error: "Un des champs n'est pas correct" })
        }
    }

    handleSubmit(e) {
        const userRegister = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            email: this.state.email,
            password: this.state.password
        }

        this.setState({ isLoading: true })
        axios.post(process.env.REACT_APP_URL_API + ':3000/api/auth/register/',
            { userRegister })
            .then((res) => {
                this.props.hidden(false);
            })
            .catch(err => {
                console.log(err)
            })
    }


    onTrigger = (e) => {
        this.props.hidden(false);
        e.preventDefault();
    };

    render() {

        return (
            <main className='themeName'>
                <div className='register'>
                    <div className='register-layout'>
                        <div className='register-img'>
                            <img className='img' src={logoWithText} alt="Le logo Groupomania" />
                        </div>
                        <h1>Inscription</h1>
                        <p>{this.state.error}</p>

                        {this.state.isLoading === true ?
                            <Loader />
                            :
                            <div className='register-form'>
                                <form onSubmit={this.handleRegex}>
                                        {this.state.errorLastName ? this.state.lastName : null}
                                    <input aria-label="Nom" name="lastName" type="text" id="nom" placeholder="Nom" required value={this.lastName} onChange={this.handleChange} />
                                        {this.state.errorFirstName ? this.state.errorFirstName : null}
                                    <input aria-label="Prénom" name="firstName" type="text" id="prenom" placeholder="Prénom" required value={this.firstName} onChange={this.handleChange} />
                                        {this.state.errorEmail ? this.state.errorEmail : null}
                                    <input aria-label="email" name="email" type="email" id="email" placeholder="E-mail" required value={this.email} onChange={this.handleChange} />
                                        {this.state.errorPassWord ? this.state.errorPassWord : null }
                                    <input aria-label="Mot de passe" name="password" type="password" id="password" placeholder="Mot de passe" value={this.password} required onChange={this.handleChange} />
                                        {this.state.errorCheckPassWord ? this.state.errorCheckPassWord : null}
                                    <input aria-label="Vérifié le mot de passe" name="checkPassword" type="password" id="checkPassword" placeholder="Confirmation du mot de passe" value={this.checkPassword} required onChange={this.handleChange} />

                                    <input aria-label="Validé" type="submit" className='register-btn-submit' value='Envoyer' />
                                </form>
                            </div>
                        }

                        <button aria-label="Se connecté" className='register-link' onClick={this.onTrigger} >Connexion</button>
                    </div>
                </div>
            </main>
        )
    }
}

export default Register