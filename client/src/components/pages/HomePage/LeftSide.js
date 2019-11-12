import React, {Component} from 'react';
import './Style/LeftSide.css';

export default class LeftSide extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className="left_container">
                <strong>Profile</strong>
                <div className="profile_box">
                    <ul>
                       <li>Username: Linh</li>
                       <li>Winrate: </li>
                       <li>Rank: </li>
                    </ul>
                    <button id="logout" href="FrontPage.js">Log Out</button> 
                </div>
                
                <strong>Friend List</strong>
                <div className="flist_box">
                    <strong>No one is online now</strong>
                </div>
            </div>
        )
    }
}