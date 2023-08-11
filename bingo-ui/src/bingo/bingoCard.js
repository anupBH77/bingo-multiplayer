import React, { useEffect } from "react";
import { useState } from "react";
import getCard from "./bingoLogics";
export default function BingoCard() {
  const [bingoCard, loadBingoCard] = useState(getCard);

  const setMarked=(row,col)=>{
 
    loadBingoCard((bingoCard)=>{
        const copy= [...bingoCard];
        copy[row][col]={...copy[row][col],isMarked:true}
        return copy;
    })
  }
  return (
    <div className=" w-1/3 m-auto white">
        {console.log(bingoCard)}
      {bingoCard.map((curRow,row) => (
        <div key={row} className=" grid grid-cols-5">
          {curRow.map((num,col) => (
            <div key={row-col} className={` hover:cursor-pointer  border rounded-md p-2 m-1 border-gray-200 ${num.isMarked ?"bg-green-500":"bg-green-200  hover:opacity-75" }`} onClick={()=>setMarked(row,col)} >{num.value}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
