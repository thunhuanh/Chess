import React, {Component} from 'react';
import './Style/HomePageAuxComponents.css';
import OnlinePlayer from "./OnlinePlayer";

export default class HomePageAuxComponents extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (

            <div className="homePageAuxComponents">

                    <div className="friendList">
                        <p>FRIENDLIST</p>
                        <strong>No one is online now</strong>
                    </div>

                <OnlinePlayer/>
            </div>
        )
    }
}