const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");

const app = express();
app.use(cors());
app.use('/',express.static(path.join(__dirname,'build')))
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
let playerCount = 0;
let winnerFound=false;

io.on("connection", (socket) => {

  let room;
  socket.on("host",(hostId)=>{
    
    room=hostId.slice(14);
    socket.join(room);
    console.log("hosting room in ",room);
  })
  socket.on("join",(room_id)=>{
    room=room_id
    console.log("joining room ",room)
    socket.join(room);
    io.in(room).emit('startGame',socket.id);
    winnerFound=false
  })
  socket.on('ready',()=>{
    console.log('a player is ready');
    playerCount++;
    room= "room"+Math.ceil(playerCount/2)
    socket.join(room);
    console.log("player ",socket.id," joined ",room)

    if(playerCount%2==0){
      io.in(room).emit('startGame',socket.id);
      winnerFound=false
    }
  })
    
  socket.on("bingoCount",bingoCount=>{
    if(bingoCount>=5 && !winnerFound){
      socket.to(room).emit("iLose")
      winnerFound= true
    }    
  })

  socket.on("playerHasMarked",({value,turn})=>{
    console.log("marking in room - ",room)
    socket.to(room).emit("getPosition",{value,'turn':true});  
})
 

socket.on("disconnect", () => {
  playerCount--;
  console.log("A user disconnected");
  socket.to(room).emit('opLeft')
  socket.leave(room);
});
  
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
