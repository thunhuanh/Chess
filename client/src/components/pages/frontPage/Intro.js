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
                                <p>Made with full power, this game will make your skill grow fast like never before.
                                   Can you get on top of the leaderboard?</p>
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
                                <h3>Don't know where to start?</h3>
                                <p>Just look right, click "Play now",
                                    register/login with an account.
                                    Then follow the 2 steps bellow.</p>
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
                                <h3>Step 1: The main screen.</h3>
                                <p>If "ranking" is chosen,
                                    you pick or create a room.
                                    Then click "Play" to start the match. There is a public chat box to text others bellow the mode selection
                                    and a friend list on the side.</p>
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
                                <h3>Step 2: Play!</h3>
                                <p>Congratulations, you're at the chess table.
                                    There is a move history to watch on the top right corner
                                    and a private in-session chat box on the bottom right.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
