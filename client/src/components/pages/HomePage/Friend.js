import React, { Component } from 'react';
import './styles/Friend.css';
// import axios from 'axios';

export default class Friend extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     friends: [],
    //     // }
    // }

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
                            {this.props.friends.map((player, index) => {
                                return <li key={index}>{player.name}</li>
                            })}
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
