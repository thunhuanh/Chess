import React from 'react'
import './styles/MoveHistory.css'

class MoveHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

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
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                              
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                                
                            </tr>

                            <tr>
                                <th></th>
                                 <th></th>
                             
                            </tr>

                            <tr>
                              <th></th>
                              <th></th>
                               
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                           
                            </tr>

                            <tr>
                             <th></th>
                             <th></th>
                             
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                            </tr>

                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default MoveHistory;