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
                                <th>Turn Number</th>
                                <th>Player A</th>
                                <th>Player B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                            <tr>
                                <td>1. </td>
                                <td>b2-b4</td>
                                <td>d7-d5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default MoveHistory;