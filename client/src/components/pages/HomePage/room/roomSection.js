import React, { Component } from 'react';
import PropTypes from 'prop-types'
import RoomList from './roomList'
import RoomForm from './roomForm'
import './roomSection.css'

export class RoomSection extends Component {
    render() {
        return (
            <div className="roomSection">
                <div className="support panel panel-primary">
                    <div className="panel-heading">
                        <strong>Rooms</strong>
                    </div>
                    <div className="panel-body channels">
                        <RoomList {...this.props}/>
                        <RoomForm {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}

RoomSection.propTypes = {
    rooms : PropTypes.array.isRequired,
    joinRoom : PropTypes.func.isRequired,
    addRoom : PropTypes.func.isRequired
}

export default RoomSection;
