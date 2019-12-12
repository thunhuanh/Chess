import React from 'react'
import '../styles/ChessTable.css'
import Stockfish from './vsBot'

class ChessTableVsBot extends React.Component {
    render() {
        return(
           <div className="bkk">
               <Stockfish getMoveHistory={this.props.getMoveHistory}/>
           </div>
        );
    }
}
export default ChessTableVsBot;