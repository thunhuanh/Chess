import React, {Component} from 'react';
import './Style/OnlinePlayer.css';

export default class OnlinePlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className="onlinePlayer">
                <p>ONLINEUSERS</p>
                <strong>Online User</strong>
                <strong>No one is online now</strong>
            </div>
        )
    }
}