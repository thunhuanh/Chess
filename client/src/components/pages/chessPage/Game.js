import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import io from 'socket.io-client';
import {roughSquare} from "./roughStyles";
import axios from 'axios';

export default class GameLogic extends Component {
  constructor(props){
    super(props);
    this.state = {
      fen: "start",
      //piece on clicked square
      clickedPiece: "",
      //clicked square
      clickedSquare: "",
      //to show possible moves
      squareChange: {},
      //history
      history: [],
      color: "black",
      // allowDrag: true,
      roomId: 0,
      winner: false,
      players: 1
    };
    this.socket = io("http://localhost:4000");
    this.game = new Chess();
  }
  componentDidMount(){
    this.init();
  };

  updateScore = async (score, rank) => {
    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    }

    let url = `https://chess-apis.herokuapp.com/api/v1/be/account/${this.props.userData.id}`
    await axios.put(url,{
      avatar: "string",
      nickName: "string",
      point: score,
      rank: rank,
      status: "string"
    }, config)
  }

  init = () => {
    this.setState({
      roomId: this.props.roomId
    })

    //handle room exit
    this.socket.on("room exit", (msg) => {
      if (msg.roomId === this.state.roomId){
        if (this.state.winner !== false){
          alert("opponent has leave the room you win");
          this.props.history.goBack();
        }
      }
    })

    //handle moves
    this.socket.on("board-position", (msg) => {
      let {roomId} = this.state;
    
      if (roomId === msg.roomId) {
        this.updateBoard(msg.move);
        this.checkForWinner(msg.turn);
      }
    });

    //handle other player connected
    this.socket.on("player", msg => {
      let {roomId} = this.state;
      var color = msg.color;
      var players = msg.players;

      if (roomId === msg.roomId){
        this.setState({
          // roomId: roomId,
          color: color,
          players: players
        })
      }
    })
  }

  checkForWinner = (prevTurn) => {
    if (this.game.game_over() === true){
      var {userData} = this.props;
      var point = userData.Point;
      var rank = userData.Rank;
      // console.log(this.state.color, prevTurn)
      // if (this.game.in_checkmate()){
        if (this.state.color !== prevTurn){
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

          this.updateScore(point, rank);
          alert("you lost");
          this.setState({
            winner: false,
          })
          this.props.history.goBack()
        } else if (this.state.color === prevTurn){

          point += 25;
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
          this.updateScore(point, rank);
          alert("you win");
          this.setState({
            winner: true,
          })
          this.props.history.goBack();
        }
      // }
    }
  }

  componentWillUnmount(){
    this.socket.close()
  }

  updateBoard = (move) => {
    this.game.move(move);
    this.setState({
      fen: this.game.fen(),
      history: this.game.history()
    });
    const {getMoveHistory} = this.props
    getMoveHistory(this.game.history())
  }

  //allow to drag 
  allowDrag = ({ piece }) => {
    const {color} = this.state;
    // console.log(players);
    var whitePiece = ["wK", "wQ", "wN", "wB", "wP", "wR"];
    var blackPiece = ["bK", "bQ", "bN", "bB", "bP", "bR"];

    // if (players < 2) return false;

    // if (allowDrag === false) console.log("hello");
    
    if ((this.game.game_over() === true)) {
      return false;
    }
  
  
    if ((color === "white" && blackPiece.includes(piece)) || 
        (color === "black" && whitePiece.includes(piece))) {
      return false;
    }
      
  
    if ((this.game.turn() === "w" && whitePiece.includes(piece)) || 
        (this.game.turn() === "b" && blackPiece.includes(piece))) {
      return true;
    }

    return false;
    
  };


  //handle move
  onDrop = ({sourceSquare, targetSquare}) => {
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    });

    if (move === null) return;

    let turn = "";
    let {roomId} = this.state;

    if (this.game.turn() === "b") turn = "white";
    else turn = "black";

    this.socket.emit("move", {turn: turn, move: move, roomId: roomId});
    this.updateBoard(move);
    this.checkForWinner(turn);
  };

  //handle move
  onSquareClick = clickedSquare => {
    if ((this.game.turn() === "w" && this.state.color === "black") ||
        (this.game.turn() === "b" && this.state.color === "white")) 
        return;

    this.setState(() => ({
      clickedPiece: clickedSquare
    }));

    let move = this.game.move({
      from: this.state.clickedPiece,
      to: clickedSquare,
      promotion: "q"
    });

    if (move === null) return;

    let {roomId} = this.state;
    let turn;

    if (this.game.turn() === "b") turn = "white";
    else turn = "black";

    this.socket.emit("move", {turn: turn, move: move, roomId: roomId});
    this.updateBoard(move);
    this.checkForWinner(turn);
  };

  //get possible move
  onMouseOverSquare = clickedSquare => {
    let moves = this.game.moves({
      square: clickedSquare,
      verbose: true
    })

    // console.log(clickedSquare)

    if (moves.length === 0) return;

    let possibleMoves = []
    for (let i = 0; i < moves.length; i++) {
      possibleMoves.push(moves[i].to);
    }

    if ((this.game.turn() === "w" && this.state.color === "black") ||
        (this.game.turn() === "b" && this.state.color === "white")) 
    return;
    
    this.showPossibleMoves(clickedSquare, possibleMoves);
  }

  //remove high light when mouse is out of square
  onMouseOutSquare = clickedSquare => this.removePossibleMoves(clickedSquare);

  removePossibleMoves = () => {
    this.setState(() => ({
      squareChange: {}
    }));
  };

  showPossibleMoves = (sourceSquare, PossibleMoves) => {
    let moves = [sourceSquare, ...PossibleMoves]

    //reduce method to change css of all highLishtSquares
    moves = moves.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...{
          [currentValue]: {
            background: "radial-gradient(circle, #fffc00 36%, transparent 40%)"
          }
        },
      };
    });

    this.setState(({ squareChange }) => ({
      squareChange: { ...squareChange, ...moves }
    }));
  };

  render() {
    const {fen, color} = this.state;
    return (
        <Chessboard
          width={600}
          orientation={color}
          position={fen}
          onDrop={this.onDrop}
          squareStyles={this.state.squareChange}
          onSquareClick={this.onSquareClick}
          onMouseOverSquare={this.onMouseOverSquare}
          onMouseOutSquare={this.onMouseOutSquare}
          allowDrag={this.allowDrag}
          roughSquare={roughSquare}
          id="chessBoard"
          darkSquareStyle={{ backgroundColor: "#B58863" }}
        />
    );
  };
}