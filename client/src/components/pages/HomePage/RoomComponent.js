import React, { Component } from 'react';
import './styles/Room.css';
import io from 'socket.io-client';
import config from '../../../config'
// import ChessPageVsMan from '../chessPage/vsMan/ChessPageVsMan'
// import {Switch, Route} from 'react-router-dom';

export default class RoomComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // liActive: false,
            rooms : []
        }

        this.socket = io(config.SOCKETIO_URL);
        this.roomId = 0;
        this.socketId = "";
    }

    componentDidMount() {
        this.socket.on("room list", (msg) => {
            this.setState({
                rooms: msg
            })
        })
        this.socket.on("room add", (msg) => {
            // console.log(msg)
            this.newRoom(msg);
        })
    }

    componentWillUnmount() {
        // this.socket.close();
    }

    newRoom = (room) => {
        let {rooms} = this.state;
        if (room.available){
            rooms.push(room);
        }
        this.setState({rooms: rooms});
    }

    addRoom = (roomName) => {
        let {rooms} = this.state;
        for (let i = 0; i < rooms.length; i++){
            if (rooms[i].name === roomName){
                window.alert("room already exist!!")
                return;
            }
        }

        // send to server
        let msg = {
            id: rooms.length,
            name: roomName,
            available: true
        }
        this.roomId = msg.id;

        this.socketId = this.socket.id;

        this.socket.emit("room add", msg);
        this.socket.emit("joined", {roomId : msg.id})
        this.props.passRoomIdToVsMan(this.roomId);
        this.props.history.push("/Home/play")
    }

    joinRoom = (room) => {
        //redirect to active room
        // this.setState({redirect : true})
        this.socketId = this.socket.id;
        // console.log("redirecting to room");
        // console.log(this.state.redirect);
        //emit some event
        this.roomId = room.id;
        this.socket.emit("joined", {roomId : room.id})
        this.props.passRoomIdToVsMan(this.roomId);
        this.props.history.push("/Home/play")
        // console.log(room)
    }

    renderRoom = () => {
        let {rooms} = this.state;
        return rooms.map((room, idx) => {
            if (room.available){
                return <li key={idx} onClick={() => {
                    this.joinRoom(room)
                }}><span><i className="fas fa-home"></i></span>{room.name}</li>
            } else {
                return ""
            }
        })

    }

    roomOnSubmit = (e) => {
        e.preventDefault();
        const node = this.refs.room;
        const roomName = node.value;
        // console.log(roomName);
        this.addRoom(roomName);
        node.value = "";
    }

    render() {
        if (localStorage.getItem("loginStatus") === undefined || localStorage.getItem("loginStatus") === null){
            this.props.history.goBack()
        }

        return (
            <div className={this.props.isVsBot?"hp-room":"hp-room hp-room-after"}>
                <div className="hp-bg"></div>
                <div className="hp-room-container">
                    <div className="hp-room-content">
                        <form action="" className="hp-create-room" onSubmit={this.roomOnSubmit}>
                            <i className="fas fa-home fa-2x" ></i>
                            <input type="text" ref="room" placeholder="Room name"/>
                        </form>
                        <div className="hp-room-ul">
                            <ul>
                                {this.renderRoom()}
                            </ul>
                        </div>                       
                    </div>
                </div>
            </div>
        )
    }
}
