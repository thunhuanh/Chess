import React, { Component } from 'react'
import './styles/Room.css'

export default class Room extends Component {
    constructor(props) {
        super(props)

        this.state = {
            liActive: false
        }
    }

    // liOnClick = () => {

    // }
    render() {
        return (
            <div className={this.props.isVsBot?"hp-room":"hp-room hp-room-after"}>
                <div className="hp-bg"></div>
                <div className="hp-room-container">
                    <div className="hp-room-content">
                        <form action="" className="hp-create-room">
                            <i className="fas fa-home fa-2x" ></i>
                            <input type="text" placeholder="Insert name"/>
                        </form>
                        <div className="hp-room-ul">
                            <ul>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                                <li><span><i className="fas fa-home"></i></span>Room1</li>
                            </ul>
                        </div>                       
                    </div>
                </div>
            </div>
        )
    }
}
