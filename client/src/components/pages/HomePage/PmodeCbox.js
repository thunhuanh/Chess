import React, { Component } from 'react'
import './styles/PmodeCbox.css'

export default class PmodeCbox extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="hp-pmode-cbox hp-parts">
                <div className="hp-pc-playmodes">
                    {/* <span className="box-title">
                        Play Modes
                    </span> */}
                    <div className="hp-pc-modes-box">
                        {/* <button className="hp-pc-mode-btn">
                            <i className="fas fa-robot fa-2x"></i>
                                Vs Bot
                        </button>
                        <button className="hp-pc-mode-btn">
                            <i class="fa fa-trophy fa-2x" aria-hidden="true"></i>
                            Ranking
                        </button> */}
                    </div>
                </div>
                <div className="hp-pc-chatbox">
                    {/* <span className="box-title">
                        Public Chat
                    </span> */}
                    <div className="hp-pc-room-box">
                        <ul>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                12312312
                            </li>
                            <li>
                               123123123
                            </li>
                            <li>
                                13123123
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                            <li>
                                123123123
                            </li>
                            <li>
                                asdfasdfasd
                            </li>
                        </ul>
                    </div>
                    <div className="hp-pc-chat">
                        <div className="hp-pc-public-chat">
                            <ul>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li>
                                <li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li><li>
                                    Tung: abc
                                </li>
                                <li></li>
                            </ul>
                        </div>
                        <form className="hp-pc-chatting">
                            <i class="fas fa-user-circle fa-2x"></i>
                            <div className="hp-pc-chat-input">
                                <input type="text" placeholder="Chat here"/>
                                <button type="submit" className="hp-pc-chat-submit">
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
