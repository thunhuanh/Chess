import React, { Component } from 'react';
import './styles/Profile.css';
import {Redirect} from 'react-router-dom';

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogout: false,
        }
    }


    logoutOnClick = (event) =>{
        event.preventDefault()
        localStorage.clear()
        this.setState({
            isLogout: true
        })
    }

    render() {
        const {name, rank, point} = this.props
        // console.log(this.props)

        if (this.state.isLogout ===true){
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className="hp-profile-container">
                <div className="hp-bg"></div>
                <div className="hp-tag">
                    <p style={{fontSize: '1.5vw'}}>Profile</p>
                </div>
                <div className="hp-profile-content">
                    <div className="hp-profile-header">
                        <p>{name}</p>
                    </div>
                    <ul className="hp-profile-data">
                        <li>
                            rank : {rank}
                                </li>
                        <li>
                            point : {point}
                                </li>
                    </ul>
                    <div className="hp-profile-logout-container">
                        <button className="hp-profile-logout-btn" onClick={this.logoutOnClick}>
                            <div className="hp-profile-logout-bg">
                            </div>
                            <p>Log out</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
