import React from 'react'
import './styles/PlayZone.css'
import ChessTable from './ChessTable'

class PlayZone extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    /*state = {
        minutes: 0,
        seconds: 5,
    }

    timer1() {
        this.myInterval = setInterval(() => {
            let state = {
                minutes: 0,
                seconds: 5,
            }
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.setState(({ minutes }) => ({
                        minutes: 0,
                        seconds: 5
                    }))

                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }*/

    render() {
        return(
            <div className='playZone'>
                <div className='opponent'>
                    <p id='opponentName'>Player B</p>
                
                </div>
                <div className='chessTable'>
                    <ChessTable/>
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
export default PlayZone;