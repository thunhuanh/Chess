import React from 'react'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles/ChatBox.css'


class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return(
            <div className='chatBox'>
                <div id='chatDialog' className='chatDialog'>
                </div>
                <div className='editChat'>
                    <input id='inputChat' onKeyPress={this.enterToSend}/>
                    <button  onClick={this.clickToSend} id='sendBtn' className='sending-btn' >
                    <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>

        );

    }

    enterToSend(){
        onkeypress = (e) => {
            if (e.key === 'Enter') {
                if (document.getElementById('inputChat').value !== '') {
                    var tag = document.createElement("p");
                    var playerName = 'Player A';
                    //playerName var is currently a placeholder, to be filled in by real player names passed into.
                    var message = document.createTextNode(playerName + ': ' + document.getElementById('inputChat').value);
                    tag.appendChild(message);
                    var chatDiag = document.getElementById("chatDialog");
                    chatDiag.appendChild(tag);
                    var scrollToMessage = document.getElementById("chatDialog");
                    scrollToMessage.scrollTop = scrollToMessage.scrollHeight;
                    document.getElementById('inputChat').value = '';
                }
            }
        }
    }
    clickToSend() {
        onmouseup = (e) => {}
        if (document.getElementById('inputChat').value !== '') {
            var tag = document.createElement("p");
            var playerName = 'Player A';
            //playerName var is currently a placeholder, to be filled in by real player names passed into.
            var message = document.createTextNode(playerName + ': ' + document.getElementById('inputChat').value);
            tag.appendChild(message);
            var chatDiag = document.getElementById("chatDialog");
            chatDiag.appendChild(tag);
            var scrollToMessage = document.getElementById("chatDialog");
            scrollToMessage.scrollTop = scrollToMessage.scrollHeight;
            document.getElementById('inputChat').value = '';
        }
    }
}

export default ChatBox;