const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
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
  console.log("A user connected", socket.id);
  playerCount++;
  if(playerCount==2){
    io.emit('startGame',socket.id);
    winnerFound=false
  }

  socket.on("disconnect", () => {
    playerCount--;
    console.log("A user disconnected");
  });
  console.log("numbers of players in the server --> ", playerCount);
  socket.on("bingoCount",bingoCount=>{
    
    console.log(bingoCount,"plsyerid-",socket.id,winnerFound)
    if(bingoCount>=5 && !winnerFound){
      socket.broadcast.emit("iLose")
      console.log(socket.id,"is the winner",winnerFound)
      winnerFound= true
    }    
  })
  socket.on("playerHasMarked",({value,turn})=>{
    socket.broadcast.emit("getPosition",{value,'turn':true});  
})
 
  
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
