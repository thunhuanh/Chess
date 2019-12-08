import React, { Component } from 'react'
import './styles/Intro.css'

export default class Intro extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="fp-intro" id={this.props.isLoginForm === true ? "fp-intro-after" : ""}>
                <div className="fp-intro-bg">

                </div>
                <div className="fp-intro-tut-box">
                    <div className="fp-intro-tut-element" id="tut1">
                        <div className="fp-intro-tut-element-bg">

                        </div>
                        <div className="fp-intro-tut-element-content">
                            <div className="fp-intro-tut-element-img">

                            </div>
                            <div className="fp-intro-tut-element-desc">
                                <h3>Online Chess</h3>
                                <p>Made with full power</p>
                            </div>
                        </div>
                    </div>
                    <div className="fp-intro-tut-element" id="tut2">
                        <div className="fp-intro-tut-element-bg">

                        </div>
                        <div className="fp-intro-tut-element-content">
                            <div className="fp-intro-tut-element-img">

                            </div>
                            <div className="fp-intro-tut-element-desc">
                                <h3>Ranking system</h3>
                                <p>Try to beat all the rival to get on top of the leaderboard</p>
                            </div>
                        </div>
                    </div>
                    <div className="fp-intro-tut-element" id="tut3">
                        <div className="fp-intro-tut-element-bg">

                        </div>
                        <div className="fp-intro-tut-element-content">
                            <div className="fp-intro-tut-element-img">

                            </div>
                            <div className="fp-intro-tut-element-desc">
                                <h3>Ranking system</h3>
                                <p>Try to beat all the rival to get on top of the leaderboard</p>
                            </div>
                        </div>
                    </div>
                    <div className="fp-intro-tut-element" id="tut4">
                        <div className="fp-intro-tut-element-bg">

                        </div>
                        <div className="fp-intro-tut-element-content">
                            <div className="fp-intro-tut-element-img">

                            </div>
                            <div className="fp-intro-tut-element-desc">
                                <h3>Ranking system</h3>
                                <p>Try to beat all the rival to get on top of the leaderboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
