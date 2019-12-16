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
                                    With two playing modes: against the computer with a chess engine or against another player online.
                                    Will you be able to get on top of the leaderboard?</p>
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
                                <p>If not knowing to play chess, look online, there are tutorials for beginners.
                                    Don't know where to start from here, look right, click "Play now",
                                    register/login with you account. Still don't know what to do afterward?
                                    Follow the 2 steps bellow.</p>
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
                                <p>You choose the play mode, if "ranking" is chosen,
                                    you must pick or create a room.
                                    Then click "Play" to start the match. There is also a chat box to text others publicly bellow the mode selection
                                    and a friend list next to that box.</p>
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
                                <p>Congratulations, you made it to the chess table.
                                    Now all you have to do is beat your opponent.
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
