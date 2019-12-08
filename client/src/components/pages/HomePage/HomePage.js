
import React from 'react'
import "./Style/HomePage.css"
import PlayMode from './PlayMode'
import HomeChatBox from './HomeChatBox'
import FriendList from './FriendList'
import OnlinePlayer from "./OnlinePlayer";


export default function HomePage (){
    return (
    <div className='homePage'>
        <div className='homePageNav'>
           <img src="./Style/IMG/Chess.png" alt="Can not display"></img>
           <p>NAVBAR</p>
        </div>
            <PlayMode></PlayMode>
                
            <LeftSide></LeftSide>    
            <ChatBox></ChatBox>
            <RightSide></RightSide>
        </div>
    )
}