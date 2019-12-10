import React, { Component } from 'react'
import './styles/Chat.css'

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className={this.props.isVsBot?"hp-chat-container":"hp-chat-container hp-chat-container-after"}>
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p>Chat</p>
                </div>
                <div className="hp-chat-content">
                    <div className="hp-chat-box">
                        <ul>
                            <li>Tung:123
                            </li>
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
                            <input type="text" placeholder="Chat here" />
                            <button type="submit" className="hp-chat-submit">
                                <i className="fa fa-paper-plane" aria-hidden="true"></i>
                            </button>
                        </div>
                    </form>
                </div>          
            </div>
        )
    }
}
