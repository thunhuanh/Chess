
import "./styles/FrontPage.css"
import axios from "axios"
import UserForm from './UserForm';
import Slide from './Slide';
import About from './About';

import React, { Component } from 'react'

export default class FrontPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUserOpen: false,
            // userName:"",
            // password:"",
            token:""
        }
    }

    login = (userName, password) =>{
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
        name: userName, // Dữ liệu được gửi lên endpoint '/user'
        password: password
      })
      .then(function (response) {
        console.log(response)
        this.setState({
            token: response.token
        }) // Xử lý dữ liệu được trả về từ API
        console.log(this.state)
      })
      .catch(function (error) {
        alert("Wrong username or password")
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
    }
    onLoginSubmit = (userName, password) => {
        // console.log(userName, password)
        // // this.setState({
        // //     userName: userName,
        // //     password: password
        // // })
        this.login(userName, password)
    }
    render() {
        let user = <div className="login-container">
        <UserForm id ="user-form" isUserOpen = {this.state.isUserOpen} onLoginSubmit={this.onLoginSubmit}></UserForm>
    </div>
        return (
            <div>   
            {this.state.isUserOpen? user: ""}
            <div className="fp-container" onClick={this.containerOnClick}>     
            <nav className="navbar navbar-inverse nav-ab">
                <div className= "container-fluid">
                <a className="navbar-brand" href="/a"><i className='fas fa-chess-queen'></i> ChessOnline</a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="deactive">
                        <a className="nav-link" id="loginBtn" href = "123" onClick={this.loginOnClick}><i className="fa fa-user fa4" aria-hidden="true"></i>     Login</a>
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
