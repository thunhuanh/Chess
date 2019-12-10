import React, { Component } from 'react'
import './styles/Friend.css'

export default class Friend extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
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
                        <ul style={{fontSize: '1.5vw'}}>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                            <li>Tung:123</li>
                        </ul>
                    </div>
                    <form action="" className="hp-friend-search">
                        <i className="fas fa-user-circle fa-2x"></i>
                        <div className="hp-search-input">
                            <input type="text" placeholder="Search here" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
