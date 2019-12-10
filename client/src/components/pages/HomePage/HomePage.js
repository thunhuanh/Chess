
import React from 'react'
import "./Style/HomePage.css"
import PlayMode from './PlayMode'
import HomeChatBox from './HomeChatBox'
import FriendList from './FriendList'
import OnlinePlayer from "./OnlinePlayer"
import './bulma/bulma.css'



class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    state = { showMenu: false, showProfile: false}

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
        this.setState( {
            showProfile: !this.state.showProfile
        })
        console.log(this.state.showProfile);
    }
    render() {
        let menuVis = this.state.showMenu ? '' : 'off';
        console.log(menuVis);
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
                    <button onClick={this.toggleMenu} id="homePageAuxComponentsSmallButton" className="button">
                        <span>Community</span>
                    </button>
                            <div className={ ["homePageAuxComponentsSmall", menuVis].join(' ') }>
                            <div className="friendListBorderBox">
                                <FriendList/>
                            </div>
                            <OnlinePlayer/>
                        </div>
                {/*</div>*/}
                <div className='homePageMainComponents'>
                        <div className='playModeBorderBox'>
                            <PlayMode/>
                        </div>
                        <HomeChatBox/>
                    </div>

                    <div className="homePageAuxComponentsFull">

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