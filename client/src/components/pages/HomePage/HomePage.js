
import React from 'react'
import "./Style/HomePage.css"
import PlayMode from './PlayMode'
import HomeChatBox from './HomeChatBox'
import FriendList from './FriendList'
import OnlinePlayer from "./OnlinePlayer"
import UserProfilePane from "./UserProfilePane";
import './bulma/bulma.css'



class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    state = { showMenu: false, showProfile: false}

    toggleCommunity = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
        this.setState( {
            showProfile: false
        })
    }

    toggleProfilePane = () => {
        this.setState({
            showProfile: !this.state.showProfile
        })
        this.setState({
            showMenu: false
        })
    }
    render() {
        let communityStatus = this.state.showMenu ? '' : 'off';
        let profilePaneStatus = this.state.showProfile ? '' : 'off';
        console.log(communityStatus);
        console.log(profilePaneStatus);
        return (
            <div className='homePage'>
                <div className='homePageNav'>
                    <img src="./Style/IMG/Chess.png" alt="Can not display"></img>
                    <p>NAVBAR</p>
                </div>
                <div className="homePageComponents">

                    {/*<div className="homePageAuxComponentsSmall">*/}
                        {/*<div className={ ["dropdown", menuVis].join(' ') }>
                            <div className="dropdown-trigger">
                                <button onClick={this.toggleMenu} id="homePageAuxComponentsSmallButton" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span>Dropdown button</span>
                                </button>
                            </div>
                            <div className="dropdown-menu" >

                                    <div className='friendListBorderBox dropdown-content'>
                                        <FriendList/>
                                        <OnlinePlayer/>
                                    </div>


                            </div>*/}
                            <div className="homePageSmallComponentsButtons">
                    <button onClick={this.toggleCommunity} id="homePageAuxComponentsSmallButton" className="button">
                        <span>Community</span>
                    </button>
                    <button onClick={this.toggleProfilePane} id="userProfilePaneSmallButton" className="button">
                        <span>Player profile</span>
                    </button>
                            </div>
                            <div className={ ["homePageAuxComponentsSmall", communityStatus].join(' ') }>
                            <div className="friendListBorderBox">
                                <FriendList/>
                            </div>
                            <OnlinePlayer/>
                        </div>
                    <div className={ ["userProfilePaneSmall", profilePaneStatus].join(' ') }>
                        <UserProfilePane/>
                    </div>
                {/*</div>*/}
                <div className='homePageMainComponents'>
                        <div className='playModeBorderBox'>
                            <PlayMode/>
                        </div>
                        <HomeChatBox/>
                    </div>

                    <div className="homePageAuxComponentsFull">
                        <UserProfilePane/>
                        <div className='friendListBorderBox'>
                            <FriendList/>
                        </div>
                        <OnlinePlayer/>
                    </div>

                </div>
            </div>
        )
    }
}

export default HomePage;