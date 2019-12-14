import React, { Component } from 'react';
import './styles/Chat.css';
import io from 'socket.io-client';
import axios from 'axios';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu'

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: 0,
            isVsBot: true,
            isLogout: false,
            userName: "",
            chat: [{
                message: "Hello every one",
                name: "",
                id: 0
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
            console.log(data)
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
                    userName: userName,
                    userId: response.data.data.id
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSubmit = (e) => {
        // console.log(this.textInput.value);
        let {userName, userId} = this.state
        e.preventDefault();
        var message = this.refs.message.value;        
        if (typeof message !== "undefined" && message.trim()) {
          this.socket.emit('general chat send', {name: userName, message: message, id:userId});
          this.setState({
            chat:[...this.state.chat, Object.assign({}, {message: message, name: userName, id:userId})]
          });
        }
        
        this.refs.message.value = "";
    }

    report = (event) => {
        let reportid = event.target.getAttribute("reportid")
        let message = event.target.getAttribute("msg")
        // console.log(event.target.getAttribute("id"))
        this.props.report(event.target.id, reportid, message)
    }

    addFriendOnClick = (event) => {
        console.log(event.target.getAttribute("data"))
        if (event.target.getAttribute("data") !== 0){
            this.props.addFriend(event.target.getAttribute("data"))
        }      
    }
    renderMsg = () => {
        const {chat} = this.state;
        
        return chat.map((obj, idx) => {
            if (idx !== 0) {
              return <li key={idx} ref={element => {this.element = element}}>
                        <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                            <strong>
                                {obj.name}                                 
                            </strong>
                            <span>: {obj.message}</span>
                        </ContextMenuTrigger>
                        <ContextMenu className="hp-mini-profile" id="SIMPLE">
                            <MenuItem className="hp-menu-item" >
                                <button className="hp-menu-btn" onMouseDown={this.report} id="Report_Cheating" reportid={obj.id} msg={obj.message}>Report Cheating</button>
                            </MenuItem>
                            <MenuItem className="hp-menu-item" >
                                <button className="hp-menu-btn" onMouseDown={this.report} id="Report_Griefing" reportid={obj.id} msg={obj.message}>Report Griefing</button>
                            </MenuItem>
                            <MenuItem className="hp-menu-item" >
                                <button className="hp-menu-btn" onMouseDown={this.addFriendOnClick} data={obj.id}>Add Friend</button>
                            </MenuItem>
                        </ContextMenu>                     
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