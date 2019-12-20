import React, { Component } from 'react'
import './styles/RankDir.css'

export default class RankDir extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoginForm: false
        }
        this.top = []
    }
    loginOnClick = (event) => {
        event.preventDefault();
        this.props.loginOnClick();
    }
    render() {
        // let list = this.top.map((player, index)=>{
        //     console.log(player.name)
        //     return <li key={index}>{player.name}</li>
            
        // })
        return (
            <div className="fp-rankdir" id={this.props.isLoginForm === true ? "fp-rankdir-after" : ""}>
                <div className="fp-rd-login-box">
                    <div className="fp-rd-login-box-bg"></div>
                    <div className="fp-rd-box">
                        <div className="fp-rd-login-box-header">
                            <h1>Chess</h1>
                        </div>
                        <div className="fp-rd-login-box-content">
                            <p>Ready to rush to the top?</p>
                        </div>

                    </div>
                    <div className="fp-rd-btn-container">
                        <button className="fp-rd-user-btn" onClick={this.loginOnClick} id="fp-rd-log">
                            <div className="fp-rd-user-btn-bg">
                            </div>
                            <p className="fp-rd-user-btn-ctn">Play now</p>
                        </button>
                    </div>    
                </div>
                <div className="fp-rd-ranking-box">
                    <div className="fp-rd-ranking-bg"></div>
                    <div className="fp-rd-ranking-container">
                        <ul>
                            {this.props.getTop.map((player, index) => {
                                return <li key={index}>{player.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>             
        )
    }
}
