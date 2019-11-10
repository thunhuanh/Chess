import React from 'react'
import "./styles/FrontPage.css"
// import axios from "axios"
import UserForm from './UserForm';
import Slide from './Slide';
export default function Frontpage() {
    // axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
    //     name: "string", // Dữ liệu được gửi lên endpoint '/user'
    //     password: "string"
    //   })
    //   .then(function (response) {
    //     console.log(response); // Xử lý dữ liệu được trả về từ API
    //   })
    //   .catch(function (error) {
    //     console.log(error); // Xử lý lỗi
    //   });
    return (
        <div>            
            <nav className="navbar navbar-inverse nav-ab">
                <div className= "container-fluid">
                <a className="navbar-brand" href="/a">ChessOnline</a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="deactive">
                        <a className="nav-link" id="loginBtn" href = "123"><i className="fa fa-user fa4" aria-hidden="true"></i>     Login</a>
                    </li>
                </ul>
                </div>
            </nav>
            <Slide></Slide>
            <UserForm></UserForm>
        </div>
    )
}

