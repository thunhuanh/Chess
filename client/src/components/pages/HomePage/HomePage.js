import React, { Component } from 'react';
import './styles/HomePage.css';
import PlayModes from './PlayModes';
import Chat from './Chat';
import Profile from './Profile';
import Friend from './Friend';
import Room from './Room';
import axios from 'axios';

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVsBot: true,
            userData: {},
            userId: 0,
            friends: []
        }
    }

    async componentWillMount() {
        let token = localStorage.getItem("token");
        if (token !== null){
            try {
                const response = await this.loginWithToken(token);
                await this.getFriends(token, response.id)

                this.setState({ 
                    userData: response,
                 });
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    getFriends = async (token, userId) => {
        var config = {
            headers: {
                'Authorization': token
            }
        }
        var url = 'https://chess-apis.herokuapp.com/api/v1/be/friend/friends/all/' + String(userId)
        axios.get(url, config).then((response) => {
            if (response.data.success === true){
                this.setState({
                    friends: response.data.data
                })
            }
        })
    }

    loginWithToken = async (token) => {
        // console.log(token)
        var config = {
            headers: {
                'Authorization': token
            }
        }
        const response = await axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',{}, config)
        return response.data.data;
    }

    vsMan = (isVsBot) => {
        this.setState({isVsBot: isVsBot})
    }
    onMouseDown = (event) =>{
        event.preventDefault()
        console.log(event.target.style)
        event.target.attribute. = {
            background: "red",
        }
    }
    render() {
        const {userData, friends} = this.state;
        var friendData = friends;
        return (
            <div className="hp-container">
                {/* <div className="hp-bg">
                </div> */}
                <button onMouseDown={this.onMouseDown} style={{}}>asdvasdfasd</button>
                <div className="hp-bg-box">
                    <div className="hp-bg-img">

                    </div>
                    <div className="hp-logo">
                        <p>
                            <i className='fas fa-chess-queen'></i>
                            Chess Online
                        </p>            
                    </div>
                </div>
                <div className="hp-main">
                    <div className="hp-main-content">
                        <div className="hp-col-3 mr-15">
                            <div className="hp-row-1">
                                <PlayModes vsMan={this.vsMan}></PlayModes>
                            </div>
                            <div className="hp-row-2">
                                <Room isVsBot={this.state.isVsBot}></Room>
                                <Chat isVsBot={this.state.isVsBot}></Chat>
                            </div>                            
                        </div>
                        <div className="hp-col-1 sr">
                            <div className="hp-row-3">
                                <Profile name={userData.name} rank={userData.Rank} point={userData.Point}/>
                            </div>
                            <div className="hp-row-4">
                                {<Friend friends={friendData}/>}
                            </div>
                        </div>
                    </div>     
                </div>
            </div>     
        )
    }
}