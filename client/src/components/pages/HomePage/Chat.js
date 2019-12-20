import React, { Component } from 'react';
import './styles/Chat.css';
import io from 'socket.io-client';
import axios from 'axios';
import { Menu, Item, Separator, Submenu, MenuProvider, theme, IconFont } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

export default class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: 0,
            userName: "",
            chat: []
        }

        this.element = null;
        this.socket = io('http://192.168.50.113:4000');
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
          console.log(userId)
          this.setState({
            chat:[...this.state.chat, Object.assign({}, {message: message, name: userName, id:userId})]
          });
        }
        
        this.refs.message.value = "";
    }

    report = ({ event, props }) => {
        // let reportedid = target[0].getAttribute("reportid")
        // let message = target[0].getAttribute("msg")
        // console.log(props.id, props.reportid, props.msg)
        this.props.report(props.id, props.reportid, props.msg)
    }

    addFriendOnClick = ({ event, props }) => {
        this.props.addFriend(props.friendId)
        // console.log(props.friendId)    
    }

    renderMsg = () => {
        const {chat} = this.state;
        
        return chat.map((obj, idx) => {
            return <li key={idx} ref={element => {this.element = element}}>
                        <MenuProvider id={idx}>           
                                <strong>
                                    {obj.name}                                 
                                </strong>
                                <span>: {obj.message}</span>
                        </MenuProvider>
                        <Menu id={idx} theme={theme.dark}>
                            <Item onClick={this.addFriendOnClick} data={{friendId : obj.id}}>
                                <IconFont className="fas fa-user-plus" style={{paddingRight: "15px"}}/> AddFriend
                            </Item>
                        <Separator />
                        <Submenu label={<div><IconFont className="fas fa-poo" style={{paddingRight: "12px"}}></IconFont> <span>Report</span></div>} style={{width:"60%"}}>
                            <Item onClick={this.report} data={{id: "cheating", reportid: obj.id, msg: obj.message}}>Report Cheating</Item>
                            <Item onClick={this.report} data={{id: "griefing", reportid: obj.id, msg: obj.message}}>Report Griefing</Item>
                        </Submenu>
                        </Menu>
                    </li>
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