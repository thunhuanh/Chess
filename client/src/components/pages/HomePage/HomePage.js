import React, { Component } from 'react'
import './styles/HomePage.css'
import {Redirect} from 'react-router-dom'
import PlayModes from './PlayModes'
import Chat from './Chat'
import Profile from './Profile'
import Friend from './Friend'
import Room from './Room'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogout: false,
            isVsBot: true
        }
    }
    logoutOnClick = (event) =>{
        event.preventDefault()
        localStorage.clear()
        this.setState({
            isLogout: true
        })
    }
    vsMan = (isVsBot) => {
        this.setState({isVsBot: isVsBot})
    }
    render() {
        if (this.state.isLogout ===true){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="hp-container">
                {/* <div className="hp-bg">

                </div> */}
                <div className="hp-bg-box">
                    <div className="hp-bg-img">

                    </div>
                    <div className="hp-logo">
                        <p>
                            <i className='fas fa-chess-queen'></i>
                            Chess Online
                        </p>            
                    </div>
                </div>
                <div className="hp-main">
                    <div className="hp-main-content">
                        <div className="hp-col-3 mr-15">
                            <div className="hp-row-1">
                                <PlayModes vsMan={this.vsMan}></PlayModes>
                            </div>
                            <div className="hp-row-2">
                                <Room isVsBot={this.state.isVsBot}></Room>
                                <Chat isVsBot={this.state.isVsBot}></Chat>
                            </div>                            
                        </div>
                        <div className="hp-col-1 sr">
                            <div className="hp-row-3">
                                <Profile></Profile>
                            </div>
                            <div className="hp-row-4">
                                <Friend></Friend>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>     
        )
    }
}
