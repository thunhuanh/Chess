import React from 'react'
import './styles/ChessTable.css'
import Stockfish from './game-board/vsBot'

class ChessTable extends React.Component {
    render() {
        return(
           <Stockfish className="cp-vsbot-table"/>
        );
    }
}
export default ChessTable;