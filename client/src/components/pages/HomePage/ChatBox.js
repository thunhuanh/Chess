import React, {Component} from 'react';
import './Style/ChatBox.css';
export default class ChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
  
    render() {
        return (
            
            <div class="chatbox">
               <input type="text" id="chat_bar" onKeyPress={this.enterToSends}></input>
               <textarea id="chat_screen" ></textarea>
               <button id="chat_button" onClick={this.clickToSend} >Submit</button>
              
            </div>)
    
    }
    enterToSend()
    {
        onkeypress = (e) => {
            if (e.key === 'Enter') {
                document.getElementById("chat_screen").value+=document.getElementById("chat_bar").value;
                document.getElementById("chat_bar").value='';}
    }
}
    clickToSend(){
        document.getElementById("chat_screen").value+=document.getElementById("chat_bar").value;
        document.getElementById("chat_bar").value='';
    }
        }