import React from 'react'
import "./style.css"

export default function Frontpage() {
    return (
        <div>            
            <nav className="navbar navbar-inverse">
                <div className= "container-fluid">
                <a className="navbar-brand" href="#">ChessOnline</a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="deactive">
                        <a className="nav-link" id="loginBtn"><i class="fa fa-user fa4" aria-hidden="true"></i>     Login</a>
                    </li>
                </ul>
                </div>
            </nav>
            <div>

            </div>

        </div>
    )
}

