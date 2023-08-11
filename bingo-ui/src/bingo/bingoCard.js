import React, { useEffect } from "react";
import { useState } from "react";
import getCard from "./cardGenerator";
import BingoTracker from "./bingoTracker";
import { useBingoCounter } from "./context-api/bCountProvider";
export default function BingoCard() {
    const [row_col, setRow_Col] = useState([0,0])
    const {incBingoCount,resetCount,bingoCount} = useBingoCounter();
  const [bingoCard, loadBingoCard] = useState(getCard);

  const setMarked = (row, col) => {
    loadBingoCard((bingoCard) => {
      const copy = [...bingoCard];
      copy[row][col] = { ...copy[row][col], isMarked: true };
      return copy;
    })
    setRow_Col([row,col])
}

useEffect(()=>{
    const [row,col] = row_col;
   
    let count=0;
    for(let r=0;r<bingoCard.length;r++){
    
        if(bingoCard[r][col].isMarked==false){
            break;
        }
        else if(r==bingoCard.length-1 && bingoCard[r][col].isMarked==true){
            count++;
            
        }
    }

    //row-wise check
    for(let cl=0;cl<bingoCard.length;cl++){
        if(bingoCard[row][cl].isMarked==false)break;
        else if(cl==bingoCard.length-1 && bingoCard[row][cl].isMarked==true){
            count++;
        }
    }
    // diagonal-wise
    if(row==col){
        for(let i=0;i<bingoCard.length;i++){
            if(bingoCard[i][i].isMarked==false)break;
            else if(i==bingoCard.length-1 && bingoCard[i][i].isMarked==true){
                count++;
            }
        }
    }
    // second-diagonal-wise
    if(row+col==bingoCard.length-1){
        for(let i=0,len=bingoCard.length-1;i<bingoCard.length;i++){
            if(bingoCard[i][len-i].isMarked==false)break;
            else if(i==bingoCard.length-1 && bingoCard[i][len-i].isMarked==true){
                count++;
            }
        }
    }
    incBingoCount(count);
    


},[bingoCard])


  
    
  
  return (
    <div className="w-64 m-auto">
    <BingoTracker />
    <div className="bg-gray-800 rounded-sm p-1 m-auto  text-black font-normal">
  
      {bingoCard.map((curRow, row) => (
        <div key={row} className="grid grid-cols-5">
          {curRow.map((num, col) => (
            <div
              key={row - col}
              className={`hover:cursor-pointer rounded-sm p-2 m-1 border-gray-200 ${
                num.isMarked
                  ? "bg-black text-white"
                  : " bg-blue-500 hover:opacity-75 hover:text-black"
              }`}
              onClick={num.isMarked ? null : () => setMarked(row, col)}
            >
              <span className="text-xl">{num.value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
  
  );
}
