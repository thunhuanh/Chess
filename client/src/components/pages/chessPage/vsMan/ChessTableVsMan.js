import React from 'react'
import '../styles/ChessTable.css'
import GameLogic from '../Game'

class ChessTableVsMan extends React.Component {
    render() {
        return(
           <div className="bkk">
               <GameLogic {...this.props}/>
           </div>
        );
    }
}
export default ChessTableVsMan;