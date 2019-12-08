import React, { Component } from 'react'
import './styles/HomePage.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
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
                            <div className="hp-play-modes-picker">
                                <div className="hp-bg"></div>
                                <h3>VS Ai</h3>
                                <p>Training for newbies</p>
                                <p>Practice for more experience</p>
                            </div>
                            <div className="hp-play-modes-picker">
                                <div className="hp-bg"></div>
                                <h3>Ranking</h3>
                                <p>Compete to get higher rank</p>
                                <p>Make outstanding moves</p>
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
                                <button className="hp-profile-logout-btn">
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
                            <i class="fas fa-user-circle fa-2x"></i>
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
