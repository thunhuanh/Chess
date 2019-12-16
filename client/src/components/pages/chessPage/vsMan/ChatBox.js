import React from 'react'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/ChatBox.css'
import io from 'socket.io-client'

const socket = io('http://localhost:4000');

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            chat: [{
              message: "Hello every one",
              name: this.props.name
            }]
        };
        this.element = null;
    }

    componentDidMount() {
        socket.on('receive', data => {
            if (this.props.roomId === data.roomId){
                this.setState({
                    chat: [...this.state.chat, Object.assign({}, {message: data.message, name: data.name})]
                });
            }
        });
      }

    componentDidUpdate(){
        if (this.element !== null) {
          this.element.scrollIntoView({behavior: 'smooth' });
        }
      }

    renderMsg = () => {
        const {chat} = this.state;

        return chat.map((obj, idx) => {
            if (idx !== 0) {
                if (obj.name !== this.props.name) {
                return <div key={idx} className="other-user-msg">
                            <div key={idx} className="msg-holder">
                                <span key={idx} className="msg-block" ref={element => {this.element = element}}>
                                {obj.name} : {obj.message}
                                </span>
                            </div>
                        </div>
                } else {
                return <div key={idx} className="user-msg">
                            <div key={idx} className="msg-holder">
                            <span key={idx} className="msg-block" ref={element => {this.element = element}}>
                                {obj.message}
                            </span>
                            </div>
                        </div>
                }
            } else {
                return <div key={idx}></div>
            }
        });
    }

    onSubmit =(e)=> {
        e.preventDefault();
        var message = this.refs.message.value;        
        if (typeof message !== "undefined" && message.trim()) {
          socket.emit('send', {name: this.props.name, message: message, roomId: this.props.roomId});
          this.setState({
            chat:[...this.state.chat, Object.assign({}, {message: message, name: this.props.name})]
          });
        }
        
        this.refs.message.value = "";
    }

    render() {
        return(
            <div className='cp-chatBox'>
                <div id='cp-chatDialog' className='cp-chatDialog'>
                    {this.renderMsg()}
                </div>
                <div className='cp-editChat'>
                    <form className='cp-inputChat' onSubmit={this.onSubmit}>
                        <input className='cp-inputChatTextField' ref="message"/>
                        <button type="submit" id='cp-sendBtn' className='cp-sending-btn' >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                    
                </div>
            </div>

        );

    }
}

export default ChatBox;