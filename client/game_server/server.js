var express = require('express');
var http = require('http');
var socket = require('socket.io');

const port = process.env.PORT || 5000;

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req,res) {
  res.send('server is up and running!');
});

const server = http.createServer(app);

server.listen(port, function() {
  console.log("listening on *: " + port);
});

const io = socket(server);
var rooms = [];
var generalHistoryMessages = []

io.on("connection", function (socket) {
  var playerId = Math.floor((Math.random() * 100) + 1)
  console.log(playerId + " connected");

  //handle room list
  io.to(socket.id).emit("room list", rooms)

  //handle general messages
  io.to(socket.id).emit("messages list", generalHistoryMessages)

  //handle room add
  socket.on("room add", function(msg) {
    let roomObj = {
      id: msg.id,
      name: msg.name,
      available: true,
      players: 0
  }
    rooms.push(roomObj);
    if (rooms.length >= 100){
      rooms.shift();
    }
    // let room = "room" + msg.id;
    // socket.join(room); 

    socket.broadcast.emit("room add", msg);
  })

  //handle player connected to game
  socket.on("joined", function(msg){
    // let room = "room" + msg.roomId;
    // socket.join(room);
    socket.roomId = msg.roomId;
    //socket.userName = 
    let players = 0;
    for (let i = 0; i< rooms.length; i++){
      if (rooms[i].id === msg.roomId){
        if (rooms[i].players < 2){
          rooms[i].players++;

          players = rooms[i].players;
          if (players % 2 === 0) {
            rooms[i].available = false;
            color = "white";
          }
          else color = "black";

        } else {
          socket.emit("full");
        }
      }
    }
    let roomId = msg.roomId;
    io.sockets.emit("player", {players, color, roomId});
  })

  //handle move
  socket.on("move", function (msg) {
    socket.broadcast.emit("board-position", msg);
  })

  //handle friend add
  socket.on("friend add", function (msg) {
    console.log(msg)
    socket.broadcast.emit("friend add", msg)
  })

  //handle surrender
  socket.on("surrender", function(msg) {
    socket.broadcast.emit("surrender", msg)
  })

  //handle general chat message
  socket.on("general chat send", function (msg) {
    let tempObj = {
      name: msg.name,
      message: msg.message,
      id: msg.id
    }

    generalHistoryMessages.push(tempObj);

    socket.broadcast.emit("general chat send", tempObj);
  });

  //handle private chat message
  socket.on("send", function (msg) {
    socket.broadcast.emit("receive", msg);
  });

  socket.on("disconnect", function() {
    console.log(playerId + " disconnected");
    socket.broadcast.emit("room exit", {roomId: socket.roomId})
    if(socket.roomId !== undefined || socket.roomId !== null){
      for( var i = 0; i < rooms.length; i++){ 
        if(rooms[i].id === socket.roomId){
          if ( rooms[i].players === 0) {
            console.log(room)
            room.splice(i, 1); 
          }
        }
        }
    }
  });
});
