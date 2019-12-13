import React from 'react'
import '../styles/PlayZone.css'
import ChessTableVsMan from './ChessTableVsMan'

class PlayZoneVsMan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div className='playZone'>
                <div className='opponent'>
                    <p id='opponentName'>opponent</p>
                
                </div>
                <div className='chessTable'>
                    <ChessTableVsMan 
                        getMoveHistory={this.props.getMoveHistory} 
                        userData={this.props.userData} 
                        roomId={this.props.roomId}
                        history={this.props.history}
                    />
                </div>
                <div className='player'>
                    <div className='playerSubDiv'>
                        <p id='playerName'>{this.props.userName}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default PlayZoneVsMan;