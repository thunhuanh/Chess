import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RoomForm extends Component {

    onSubmit = (e) => {
        e.preventDefault();
        const node = this.refs.room;
        const roomName = node.value;
        // console.log(roomName);
        this.props.addRoom(roomName);
        node.value = "";
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input
                        className="form-control"
                        placeholder="add room"
                        type="text"
                        ref="room"
                    />
                </div>
            </form>
        );
    }
}

RoomForm.propTypes = {
    addRoom : PropTypes.func.isRequired
}

export default RoomForm;
