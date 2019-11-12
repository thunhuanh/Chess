import React, {Component} from 'react';
import './Style/RightSide.css';

export default class RightSide extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <div className="container">
                <strong>Ranking</strong>
                <div className="ranking_box">
                    <ul>
                        <li>A</li>
                        <li>B</li>
                    </ul>
                </div>
                <strong>Online User</strong>
                <div className="online_box">
                    <strong>No one is online now</strong>
                </div>
            </div>
        )
    }
}