import React, { Component } from 'react'
import './styles/ProfileFlist.css'

export default class ProfileFlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {

            }
        }
    }
    
    render() {
        let playerName = "PlayerX"
        return (
            <div className="hp-profile-flist hp-parts">
                <div className="hp-pf-profile">
                    <span className="box-title">
                        Player Profiles
                    </span>
                    <h1 className="hp-pf-pName">{playerName}</h1>
                    <div className="hp-pf-dataBox">
                        <ul>
                            <li>
                                rank
                            </li>
                            <li>
                                level
                            </li>
                            <li>
                                ABC
                            </li>
                            <li>
                                ABC
                            </li>
                        </ul>
                    </div>
                    <div className="hp-pf-logout-box">
                        <button className="hp-pf-logout-btn">Logout</button>
                    </div>
                </div>
                <div className="hp-pf-friendlist">
                    <span className="box-title">
                        Friend List
                    </span>
                    <div className="hp-pf-friend-container">
                        <div className="hp-pf-friendBox">
                            <ul className="hp-pf-listItem">
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="hp-pf-friend">
                                    <i class="fas fa-user-circle "></i>
                                    <p>playerY</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="hp-pf-searchBox">
                            <div className="hp-pf-icon">
                                <i className="fa fa-search hp-pf-searchicon" aria-hidden="false"></i>
                            </div>
                            <form className="hp-pf-search-search">
                                <input placeholder="Search your friend" type="text" className="hp-pf-search"/>
                            </form>    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
