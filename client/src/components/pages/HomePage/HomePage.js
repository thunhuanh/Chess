import React, { Component } from 'react';
import './styles/HomePage.css';
import PlayModes from './PlayModes';
import Chat from './Chat';
import Profile from './Profile';
import Friend from './Friend';
import RoomComponent from './RoomComponent';
import axios from 'axios';
// import {Switch, Route} from 'react-router-dom';
// import ChessPage from '../chessPage/ChessPage';


export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVsBot: true,
            userData: {},
            friends: [],
            redirectToVsBot: false,
        }
    }

    componentDidMount(){
        let loginStatus = localStorage.getItem("loginStatus")
        if (loginStatus === undefined){
            this.props.history.push("/")
        }
    }


    async componentWillMount() {
        let token = localStorage.getItem("token");
        if (token !== null){
            try {
                const response = await this.login(this.props.userName, this.props.userPass);
                // console.log(response)
                this.getFriends(token, response.user.id)
                this.setState({ 
                    userData: response.user,
                 });
            } catch (error) {
                console.log(error);
            }
        }
    }

    getFriends = (token, userId) => {
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

    addFriend = async (token, userID, friendID) => {
        var config = {
            headers: {
                'Authorization': token
            }
        }
        axios.post('https://chess-apis.herokuapp.com/api/v1/be/friend/friends/new', {
            friendId: friendID,
            userId: userID
            }, config).then((response) => {
                if (response.data.success){
                    // alert("12331");
                    this.getFriends(token, userID)
                }
            }).catch((error) =>{
                console.log(error)
            })
            
    }

    addFriendOnClick =  (id) => {
        let userID = this.state.userData.id
        let frId = Number(id)
        // console.log(typeof(userID), typeof(frId))
        if (userID !== frId){
            this.addFriend(localStorage.getItem("token"), userID, frId)
        }
        
    }

    removeFriend = async (token, userId, frId) => {
        var config = {
            headers: {
                'Authorization': token
            }
        }
        var url = 'https://chess-apis.herokuapp.com/api/v1/be/friend/friends/' + String(userId) + "/"  +String(frId)

        const response = await axios.delete(url, config)
        if (response.data.success === true){
            var newurl = 'https://chess-apis.herokuapp.com/api/v1/be/friend/friends/all/' + String(userId)
            const response = await axios.get(newurl, config)
            if (response.data.success === false) {
                this.setState({
                    friends: []
                })
            } else {
                this.setState({
                    friends: response.data.data
                })
            }
            // this.getFriends(token, userId)
        }
        
    }

    removeFriendOnClick = (frId) => {
        let userID = this.state.userData.id
        let _frId = Number(frId)
        this.removeFriend(localStorage.getItem("token"), userID, _frId)
        // this.getFriends(localStorage.getItem("token"), this.state.userData.id)
    }
    report = (token ,message, reportedId, reporterID) => {
        var config = {
            headers: {
                'Authorization': token
            }
        }
        axios.post("https://chess-apis.herokuapp.com/api/v1/be/report/reports", {
            message: message,
            reportedAccountId: reportedId,
            reporterId: reporterID
        }, config).then((response) => {
            if(response.data.success === true) {
            }
        })
    }

    reportOnClick = (message, reportedID) => {
        let _repedID = Number(reportedID)
        let msg = message
        let repID = this.state.userData.id
        
        console.log(typeof(msg), typeof(repID), typeof(_repedID))
        this.report(localStorage.getItem("token") ,msg , _repedID, repID)
    }

    login = async (userName, password) => {
        const response = await axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
            name: userName, // Dữ liệu được gửi lên endpoint '/user'
            password: password
        })
        // console.log(response)
        return response.data.data
    }

    redirectToVsBot = () => {
        this.props.history.push("/HomePage/Bot")
    
    }

    vsMan = (isVsBot) => {
        this.setState({isVsBot: isVsBot})
    }
    onMouseDown = (event) =>{
        event.preventDefault()
        console.log(event.target.style)
    }
    render() {
        const {userData, friends} = this.state;
        var friendData = friends;
        return (
            <div className="hp-container">
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
                                <PlayModes vsMan={this.vsMan} redirectToVsBot={this.redirectToVsBot}></PlayModes>
                            </div>
                            <div className="hp-row-2">
                                <RoomComponent isVsBot={this.state.isVsBot} history={this.props.history} passRoomIdToVsMan={this.props.passRoomIdToVsMan}></RoomComponent>
                                <Chat isVsBot={this.state.isVsBot} addFriend={this.addFriendOnClick} userID={this.state.userData} report={this.reportOnClick}></Chat>
                            </div>                            
                        </div>
                        <div className="hp-col-1 sr">
                            <div className="hp-row-3">
                                <Profile name={userData.name} rank={userData.Rank} point={userData.Point}/>
                            </div>
                            <div className="hp-row-4">
                                {<Friend friends={friendData} remove={this.removeFriendOnClick}/>}
                            </div>
                        </div>
                    </div>     
                </div>    
            </div>     
        )
    }
}