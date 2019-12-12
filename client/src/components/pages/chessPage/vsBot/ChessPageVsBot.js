import React from 'react'
import '../styles/ChessPage.css'
import PlayZoneVsBot from './PlayZoneVsBot'
import MoveHistory from '../MoveHistory'
import '../styles/ChatBox.css'
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChessQueen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ChessPageVsBot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            moveHistory: []
        }
    }

    getMoveHistory = (history) => {
        // console.log(history)
        this.setState({
            moveHistory: history,
        })
    }

    render() {
        const {moveHistory} = this.state
        // console.log(moveHistory)
        return(
            <div className='chessPage'>
                <div className='chessPageLeft'>
                    <PlayZoneVsBot getMoveHistory={this.getMoveHistory}/>
                </div>
                <div className='chessPageRight'>
                    
                    <div className='chessPageRightComponents-top'>
                       <div className="shadow-bg"></div>
                       <MoveHistory moveHistory={moveHistory}/>
                    </div>
                    
                    <div className='chessPageRightComponents-mid'>
                        <div className="shadow-bg"></div>
                            <div className="middle">
                                <div className='missingChess'>  
                                    <FontAwesomeIcon icon={faChessQueen} style={{marginTop:"5px"}}/>
                                    <p className="glow">ChessOnline</p>
                                </div> 

                                <button type='button' id='surrenderButton' className='sur-btn'>
                                    <FontAwesomeIcon icon={faFlag}/>
                                    <p>Surrender!</p>
                                </button>
                        </div>
                    </div>

                    <div className='chessPageRightComponents-dn'>
                        <div className="shadow-bg"></div>
                        <div className='chatBox'>
                            <p>Stockfish is a free</p>
                            <p>and open-source UCI chess engine</p>
                            <p>available for various desktop </p>
                            <p>and mobile platforms.</p>
                            <p>It is developed by Marco Costalba, </p>
                            <p>Joona Kiiski, Gary Linscott, Stéphane Nicolet,</p>
                            <p>and Tord Romstad, with many </p>
                            <p>contributions from a community of</p>
                            <p>open-source developers</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
export default ChessPageVsBot;