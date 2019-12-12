import React, { Component } from "react";
import Chess from "chess.js";
import Chessboard from 'chessboardjsx';
import { roughSquare } from "./roughStyles";

const STOCKFISH = window.STOCKFISH;
const game = new Chess();

class Stockfish extends Component {
    constructor(props){
        super(props);
        this.state = {
          fen: "start",
        };
    }

    componentDidMount() {
        this.setState({ fen: game.fen() });

        this.engineGame().prepareMove();
    }

    //allow to drag 
    allowDrag = ({ piece }) => {
        var whitePiece = ["wK", "wQ", "wN", "wB", "wP", "wR"];
        var blackPiece = ["bK", "bQ", "bN", "bB", "bP", "bR"];
        
        if ((game.game_over() === true)) {
            return false;
        }
    
        if ((game.turn() === "w" && whitePiece.includes(piece)) || 
            (game.turn() === "b" && blackPiece.includes(piece))) {
        return true;
        }

        return false;
    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        // illegal move
        if (move === null) return;

        return new Promise(resolve => {
            this.setState({ fen: game.fen() });
            resolve();
        }).then(() => this.engineGame().prepareMove());
    };

    engineGame = options => {
        options = options || {};

        let engine =
        typeof STOCKFISH === "function"
            ? STOCKFISH()
            : new Worker(options.stockfishjs || "stockfish.js");
        let evaler =
        typeof STOCKFISH === "function"
            ? STOCKFISH()
            : new Worker(options.stockfishjs || "stockfish.js");
        let engineStatus = {};
        console.log(engine);
        let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
        let playerColor = "black";
        let clockTimeoutID = null;
        // let isEngineRunning = false;
        let announced_game_over;

        setInterval(function() {
            if (announced_game_over) {
                return;
            }

            if (game.game_over()) {
                if (game.turn() === "b"){
                    alert("you lost")
                } else if (game.turn() === "w"){
                    alert("you win")
                }
                announced_game_over = true;
            }
        }, 500);

        function uciCmd(cmd, which) {
            // console.log('UCI: ' + cmd);

            (which || engine).postMessage(cmd);
        }
        uciCmd("uci");

        function clockTick() {
            let t = (time.clockColor === "white" ? time.wtime : time.btime) + time.startTime - Date.now();
            let timeToNextSecond = (t % 1000) + 1;
            clockTimeoutID = setTimeout(clockTick, timeToNextSecond);
        }

        function stopClock() {
            if (clockTimeoutID !== null) {
                clearTimeout(clockTimeoutID);
                clockTimeoutID = null;
            }
            if (time.startTime > 0) {
                let elapsed = Date.now() - time.startTime;
                time.startTime = null;
                if (time.clockColor === "white") {
                    time.wtime = Math.max(0, time.wtime - elapsed);
                } else {
                    time.btime = Math.max(0, time.btime - elapsed);
                }
            }
        }

        function startClock() {
            if (game.turn() === "w") {
                time.wtime += time.winc;
                time.clockColor = "white";
            } else {
                time.btime += time.binc;
                time.clockColor = "black";
            }
            time.startTime = Date.now();
            clockTick();
        }

        function get_moves() {
            let moves = "";
            let history = game.history({ verbose: true });

            for (let i = 0; i < history.length; ++i) {
                let move = history[i];
                moves +=
                " " + move.from + move.to + (move.promotion ? move.promotion : "");
            }

            return moves;
        }

        const prepareMove = () => {
            stopClock();
            // this.setState({ fen: game.fen() });
            let turn = game.turn() === "w" ? "white" : "black";
            if (!game.game_over()) {
                // if (turn === playerColor) {
                if (turn !== playerColor) {
                // playerColor = playerColor === 'white' ? 'black' : 'white';
                uciCmd("position startpos moves" + get_moves());
                uciCmd("position startpos moves" + get_moves(), evaler);
                uciCmd("eval", evaler);

                if (time && time.wtime) {
                    uciCmd(
                    "go " +
                        (time.depth ? "depth " + time.depth : "") +
                        " wtime " +
                        time.wtime +
                        " winc " +
                        time.winc +
                        " btime " +
                        time.btime +
                        " binc " +
                        time.binc
                    );
                } else {
                    uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
                }
                // isEngineRunning = true;
                }
                if (game.history().length >= 2 && !time.depth && !time.nodes) {
                    startClock();
                }
            }
        };

        evaler.onmessage = function(event) {
            let line;

            if (event && typeof event === "object") {
                line = event.data;
            } else {
                line = event;
            }

        // console.log('evaler: ' + line);

            if (
                line === "uciok" ||
                line === "readyok" ||
                line.substr(0, 11) === "option name"
            ) {
                return;
            }
        };

        engine.onmessage = event => {
            let line;

            if (event && typeof event === "object") {
                line = event.data;
            } else {
                line = event;
            }
            // console.log('Reply: ' + line);
            if (line === "uciok") {
                engineStatus.engineLoaded = true;
            } else if (line === "readyok") {
                engineStatus.engineReady = true;
            } else {
                let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                /// check if the stockfish bot has move
                if (match) {
                    // isEngineRunning = false;
                    game.move({ from: match[1], to: match[2], promotion: match[3] });
                    this.setState({ fen: game.fen() });
                    prepareMove();
                    uciCmd("eval", evaler);
                    //uciCmd("eval");
                ///check for feedback
                } else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
                    engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
                }

                /// Is it sending feed back with a score?
                if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
                    let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);
                    /// Is it measuring in centipawns?
                    if (match[1] === "cp") {
                        engineStatus.score = (score / 100.0).toFixed(2);
                    /// Did it find a mate?
                    } else if (match[1] === "mate") {
                        engineStatus.score = "Mate in " + Math.abs(score);
                    }

                    /// Is the score bounded?
                    if ((match = line.match(/\b(upper|lower)bound\b/))) {
                        engineStatus.score =
                        ((match[1] === "upper") === (game.turn() === "w")
                            ? "<= "
                            : ">= ") + engineStatus.score;
                    }
                }
            }
        // displayStatus();
        };

        return {
            start: function() {
                uciCmd("ucinewgame");
                uciCmd("isready");
                engineStatus.engineReady = false;
                engineStatus.search = null;
                prepareMove();
                announced_game_over = false;
            },
            prepareMove: function() {
                prepareMove();
            }
        };
    };

    render() {
        const { fen } = this.state;
        return (
            <Chessboard
                width={964}
                position={fen}
                orientation="black"
                onDrop={this.onDrop}
                roughSquare={roughSquare}
                allowDrag={this.allowDrag}
                id="stockfish"
                darkSquareStyle={{ backgroundColor: "#B58863" }}
            />
          )
    }
}

export default Stockfish;
