import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './room.css'

export class Room extends Component {

    onClick = (e) => {
        e.preventDefault();
        const {room, joinRoom} = this.props;
        joinRoom(room);
    }
    
    render() {
        const {room} = this.props
        return (
            <li className="list-group-item">
                <p onClick={this.onClick} className="room">
                    {room.name}
                </p>
            </li>
        );
    }
}

export default Room;

Room.propTypes = {
    room : PropTypes.object.isRequired,
    joinRoom : PropTypes.func.isRequired
}