import React, {Component} from 'react';
import './Style/UserProfilePane.css';

export default class UserProfilePane extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className="userProfilePane">
                <p>PROFILE PANEL</p>
            </div>
        )
    }
}