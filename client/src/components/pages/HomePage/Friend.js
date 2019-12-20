import React, { Component } from 'react';
import './styles/Friend.css';
import { Menu, Item, MenuProvider, theme, IconFont } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
// import axios from 'axios';


export default class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }
    removeOnClick = ({event, props}) => {
        this.props.remove(props.friendId)
    }

    // onClick={this.removeOnClick} data={{friendId : player.id}}

    renderFriend = () => {
        const {friends} = this.props
        return friends.map((player, index) => {
            return <li key={index}>
                        <MenuProvider id={player.id}>           
                            <strong>
                                {player.name}
                            </strong>
                        </MenuProvider>
                        <Menu id={player.id} theme={theme.dark}>
                            <Item onClick={this.removeOnClick} data={{friendId: player.id}}>
                                <IconFont className="fas fa-trash" style={{paddingRight: "15px"}}/> Delete
                            </Item>
                        </Menu>
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
                </div>
            </div>
        )
    }
}