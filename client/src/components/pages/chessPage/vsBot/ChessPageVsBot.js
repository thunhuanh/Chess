import React from 'react';
import '../styles/ChessPage.css';
import PlayZoneVsBot from './PlayZoneVsBot';
import MoveHistory from '../MoveHistory';
import '../styles/ChatBox.css';
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../../../config'

class ChessPageVsBot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            moveHistory: [],
            userData: {}
        }
    }

    componentDidMount(){
        let loginStatus = localStorage.getItem("loginStatus")
        if (loginStatus === null){
            this.props.history.push("/")
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
        var headerconfig = {
            headers: {
                'Authorization': token,
            }
        }
        let url = config.API_URL + '/api/v1/be/access/login/token';
        const response = await axios.post(url,{}, headerconfig)
        return response.data.data;
    }

    surOnClick = () => {
        this.props.history.goBack();
    }

    getMoveHistory = (history) => {
        // console.log(history)
        this.setState({
            moveHistory: history,
        })
    }

    render() {
        const {moveHistory} = this.state
        // console.log(moveHistory)
        return(
            <div className='chessPage'>
                <div className='chessContentVsBot'>
                    <div className='chessPageLeft'>
                        <PlayZoneVsBot getMoveHistory={this.getMoveHistory} userData={this.state.userData}/>
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

                                    <button type='button' id='surrenderButton' className='sur-btn' onClick={this.surOnClick}>
                                        <FontAwesomeIcon icon={faFlag}/>
                                        <p className="cp-sur-text">Surrender!</p>
                                    </button>
                            </div>
                        </div>

                        <div className='chessPageRightComponents-dn'>
                            <div className="shadow-bg"></div>
                            <div className='cp-chatBox'>
                                <p>Stockfish is a free</p>
                                <p>and open-source UCI chess engine</p>
                                <p>available for various desktop </p>
                                <p>and mobile platforms.</p>
                                <p>It is developed by Marco Costalba, </p>
                                <p>Joona Kiiski, Gary Linscott, Stéphane Nicolet,</p>
                                <p>and Tord Romstad, with many </p>
                                <p>contributions from a community of</p>
                                <p>open-source developers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChessPageVsBot;