import React, { Component } from 'react'
import './styles/UserForm.css'

export default class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoginOpen: true,
            userName:"",
            password:"",
            regUserName:"",
            regPassword:"",
            confirmPassword:"",
        }
    }

    aOnClick = (event) => {
        event.preventDefault();
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        })
    }

    onLoginSubmit = (event) => {
        this.props.login(this.state.userName, this.state.password)
        event.preventDefault()
    }

    onRegisterSubmit = (event) => {
        event.preventDefault();
        if (this.state.regPassword === this.state.confirmPassword){
            this.props.onRegisterSubmit(this.state.regUsername, this.state.regPassword)
        }   
    }

    onChange = (event) =>{
        if (this.props.isLoginForm === false) {
            event.target.value=""
        }
        if (event.target.name === "un-input"){
            this.setState({
                userName: event.target.value
            })
        }
        else if (event.target.name === "pw-input"){
             this.setState({
                password: event.target.value
             })
        }
        else if (event.target.name === "reg-username"){
            this.setState({
               regUsername: event.target.value
            })
        }
        else if (event.target.name === "reg-password"){
            this.setState({
               regPassword: event.target.value
            })
        }
        else if (event.target.name === "confirm-password"){
            this.setState({
               confirmPassword: event.target.value
            })
        }
    }
    render() {
        return (
            <div>
                <form className="fp-uf-login-form" action="" id={this.props.isLoginForm === true ? "fp-uf-login-form-after" : ""}>
                    <div className="fp-uf-login-form-bg"></div>
                    <div className="fp-uf-login-form-header">
                        <h1>Welcome</h1>
                    </div>
                    <div className="fp-uf-login-form-input-box" id={this.state.isLoginOpen === true ? "fp-uf-loginform" : "fp-uf-loginform-after"}>
                        <div className="fp-uf-login-form-input">
                            <p>Username:</p>
                            <input onChange={this.onChange} name="un-input" className="fp-uf-login-form-input-field" type="text" placeholder="username"/>
                        </div>
                        <div className="fp-uf-login-form-input" id="fp-uf-input-password">
                            <p>Password:</p>
                            <input onChange={this.onChange} name="pw-input" className="fp-uf-login-form-input-field" type="password" placeholder="password" />
                        </div>
                        <button className="fp-uf-login-form-confirm-btn" onClick={this.onLoginSubmit}><span>Login</span></button>
                        <div className="fp-uf-login-form-ask">
                            <p>Dont have any account yet? <a href="/" onClick={this.aOnClick}>Sign-up!</a></p>
                        </div>
                    </div>
                    <div className="fp-uf-login-form-input-box" id={this.state.isLoginOpen === true ? "fp-uf-regform" : "fp-uf-regform-after"}>
                        <div className="fp-uf-login-form-input">
                            <p>Username:</p>
                            <input onChange={this.onChange} name="reg-username" className="fp-uf-login-form-input-field" type="text" placeholder="username" />
                        </div>
                        <div className="fp-uf-login-form-input" id="fp-uf-input-password">
                            <p>Password:</p>
                            <input onChange={this.onChange} name="reg-password" className="fp-uf-login-form-input-field" type="password" placeholder="password" />
                        </div>
                        <div className="fp-uf-login-form-input" id="fp-uf-input-password">
                            <p>Confirm Password:</p>
                            <input onChange={this.onChange} name="confirm-password" className="fp-uf-login-form-input-field" type="password" placeholder="confirm password" />
                        </div>
                        <button className="fp-uf-login-form-confirm-btn" onClick={this.onRegisterSubmit}><span>Sign up</span></button>
                        <div className="fp-uf-login-form-ask">
                            <p>Already have an account? <a href="/" onClick={this.aOnClick} >Sign-in!</a></p>
                        </div>
                    </div>
                </form>     
            </div>
        )
    }
}
