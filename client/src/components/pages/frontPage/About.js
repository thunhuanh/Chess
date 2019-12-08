import React, { Component } from 'react'
import './styles/About.css'

export default class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="tp-about" id={this.props.isLoginForm === true ? "tp-about-after" : ""}>
                <div className="tp-about-bg"></div>
                <div className="tp-about-container">
                    <div className="tp-about-about">
                        About us
                        </div>
                    <div className="tp-about-content" id="tp-company">
                        <h3>Company</h3>
                        <ul>
                            <li>Team8.Co</li>
                            <li>Newly founded company</li>
                            <li>Leaded by abc.xyz</li>
                        </ul>
                    </div>
                    <div className="tp-about-content" id="tp-dev">
                        <h3>Deverloper team</h3>
                        <ul>
                            <li>Nguyen Si Tung</li>
                            <li>Nhu Anh Thu</li>
                            <li>Nguyen Vuong Tien</li>
                            <li>Le Quang Phuoc</li>
                            <li>Pham Tuan Linh</li>
                            <li>Le Dinh Hoang</li>
                        </ul>
                    </div>
                    <div className="tp-about-content" id="tp-sponsor">
                        <h3>Sponsor</h3>
                        <ul>
                            <li>D.Sc.Hoang Xuan Tung</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
