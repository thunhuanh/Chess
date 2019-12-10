import React, { Component } from 'react'
import './styles/Profile.css'

export default class Profile extends Component {
    render() {
        const {name, rank, point} = this.props

        return (
            <div className="hp-profile-container">
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p style={{fontSize: '1.5vw'}}>Profile</p>
                </div>
                <div className="hp-profile-content">
                    <div className="hp-profile-header">
                        <p style={{fontSize: '1.5vw'}}>{name}</p>
                    </div>
                    <ul className="hp-profile-data">
                        <li style={{fontSize: '1.5vw'}}>
                            rank: {rank}
                                </li>
                        <li style={{fontSize: '1.5vw'}}>
                            point: {point}
                                </li>
                    </ul>
                    <div className="hp-profile-logout-container">
                        <button className="hp-profile-logout-btn" onClick={this.logoutOnClick}>
                            <div className="hp-profile-logout-bg" id="container-special">
                                
                            </div>
                            <p style={{fontSize: '1.5vw'}}>Log out</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
