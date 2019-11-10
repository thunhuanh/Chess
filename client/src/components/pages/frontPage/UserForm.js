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
    // componentDidMount = () =>{
    //     console.log(this.state.isUserOpen)
    //     console.log(this.state.userName)
    // }
    // componentDidUpdate = () => {
    //     console.log(this.state.isUserOpen)
    //     console.log(this.state.userName)
    // }
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
            <div className={this.state.isUserOpen?"user-form visible":"user-form visible user-form-after"}>
                <div className="button-box">
                    <div className={this.state.isToggle? "lgr-btn": "lgr-btn1"}></div>
                    <button  type="button" className="toggle-btn" id="toggle-login" onClick = {this.toggleOnClick} >Login</button>
                    <button type="button" className="toggle-btn" id="toggle-reg" onClick = {this.toggleOnClick} >Register</button>
                </div>
                <form id={this.state.isToggle?"":"login-box-after"} className="input-box" ref="lgb" onSubmit={this.onLoginSubmit}>
                    <div className="text-box">
                        <input name = "un-input" type = "text" placeholder="Username" onChange={this.onChange}></input>
                    </div>
                    <div className="text-box">
                        <input name = "pw-input" type = "password" placeholder="Password" onChange={this.onChange}></input>
                    </div>
                    <input type="checkbox" className="check-box"></input>
                    <span>Remember me</span>
                    <br></br>
                    <button type="submit" className="confirm-btn" >Login</button>
                </form>
                <form id={this.state.isToggle?"reg-box":""} className="input-box" ref="rgb">
                    <div className="text-box">
                        <input type = "text" placeholder="Username"></input>
                    </div>
                    <div className="text-box">
                        <input type = "password" placeholder="Password"></input>
                    </div>
                    <div className="text-box">
                        <input type = "text" placeholder="Confirm password"></input>
                    </div>
                    <button type="submit" className="confirm-btn">Register</button>
                </form>
            </div>
        )
    }
}
