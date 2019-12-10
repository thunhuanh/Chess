import React, { Component } from 'react'
import './styles/Room.css'

export default class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        console.log(this.props.isVsBot)
        return (
            <div className={this.props.isVsBot?"hp-room":"hp-room hp-room-after"}>
                <div className="hp-bg"></div>
                <div className="hp-room-container">
                    <div className="hp-room-content">
                        <ul>
                            <li><span>asbasdfsadf</span>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                            <li>Room1</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
