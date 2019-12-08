
import "./styles/FrontPage.css"
import axios from "axios"
import UserForm from './UserForm';
import Slide from './Slide';
import About from './About';
import HomePage from '../HomePage/HomePage'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import React, { Component } from 'react'

export default class FrontPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUserOpen: false,
            // userName:"",
            // password:"",
            token:"",
            loginStatus:"",
            nickName: ""
        }
    }
    login = async (userName, password) =>{
        await axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
        name: userName, // Dữ liệu được gửi lên endpoint '/user'
        password: password
      })
      .then( function (response) {
        console.log(response.data.token)
        this.setState({
            token: response.data.token,
            loginStatus: response.request.statusText,
            nickName: response.data.data.user.NickName
        }) // Xử lý dữ liệu được trả về từ API
      })
      .catch(function (error) {
      });
    }
    loginOnClick = event =>{
        event.preventDefault();
        this.setState({
            isUserOpen : !this.isUserOpen
        })
    }
    containerOnClick = () =>{
        if (this.state.isUserOpen === true){
            this.setState({
                isUserOpen: false
            })
        }
        console.log(this.state)
    }
    onLoginSubmit = (userName, password) => {
        this.login(userName, password)
    }
    render() {
        let {nickName} = this.state
        let user = <div className="fp-login-container">
        <UserForm id ="fp-user-form" isUserOpen = {this.state.isUserOpen} onLoginSubmit={this.onLoginSubmit}></UserForm>
        </div>
        if (this.state.loginStatus === "OK"){
            return (
                <Redirect from="/FrontPage" to ="/HomePage"></Redirect>
            )
        }
        return (
            <div className="fp-frontpage">   
            {this.state.isUserOpen? user: ""}
            <div className="fp-container" onClick={this.containerOnClick}>     
            <nav className="navbar navbar-inverse fp-nav-ab">
                <div className= "container-fluid">
                <a className="navbar-brand" href="/"><i className='fas fa-chess-queen'></i> ChessOnline</a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="deactive">
                        <a className="nav-link" id="loginBtn"onClick={this.loginOnClick}><i className="fa fa-user fa4" aria-hidden="true"></i>{this.state.statusText==="OK"?nickName:    "Login"}</a>
                    </li>
                </ul>
                </div>
            </nav>
            <Slide></Slide>
            <About></About>
            </div>   
        </div>
        )
    }
}
