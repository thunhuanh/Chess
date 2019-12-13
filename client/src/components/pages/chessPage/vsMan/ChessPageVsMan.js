import React from 'react'
import '../styles/ChessPage.css'
import PlayZoneVsMan from '../vsMan/PlayZoneVsMan'
import MoveHistory from '../MoveHistory'
import ChatBox from './ChatBox'
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChessQueen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

class ChessPageVsMan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            moveHistory: [],
            userData: {}
        }
    }

    async componentWillMount() {
        let token = localStorage.getItem("token");
        if (token !== null){
            try {
                const response = await this.loginWithToken(token);

                this.setState({ 
                    userData: response,
                 });
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    loginWithToken = async (token) => {
        // console.log(token)
        var config = {
            headers: {
                'Authorization': token,
            }
        }
        const response = await axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login/token',{}, config)
        return response.data.data;
    }

    getMoveHistory = (history) => {
        // console.log(history)
        this.setState({
            moveHistory: history,
        })
    }

    render() {
        const {moveHistory} = this.state
        console.log(this.props.roomId)
        return(
            <div className='chessPage'>
                <div className='chessPageLeft'>
                    <PlayZoneVsMan 
                        history={this.props.history} 
                        getMoveHistory={this.getMoveHistory} 
                        userData={this.state.userData} 
                        roomId={this.props.roomId} 
                        userName={this.state.userData.name}
                    />
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
                        <ChatBox 
                            history={this.props.history} 
                            name={this.state.userData.name} 
                            roomId={this.props.roomId}

                        />
                    </div>
                
                </div>
            </div>
        );
    }
}
export default ChessPageVsMan;