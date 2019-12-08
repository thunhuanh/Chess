import React from 'react'
import './styles/PlayZone.css'
import ChessTable from './ChessTable'
import ms from 'pretty-ms'

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
        /*const { minutes, seconds } = this.state;*/
        return(
            <div className='playZone'>
                <div className='opponent'>
                    <p id='opponentName'>Player B</p>
                    <p id='opponentTimer'>Time remain: 01:00</p>
                </div>
                <div className='chessTable'>
                    <ChessTable/>
                </div>
                <div className='player'>
                    <div className='playerSubDiv'>
                        <p id='playerName'>Player A</p>
                        {/*<p id='playerTimer'>Time Remaining: { minutes }:{ seconds }</p>*/}
                        <p id='playerTimer'>Time remain: 01:00</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default PlayZone;