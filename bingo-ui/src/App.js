import "./App.css";
import BingoCard from "./bingo/bingoCard";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import LoadingIcon from "./bingo/loadingIcon";
import popup, { Popup } from "reactjs-popup";
import "../node_modules/reactjs-popup/dist/index";
import { useBingoCounter } from "./bingo/context-api/bCountProvider";
import PopupLayout from "./bingo/popupLayout";
function App() {
  const [plId,setPlId]= useState(null);
  const [roomId,setRoomId]= useState('');
  const [isClicked,setClicked]= useState(false);
  const [online,setOnline]= useState(false)
  const [host,setHost]= useState(false)
  const [join,setJoin]= useState(false)
  const [isSelect, setSelected] = useState(true);
  const [socket, setSocket] = useState(null);
  const [hostId, setHostId] = useState(undefined);
  const [turn, setTurn] = useState(null);
  const [room, setRoom] = useState("");
  const { bingoCount, resetCount } = useBingoCounter();
  const [title, setTitle] = useState({
    open: false,
    message: "Bingo! You win",
  });



  useEffect(() => {
    if (bingoCount >= 5) {
      setTitle((prevData) => {
        return { ...prevData, open: true };
      });
    }
  }, [bingoCount]);


  useEffect(() => {
    const newSocket =  io("http://localhost:5000");
    newSocket.on(
      "connect",
      () => {
        setSocket(newSocket);
      }
    );
    return () => {
      newSocket.disconnect(); // Clean up the socket when component unmounts
    };
  }, []);

  useEffect(()=>{
    if(!online){
      return;
    }
    setSelected(false)
    socket.emit("ready")
    socket.on("startGame", (hostId, room) => {
      // setRoom(room);
      setHostId(hostId);
      if (hostId == socket.id) {
        setTurn(true);
      }
    });


  },[online])
  useEffect(()=>{
    if(!host){
      return;
    }
    setSelected(false)
    // setPlId(socket.id.slice(14))
    socket.emit("host",socket.id)
    socket.on("startGame", (hostId, room) => {
      setRoom(room);
      setHostId(hostId);
      if (hostId == socket.id) {
        setTurn(true);
      }
    });

  },[host])
  useEffect(()=>{
    if(!join){
      return;
    }
    setSelected(false);
    socket.emit("join",roomId);
    socket.on("startGame", (hostId, room) => {
      setRoom(room);
      setHostId(hostId);
      if (hostId == socket.id) {
        setTurn(true);
      }
    });

  },[join])
  if (socket) {
    socket.on("iLose", () => {
      setTitle((prevData) => {
        return { ...prevData, open: true, message: "shit! you've lost" };
      });
    });
    socket.on("opLeft", () => {
    });
  }

  return (
    <div className="App relative">
      <p className=" text-lg shadow-inner font-semibold font-mono text-slate-400 bg-slate-950 p-6 shadow shadow-slate-900  border-b border-gray-200 text-white" >B I N G O - U I </p>
      <Popup open={isSelect}>
        <PopupLayout>
          <div className="  w-full p-0 justify-between">
            <div className=" w-full flex justify-between ">
            <button
            class=" bg-sky-500 hover:bg-sky-600 text-white font-semibold w-[40%] rounded-sm outline-none"
            onClick={() => {
             setOnline(true);
            }}
          >
            Online
          </button>
          <button
            className=" bg-sky-500 hover:bg-sky-600 text-white font-semibold w-[40%] py-2 rounded-sm outline-none"
            onClick={() => {
              setPlId(socket.id.slice(14));
            }}
          >
            Host
          </button>
            </div>
            {plId?<div className="mt-2  rounded-sm w-full flex justify-between border border-gray-400">
              <span className="text-slate-800   w-[70%] outline-none p-2" >{plId}</span>
              <button className="w-[30%] bg-green-500   font-semibold text-white" onClick={()=>{setHost(true)}}>Go</button>
            </div>:null}
            
            <div className="mt-2  rounded-sm w-full flex justify-between border border-gray-400">
              <input className="  w-[70%] outline-none p-2" value={roomId} onChange={(event)=>{setRoomId(event.target.value)}}></input>
              <button className="w-[30%] bg-green-500 font-semibold text-white" onClick={()=>{setJoin(true)}}>Join</button>
            </div>
          </div>
        </PopupLayout>
      </Popup>
      <Popup open={title.open}>
        <PopupLayout>\
          <div>

          <p class="pmt-4 text-xl font-semibold">{title.message}</p>
          <button
            class="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-sm outline-none"
            onClick={() => {
              window.location.reload();
            }}
            >
            Close
          </button>
            </div>
        </PopupLayout>
      </Popup>

      {hostId ? null : <LoadingIcon />}

      {socket ? ( // Render content when the socket is connected
        <BingoCard
          room={room}
          userId={socket.id}
          turn={turn}
          socket={socket}
          setTurn={setTurn}
        />
      ) : null}
    </div>
  );
}

export default App;
