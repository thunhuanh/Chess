import React, {Component} from 'react';
import './Style/FriendList.css';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu'

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }
    removeOnClick = (event) => {
        this.props.remove(event.target.getAttribute("data"))
    }

    renderFriend = () => {
        const {friends} = this.props
        return friends.map((player, index) => {
            return <li key={index}>
                <ContextMenuTrigger id="">
                    <strong>
                        {player.name}
                    </strong>
                </ContextMenuTrigger>
                <ContextMenu className="hp-fr-mini-profile" id="">
                    <MenuItem className="hp-fr-menu-item">
                        <button className="hp-fr-menu-btn"  onMouseDown={this.removeOnClick} data={player.id}>Remove Friend</button>
                    </MenuItem>
                </ContextMenu>
            </li>
        })
    }

    render() {
        return (
            <div className="hp-friend-container">
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p style={{fontSize: '1.5vw'}}>Friend List</p>
                </div>
                <div className="hp-friend-content">
                    <div className="hp-friend-box">
                        <ul>
                            {this.renderFriend()}
                        </ul>
                    </div>
                    <form action="" className="hp-friend-search">
                        {/* <i className="fas fa-user-circle fa-2x"></i> */}
                        <div className="hp-search-input">
                            <input type="text" placeholder="Search here" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}