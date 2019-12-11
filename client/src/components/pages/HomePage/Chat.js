import React, { Component } from 'react';
import './styles/Chat.css';
import io from 'socket.io-client';
import axios from 'axios';

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVsBot: true,
            isLogout: false,
            userName: "",
            chat: [{
                message: "Hello every one",
                name: ""
            }]
        }

        this.element = null;
        this.socket = io('http://localhost:4000');
    }

    componentWillMount() {
        let token = localStorage.getItem("token")
        if (token !== null)
            this.loginWithToken(token)
    }

    componentDidMount(){
        this.socket.on('messages list', (msg) => {
            this.setState({
                chat: msg
            })
        })

        this.socket.on('general chat send', data => {
            this.newIncomingMessage(data)
        });
    }

    componentDidUpdate(){
        if (this.element !== null) {   
            this.element.scrollIntoView({behavior: 'smooth' });
        }
    }

    newIncomingMessage = (data) => {
        let {chat} = this.state;
        chat.push(data);
        this.setState({
            chat: chat
        })
    }

    loginWithToken = (token) => {
        // console.log(token)
        var config = {
            headers: {
                'Authorization': token
            }
        }
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',{}, config
        )
            .then((response) => {
                let userName = response.data.data.name;
                this.setState({
                    userName: userName
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSubmit =(e)=> {
        // console.log(this.textInput.value);
        let {userName} = this.state
        e.preventDefault();
        var message = this.refs.message.value;        
        if (typeof message !== "undefined" && message.trim()) {
          this.socket.emit('general chat send', {name: userName, message: message});
          this.setState({
            chat:[...this.state.chat, Object.assign({}, {message: message, name: userName})]
          });
        }
        
        this.refs.message.value = "";
    }

    
    renderMsg = () => {
        const {chat} = this.state;
        
        return chat.map((obj, idx) => {
            if (idx !== 0) {
              return <li key={idx} ref={element => {this.element = element}}>
                        <strong>{obj.name}</strong>
                        <span>: {obj.message}</span>
                    </li>
            } else return ""
          }
        );
    }

    render() {
        return (
            <div className={this.props.isVsBot?"hp-chat-container":"hp-chat-container hp-chat-container-after"}>
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p style={{fontSize: '1.5vw'}}>Chat</p>
                </div>
                <div className="hp-chat-content">
                    <div className="hp-chat-box">
                        <ul>
                            {this.renderMsg()}
                        </ul>
                    </div>
                    <form action="" onSubmit={this.onSubmit} className="hp-chat-chat">
                        <i className="fas fa-user-circle fa-2x"></i>
                        <div className="hp-chat-input">
                            <input type="text" ref="message" placeholder="Chat here" />
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
