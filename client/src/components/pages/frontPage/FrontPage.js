import React, { Component } from 'react'
import './styles/FrontPage.css'
import UserForm from './UserForm'
import Intro from './Intro'
import RankDir from './RankDir'
import About from './About'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class FrontPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLoginForm: false,
            token: localStorage.getItem("token"),
            loginStatus: localStorage.getItem("loginStatus"),
            isRedirect: false,
            top: []
        }
    }

    UNSAFE_componentWillMount() {
        
        let token = localStorage.getItem("token")
        if (token !== null)
            this.loginWithToken(token)
    }

    componentDidMount() {
        this.getTopPlayer()
    }

    loginOnClick = () => {
        if (this.state.isLoginForm === false)
        this.setState({
            isLoginForm: !this.state.isLoginForm
        })
    }
    loginOnClick2 = () => {
        // this.props.getConfirm(this.state.loginStatus, "HomePage")
        this.setState({
            isRedirect: true
        })
    }
    mainOnClick = () => {
        if (this.state.isLoginForm === true){
            this.setState({
                isLoginForm: !this.state.isLoginForm
            })
        }
    }

    getTopPlayer = () => {
        axios.get('https://chess-apis.herokuapp.com/api/v1/be/account/accounts/top10')
            .then((response) => {
                if (response.data.success === true)
                    this.setState({
                        top: response.data.data
                    })
            })
            .catch((error) => {
            });
    }

    login = (userName, password) => {
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
            name: userName, // Dữ liệu được gửi lên endpoint '/user'
            password: password
        })
            .then((response) => {
                // console.log(response)
                // this.setState({
                    
                // })
                if (response.data.success === true) {
                    this.setState({           
                        isLoginForm: false,
                        token: response.data.token,
                        loginStatus: response.data.success,
                        
                    })
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("loginStatus", response.data.success)
                }
                
            })
            .catch((error) => {
            });
    }

    loginWithToken = (token) => {
        var config = {
            header: {
                "Authorization": token
            }
        }
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',
            {}, config
        )
            .then((response) => {
                if (response.data.success === true)
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
                this.setState({
                    loginStatus: response.data.success,
                })
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
        if (this.state.isRedirect === true){
            return <Redirect to="/HomePage"></Redirect>
        }
        return (
            <div className="fp-container" >
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
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
                <UserForm 
                    isLoginForm={this.state.isLoginForm} 
                    onRegisterSubmit={this.register} 
                    login={this.login}
                ></UserForm> 
                <div className="fp-main" 
                    onClick={this.mainOnClick}
                > 
                    <div className="fp-main-content">
                        <Intro 
                            isLoginForm={this.state.isLoginForm}
                        ></Intro>
                        <RankDir 
                            isLoginForm={this.state.isLoginForm} 
                            loginOnClick={this.state.loginStatus===null?this.loginOnClick:this.loginOnClick2} 
                            token={this.state.token}
                            getTop={this.state.top}
                        ></RankDir>
                    </div>                        
                </div>    
                <About 
                    isLoginForm={this.state.isLoginForm}
                ></About>
            </div>
        )
    }
}
