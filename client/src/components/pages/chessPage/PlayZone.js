import React from 'react'
import './styles/PlayZone.css'
import ChessTable from './ChessTable'

class PlayZone extends React.Component {
    render() {
        return(
            <div className='playZone'>
                <div className='opponent'>
                    <p id='opponentName'>Player B</p>
                    <p id='opponentTimer'>Time remain: 01:00</p>
                </div>
                <div className='chessTable'>
                    <ChessTable/>
                </div>
                <div className='player'>
                    <div className='playerSubDiv'>
                        <p id='playerName'>Player A</p>
                        <p id='playerTimer'>Time remain: 01:00</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default PlayZone;