import React, { Component } from 'react'
import './styles/Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="hp-profile-container">
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p>Profile</p>
                </div>
                <div className="hp-profile-content">
                    <div className="hp-profile-header">
                        <p>Player X</p>
                    </div>
                    <ul className="hp-profile-data">
                        <li>
                            Rank
                                </li>
                        <li>
                            Elo
                                </li>
                        <li>
                            Elo
                                </li>
                        <li>
                            Elo
                                </li>
                    </ul>
                    <div className="hp-profile-logout-container">
                        <button className="hp-profile-logout-btn" onClick={this.logoutOnClick}>
                            <div className="hp-profile-logout-bg"></div>
                            <p>Log out</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
