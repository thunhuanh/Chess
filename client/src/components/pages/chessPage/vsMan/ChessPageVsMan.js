import React from 'react'
import '../styles/ChessPage.css'
import PlayZoneVsMan from '../vsMan/PlayZoneVsMan'
import MoveHistory from '../MoveHistory'
import ChatBox from './ChatBox'
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import { faChessQueen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import io from 'socket.io-client';
import CryptoJS from "crypto-js";

const socket = io('http://192.168.50.113:4000');

class ChessPageVsMan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            moveHistory: [],
            userData: {}
        }
    }

    componentDidMount(){
        let loginStatus = localStorage.getItem("loginStatus")
        if (loginStatus === undefined){
            this.props.history.push("/")
        }
    }

    async componentWillMount() {
        let token = localStorage.getItem("token");
        if (token !== null){
            try {
                let response = {}
                let userNameDeCrypt = CryptoJS.AES.decrypt(localStorage.getItem("userName"), "secret")
                let userPassDeCrypt = CryptoJS.AES.decrypt(localStorage.getItem("userPass"), "secret")
                let name = userNameDeCrypt.toString(CryptoJS.enc.Utf8)
                let pass = userPassDeCrypt.toString(CryptoJS.enc.Utf8)
                response = await this.login(name, pass);
                this.setState({ 
                    userData: response.user,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    login = async (userName, password) => {
        const response = await axios.post('https://chess-apis.herokuapp.com/api/v1/be/access/login', {
            name: userName, // Dữ liệu được gửi lên endpoint '/user'
            password: password
        })
        // console.log(response)
        return response.data.data
    }

    surOnClick = async () => {
        let point = this.state.userData.Point
        let rank = this.state.userData.Rank

        point -= 25;

        if (point > 4000) {
        rank = "Diamond";
        } else if (point > 3000){
        rank = "plantium";
        } else if (point > 2000){
        rank = "Gold";
        } else if (point > 1000){
        rank = "Silver";
        } else {
        rank = "Bronze";
        }

        if (point < 0) point = 0;
        await this.updateScore(point, rank);
        socket.emit("surrender", {roomId: this.props.roomId, loser: this.state.userData.name})

        this.props.history.goBack();
    }

    updateScore = async (score, rank) => {
        var config = {
          headers: {
              'Authorization': localStorage.getItem("token")
          }
        }
    
        let url = `https://chess-apis.herokuapp.com/api/v1/be/account/${this.state.userData.id}`
        await axios.put(url,{
          avatar: "string",
          nickName: "string",
          point: score,
          rank: rank,
          status: "string"
        }, config)
      }

    getMoveHistory = (history) => {
        // console.log(history)
        this.setState({
            moveHistory: history,
        })
    }

    render() {
        const {moveHistory} = this.state
        // console.log(this.props.roomId)
        return(
            <div className='chessPage'>
                <div className='chessContentVsMan'>
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

                                    <button type='button' id='surrenderButton' className='sur-btn' onClick={this.surOnClick}>
                                        <FontAwesomeIcon icon={faFlag}/>
                                        <p className="cp-sur-text">Surrender!</p>
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
            </div>
        );
    }
}
export default ChessPageVsMan;