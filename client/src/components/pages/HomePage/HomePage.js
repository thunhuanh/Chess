import React, { Component } from 'react'
import './styles/HomePage.css'
import {Redirect} from 'react-router-dom'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVsBot: true,
            isLogout: false
        }
    }
    modeOnClick = (event) => {
        if(event.target.id === "vsbot"){
            if (this.state.isVsBot === false){
                this.setState({
                    isVsBot: true
                })
            }
        }
        if(event.target.id ==="vsman"){
            if (this.state.isVsBot === true){
                this.setState({
                    isVsBot: false
                })
            }
        }
    }

    logoutOnClick = (event) =>{
        event.preventDefault()
        localStorage.clear()
        this.setState({
            isLogout: true
        })
    }
    render() {
        if (this.state.isLogout ===true){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="hp-container" >
                <div className="hp-bg">

                </div>
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
                    <div className="hp-play-modes-container">
                        <div className="hp-bg"></div>
                        <div className="hp-tag">
                            <p>Play Modes</p>
                        </div>
                        <div className="hp-play-modes">
                            <div className={this.state.isVsBot?"hp-play-modes-picker hp-play-modes-picker-selected": "hp-play-modes-picker"} id="vsbot" onClick={this.modeOnClick}>
                                <div className="hp-bg" id="vsbot"></div>
                                <h3 id="vsbot">VS Ai</h3>
                                <p id="vsbot">Training for newbies</p>
                                <p id="vsbot">Practice for more experience</p>
                            </div>
                            <div className={this.state.isVsBot === false?"hp-play-modes-picker hp-play-modes-picker-selected": "hp-play-modes-picker"} id="vsman" onClick={this.modeOnClick}>
                                <div className="hp-bg" id="vsman"></div>
                                <h3 id="vsman">Ranking</h3>
                                <p id="vsman">Compete to get higher rank</p>
                                <p id="vsman">Make outstanding moves</p>
                            </div>
                        </div>
                        <button className="hp-play-modes-confirm-btn">
                            <div className="hp-play-modes-confirm-btn-bg"></div>
                            <p>Play</p>
                        </button>
                        <div className="hp-room-container">
                            <div className="hp-bg"></div>
                            <div className="hp-tag">
                                <p>Room</p>
                            </div>
                        </div>
                    </div>  
                    <div className="hp-profile-container">
                        <div className="hp-bg"></div>
                        <div className="hp-tag">
                            <p>Profile</p>
                        </div>
                        <div className="hp-profile-content">
                            <div className="hp-profile-header">
                                <p>Player X</p>
                            </div>
                            <ul className="hp-profile-data">
                                <li>
                                    Rank
                                </li>
                                <li>
                                    Elo
                                </li>
                                <li>
                                    Elo
                                </li>
                                <li>
                                    Elo
                                </li>
                            </ul>
                            <div className="hp-profile-logout-container">
                                <button className="hp-profile-logout-btn" onClick={this.logoutOnClick}>
                                    <div className="hp-profile-logout-bg"></div>
                                    <p>Log out</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hp-friend-container">
                        <div className="hp-bg"></div>
                        <div className="hp-tag">
                            <p>Friend List</p>
                        </div>
                    </div>
                    <div className="hp-chat-container hp-chat-container">
                        <div className="hp-bg"></div>
                        <div className="hp-tag">
                            <p>Chat</p>
                        </div>
                        <div className="hp-chat-box">
                            <ul>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                                <li>Tung:123</li>
                            </ul>
                        </div>
                        <form action="" className="hp-chat-chat">
                            <i className="fas fa-user-circle fa-2x"></i>
                            <div className="hp-chat-input">
                                <input type="text" placeholder="Chat here"/>
                                <button type="submit" className="hp-chat-submit">
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>  
                        </form>
                    </div>
                </div>
            </div>     
        )
    }
}
