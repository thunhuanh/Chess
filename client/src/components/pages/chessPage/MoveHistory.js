import React from 'react'
import './styles/MoveHistory.css'

class MoveHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        
        this.element = null;
    }

    renderHistory = () => {
        const {moveHistory} = this.props;

        if (moveHistory.length !== 0) {
            return moveHistory.map((obj, idx) => {
                return <tr key={idx} ref={element => {this.element = element}}>
                        <th>{idx + 1}</th>
                        <th>{obj}</th>
                    </tr>
            
              }
            );
        }
    }

    componentDidUpdate(){
        if (this.element !== null) {   
            this.element.scrollIntoView({behavior: 'smooth' });
        }
    }

    render() {
        return(
            <div className='moveHistory'>
                <p id='mhTitle'>Move history</p>
                <div className='moveList'>
                    <table id='moveTable'>
                        <thead>
                            <tr>
                                <th >Turn</th>
                                <th >Move</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderHistory()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default MoveHistory;