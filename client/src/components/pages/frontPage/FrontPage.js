import React, { Component } from 'react'
import './styles/FrontPage.css'
import UserForm from './UserForm'
import Intro from './Intro'
import RankDir from './RankDir'
import About from './About'
import axios from 'axios'

export default class FrontPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoginForm: false,
            token: localStorage.getItem("loginStatus"),
            loginStatus: localStorage.getItem("loginStatus"),
        }
    }

    componentWillMount() {
        if (localStorage.getItem("token") !== null)
            this.loginWithToken(localStorage.getItem("token"))
    }

    loginOnClick = () => {
        if (this.state.isLoginForm === false)
        this.setState({
            isLoginForm: !this.state.isLoginForm
        })
    }
    loginOnClick2 = () => {
        this.props.getConfirm(this.state.loginStatus, "HomePage")
    }
    mainOnClick = () => {
        if (this.state.isLoginForm === true){
            this.setState({
                isLoginForm: !this.state.isLoginForm
            })
        }
    }

    login = (userName, password) => {
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
            name: userName, // Dữ liệu được gửi lên endpoint '/user'
            password: password
        })
            .then((response) => {
                console.log(response)
                this.setState({
                    token: response.data.token,
                    loginStatus: response.data.success,
                })
                if (response.data.success) {
                    this.setState({           
                        isLoginForm: false
                    })
                }
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("loginStatus", response.data.success)
                
            })
            .catch((error) => {
            });
    }

    loginWithToken = (token) => {
        var config = {
            header: {
                "Authoriztion": token
            }
        }
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',
            {}, config
        )
            .then((response) => {
                localStorage.setItem("loginStatus", response.data.success)
            })
            .catch((error) => {
            });
    }


    register = (userName, password) => {
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/account/create', {
            name: userName, // Dữ liệu được gửi lên endpoint '/user'
            password: password
        })
            .then((response) => {
                console.log(response)
                console.log(response.data.success)
                this.setState({
                    loginStatus: response.data.success,
                })
                console.log(response.data.success)
                if (response.data.success === true) {
                    this.login(userName, password)
                }
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("loginStatus", response.data.success)
            })
            .catch((error) => {
            });
    }
    render() {
        return (
            <div className="fp-container" >
                <div className="fp-bg">

                </div>
                <div className="fp-bg-box">
                    <div className="fp-bg-img">

                    </div>
                    <div className="fp-logo">
                        <p>
                            <i className='fas fa-chess-queen'></i>
                            Chess Online
                        </p>            
                    </div>
                </div>     
                <UserForm isLoginForm={this.state.isLoginForm} onRegisterSubmit={this.register} login={this.login}></UserForm> 
                <div className="fp-main" onClick={this.mainOnClick}>                       
                    <Intro isLoginForm={this.state.isLoginForm}></Intro>
                    <RankDir isLoginForm={this.state.isLoginForm} loginOnClick={this.state.loginStatus===null?this.loginOnClick:this.loginOnClick2}></RankDir>
                </div>    
                <About isLoginForm={this.state.isLoginForm}></About>
            </div>
        )
    }
}
