import React, { Component } from 'react'
import "./styles/UserForm.css"

export default class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUserOpen: this.props.isUserOpen,
            isToggle: true,
            userName:"",
            password:"",
        }

    }
    toggleOnClick = () => {
        this.setState({
            isToggle: !this.state.isToggle
        })
    }
    onChange = (event) =>{
        if (event.target.name === "un-input"){
            this.setState({
                userName: event.target.value
            })
        }
        else if (event.target.name ==="pw-input"){
             this.setState({
                password: event.target.value
             })
        }
    }
    onLoginSubmit = (event) => {
        console.log(this.state.userName, this.state.password)
        this.props.onLoginSubmit(this.state.userName, this.state.password) 
        console.log(this.state.userName, this.state.password)
        event.preventDefault();
        // console.log(this.state.userName, this.state.password)
    }
    render() {
        return (
            <div className={this.state.isUserOpen?"fp-uf-user-form visible":"fp-uf-user-form visible fp-uf-user-form-after"}>
                <div className="fp-uf-button-box">
                    <div className={this.state.isToggle? "fp-uf-lgr-btn": "fp-uf-lgr-btn1"}></div>
                    <button  type="button" className="fp-uf-toggle-btn" id="fp-uf-toggle-login" onClick = {this.toggleOnClick} >Login</button>
                    <button type="button" className="fp-uf-toggle-btn" id="fp-uf-toggle-reg" onClick = {this.toggleOnClick} >Register</button>
                </div>
                <form id={this.state.isToggle?"":"fp-uf-login-box-after"} className="fp-uf-input-box" ref="lgb" onSubmit={this.onLoginSubmit}>
                    <div className="fp-uf-text-box">
                        <input name = "un-input" type = "text" placeholder="Username" onChange={this.onChange}></input>
                    </div>
                    <div className="fp-uf-text-box">
                        <input name = "pw-input" type = "password" placeholder="Password" onChange={this.onChange}></input>
                    </div>
                    <input type="checkbox" className="fp-uf-check-box"></input>
                    <span>Remember me</span>
                    <br></br>
                    <button type="submit" className="fp-uf-confirm-btn" >Login</button>
                </form>
                <form id={this.state.isToggle?"fp-uf-reg-box":""} className="fp-uf-input-box" ref="rgb">
                    <div className="fp-uf-text-box">
                        <input type = "text" placeholder="Username"></input>
                    </div>
                    <div className="fp-uf-text-box">
                        <input type = "password" placeholder="Password"></input>
                    </div>
                    <div className="fp-uf-text-box">
                        <input type = "text" placeholder="Confirm password"></input>
                    </div>
                    <button type="submit" className="fp-uf-confirm-btn">Register</button>
                </form>
            </div>
        )
    }
}
