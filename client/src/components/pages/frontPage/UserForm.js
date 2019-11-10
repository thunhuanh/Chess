import React, { Component } from 'react'
import "./styles/UserForm.css"

export default class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className = "hidden">
            <form className="user-form">
                <div className="button-box">
                    <div className="lgr-btn"></div>
                    <button type="button" className="toggle-btn">Login</button>
                    <button type="button" className="toggle-btn">Register</button>
                </div>
                <div className="text-box">
                    <input type = "text" placeholder="Username"></input>
                </div>
                <div className="text-box">
                    <input type = "password" placeholder="Password"></input>
                </div>
                <input type="checkbox" className="check-box"></input>
                <span>Remember me</span>
                <br></br>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
        )
    }
}
