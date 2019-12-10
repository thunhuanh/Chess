import React, { Component } from 'react';
import io from 'socket.io-client';
import './index.css'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

export class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
          redirect: false,
          chat: [{
            message: "Hello every one",
            name: this.props.name
          }]
        };
        this.element = null;

        this.socket = io('http://localhost:4000');
      }

      componentDidUpdate(){
        if (this.element !== null) {
          this.element.scrollIntoView({behavior: 'smooth' });
        }
      }

      redirect = () => {
        if (this.state.redirect) {
          window.alert("you're not allow!!")
          return <Redirect to="/"/>
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
          }
        );
      }

      componentDidMount() {
        const {name} = this.props;
      
        if (typeof name === "undefined" || !name.trim()) {
          this.setState({
            redirect: true
          });
        };

        this.socket.on('receive', data => {
          this.setState({
            chat: [...this.state.chat, Object.assign({}, {message: data.message, name: data.name})]
          });
        });
      }
    
      onSubmit =(e)=> {
        // console.log(this.textInput.value);
        e.preventDefault();
        var message = this.refs.message.value;        
        if (typeof message !== "undefined" && message.trim()) {
          this.socket.emit('send', {name: this.props.name, message: message});
          this.setState({
            chat:[...this.state.chat, Object.assign({}, {message: message, name: this.props.name})]
          });
        }
        
        this.refs.message.value = "";
      }
  
      render() {
        return (
          <div className="bg-container">
            {this.redirect()}
            <div className="container">
              <div className="msgContainer">
                {this.renderMsg()}
              </div>  
            </div>
            <div className="text-container">
              <form onSubmit={this.onSubmit} className="text-input">
                <input type="text" ref="message" placeholder="message here" className="msg"/>
                <input type="submit" value="Send" className="submit-btn"/>
              </form> 
            </div>         
          </div>
        );
      }
}

Chat.propTypes = {
  name: PropTypes.string.isRequired
}
export default Chat;
