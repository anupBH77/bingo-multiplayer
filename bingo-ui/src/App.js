import './App.css';
import BingoCard from './bingo/bingoCard';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import LoadingIcon from './bingo/loadingIcon';
import popup, { Popup } from 'reactjs-popup'
import '../node_modules/reactjs-popup/dist/index';
import { useBingoCounter } from './bingo/context-api/bCountProvider';
function App() {

  const [socket, setSocket] = useState(null);
  const [hostId,setHostId]= useState(undefined);
  const [turn,setTurn]= useState(null);
  const {bingoCount,resetCount}= useBingoCounter();
  const [title,setTitle]= useState({open:false,message:"Bingo! You win"});
  useEffect(()=>{
   if(bingoCount>=5){
    setTitle(prevData=>{return {...prevData,open:true}});
   }
  },[bingoCount])
  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    newSocket.on("connect", () => {
      // Set the socket object in the state
        setSocket(newSocket);
    });

    newSocket.on('startGame', (hostId)=>{
      // console.log(hos)
      setHostId(hostId)
      if(hostId==newSocket.id){
        setTurn(true);
    
      }
    })

    return () => {
      newSocket.disconnect(); // Clean up the socket when component unmounts
    };
  }, []);

  // if(bingoCount>=5){
  //   resetCount();  
  // }
  if(socket){
    socket.on('iLose',()=>{
      setTitle(prevData=>{return {...prevData,open:true,message:"shit! you've lost"}})
    })
  }

 
  return (
    <div className="App relative">
      <Popup open={title.open}>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-violet-500 bg-opacity-50 " id="popup"> 
    <div class="bg-white px-14 rounded-sm p-8 text-center shadow-2xl shadow-gray-500">
        <div class="text-green-500 text-5xl">
        </div>
        <p class="mt-4 text-xl font-semibold">{title.message}</p>
        <button class="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-sm outline-none"  onClick={()=>{window.location.reload()}}>Close</button>
    </div>
 </div> 
        
      </Popup>
      
      {hostId? null: <LoadingIcon/>}
      
      
      {socket ? ( // Render content when the socket is connected
       
          <BingoCard userId={socket.id} turn= {turn} socket={socket} setTurn={setTurn}/>
   
      ) : (null
      )}
      
    </div>
  );
}

export default App;
