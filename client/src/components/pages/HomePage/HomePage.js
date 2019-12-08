import React, { Component } from 'react'
import PmodeCbox from './PmodeCbox'
import ProfileFlist from './ProfileFlist'
import RankOnline from './RankOnline'
import './styles/HomePage.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="hp-container">
                {/* <div className="hp-intro">123122312</div> */}
                <div className="hp-main">
                    <PmodeCbox ></PmodeCbox>
                    <ProfileFlist ></ProfileFlist>
                    <RankOnline ></RankOnline>
                </div>
            </div>
        )
    }
}
