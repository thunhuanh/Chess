import React, { Component } from 'react'
import './styles/PlayModes.css'

export default class PlayModes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVsBot: true,
            startMatch: false
        }
        
    }

    modeOnClick = (event) => {
        if(event.target.id === "vsbot"){
            if (this.state.isVsBot === false){
                this.setState({
                    isVsBot: true
                })
            }
        }
        if(event.target.id ==="vsman"){
            if (this.state.isVsBot === true){
                this.setState({
                    isVsBot: false
                })
            }
        }
    }

    playOnClick = (event) => {
        event.preventDefault()
        this.props.vsMan(this.state.isVsBot)
        if (this.state.isVsBot === true) {

        }
        else if (this.state.isVsBot === false) {
            
        }
    }
    render() {
        return (
            <div className="hp-pm-container">
                <div className="hp-pm-bg"></div>
                <div className="hp-tag">
                    <p>Play Modes</p>
                </div>
                <div className="hp-play-modes">
                    <div className={this.state.isVsBot ? "hp-play-modes-picker hp-play-modes-picker-selected" : "hp-play-modes-picker"} id="vsbot" onClick={this.modeOnClick}>
                        <div className="hp-bg" id="vsbot"></div>
                        <h3 id="vsbot">VS Ai</h3>
                        <p id="vsbot">Training for newbies</p>
                        <p id="vsbot">Practice for more experience</p>
                    </div>
                    <div className={this.state.isVsBot === false ? "hp-play-modes-picker hp-play-modes-picker-selected" : "hp-play-modes-picker"} id="vsman" onClick={this.modeOnClick}>
                        <div className="hp-bg" id="vsman"></div>
                        <h3 id="vsman">Ranking</h3>
                        <p id="vsman">Compete to get higher rank</p>
                        <p id="vsman">Make outstanding moves</p>
                    </div>
                </div>
                <button className="hp-play-modes-confirm-btn" onClick={this.playOnClick}>
                    <div className="hp-play-modes-confirm-btn-bg"></div>
                    <p>Play</p>
                </button>
            </div>
            
        )
    }
}
