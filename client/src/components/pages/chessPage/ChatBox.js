import React from 'react'
import './styles/ChatBox.css'
import './bulma/bulma.css'

class ChatBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return(
            <div className='chatBox'>
                <div className='cboxTitleArea'>
                    <p id='cboxTitle'>Chat box</p>
                </div>
                <div id='chatDialog' className='chatDialog'>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                    <p>Player A: I am going to smash you!</p>
                    <p>Player B: You sucker!</p>
                </div>
                <div className='editChat'>
                    <input id='inputChat' onKeyPress={this.enterToSend}/>
                        <button  onClick={this.clickToSend} id='sendBtn' className='button' >
                            <span id='sendBtnSpan' className="icon is-fullheight is-fullwidth">
                                <img id='sendBtnImg' src={require("./styles/img/sendbtn.png")} alt='missing' ></img>
                            </span>
                        </button>
                </div>
            </div>

        );

    }

    enterToSend(){
        onkeypress = (e) => {
            if (e.key === 'Enter') {
                if (document.getElementById('inputChat').value != '') {
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
        if (document.getElementById('inputChat').value != '') {
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