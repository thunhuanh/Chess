import React, {Component} from 'react';
import './Style/HomeChatBox.css';
export default class HomeChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
  
    render() {
        return (
            
            <div class="homeChatBox">
                <input type="text" id="homeChatInput" onKeyPress={this.enterToSend}></input>
               <textarea id="homeChatDialog" >THIS IS JUST A PLACEHOLDER CHATBOX TO DEMONSTRATE THE DESIGN PATTERN.
                                                REAL CHAT BOX WILL BE ADDED INTO THIS PART LATER ON.</textarea>
               <button id="homeSendButton" onClick={this.clickToSend} >Submit</button>
            </div>)
    
    }
    enterToSend()
    {
        onkeypress = (e) => {
            if (e.key === 'Enter') {
                document.getElementById("homeChatDialog").value+=document.getElementById("homeChatInput").value + '\n';
                document.getElementById("homeChatInput").value='';}
    }
}
    clickToSend(){
        document.getElementById("homeChatDialog").value+='\n'+document.getElementById("homeSendButton").value + '\n';
        document.getElementById("homeSendButton").value='';
    }
        }