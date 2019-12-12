import React from 'react'
import '../styles/PlayZone.css'
import ChessTableVsBot from './ChessTableVsBot'

class PlayZoneVsBot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div className='playZone'>
                <div className='opponent'>
                    <p id='opponentName'>Stockfish Bot</p>
                
                </div>
                <div className='chessTable'>
                    <ChessTableVsBot getMoveHistory={this.props.getMoveHistory}/>
                </div>
                <div className='player'>
                    <div className='playerSubDiv'>
                        <p id='playerName'>Player A</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default PlayZoneVsBot;