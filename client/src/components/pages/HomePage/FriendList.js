import React, {Component} from 'react';
import './Style/FriendList.css';

export default class HomePageAuxComponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className="friendList">
                <p>FRIENDLIST</p>
                <strong>No one is online now</strong>
            </div>
        )
    }
}