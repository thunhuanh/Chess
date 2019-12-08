import React from 'react'
import './styles/ChessPage.css'
import PlayZone from './PlayZone'
import MoveHistory from './MoveHistory'
import ChatBox from './ChatBox'
import './bulma/bulma.css'

class ChessPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return(
            <div className='chessPage'>
                <div className='chessPageLeft'>
                    <PlayZone/>
                </div>
                <div className='chessPageRight'>
                    <MoveHistory/>
                        <div className='chessPageRightMidComponents'>
                            <div className='missingChess'>
                                <p>Missing chess</p>
                            </div>
                            <div className='surrender'>
                                <button type='button' id='surrenderButton' className='button'>Surrender!</button>
                            </div>
                        </div>
                    <ChatBox/>
                </div>
            </div>
        );
    }
}
export default ChessPage;