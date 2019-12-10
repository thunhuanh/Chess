import React, { Component } from 'react';
import RoomSection from './roomSection';
import './roomComponent.css';
import { BrowserRouter } from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom';
import GameLogic from '../game/game-board/Game';
import io from 'socket.io-client';

export class RoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms : [],
            redirect: false
        }
        this.socket = io('http://localhost:4000');
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

        this.setState({
            redirect: false
        })
    }

    componentWillUnmount() {
        this.socket.close();
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
        console.log()
        this.socket.emit("room add", msg);
        this.socket.emit("joined", {roomId : msg.id})
        this.setState({
            // rooms: rooms,
            redirect: true
        });
    }

    redirect = () => {
        if (this.state.redirect) {
          return <Redirect to="/room"/>
        }   
      }

    joinRoom = (room) => {
        //redirect to active room
        this.setState({redirect : true})
        this.socketId = this.socket.id;
        // console.log("redirecting to room");
        // console.log(this.state.redirect);
        //emit some event
        this.roomId = room.id;
        this.socket.emit("joined", {roomId : room.id})
        // console.log(room)
    }

    render() {
        return (
                <div className="nav">
                    <BrowserRouter>
                        {this.redirect()}
                        <Route exact path="/" >
                            <RoomSection
                                className="hp-roomSection"
                                rooms={this.state.rooms}
                                addRoom={this.addRoom}
                                joinRoom={this.joinRoom}
                            />
                        </Route>
                        <Route path="/room">
                            <GameLogic roomId={this.roomId}/>
                        </Route>
                    </BrowserRouter>
                </div>
        );
    }
}

export default RoomComponent;
