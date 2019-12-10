import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Room from './room'

export class RoomList extends Component {
    render() {
        const {rooms, joinRoom} = this.props
        return (
            <ul className="list-group">
                {rooms.map(room => {
                    if (room.available)
                        return <Room
                                key={room.id}
                                room={room}
                                joinRoom={joinRoom}
                              />
                })}
            </ul>
        );
    }
}

RoomList.propTypes = {
    rooms : PropTypes.array.isRequired,
    joinRoom : PropTypes.func.isRequired
}

export default RoomList;
