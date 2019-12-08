
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


        <div className='homePageComponents'>
            <div className='homePageMainComponents'>
                <div className='playModeBorderBox'>
                    <PlayMode/>
                </div>
                <HomeChatBox/>
            </div>
            <div className="homePageAuxComponents">

                <div className='friendListBorderBox'>
                    <FriendList/>
                </div>
                <OnlinePlayer/>
            </div>

        </div>
    </div>
    )
}