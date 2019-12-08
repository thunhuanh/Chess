
import React from 'react'
import "./Style/HomePage.css"
import PlayMode from './PlayMode';
import ChatBox from './ChatBox';
import RightSide from './RightSide';
import LeftSide from './LeftSide';


export default function HomePage (){
    return (
    <div>
       <div class='nav_bar'>
           <img src="./Style/IMG/Chess.png" alt="Can not display"></img>
       </div>
       <PlayMode></PlayMode>
            
        <LeftSide></LeftSide>    
        <ChatBox></ChatBox>
        <RightSide></RightSide>
        </div>
    )
}